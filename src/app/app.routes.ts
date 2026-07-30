import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { InitalPrompt } from './features/initial-prompt/inital-prompt';
import { AboutPromptOptimizer } from './features/about/about';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy';
import { AnalysisPanelComponent } from './features/analysis-panel/analysis-panel.component';
import { PromptGuide } from './shared/components/prompt-guide/prompt-guide';

export const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            { path: '', component: InitalPrompt },
            { path: 'buildprompt', component: PromptGuide },
        ]
    },
    { path: 'about', component: AboutPromptOptimizer },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'ext', component: AnalysisPanelComponent },
];
