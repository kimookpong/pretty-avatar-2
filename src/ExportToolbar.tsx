import './ExportToolbar.scss'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAvatarLocale } from './avatarLocale'

export const EXPORT_SIZES = [128, 256, 512] as const
export type ExportSize = (typeof EXPORT_SIZES)[number]
interface ExportToolbarProps {
  readonly showLabel?: boolean
  readonly copyState: 'copied' | 'idle'
  readonly exportSize: ExportSize
  readonly gifAvailable: boolean
  readonly gifExportState: 'error' | 'exporting' | 'idle'
  readonly onGetSvgSource: () => Promise<string>
  readonly onCopy: (source: string) => Promise<void>
  readonly onDownload: () => void
  readonly onDownloadGif: () => Promise<boolean>
  readonly onDownloadPng: () => Promise<boolean>
  readonly onSizeChange: (size: ExportSize) => void
}
export function ExportToolbar({ showLabel=false, copyState, exportSize, gifAvailable, gifExportState,
  onGetSvgSource, onCopy, onDownload, onDownloadGif, onDownloadPng, onSizeChange }: ExportToolbarProps) {
  const { t } = useAvatarLocale()
  const id = useId()
  const [open,setOpen] = useState(false)
  const [source,setSource] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const [downloadError,setDownloadError] = useState(false)
  const [pngBusy,setPngBusy] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const sourceGetterRef = useRef(onGetSvgSource)
  sourceGetterRef.current = onGetSvgSource

  useEffect(() => {
    if (!open) return
    let cancelled=false
    setLoading(true);setError(false);setSource('')
    void sourceGetterRef.current().then(value => {
      if (!cancelled) { setSource(value.replace(/></g, '>\n<'));setLoading(false) }
    }).catch(() => { if (!cancelled) {setError(true);setLoading(false)} })
    return () => {cancelled=true}
  },[open,exportSize])

  useEffect(() => {
    if (!open) return
    const root=document.getElementById('root')
    const wasInert=root?.inert ?? false
    if(root) root.inert=true
    const previousOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
    const handleKeyDown=(event:KeyboardEvent) => {
      if(event.key==='Escape') {event.preventDefault();setOpen(false)}
      if(event.key!=='Tab') return
      const items=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), select, textarea, [tabindex="0"]') ?? [])
      const first=items[0],last=items[items.length-1]
      if(event.shiftKey && document.activeElement===first) {event.preventDefault();last?.focus()}
      else if(!event.shiftKey && document.activeElement===last) {event.preventDefault();first?.focus()}
    }
    document.addEventListener('keydown',handleKeyDown)
    return () => {
      document.removeEventListener('keydown',handleKeyDown)
      if(root) root.inert=wasInert
      document.body.style.overflow=previousOverflow
      triggerRef.current?.focus()
    }
  },[open])

  return <div className='avatar-export-toolbar'>
    <button ref={triggerRef} className='avatar-export-toolbar__trigger' type='button'
      aria-label={t('Export avatar')} aria-haspopup='dialog' aria-expanded={open}
      title={t('Export avatar')} onClick={() => {setDownloadError(false);setOpen(true)}}>
      <svg className='avatar-export-toolbar__icon' viewBox='0 0 20 20' aria-hidden='true'><path d='M10 3v9M6.8 6.2 10 3l3.2 3.2M4 10.5v5h12v-5' /></svg>
      {showLabel && <span className='pretty-export-label'>{t('Export')}</span>}
    </button>
    {open && createPortal(<div className='pretty-export-backdrop' onMouseDown={event => {if(event.target===event.currentTarget) setOpen(false)}}>
      <section ref={dialogRef} className='pretty-export-drawer' role='dialog' aria-modal='true' aria-labelledby={`${id}-title`}>
        <header className='pretty-export-header'><div><p>pretty-avatar-2</p><h2 id={`${id}-title`}>{t('Export avatar')}</h2></div><button type='button' aria-label={t('Close export')} onClick={() => setOpen(false)}>×</button></header>
        <div className='pretty-export-summary'>
          <div className='pretty-export-preview'>{source && <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`} alt={t('Export preview')} />}</div>
          <div><p>{t('Your character, ready to go.')}</p><label htmlFor={`${id}-size`}>{t('Export size')}</label><select id={`${id}-size`} value={exportSize} onChange={event => onSizeChange(Number(event.target.value) as ExportSize)}>{EXPORT_SIZES.map(size => <option key={size} value={size}>{size} × {size}px</option>)}</select></div>
        </div>
        <div className='pretty-export-code-heading'><label htmlFor={`${id}-code`}>SVG code</label><button type='button' disabled={loading || error || !source} onClick={() => { setDownloadError(false);void onCopy(source).catch(() => setDownloadError(true)) }}>{t(copyState==='copied' ? 'SVG copied' : 'Copy SVG')}</button></div>
        {loading && <p className='pretty-export-status' role='status'>{t('Preparing export…')}</p>}
        {error && <p className='pretty-export-status' role='alert'>{t('Unable to prepare SVG. Close and try again.')}</p>}
        <textarea id={`${id}-code`} className='pretty-export-code' aria-label='SVG code' value={source} readOnly spellCheck={false} wrap='off' />
        <div className='pretty-export-actions'>
          <button className='pretty-export-primary' type='button' disabled={loading || error || !source} onClick={onDownload}>{t('Download SVG')}</button>
          <button type='button' disabled={pngBusy || loading || error} onClick={() => {
            setPngBusy(true);setDownloadError(false)
            void onDownloadPng().then(ok => setDownloadError(!ok)).catch(() => setDownloadError(true)).finally(() => setPngBusy(false))
          }}>{t(pngBusy ? 'Preparing export…' : 'Download PNG')}</button>
          <button type='button' disabled={!gifAvailable || gifExportState==='exporting'} title={!gifAvailable ? t('Select an animation first') : undefined} onClick={() => {
            setDownloadError(false);void onDownloadGif().then(ok => setDownloadError(!ok)).catch(() => setDownloadError(true))
          }}>{t(gifExportState==='exporting' ? 'Exporting GIF…' : 'Download GIF')}</button>
        </div>
        {!gifAvailable && <p className='pretty-export-note'>{t('Select an animation first')}</p>}
        {downloadError && <p className='pretty-export-status' role='alert'>{t('Export failed. Please try again.')}</p>}
      </section>
    </div>,document.body)}
  </div>
}
