import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

class PromptOptimizerViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = { enableScripts: true };

    // Show a launcher page in the sidebar; open the real app as a full editor panel
    webviewView.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-sideBar-background);
      gap: 16px;
    }
    button {
      padding: 8px 20px;
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }
    button:hover { background: var(--vscode-button-hoverBackground); }
    p { font-size: 12px; opacity: 0.7; text-align: center; margin: 0; }
  </style>
</head>
<body>
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
  <button onclick="open()">Open Prompt Optimizer</button>
  <p>Opens as a full editor panel</p>
  <script>
    const vscode = acquireVsCodeApi();
    function open() { vscode.postMessage({ type: 'OPEN' }); }
    // Auto-open on first load
    open();
  </script>
</body>
</html>`;

    webviewView.webview.onDidReceiveMessage((msg) => {
      if (msg.type === 'OPEN') {
        vscode.commands.executeCommand('promptOptimizer.openStudio');
      }
    });
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Register the sidebar view provider
  const provider = new PromptOptimizerViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('promptOptimizerView', provider)
  );

  // Keep the command to open as a panel (e.g. beside the editor)
  const disposable = vscode.commands.registerCommand(
    'promptOptimizer.openStudio',
    () => {
      const panel = vscode.window.createWebviewPanel(
        'promptOptimizer',
        'Prompt Optimizer Studio',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'webview/browser'))
          ]
        }
      );

      panel.webview.html = getWebviewContent(context, panel.webview);

      panel.webview.postMessage({ type: 'INIT', text: getSelectedText() });

      panel.webview.onDidReceiveMessage((msg) => {
        if (msg.type === 'RESULT') {
          vscode.window.showInformationMessage(`Prompt Score: ${msg.result.score}`);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

function getSelectedText(): string {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return '';
  const sel = editor.selection;
  return editor.document.getText(sel.isEmpty ? undefined : sel);
}

function getWebviewContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  const distPath = path.join(context.extensionPath, 'webview/browser');
  let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');

  const nonce = getNonce();

  // Only rewrite relative paths; leave external URLs and data URIs untouched
  const toWebviewUri = (p: string): string => {
    if (p.startsWith('http') || p.startsWith('//') || p.startsWith('data:') || p === '/') {
      return p;
    }
    const resource = vscode.Uri.file(path.join(distPath, p));
    return webview.asWebviewUri(resource).toString();
  };

  // Fix src and href attributes, preserving closing quote
  html = html.replace(/src="([^"]+)"/g, (_m, p1) => `src="${toWebviewUri(p1)}"`);
  html = html.replace(/href="([^"]+)"/g, (_m, p1) => `href="${toWebviewUri(p1)}"`);

  // Remove base href — it breaks Angular routing inside a webview
  html = html.replace(/<base\s+href="[^"]*"\s*>/g, '');

  // Strip GTM and analytics scripts — not needed in VS Code
  html = html.replace(/<script>\(function\s*\(w,\s*d,\s*s,[\s\S]*?<\/script>/g, '');
  html = html.replace(/<noscript>[\s\S]*?googletagmanager[\s\S]*?<\/noscript>/g, '');

  // Inject CSP — allow inline scripts (needed for Angular in webview) and all connections
  const csp = [
    `default-src 'none'`,
    `script-src 'unsafe-inline' 'unsafe-eval' ${webview.cspSource}`,
    `style-src 'unsafe-inline' ${webview.cspSource} https://fonts.googleapis.com https://fonts.gstatic.com`,
    `font-src ${webview.cspSource} https://fonts.gstatic.com data:`,
    `img-src ${webview.cspSource} https: data: blob:`,
    `connect-src * data:`,
    `worker-src blob:`,
  ].join('; ');

  html = html.replace(
    '<head>',
    `<head>\n  <meta http-equiv="Content-Security-Policy" content="${csp}">`
  );

  return html;
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
