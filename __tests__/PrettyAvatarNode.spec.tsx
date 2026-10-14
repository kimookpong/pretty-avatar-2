import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { PrettyAvatar } from '../packages/pretty-avatar-2/src/index'
import { createPrettyAvatarDefaultDefinition } from '../src/defaultAvatar'
describe('PrettyAvatar SSR',()=>{
  it('renders the shared Siamese default without browser globals',()=>{
    expect(typeof window).toBe('undefined')
    const html=renderToString(createElement(PrettyAvatar,{size:128}))
    expect(html).toContain('<svg')
    expect(html).toContain('#f58c43')
  })
  it('preserves an explicit caller definition',()=>{
    const base=createPrettyAvatarDefaultDefinition()
    const custom={...base,scene:{...base.scene,camera:{...base.scene.camera,background:'#abcdef'}}}
    expect(renderToString(createElement(PrettyAvatar,{definition:custom}))).toContain('#abcdef')
  })
})
