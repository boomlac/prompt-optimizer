import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { InitalPrompt } from './features/initial-prompt/inital-prompt';
import { AboutPromptOptimizer } from './features/about/about';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy';

export const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            { path: '', component: InitalPrompt },
        ]
    },
    { path: 'about', component: AboutPromptOptimizer },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
