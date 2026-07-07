import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-suggested-prompt',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './suggested-prompt.component.html',
  styleUrls: ['./suggested-prompt.component.scss'],
})
export class SuggestedPromptComponent {
  @Input() originalPromptText: string | null = null;
  @Input() formattedPromptText: string | null = null;
  @Input() suggestedPrompt: string | null = null;

  @Output() reAnalyze = new EventEmitter<string>();
  @Output() promptEdited = new EventEmitter<{ suggestedPrompt: string; formattedPromptText: string }>();

  editMode = false;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly snackBar = inject(MatSnackBar);

  startEdit(el: HTMLElement): void {
    if (this.editMode) return;
    this.editMode = true;
    this.cdr.detectChanges();
    el.focus();
  }

  finishEdit(el: HTMLElement): void {
    const updatedSuggested = el.innerText;
    const updatedFormatted = el.innerHTML;
    this.suggestedPrompt = updatedSuggested;
    this.formattedPromptText = updatedFormatted;
    this.editMode = false;
    this.promptEdited.emit({ suggestedPrompt: updatedSuggested, formattedPromptText: updatedFormatted });
  }

  copyPrompt(): void {
    const text = this.suggestedPrompt ?? '';
    if (!text) return;
    navigator.clipboard.writeText(text).then(
      () => this.snackBar.open('Prompt copied to clipboard', 'Close', { duration: 3000 }),
      () => this.snackBar.open('Failed to copy prompt', 'Close', { duration: 3000 })
    );
  }

  onReAnalyze(): void {
    this.reAnalyze.emit(this.suggestedPrompt ?? '');
  }
}
