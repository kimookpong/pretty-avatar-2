import { useEffect, useRef, useState } from 'react'

import { AVATAR_LOCALES, useAvatarLocale } from './avatarLocale'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useAvatarLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    rootRef.current?.querySelector<HTMLButtonElement>('[role=radio][aria-checked=true]')?.focus()
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setOpen(false)
    }
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        rootRef.current?.querySelector<HTMLButtonElement>('.avatar-app__language-toggle')?.focus()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className='avatar-language-switcher'>
      <button
        className='avatar-app__language-toggle'
        type='button'
        aria-expanded={open}
        aria-haspopup='dialog'
        aria-label={t('Language')}
        title={t('Language')}
        onClick={() => setOpen(value => !value)}
      >
        <span className='pretty-language-label'>{locale === 'th' ? 'ไทย' : 'EN'}</span>
      </button>
      {open
        ? (
          <div className='avatar-language-switcher__dialog' role='dialog' aria-label={t('Select language')}>
            <span className='avatar-language-switcher__title'>{t('Language')}</span>
            <div className='avatar-language-switcher__options' role='radiogroup' aria-label={t('Select language')}>
              {AVATAR_LOCALES.map(option => (
                <button
                  key={option.id}
                  className='avatar-language-switcher__option'
                  type='button'
                  role='radio'
                  aria-checked={locale === option.id}
                  tabIndex={locale === option.id ? 0 : -1}
                  onKeyDown={event => {
                    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
                    event.preventDefault()
                    const options = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>('[role=radio]') ?? [])
                    const index = options.indexOf(event.currentTarget)
                    const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 :
                      (index + (event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1) + options.length) % options.length
                    options[next]?.focus()
                  }}
                  onClick={() => {
                    setLocale(option.id)
                    setOpen(false)
                    rootRef.current?.querySelector<HTMLButtonElement>('.avatar-app__language-toggle')?.focus()
                  }}
                >
                  <span>
                    <strong>{option.nativeLabel}</strong>
                    {option.nativeLabel === t(option.label) ? null : <small>{t(option.label)}</small>}
                  </span>
                  <svg viewBox='0 0 20 20' aria-hidden='true'>
                    <path d='m4.5 10.2 3.4 3.4 7.6-7.4' />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )
        : null}
    </div>
  )
}
