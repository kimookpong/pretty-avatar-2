# Manual npm publication

The user manages npm publication. GitHub Pages deployment never runs npm publish.

Run from the repository root:

```sh
npm ci
npm run build
npm test
npm run pack:library
```

The publishable package is **packages/pretty-avatar-2**, version **0.1.1**. The repository root package is private and should not be published. The package prepack hook builds the library and verifies public exports, Node core, React SSR and tarball contents automatically. The root repository and its development dependencies must be present when running that hook.

Version 0.1.0 is already published. This checkout prepares 0.1.1 with updated usage documentation. Check your npm account and current registry version, then publish:

```sh
npm login
npm whoami
npm view pretty-avatar-2 version
npm publish ./packages/pretty-avatar-2 --access public
```

For the first release, npm view may report E404 because the name is not yet published. If it returns an existing package, verify ownership and version before publishing. Follow npm's account/2FA requirements; do not paste credentials into chat or commit them.

Verify the registry release in a new project:

```sh
mkdir pretty-avatar-2-example
cd pretty-avatar-2-example
npm init -y
npm i pretty-avatar-2 react react-dom
```

```tsx
import { PrettyAvatar } from 'pretty-avatar-2'
import 'pretty-avatar-2/style.css'

export function Example() {
  return <PrettyAvatar size={256} />
}
```

The default is Siamese Cat on orange #f58c43. Import model utilities and createPrettyAvatarDefaultDefinition from pretty-avatar-2/core. The display entry is marked use client for React server-component frameworks, while the core entry remains framework-neutral. Plain React SSR is also tested.

For another release, increment packages/pretty-avatar-2/package.json version, repeat the checks, then publish. The package contains compiled files, declarations, README and LICENSE. It does not include the website, its screenshots or node_modules.

## Authentication errors

A failed PUT with E404 does not establish that the package name is unavailable: npm can reject authentication/authorization with 404. First run npm whoami against https://registry.npmjs.org/. If it returns E401, authenticate again with npm login --auth-type=web --registry=https://registry.npmjs.org/ and verify whoami succeeds before publishing. If whoami succeeds but publishing still fails, check publisher/package permissions and npm account/2FA requirements. Do not post tokens in logs or chat.
