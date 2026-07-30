import { ChangeDetectorRef, Component, EventEmitter, inject, Input, NgZone, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PromptAnalysisMeta, PromptAnalysisResponse } from '../../../core/models/prompt-analysis.model';
import { PromptAnalyzerService } from '../../../core/services/prompt-analyzer.service';
import { finalize } from 'rxjs';
import { PromptAnalysisPanelComponent } from '../prompt-analysis-panel/prompt-analysis-panel.component';
import { SuggestedPromptComponent } from '../suggested-prompt/suggested-prompt.component';
import { MetaDonutComponent } from '../meta-analysis/meta-donut.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-prompt-preview',
  imports: [MatTabsModule, MatButtonModule, MatIconModule, SuggestedPromptComponent, PromptAnalysisPanelComponent, MetaDonutComponent, CommonModule],
  templateUrl: './prompt-preview.html',
  styleUrls: ['./prompt-preview.scss'],
})
export class PromptPreview {
  private readonly promptAnalyzerService = inject(PromptAnalyzerService);
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  @Input() finalPrompt: string = '';
  @Output() clearAll = new EventEmitter<void>();
  analysisResult: PromptAnalysisResponse[] = [];
  isAnalyzing = false;
  originalPromptText: string | null = null;
  tokenCount: number | null = null;
  meta: PromptAnalysisMeta | null = null;
  score: number | null = null;
  formattedPromptText: string | null = null;
  suggestedPrompt: string | null = null;
  copyPrompt(promptText: string | null = null): void {
    navigator.clipboard.writeText(promptText ?? '');
  }

  downloadPrompt(promptText: string | null = null) {
    const blob = new Blob([promptText ?? ''], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.txt';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  clearPrompt() {
    this.clearAll.emit();
  }

  analyze(): void {
    this.resetAnalysis();
    const promptText = this.finalPrompt.trim();
    const analysisStep = 'initial-analysis';
    this.isAnalyzing = true;
    this.promptAnalyzerService
      .promptAnalysis(promptText, analysisStep)
      .pipe(
        finalize(() => {
          this.ngZone.run(() => {
            this.isAnalyzing = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe({
        next: (result) => {
          // this.ngZone.run(() => {
          this.analysisResult.push(result);
          if (result.stepName === 'tokenCounting' && result.status === 'success') {
            this.tokenCount = result.promptAnalysis?.tokenCount ?? null;
          }
          if (result.stepName === 'deepAnalysis' && result.status === 'success') {
            this.meta = result.promptAnalysis?.metadata ?? null;
            this.score = result.promptAnalysis?.score ?? null;
            this.suggestedPrompt = result.promptAnalysis?.suggestedPrompt ?? null;
            if (this.suggestedPrompt) {
              let formatted = this.suggestedPrompt
                .replace(/^## (.*)$/gm, '<span class="md-h2">$1</span>')
                .replace(/^### (.*)$/gm, '<span class="md-h3">$1</span>')
                .replace(/^#### (.*)$/gm, '<span class="md-h4">$1</span>');
              this.formattedPromptText = formatted;
            }
          }
          this.originalPromptText = promptText;
          // });
        },
        error: (error) => {
          console.error('Prompt analysis failed:', error);
        },
      });
  }

  resetAnalysis(): void {
    this.analysisResult = [];
    this.tokenCount = null;
    this.meta = null;
    this.score = null;
    this.suggestedPrompt = null;
  }

  onPromptEdited(event: { suggestedPrompt: string; formattedPromptText: string }): void {
    this.suggestedPrompt = event.suggestedPrompt;
    this.formattedPromptText = event.formattedPromptText;
  }

}
