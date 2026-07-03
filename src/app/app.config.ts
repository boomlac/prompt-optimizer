import { ApplicationConfig, PLATFORM_ID, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { isPlatformBrowser } from '@angular/common';
import { getAnalytics } from 'firebase/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        try {
          const app = initializeApp(environment.firebaseConfig);
          getAnalytics(app);
        } catch (e) {
          console.error('[Analytics] Firebase init failed:', e);
        }
      }
    }),
  ]
};
