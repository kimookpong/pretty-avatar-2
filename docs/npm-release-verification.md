# pretty-avatar-2 0.1.0 — prepared release

14 October 2026. npm publication is managed manually by the user. Website deployment is independent of npm publication.

- Shared default: Siamese Cat, Siamese palette/geometry/face marking, orange #f58c43 camera background and fixed seed.
- Homepage, selected thumbnail, Studio launch and public PrettyAvatar component use the shared default. Logo SVG and raster icons derive from its rendered geometry.
- Installable artifact: artifacts/pretty-avatar-2-0.1.0.tgz, about 564 KB, 49 packed files.
- Public exports: React PrettyAvatar and types; style.css; core definitions, utilities and createPrettyAvatarDefaultDefinition.
- Internal geometry engine is bundled; no workspace/file runtime dependencies are published. Core JavaScript imports neither React nor browser globals.
- Website build, library build and public export/tarball checks pass.
- Full retained suite: 44 files, 795 tests pass, 1 pre-existing TODO.
- Fresh consumer tarball installation, TypeScript checking, Node core import, React SSR and Vite production build pass with React 18.3.1 and 19.1.0. Browser smoke check shows the correct Siamese avatar from the installed tarball.
- SSR bug fixed: face transitions no longer access window while rendering in Node.
- Public component is light-only. Explicit caller definitions override the shared default. Browser capture is separate from server-side configuration utilities.
- The full embedded Studio is not a public package export in 0.1.0; it remains the website application.

The user will publish npm manually. Follow docs/npm-publishing.md. The package prepack hook builds and checks exports before packing/publishing. No npm credentials are committed, and the Pages workflow does not publish npm.
