# pretty-avatar-2

A geometric React avatar. The default is Siamese Cat on an orange background.

```sh
npm i pretty-avatar-2
```

```tsx
import { PrettyAvatar } from 'pretty-avatar-2'
import 'pretty-avatar-2/style.css'

export function Profile() {
  return <PrettyAvatar size={256} />
}
```

React 18.3 or 19 and React DOM are peer dependencies. `size` defaults to 256. Set `interactive` to enable rotation, or pass a concrete `definition` to render a saved character. A supplied definition takes precedence over the default. Styles are imported explicitly.

```ts
import { createPrettyAvatarDefaultDefinition, parseAvatarDefinition } from 'pretty-avatar-2/core'
const avatar = createPrettyAvatarDefaultDefinition()
```

The core entry provides model, preset, validation and animation utilities in Node.js. The display component requires React. Browser SVG/PNG capture and animation control are available through its ref (`PrettyAvatarHandle`); capture is not a server-side Node API. The complete Studio remains on the website and is not included as a public editor component in version 0.1.0.

MIT; retained third-party copyright notices are included in LICENSE.

## Studio examples

Open the [Studio](https://kimookpong.github.io/pretty-avatar-2/), customize an avatar, then click **Use component**. Copy the React example and save the generated **avatar.json** beside it. The generated code uses `parseAvatarDefinition` to validate your JSON before rendering.

See the [full usage guide](https://github.com/kimookpong/pretty-avatar-2/blob/main/docs/component-usage.md) for custom avatars, Next.js, Node utilities, props and browser capture.
