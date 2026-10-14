import type { AvatarDefinition } from '@oneworks/avatar'
export const AVATAR_NPM_INSTALL = 'npm i pretty-avatar-2'
export const createDefaultComponentExample = (size = 256) => `import { PrettyAvatar } from 'pretty-avatar-2'
import 'pretty-avatar-2/style.css'

export default function AvatarExample() {
  return <PrettyAvatar size={${size}} interactive />
}`
export const createCurrentComponentExample = (size = 256) => `import { PrettyAvatar } from 'pretty-avatar-2'
import { parseAvatarDefinition } from 'pretty-avatar-2/core'
import 'pretty-avatar-2/style.css'
import avatar from './avatar.json'

const definition = parseAvatarDefinition(avatar)

export default function AvatarExample() {
  return <PrettyAvatar definition={definition} size={${size}} interactive />
}`
export const serializeComponentDefinition = (definition: AvatarDefinition, size: number) => JSON.stringify({
  ...definition, scene:{...definition.scene,camera:{...definition.scene.camera,size}}
}, null, 2)
