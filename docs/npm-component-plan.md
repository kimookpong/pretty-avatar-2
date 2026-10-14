# pretty-avatar-2 npm component plan

Status: implementation in progress, 14 October 2026. Shared default and initial React/core package are built; registry publication is managed manually by the user.

## Findings

The website is published on GitHub Pages. Its root package is private and builds a website, so it cannot currently be installed as a public npm library. React renderer/editor and framework-neutral model/animation code already exist in packages/react and packages/avatar. These retain upstream package names, workspace dependencies and build paths that do not describe a standalone pretty-avatar-2 release.

The reference pretty-avatar package exposes a React component with TypeScript declarations and React as a peer dependency. Recommended initial audience: React applications, with framework-neutral configuration utilities usable in Node.js. Browser PNG/GIF capture is a separate capability; do not promise a Node.js export API until it passes tests without window/document/canvas.

On inspection npm view pretty-avatar-2 returned E404. That confirms it is not currently published, but does not reserve the name. npm whoami returned E401; publishing requires an authenticated npm account. Credentials must not be stored in the repository.

## Package shape

Keep the website package private, rename it pretty-avatar-2-site, and add packages/pretty-avatar-2 as the publishable 0.1.0 package. Site and package consume the same avatar definition and renderer. Bundle retained internal avatar code into the public library; do not publish dependencies that point at local directories or workspace:*.

Proposed public entry points:

- pretty-avatar-2: PrettyAvatar React component, props and handle types.
- pretty-avatar-2/style.css: isolated display styles; no global resets, homepage theme or fonts.
- pretty-avatar-2/core: definitions, deterministic presets, validation and serialization. Importable in Node without browser globals and without pulling in React.
- pretty-avatar-2/editor and pretty-avatar-2/editor.css: separately loaded Studio for consumers that need editing, optional in the first release if it cannot meet clean-consumer checks.

ESM and TypeScript declarations for the first release. React 18.3 and 19 supported via peer dependencies after compatibility testing. Node support and minimum version follow the actual build/consumer tests, not just the website toolchain. Include only built library output, README, changelog and license notices in the tarball.

Suggested usage:

```tsx
import { PrettyAvatar } from 'pretty-avatar-2'
import 'pretty-avatar-2/style.css'

export function Profile() {
  return <PrettyAvatar size={256} />
}
```

The no-props render must show the identical default used on the website. Proposed configuration: definition, size, interactive, animation, background, className, style and accessible label. Preserve imperative play/pause/reset and SVG/PNG capture where supported, but keep the initial API small and explicitly documented.

## Default: Siamese Cat on orange

The finalized request uses the existing Siamese preset, not orange fur. src/defaultAvatar.ts owns the concrete Siamese anatomy, face mask, seed and orange #f58c43 background. Homepage hero, its selected thumbnail, Studio launch and the public PrettyAvatar default share this definition. Saved projects and explicitly supplied component definitions remain unchanged. Public label: Siamese Cat / แมวสยาม.

## Logo

Finalize and visually verify the actual default before making the logo. Prefer deriving a clean square SVG/logo directly from the same native avatar geometry, so ears, face colours and eyes remain consistent. Use the current close-up rounded orange tile composition. If an illustrated raster variant is desired, generate it using a screenshot of the finalized default as the reference, then integrate it without changing the core avatar silhouette.

Update website/Studio brand, favicon, touch icon, Open Graph image and their alt text together. Preserve source license notices while removing public upstream branding.

## Delivery sequence and checks

1. Finalize the concrete default definition; verify hero, thumbnail and Studio match.
2. Extract the package wrapper and core entry points; isolate component styles.
3. Build ESM and declarations; add a minimal consumer example and API documentation.
4. npm pack and inspect the tarball; install that tarball into a fresh React/Vite project. Verify TypeScript, production build, SSR/hydration, React 18/19 and component interaction. Test the core entry from plain Node without DOM globals. Verify display-only consumers do not import the editor.
5. Produce logo assets from the finalized default and rebuild the website. Run relevant regression tests and the retained full suite before releasing.
6. The user authenticates npm, rechecks package-name availability, publishes version 0.1.0, and installs the registry version in a fresh consumer. Website deployment is independent; do not advertise a registry release as available before publication.

The npm release requires user-controlled account authentication. Preparing and testing a tarball does not require npm login. Later releases can use GitHub Actions trusted publishing after the initial package/account configuration has been established.
