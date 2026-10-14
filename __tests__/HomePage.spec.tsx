// @vitest-environment jsdom
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HomePage } from '../src/HomePage'
import { AvatarLocaleProvider } from '../src/avatarLocale'
import { HOME_EXPLORE_TEMPLATES } from '../src/avatarHome'
vi.mock('../src/HomeAvatarPreview',()=>({default:()=>createElement('div')}))
let root:Root,host:HTMLDivElement
beforeEach(()=>{host=document.createElement('div');document.body.append(host);root=createRoot(host);Object.defineProperty(window,'matchMedia',{value:()=>({matches:false}),configurable:true});(globalThis as any).IS_REACT_ACT_ENVIRONMENT=true})
afterEach(async()=>{await act(async()=>root.unmount());host.remove()})
const render=async(locale:'en'|'th'='en')=>{const callbacks={onCreate:vi.fn(),onCreateBreed:vi.fn(),onCreateEffectStyle:vi.fn(),onSurprise:vi.fn(),onPrepareEditor:vi.fn()};await act(async()=>root.render(createElement(AvatarLocaleProvider,{initialLocale:locale,persist:false},createElement(HomePage,callbacks))));return callbacks}
const button=(label:string)=>Array.from(host.querySelectorAll('button')).find(el=>el.textContent?.includes(label))!
const click=async(el:HTMLElement)=>act(async()=>el.click())
describe('redesigned character studio',()=>{
 it('starts with an orange cat and opens that breed in the studio',async()=>{const cb=await render();expect(host.querySelector('.pretty-showcase-bottom strong')?.textContent).toBe('Orange Tabby');await click(button('Open the studio'));expect(cb.onCreateBreed).toHaveBeenCalledWith('cat','orange-tabby');expect(host.textContent).not.toContain('OneWorks Avatar')})
 it('opens the selected hero character rather than a fixed default',async()=>{const cb=await render();await click(host.querySelector('[aria-label="Cat"]')!);await click(button('Open the studio'));expect(cb.onCreateBreed).toHaveBeenCalledWith('cat','orange-tabby');await click(button('Surprise me'));expect(cb.onSurprise).toHaveBeenCalledOnce()})
 it('filters categories and pages the catalog',async()=>{await render();expect(host.querySelectorAll('.pretty-character').length).toBe(24);await click(button('Meet more friends'));expect(host.querySelectorAll('.pretty-character').length).toBe(48);await click(button('Pixel friends'));expect(host.querySelectorAll('.pretty-character').length).toBe(HOME_EXPLORE_TEMPLATES.filter(x=>x.effectStyle).length)})
 it('opens breed and effect entries with their concrete state',async()=>{const cb=await render();const breed=HOME_EXPLORE_TEMPLATES.slice(0,24).find(x=>x.breed)!;await click(host.querySelector(`[aria-label="Edit ${breed.label}"]`)!);expect(cb.onCreateBreed).toHaveBeenCalledWith(breed.entity,breed.breed);const effect=HOME_EXPLORE_TEMPLATES.slice(0,24).find(x=>x.effectStyle)!;await click(host.querySelector(`[aria-label="Edit ${effect.label}"]`)!);expect(cb.onCreateEffectStyle).toHaveBeenCalledWith(effect.entity,effect.effectStyle)})
 it('renders translated homepage content and only two language choices',async()=>{await render('th');expect(host.querySelector('h1')?.textContent).toContain('ในแบบของคุณ');await click(host.querySelector('[aria-label="ภาษา"]')!);expect(host.querySelectorAll('[role="radio"]').length).toBe(2)})
})
