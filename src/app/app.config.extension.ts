import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';

// Extension build — Firebase is intentionally excluded to comply with
// Chrome Web Store MV3 policy (no remotely-hosted code in the bundle).
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
  ]
};
