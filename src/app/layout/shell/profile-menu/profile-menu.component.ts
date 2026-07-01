import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './profile-menu.component.html',
  styles: [
    `
      .profile-trigger {
        width: 34px;
        height: 34px;
        padding: 0;
        border-radius: 50%;
        border: 1px solid #cfd4df;
        background: #ffffff;
      }

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: grid;
        place-items: center;
        font-size: 0.68rem;
        font-weight: 700;
        color: #22304f;
        background: linear-gradient(145deg, #f0f2ff 0%, #f8f9ff 100%);
      }
    `,
  ],
})
export class ProfileMenuComponent {}
