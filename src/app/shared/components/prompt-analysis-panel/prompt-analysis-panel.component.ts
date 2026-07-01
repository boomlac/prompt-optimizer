import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { PromptAnalysisResponse } from '../../../core/models/prompt-analysis.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CamelToWordsPipe } from '../../pipes/camel-to-words.pipe';


@Component({
  selector: 'app-prompt-analysis-panel',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatProgressSpinnerModule, CamelToWordsPipe],
  templateUrl: './prompt-analysis-panel.component.html',
  styleUrls: ['./prompt-analysis-panel.component.scss'],
})
export class PromptAnalysisPanelComponent {
  @Input() analysis: PromptAnalysisResponse | null = null;
  @Input() promptText: string | null = null;
  @Input() isLoading: boolean | null = null;
//   @Input() progressStatuses: ProgressStatusItem[] = [];
}
