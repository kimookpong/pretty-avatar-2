// @vitest-environment jsdom
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { AvatarLocaleProvider } from '../src/avatarLocale'
import { LanguageSwitcher } from '../src/LanguageSwitcher'
let root: Root | undefined
let host: HTMLDivElement | undefined
afterEach(async () => { if(root) await act(async()=>root?.unmount());host?.remove();root=undefined })
describe('keyboard language selection', () => {
  it('opens on the current language, supports arrows, and restores focus on Escape', async () => {
    host=document.createElement('div');document.body.append(host);root=createRoot(host)
    ;(globalThis as any).IS_REACT_ACT_ENVIRONMENT=true
    await act(async()=>root?.render(createElement(AvatarLocaleProvider,{initialLocale:'en',persist:false},createElement(LanguageSwitcher))))
    const trigger=host.querySelector<HTMLButtonElement>('.avatar-app__language-toggle')!
    await act(async()=>trigger.click())
    const options=host.querySelectorAll<HTMLButtonElement>('[role=radio]')
    expect(document.activeElement).toBe(options[0])
    await act(async()=>options[0].dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true})))
    expect(document.activeElement).toBe(options[1])
    await act(async()=>options[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})))
    expect(host.querySelector('[role=dialog]')).toBeNull()
    expect(document.activeElement).toBe(trigger)
    await act(async()=>trigger.click())
    await act(async()=>host?.querySelectorAll<HTMLButtonElement>('[role=radio]')[1].click())
    expect(trigger.textContent).toBe('ไทย')
    expect(document.activeElement).toBe(trigger)
  })
})
