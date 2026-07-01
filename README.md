# Prompt Optimizer

Prompt Optimizer is an Angular 21 SSR application that helps users iteratively improve prompts using streaming analysis events from an AI backend.

The UI accepts a prompt, submits it to a multi-step analysis pipeline, and renders step-by-step feedback such as token counting, issues, suggestions, score, and suggested prompt improvements.

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
