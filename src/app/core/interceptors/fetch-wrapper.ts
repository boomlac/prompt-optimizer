import { environment } from "../../../environments/environment";

// fetch-wrapper.ts
export function apiFetch(url: string, options: any = {}) {
  const headers = {
    ...(options.headers || {}),
    'x-api-key': environment.apiKey
  };

  return fetch(url, {
    ...options,
    headers
  });
}
