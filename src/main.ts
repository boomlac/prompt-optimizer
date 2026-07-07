import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// VS Code API (available only inside Webview)
declare const acquireVsCodeApi: any;
const vscodeApi = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;

// Expose your optimizer engine globally
declare global {
  interface Window {
    promptOptimizer: {
      analyze: (prompt: string) => any;
    };
  }
}

// Plug in your real optimizer logic here
window.promptOptimizer = {
  analyze: (prompt: string) => {
    // Replace this with your actual scoring + rewrite engine
    return {
      score: Math.floor(Math.random() * 100),
      details: 'Full analysis goes here'
    };
  }
};

// Bootstrap Angular 21 standalone
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// Listen for messages from VS Code
window.addEventListener('message', (event) => {
  const { type, text } = event.data;

  if (type === 'INIT') {
    if (text && text.length > 0) {
      const result = window.promptOptimizer.analyze(text);

      // Send results back to VS Code
      vscodeApi?.postMessage({
        type: 'RESULT',
        result
      });
    }
  }
});
