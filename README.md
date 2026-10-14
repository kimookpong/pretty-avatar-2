# pretty-avatar-2

A geometric 3D avatar studio with the soft sky-blue, cream, teal and rounded typography of [pretty-avatar](https://kimookpong.github.io/pretty-avatar/).

A standalone themed avatar studio. Third-party copyright notices and MIT license terms are retained in LICENSE.

## Run

Requires Node.js 22.12+ (or 24+) and npm.

```sh
npm install
npm run dev
```

## Validate and build

```sh
npm run build
npm test
npm run preview
```

Build output is `dist/`. The Vite base path, favicon and canonical URL target `/pretty-avatar-2/`. Local preview is available at `http://127.0.0.1:5173/pretty-avatar-2/`. GitHub Pages deployment is configured in `.github/workflows/deploy-pages.yml`. Set repository Settings → Pages → Source to GitHub Actions, then push to `main` to publish at https://kimookpong.github.io/pretty-avatar-2/. The Git remote points to `kimookpong/pretty-avatar-2`; publication requires committing and pushing the source and enabling GitHub Pages.

## Features

- Character carousel and full animal/breed gallery
- Real geometric SVG renderer with rotation, translation and zoom
- Body geometry, face expressions, palettes, markings, lighting and effects
- Camera framing and SVG/PNG exports, plus animated GIF exports
- Animation library and editable keyframe timeline
- Browser-local saved looks, projects and animations
- URL-backed editor settings compatible with the reference editor
- Light appearance with an English/Thai language selector

Editor settings can be shared through URLs, preserving the query string and `#/editor`.

Theme customization lives in `src/pretty-theme.scss`; homepage copy and layout live in `src/HomePage.tsx`.

## Design decisions

Preserve the reference's modeling behavior while redesigning the interface: a split homepage hero, searchable character cards with category filters and pagination, the original left and right tool sidebars, a project header, an open dotted canvas, and a separate detail notebook. Apply pretty-avatar's sky-to-cream background, warm ink text, teal accents, serif headings, pill navigation and soft panel corners. The underlying avatars remain vector geometry rather than the separate pretty-avatar sprite artwork.

The language selector offers only English and Thai. Homepage and editor labels have Thai translations, locale variants such as th-TH are supported, and the selected language is remembered locally. Technical identifiers and user-authored names remain unchanged. Fonts are bundled locally to work with the app CSP. Saved data stays in the current browser and origin.

## Validation scope

`npm test` checks the avatar engine, editor, timeline and retained framework adapters. The upstream SDK release/provenance workflow suites are excluded because this website does not ship those npm publishing workflows. Production builds also verify the canonical URL, Pages asset paths and referenced files with `npm run check:pages`.

The studio uses the original sidebar layout, including independent collapse and resize controls and the timeline below the canvas. Language menus support arrow keys and Escape, the export drawer shows the SVG source and traps focus, and the website uses a light-only appearance.

## React package

The publishable package is `packages/pretty-avatar-2`. Build and verify it with `npm run build:library` and `npm run check:library`; create a local installable tarball with `npm run pack:library`. npm publication is managed manually by the user; see [publishing instructions](docs/npm-publishing.md). GitHub Actions builds an installable tarball artifact and deploys only the website.

```tsx
import { PrettyAvatar } from 'pretty-avatar-2'
import 'pretty-avatar-2/style.css'

<PrettyAvatar size={256} />
```

The no-props default is **Siamese Cat** on orange `#f58c43`. `src/defaultAvatar.ts` supplies the homepage, Studio launch and component. Logo and thumbnail SVGs derive from the same rendered character. `pretty-avatar-2/core` provides framework-neutral model utilities and the shared default for Node.

## Using the npm component

Install with `npm i pretty-avatar-2`. See [component usage](docs/component-usage.md) for React, Next.js, Node and capture examples. Studio has a **Use component** button and an **npm / React** tab in the export drawer; it generates component code and avatar.json from the current character.
