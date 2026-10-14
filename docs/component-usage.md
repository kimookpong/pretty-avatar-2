# pretty-avatar-2 — npm and component guide

## Install

```sh
npm i pretty-avatar-2
```

Use React 18.3 or 19 with React DOM. Import the package CSS once. The component is light-only; the default is **Siamese Cat on orange #f58c43**.

## Basic React component

```tsx
import { PrettyAvatar } from 'pretty-avatar-2'
import 'pretty-avatar-2/style.css'

export default function Profile() {
  return <PrettyAvatar size={256} interactive aria-label="Profile avatar" />
}
```

`interactive` enables the renderer's drag controls. Omit it for a static display. The component does not include the Studio UI.

| Prop | Meaning | Default |
| --- | --- | --- |
| size | Width and height in pixels | 256 |
| definition | Concrete saved avatar data | Shared Siamese Cat |
| interactive | Enable interaction | false |
| style / className | Customize the outer container | optional |
| aria-label | Accessible name | Siamese Cat avatar |
| onDefinitionChange | Receive changes to the avatar definition | optional |
| animation / autoplay | Play a supplied animation clip or resolvable reference | null / false |
| ref | Capture and playback methods via PrettyAvatarHandle | optional |

## Use your Studio avatar

1. Open the Studio and customize a character.
2. Click **Use component** in the header, or choose **npm / React** in the export drawer.
3. Copy the install command and **Current avatar component** example.
4. Save the **avatar.json** section as `avatar.json` beside your component.
5. Import CSS once and run the example in your React app.

```tsx
import { PrettyAvatar } from 'pretty-avatar-2'
import { parseAvatarDefinition } from 'pretty-avatar-2/core'
import 'pretty-avatar-2/style.css'
import avatar from './avatar.json'

const definition = parseAvatarDefinition(avatar)

export default function AvatarExample() {
  return <PrettyAvatar definition={definition} size={256} interactive />
}
```

The Studio generates JSON from its current concrete definition, including geometry, colours, face, decals and pose. An explicit definition overrides the default. The example displays that configuration; it does not automatically start the Studio's currently selected animation. Animation clips must be supplied through `animation` or the ref API, and references must resolve against the supplied animation libraries.

Vite supports JSON imports. Other TypeScript projects may need `resolveJsonModule: true`. Alternatively fetch your JSON and validate it using parseAvatarDefinition before passing it to the component.

## Next.js App Router

Import `pretty-avatar-2/style.css` in `app/layout.tsx`. Put interactive usage in a client component:

```tsx
'use client'
import { PrettyAvatar } from 'pretty-avatar-2'

export default function ProfileAvatar() {
  return <PrettyAvatar size={160} interactive />
}
```

The package display entry is marked use client. Plain React server rendering is supported. The core entry can be imported without browser globals.

## Node.js: create and validate definitions

```js
import { createPrettyAvatarDefaultDefinition, parseAvatarDefinition } from 'pretty-avatar-2/core'
import { writeFile } from 'node:fs/promises'

const definition = parseAvatarDefinition(createPrettyAvatarDefaultDefinition())
await writeFile('avatar.json', JSON.stringify(definition, null, 2))
```

This API produces configuration data. PNG capture depends on browser APIs and is not a Node image-rendering API.

## Capture PNG in the browser

```tsx
import { useRef } from 'react'
import { PrettyAvatar, type PrettyAvatarHandle } from 'pretty-avatar-2'
import 'pretty-avatar-2/style.css'

export default function DownloadableAvatar() {
  const avatar = useRef<PrettyAvatarHandle>(null)

  async function download() {
    if (!avatar.current) return
    const blob = await avatar.current.capture({ format: 'png', size: 256, frame: 'rounded' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'avatar.png'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return <>
    <PrettyAvatar ref={avatar} />
    <button onClick={() => void download()}>Download PNG</button>
  </>
}
```

Use `format: 'svg'` and an `.svg` filename to capture SVG instead. Capture size is 128, 256 or 512. Ref methods also include play, pause, resume, seek, stop and getDefinition; use the exported types for their arguments.

## Troubleshooting

- Missing layout: ensure `pretty-avatar-2/style.css` is imported.
- Invalid JSON: use the complete avatar.json copied from Studio and validate it with parseAvatarDefinition.
- Browser capture during SSR: run capture in a browser event handler after the component mounts.
- npm install reports E404: verify the package exists in your configured registry with `npm view pretty-avatar-2 version`.

[Studio](https://kimookpong.github.io/pretty-avatar-2/#/editor) · [npm package](https://www.npmjs.com/package/pretty-avatar-2)
