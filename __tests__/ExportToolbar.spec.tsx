// @vitest-environment jsdom
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AvatarLocaleProvider } from '../src/avatarLocale'
import { ExportToolbar } from '../src/ExportToolbar'
let root:Root|undefined,host:HTMLDivElement|undefined
const render = async (getSource=vi.fn().mockResolvedValue('<svg xmlns="http://www.w3.org/2000/svg" width="256"><path d="M0 0"/></svg>')) => {
 host=document.createElement('div');host.id='root';document.body.append(host);root=createRoot(host)
 ;(globalThis as any).IS_REACT_ACT_ENVIRONMENT=true
 const props={copyState:'idle' as const,exportSize:256 as const,gifAvailable:false,gifExportState:'idle' as const,onGetSvgSource:getSource,onCopy:vi.fn().mockResolvedValue(undefined),onDownload:vi.fn(),onDownloadGif:vi.fn().mockResolvedValue(true),onDownloadPng:vi.fn().mockResolvedValue(true),onSizeChange:vi.fn()}
 await act(async()=>root?.render(createElement(AvatarLocaleProvider,{initialLocale:'en',persist:false},createElement(ExportToolbar,props))))
 const trigger=host.querySelector<HTMLButtonElement>('button')!
 await act(async()=>trigger.click())
 return {props,trigger}
}
afterEach(async()=>{if(root)await act(async()=>root?.unmount());host?.remove();root=undefined})
describe('export drawer',()=>{
 it('shows exported SVG in a modal and copies the visible code without closing',async()=>{
  const {props}=await render()
  const modal=document.querySelector('[role=dialog]')!
  expect(modal.getAttribute('aria-modal')).toBe('true')
  expect(host?.inert).toBe(true)
  const code=modal.querySelector<HTMLTextAreaElement>('textarea')!
  expect(code.value).toContain('<svg');expect(code.value).toContain('\n<path')
  const copy=Array.from(modal.querySelectorAll('button')).find(x=>x.textContent==='Copy SVG')!
  await act(async()=>copy.click());expect(props.onCopy).toHaveBeenCalledWith(code.value)
  expect(document.querySelector('[role=dialog]')).not.toBeNull()
  const select=modal.querySelector('select')!
  await act(async()=>{select.value='512';select.dispatchEvent(new Event('change',{bubbles:true}))})
  expect(props.onSizeChange).toHaveBeenCalledWith(512)
 })
 it('restores focus and background interaction after Escape',async()=>{
  const {trigger}=await render()
  expect(document.activeElement?.getAttribute('aria-label')).toBe('Close export')
  await act(async()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})))
  expect(document.querySelector('[role=dialog]')).toBeNull();expect(host?.inert).toBe(false);expect(document.activeElement).toBe(trigger)
 })
 it('reports source preparation errors and blocks static downloads',async()=>{
  await render(vi.fn().mockRejectedValue(new Error('not ready')))
  expect(document.querySelector('[role=alert]')?.textContent).toContain('Unable to prepare SVG')
  expect(Array.from(document.querySelectorAll<HTMLButtonElement>('[role=dialog] button')).find(x=>x.textContent==='Download SVG')?.disabled).toBe(true)
 })
})
