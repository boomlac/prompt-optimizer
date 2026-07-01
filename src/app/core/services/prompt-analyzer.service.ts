import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
    PromptAnalysisApiResponse,
  PromptAnalysisObject,
  PromptAnalysisRequest,
  PromptAnalysisResponse,
  PromptAnalysisStreamEvent,
} from '../models/prompt-analysis.model';
import { apiFetch } from '../interceptors/fetch-wrapper';

@Injectable({
  providedIn: 'root',
})
export class PromptAnalyzerService {
  private readonly promptAnalysisApiUrl = environment.promptAnalysisApiUrl;
  private readonly apiKey = environment.apiKey;
  private readonly defaultProvider = 'openai';
  private readonly defaultModel = 'gpt-4.1-mini';

  promptAnalysis(
    promptText: string,
    analysisStep: string,
    provider = this.defaultProvider,
    model = this.defaultModel
  ): Observable<PromptAnalysisResponse> {
    const payload: PromptAnalysisRequest = {
      provider,
      model,
      promptText,
      analysisStep,
    };

    return new Observable<PromptAnalysisResponse>((observer) => {
      const controller = new AbortController();

      apiFetch(this.promptAnalysisApiUrl, {
        method: 'POST',
        headers: {
          Accept: 'text/event-stream',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Prompt analysis request failed with status ${response.status}.`);
          }

          if (!response.body) {
            throw new Error('Prompt analysis stream is not available.');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          const processChunk = (chunk: string) => {
            buffer += chunk;
            const events = buffer.split('\n\n');
            buffer = events.pop() ?? '';

            for (const eventBlock of events) {
              const normalized = this.normalizeStreamEvent(eventBlock, promptText, analysisStep);
              if (normalized) {
                observer.next(normalized);
              }
            }
          };

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              if (buffer.trim()) {
                const normalized = this.normalizeStreamEvent(buffer, promptText, analysisStep);
                if (normalized) {
                  observer.next(normalized);
                }
              }
              observer.complete();
              break;
            }

            processChunk(decoder.decode(value, { stream: true }));
          }
        })
        .catch((error) => {
          if (controller.signal.aborted) {
            return;
          }
          observer.error(error);
        });

      return () => controller.abort();
    });
  }

  private normalizeStreamEvent(
    eventBlock: string,
    promptText: string,
    analysisStep: string
  ): PromptAnalysisResponse | null {
    const parsed = this.parseStreamEvent(eventBlock);

    if (!parsed) {
      return null;
    }

    const payload = this.extractInnerPayload(parsed);

    return {
      stepName: parsed.stepName,
      status: parsed.status,
      promptAnalysis: payload.promptAnalysis ?? {},
      updatedPrompt: payload.updatedPrompt ?? payload.nextPrompt ?? promptText,
      nextStep: payload.nextStep ?? parsed.nextStep ?? analysisStep,
    } satisfies PromptAnalysisResponse;
  }

  private parseStreamEvent(eventBlock: string): PromptAnalysisStreamEvent | null {
    const trimmedBlock = eventBlock.trim();
    if (!trimmedBlock) {
      return null;
    }

    const dataLines = trimmedBlock
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith(':'))
      .map((line) => (line.startsWith('data:') ? line.slice(5).trim() : line));

    const payloadText = dataLines.join('');
    if (!payloadText) {
      return null;
    }

    if (payloadText === '[DONE]') {
      return null;
    }

    try {
      return JSON.parse(payloadText) as PromptAnalysisStreamEvent;
    } catch {
      return null;
    }
  }

  private extractInnerPayload(event: PromptAnalysisStreamEvent): PromptAnalysisApiResponse {
    const candidate = event.promptAnalysis;

    if (candidate && 'promptAnalysis' in candidate) {
      return candidate as PromptAnalysisApiResponse;
    }

    if (candidate) {
      return {
        promptAnalysis: candidate as PromptAnalysisObject,
        updatedPrompt: event.updatedPrompt,
        nextPrompt: undefined,
        nextStep: event.nextStep,
      };
    }

    return {
      promptAnalysis: undefined,
      updatedPrompt: event.updatedPrompt,
      nextPrompt: undefined,
      nextStep: event.nextStep,
    };
  }
}
