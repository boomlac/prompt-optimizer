import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ScoreClassPipe } from '../../pipes/score-class.pipe';
import { ScoreLabelPipe } from '../../pipes/score-lable.pipe';

@Component({
  selector: 'app-prompt-meta-row',
  standalone: true,
  templateUrl: './prompt-meta-row.component.html',
  styleUrls: ['./prompt-meta-row.component.scss'],
  imports: [CommonModule, ScoreClassPipe, ScoreLabelPipe]
})
export class PromptMetaRowComponent {
  @Input({ required: true }) tokenCount!: number|null;
  @Input({ required: true }) currentLength!: number;
  @Input({ required: true }) maxLength!: number;
  @Input({ required: true }) score!: number|null;
}
