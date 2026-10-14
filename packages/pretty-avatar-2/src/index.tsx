import { forwardRef, useMemo } from 'react'
import { Avatar } from '../../react/src/renderer'
import type { AvatarProps, AvatarHandle } from '../../react/src/renderer'
export type { AvatarDefinition } from '@oneworks/avatar'
import { createPrettyAvatarDefaultDefinition } from '../../../src/defaultAvatar'
export { createPrettyAvatarDefaultDefinition }
export type PrettyAvatarHandle = AvatarHandle
export interface PrettyAvatarProps extends Omit<AvatarProps, 'theme'> { readonly size?: number }
/** A Siamese cat on orange by default. Supplied definitions are preserved. */
export const PrettyAvatar = forwardRef<PrettyAvatarHandle, PrettyAvatarProps>(function PrettyAvatar({size=256,style,...props},ref) {
  const defaultDefinition = useMemo(createPrettyAvatarDefaultDefinition, [])
  return <Avatar role="img" aria-label="Siamese Cat avatar" {...props} definition={props.definition ?? defaultDefinition} ref={ref} theme="light" style={{width:size,height:size,...style}} />
})
