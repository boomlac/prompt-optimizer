import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { InitalPrompt } from './features/initial-prompt/inital-prompt';

export const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            { path: '', component: InitalPrompt },
        ]
    },
];
