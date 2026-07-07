import { Component } from "@angular/core";
import { ChromeMessagingService } from "../../core/services/chrome-messaging.service";
import { CommonModule } from "@angular/common";

// analysis-panel.component.ts
@Component({
  selector: 'ext-analysis-panel',
  template: `
    <div *ngIf="analysis">
      <h2>Prompt Analysis</h2>
      <p>Score: {{analysis.score}}</p>
      <ul>
        <li *ngFor="let issue of analysis.issues">{{issue}}</li>
      </ul>
      <textarea>{{analysis.improvedPrompt}}</textarea>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class AnalysisPanelComponent {
  analysis: any;

  constructor(private messaging: ChromeMessagingService) {
    this.messaging.analysis$.subscribe(a => this.analysis = a);
  }
}
