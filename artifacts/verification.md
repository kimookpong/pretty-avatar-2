# pretty-avatar-2 verification

Updated 14 October 2026.

## Improvements

- Detailed authoring expands the resource shelf instead of squeezing controls into the compact character picker. The detail heading stays beside its back button.
- Language selection focuses the active option, supports arrow/Home/End keys, and restores focus after Escape or selection. Export menus focus the size selector and restore focus after Escape.
- Additional timeline, export and interaction labels are localized in English and Thai.
- The light/dark preference survives reloads. The desktop export action has a visible label, and the favicon uses the new teal branding.
- Builds verify the production canonical URL, the `/pretty-avatar-2/` base and existence of all five HTML asset references. Pages deployment runs the full applicable test suite.

## Results

- `npm run build`: passed TypeScript, animation-cover validation, production bundling and Pages asset checks.
- `npm test`: 41 files passed; 784 tests passed; one inherited test remains marked TODO.
- Production homepage and editor navigation were verified in Chrome. Detailed Seed authoring was checked visually in the live editor.
- The original OneWorks npm release, provenance and release CI suites are excluded because those publishing workflows are not part of this website. Functional editor/engine/adapter tests remain included.

## Limits

The browser automation download event timed out during a native SVG-download check; a completed downloaded file was not verified. Export UI and capture logic are covered by the applicable tests. No claim of a complete manual export-format audit is made.

This checkout has no Git remote and was not pushed or publicly deployed. The GitHub Pages URL remains a configured deployment target.
