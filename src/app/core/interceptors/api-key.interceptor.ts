import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.apiKey;

  if (!apiKey) {
    return next(req);
  }

  const clonedRequest = req.clone({
    setHeaders: {
      'x-api-key': apiKey,
    },
  });

  return next(clonedRequest);
};