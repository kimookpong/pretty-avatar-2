# Pre-deployment review — 14 October 2026

Application checks passed locally. Deployment has not been performed.

## Verified

- Production build, TypeScript and deterministic animation-cover checks pass.
- Full retained test suite: 42 files pass, 789 tests pass, 1 existing TODO; no failures. Duration 227 seconds.
- Fresh npm ci in an isolated directory and production build pass using the lockfile.
- Pages base /pretty-avatar-2/, canonical URL, referenced HTML assets, structured data and sitemap pass build validation.
- JSON-LD content matches its CSP hash.
- Favicon, Apple Touch Icon, logo, social image, sitemap and robots template return HTTP 200 from the production preview with expected content types.
- Production homepage loads without broken images or browser console errors.
- Studio opens with the right controls visible. Header project menu opens; double-click title editing and Enter commit work.
- Export drawer opens with a valid SVG source and preview; no browser console errors during these checks.
- Language menu offers English and Thai; Thai labels render correctly.
- Mobile Studio tested at 390×844; no document horizontal overflow.
- Runtime dependency audit: 0 known vulnerabilities.

Screenshots: predeploy-export.png and predeploy-mobile.png.

## Before publishing

- Source files are currently untracked and need committing and pushing to origin/main.
- Remote repository kimookpong/pretty-avatar-2 exists, is public, and currently empty.
- GitHub Pages API returns 404; Pages is not configured. Enable Settings → Pages → Source: GitHub Actions.
- The workflow builds and tests before publishing dist. Its Node 24 Linux run has not yet been executed remotely; local verification used Node 22.22.3 on macOS.

## Follow-up findings and limits

- Full npm audit reports 4 moderate development dependency findings: sprintf-js and its argparse → @rushstack/ts-command-line → @microsoft/api-extractor chain. Runtime audit is clear. Consider a reviewed npm audit fix before future build-tool releases. No dependency upgrades were made as part of this review.
- GitHub project Pages serves this repository below a subpath. Crawlers use the root-domain robots.txt, so the project robots.txt is a template; submit the project sitemap directly in Search Console after publishing.
- Google indexing and social crawler previews need verification on the public deployed URL.
- Browser smoke checks covered SVG source/preview, not every native file-download format or animation combination; the automated suite covers the retained export and animation code.
