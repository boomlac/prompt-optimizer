# PromptOptimizer

**Free, open-source AI prompt analysis and optimization tool — no login required.**

PromptOptimizer helps you write better AI prompts by analyzing your input across five quality dimensions and generating an improved version instantly. Available as a **web app**, **Chrome extension**, and **VS Code extension**.

---

## Features

- **Prompt Analyzer** — Submit any prompt (up to 8,000 characters) and receive a streamed, step-by-step analysis:
  - Token count
  - Scores across five dimensions: **Clarity**, **Completeness**, **Structure**, **Context**, and **Risk**
  - Detected issues and actionable suggestions
  - AI-generated improved prompt rewrite

- **7-Step Prompt Builder** — Guided workflow to construct well-structured prompts from scratch, covering role, task, context, constraints, format, examples, and tone.

- **Chrome Extension** — Detects prompts typed in any textarea on any webpage. Press Enter, and the extension analyzes your prompt in the popup using the same scoring engine.

- **VS Code Extension** — Sidebar panel and editor view for analyzing prompts directly inside VS Code without switching context.

- **Dark Mode** — Persisted theme toggle across sessions.

---

## Live Demo

[https://promptoptimizer.boomlac.com](https://promptoptimizer.boomlac.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21 (standalone, SSR) |
| UI | Angular Material 21, Angular CDK |
| Styling | SCSS, Fontsource (Roboto, Manrope), Material Icons |
| Reactivity | RxJS 7 |
| Charts | Chart.js 4, ng2-charts |
| SSR Server | Express 5 |
| Hosting | Firebase Hosting |
| Extension Bundler | esbuild |
| Tests | Vitest |
| Formatter | Prettier |

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/          # PromptAnalyzerService, ChromeMessagingService, ThemeService
│   │   ├── interceptors/      # API key injection, fetch wrapper
│   │   └── models/            # Prompt analysis response types
│   ├── features/
│   │   ├── initial-prompt/    # Main prompt input + analysis results page (/)
│   │   ├── home/              # Landing / product page
│   │   ├── about/             # About page
│   │   └── privacy-policy/    # Privacy policy
│   ├── layout/shell/          # App shell, toolbar, sidenav
│   └── shared/                # Reusable components, directives, pipes
├── environments/              # Environment config (dev / prod)
src-extension/
├── background.ts              # Chrome MV3 service worker — calls analysis API
├── content-script.ts          # Detects Enter key in textareas, triggers analysis
└── index.extension.html       # Extension popup entry point
vs-extension/
├── extension.ts               # VS Code extension entry — webview provider
└── webview/                   # Prebuilt Angular app loaded in VS Code panel
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Prompt input and analysis |
| `/buildprompt` | 7-Step Prompt Builder |
| `/about` | About |
| `/privacy-policy` | Privacy Policy |
| `/ext` | Chrome extension analysis panel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+
- Angular CLI 21: `npm install -g @angular/cli`

### Install dependencies

```bash
npm install
```

### Configure environment

Copy and edit the environment file:

```bash
cp src/environments/environment.development.ts src/environments/environment.ts
```

Set your API endpoint and key in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  promptAnalysisApiUrl: 'http://localhost:3000/api/v1/ai/prompt-analysis',
  apiKey: 'your_api_key_here',
  firebaseConfig: { /* your Firebase project config */ }
};
```

> **Never commit real API keys or Firebase credentials to source control.**

### Run the development server

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

---

## Build

### Web app (SSR)

```bash
npm run build
```

Output: `dist/prompt-optimizer/`

### Chrome Extension

```bash
npm run package:chrome
```

Output: `prompt-optimizer-chrome.zip` — ready to upload to the Chrome Web Store.

The build automatically:
- Compiles the Angular popup with all fonts self-hosted (MV3 compliant)
- Bundles `background.ts` and `content-script.ts` via esbuild
- Sets `"permissions": []` in the output manifest

### VS Code Extension

```bash
npm run package:vscode
```

Output: `vs-extension/prompt-optimizer-studio-*.vsix`

---

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Dev server at `localhost:4200` |
| `npm run build` | Production SSR build |
| `npm run build:chrome` | Build Chrome extension |
| `npm run package:chrome` | Build + zip Chrome extension |
| `npm run build:vscode` | Build VS Code extension assets |
| `npm run package:vscode` | Package `.vsix` for VS Code Marketplace |
| `npm run build:all` | SSR + VS Code builds |
| `npm run test` | Run Vitest test suite |
| `npm run serve:ssr` | Run SSR server locally |
| `npm run firebase:deploy` | Build SSR and deploy to Firebase Hosting |

---

## Chrome Extension — MV3 Compliance Notes

- All fonts (Roboto, Manrope, Material Icons) are **self-hosted** via `@fontsource` and `material-icons` npm packages — no Google CDN requests.
- Firebase Analytics is **excluded** from the extension bundle (uses a separate `app.config.extension.ts` swapped in via Angular `fileReplacements`).
- The manifest is post-processed at build time to enforce `"permissions": []`.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style (Prettier is configured). Run `npm test` before submitting.

---

## License

[MIT](LICENSE)

---

## Author

Built by [boomlac.com](https://boomlac.com)


## Open Source Status

This repository is being prepared for open source.

If you plan to publish it publicly, complete the checklist in the `Before You Publish` section.

## Features

- Reactive prompt input form with validation
- Prompt metadata display (length, token count, score)
- Streaming analysis updates using `text/event-stream`
- Per-step analysis panels with status (begin, warning, success, error)
- Suggestions workflow (`Apply Suggestions`, `Copy Prompt`)
- Angular Material based shell and controls
- SSR-ready Angular setup

## Tech Stack

- Angular 21 (standalone components)
- Angular Material
- RxJS
- Angular SSR + Express
- Chart.js + ng2-charts

## Project Structure

```text
src/
	app/
		core/
			services/
			interceptors/
			models/
		features/
			initial-prompt/
		layout/
			shell/
		shared/
			components/
	environments/
```

## Prerequisites

- Node.js 20+
- npm 11+

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open:

```text
http://localhost:4200
```

## Environment Configuration

The app uses environment files for API settings.

- `promptAnalysisApiUrl`
- `apiKey`

Example local API endpoint currently used:

```text
http://localhost:3000/api/v1/ai/prompt-analysis
```

Note: Keep production keys out of source control. Use secure secret management for deployed environments.

## Before You Publish

1. Remove any hardcoded API keys from environment files.
2. Add a proper open-source license file (for example `LICENSE`).
3. Add repository metadata:
	- description
	- topics/tags
	- homepage/demo link (if available)
4. Add community health files:
	- `CONTRIBUTING.md`
	- `CODE_OF_CONDUCT.md`
	- `SECURITY.md`
	- issue/PR templates
5. Verify no secrets are present in commit history.

## Streaming API Contract

The prompt analysis service expects server-sent event chunks with JSON payloads, for example:

```json
{
	"stepName": "tokenCounting",
	"status": "success",
	"promptAnalysis": {
		"promptAnalysis": {
			"score": 10,
			"issues": [],
			"suggestions": ["..."],
			"tokenCount": 32
		},
		"updatedPrompt": "...",
		"nextStep": "staticAnalysis"
	}
}
```

The frontend parses each stream block and updates UI state progressively.

## Available Scripts

- `npm start`: Run Angular dev server
- `npm run build`: Production build
- `npm run watch`: Development watch build
- `npm test`: Run tests
- `npm run serve:ssr:prompt-optimizer`: Run SSR build output

## Build

```bash
npm run build
```

Build output is generated in `dist/`.

## Testing

```bash
npm test
```

## Git Workflow

Typical push flow:

```bash
git add .
git commit -m "your message"
git push
```

## Contributing

Contributions are welcome.

Suggested contribution flow:

1. Fork the repository.
2. Create a feature branch.
3. Make changes with tests.
4. Run checks locally.
5. Open a Pull Request with a clear description.

Please keep PRs focused and include screenshots for UI changes when possible.

## Security

Do not report security vulnerabilities in public issues.

Until a dedicated `SECURITY.md` is added, please contact the maintainers privately.

## Support

For bug reports and feature requests, open an issue.

When reporting a bug, include:

- steps to reproduce
- expected behavior
- actual behavior
- environment details (OS, Node version, browser)

## Troubleshooting

- If analysis does not render, verify backend is returning valid `text/event-stream` chunks.
- Confirm `promptAnalysisApiUrl` points to the running backend.
- Confirm `apiKey` matches backend expectations.
- Check browser devtools network tab for stream events and response headers.

## Roadmap Ideas

- Persist prompt history
- Export analysis reports
- Add auth and user-specific workspaces
- Add richer chart visualizations for prompt quality trends

## License

This project is licensed under the MIT License.

See [LICENSE](LICENSE) for full text.
