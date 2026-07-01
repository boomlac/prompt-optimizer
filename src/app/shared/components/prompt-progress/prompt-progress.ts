import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-prompt-progress',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './prompt-progress.html',
  styleUrls: ['./prompt-progress.scss'],
})
export class PromptProgress {
  @Input() isLoading = false;
}
