import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@Component({
    selector: 'app-theme-toggle',
    templateUrl: './theme-toggle.component.html',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatButtonToggleModule],
})
export class ThemeToggleComponent {
    private readonly theme = inject(ThemeService);

    toggleTheme(isDark: boolean) {
        this.theme.toggleDarkMode(isDark);
    }
}