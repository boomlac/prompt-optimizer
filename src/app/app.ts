import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalysisPanelComponent } from './features/analysis-panel/analysis-panel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnalysisPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('prompt-optimizer');
}
