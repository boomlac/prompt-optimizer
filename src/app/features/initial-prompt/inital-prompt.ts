import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';

import { PromptAnalyzerService } from '../../core/services/prompt-analyzer.service';
import { PromptAnalysisMeta, PromptAnalysisResponse } from '../../core/models/prompt-analysis.model';
import { PromptMetaRowComponent } from '../../shared/components/prompt-meta-row/prompt-meta-row.component';
import { PromptAnalysisPanelComponent } from '../../shared/components/prompt-analysis-panel/prompt-analysis-panel.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MetaDonutComponent } from '../../shared/components/meta-analysis/meta-donut.component';
import { standarTemplate } from '../../core/data/prompt-template';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SuggestedPromptComponent } from '../../shared/components/suggested-prompt/suggested-prompt.component';
@Component({
  selector: 'app-inital-prompt',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PromptMetaRowComponent,
    PromptAnalysisPanelComponent,
    MatProgressBarModule,
    MetaDonutComponent,
    MatButtonModule,
    MatIconModule,
    HeroComponent,
    MatTabsModule,
    SuggestedPromptComponent,
  ],
  templateUrl: './inital-prompt.html',
  styleUrls: ['./inital-prompt.scss'],
})
export class InitalPrompt implements OnInit {
  private readonly promptAnalyzerService = inject(PromptAnalyzerService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  readonly maxPromptLength = 8000;
  analysisResult: PromptAnalysisResponse[] = [];
  isAnalyzing = false;
  originalPromptText: string | null = null;
  tokenCount: number | null = null;
  meta: PromptAnalysisMeta | null = null;
  score: number | null = null;
  highlightedText = standarTemplate;
  suggestedPrompt: string | null = null;
  formattedPromptText: string | null = null;
  private readonly noWhitespaceValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = (control.value ?? '') as string;
    return value.trim().length > 0 ? null : { whitespace: true };
  };

  readonly promptForm = new FormGroup({
    promptText: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(this.maxPromptLength),
        this.noWhitespaceValidator,
      ],
    }),
  });

  get promptControl(): FormControl<string> {
    return this.promptForm.controls.promptText;
  }


  get canSubmit(): boolean {
    return this.promptForm.valid && !this.isAnalyzing;
  }

  ngOnInit(): void {
    this.titleService.setTitle('PromptOptimizer — Free AI Prompt Scoring & Optimization Tool');
    this.metaService.updateTag({ name: 'description', content: 'PromptOptimizer scores your AI prompts across Clarity, Completeness, Structure, Context, and Risk. Get instant analysis and actionable rewrites — free, no login required.' });
    this.metaService.updateTag({ property: 'og:title', content: 'PromptOptimizer — Free AI Prompt Scoring Tool' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://promptoptimizer.boomlac.com/' });
    this.applyHighlights(this.highlightedText);
  }

  onSubmit(): void {

    if (!this.canSubmit) {
      this.promptControl.markAsTouched();
      return;
    }
    this.resetAnalysis();
    const promptText = this.promptControl.value.trim();
    const analysisStep = 'initial-analysis';
    this.isAnalyzing = true;
    this.promptControl.disable();
    this.promptAnalyzerService
      .promptAnalysis(promptText, analysisStep)
      .pipe(
        finalize(() => {
          this.ngZone.run(() => {
            this.isAnalyzing = false;
            this.promptControl.enable();
            this.cdr.markForCheck();
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
          this.promptControl.enable();
          this.promptControl.setValue(result.updatedPrompt || '');
          this.cdr.detectChanges();
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
  initiateNewPrompt(): void {
    this.promptControl.setValue('');
    this.resetAnalysis();
  }
  applyHighlights(text: string): string {
    return text
      .replace(/error/g, `<span style="background-color: red; color: white;">error</span>`)
      .replace(/success/g, `<span style="background-color: green; color: white;">success</span>`)
      .replace(/info/g, `<span style="background-color: blue; color: white;">info</span>`);
  }

  onReAnalyze(text: string): void {
    if (text) {
      this.promptControl.setValue(text);
      this.onSubmit();
    }
  }

  onPromptEdited(event: { suggestedPrompt: string; formattedPromptText: string }): void {
    this.suggestedPrompt = event.suggestedPrompt;
    this.formattedPromptText = event.formattedPromptText;
  }

}
