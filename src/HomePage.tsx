import './HomePage.scss'
import { AVATAR_NPM_INSTALL, createDefaultComponentExample } from './avatarComponentUsage'
import { lazy, Suspense, useMemo, useState } from 'react'
import { HomeHeaderActions } from './HomeHeaderActions'
import { HOME_EXPLORE_TEMPLATES, HOME_TEMPLATES } from './avatarHome'
import type { HomeTemplateId } from './avatarHome'
import type { AvatarEffectStylePresetId } from './avatarEffectStylePresets'
import { useAvatarLocale } from './avatarLocale'
const HomeAvatarPreview = lazy(() => import('./HomeAvatarPreview'))
interface HomePageProps {
  readonly onCreate: (template: HomeTemplateId) => void
  readonly onCreateBreed: (entity: HomeTemplateId, breed: string) => void
  readonly onCreateEffectStyle: (entity: HomeTemplateId, effectStyle: AvatarEffectStylePresetId) => void
  readonly onSurprise: () => void
  readonly onPrepareEditor: () => void
}
export const HomePage = ({ onCreate, onCreateBreed, onCreateEffectStyle, onSurprise, onPrepareEditor }: HomePageProps) => {
  const { t } = useAvatarLocale()
  const [active, setActive] = useState<HomeTemplateId>('cat')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [limit, setLimit] = useState(24)
  const selected = HOME_TEMPLATES.find(item => item.id === active)!
  const openSelected = () => selected.breed ? onCreateBreed(active, selected.breed) : onCreate(active)
  const filtered = useMemo(() => HOME_EXPLORE_TEMPLATES.filter(item => {
    const matches = filter === 'all' || (filter === 'originals' ? !item.breed && !item.effectStyle : filter === 'pixel' ? !!item.effectStyle : !!item.breed)
    return matches && `${item.label} ${t(item.label)} ${t(HOME_TEMPLATES.find(x => x.id === item.entity)?.label ?? '')}`.toLowerCase().includes(search.trim().toLowerCase())
  }), [filter, search, t])
  return <main className='pretty-home'>
    <header className='pretty-nav'>
      <a className='pretty-brand' href={import.meta.env.BASE_URL}><img className='pretty-brand-logo' src={`${import.meta.env.BASE_URL}logo.png`} alt='' width={32} height={32} />pretty-avatar-2<span className='pretty-beta'>studio</span></a>
      <nav aria-label={t('Main navigation')}><a href='#friends'>{t('Characters')}</a><a href='#how'>{t('How it works')}</a></nav>
      <div className='pretty-nav-actions'><HomeHeaderActions /></div>
    </header>
    <section className='pretty-hero'>
      <div className='pretty-hero-copy'>
        <p className='pretty-kicker'><span />{t('A tiny studio for big personalities')}</p>
        <h1>{t('A little face.')}<br /><em>{t('Entirely yours.')}</em></h1>
        <p className='pretty-intro'>{t('Turn simple shapes into a character with a little life of its own. Pick a friend, play with the details, and make something that feels like you.')}</p>
        <div className='pretty-hero-actions'><button className='pretty-primary' onClick={openSelected} onPointerEnter={onPrepareEditor} onFocus={onPrepareEditor}>{t('Open the studio')} <span aria-hidden='true'>↗</span></button><button className='pretty-secondary' onClick={onSurprise}>{t('Surprise me')} <span aria-hidden='true'>✧</span></button></div>
        <div className='pretty-hero-notes'><span>✓ {t('No sign-up')}</span><span>✓ {t('Yours to customize')}</span><span>✓ SVG · PNG · GIF</span></div>
      </div>
      <div className='pretty-showcase'>
        <div className='pretty-showcase-top'><span><i />{t('Meet your new friend')}</span><span>{String(HOME_TEMPLATES.findIndex(item => item.id === active) + 1).padStart(2,'0')} / {String(HOME_TEMPLATES.length).padStart(2,'0')}</span></div>
        <div className='pretty-showcase-avatar'><Suspense fallback={<img src={selected.snapshot} alt={t(selected.label)} />}><HomeAvatarPreview key={active} template={active} breed={selected.breed} /></Suspense><span className='pretty-sticker'>{t('Drag to say hello')} ↺</span></div>
        <div className='pretty-showcase-bottom'><div><strong>{t(selected.label)}</strong><small>{t('Your next starting point')}</small></div><button onClick={openSelected} aria-label={`${t('Edit')} ${t(selected.label)}`}>↗</button></div>
        <div className='pretty-friend-strip' role='group' aria-label={t('Select avatar')}>{HOME_TEMPLATES.slice(0,6).map(item => <button key={item.id} aria-pressed={active===item.id} aria-label={t(item.id === 'cat' ? 'Cat' : item.label)} title={t(item.label)} onClick={() => setActive(item.id)}><img src={item.snapshot} alt='' /></button>)}</div>
      </div>
    </section>
    <section className='pretty-how' id='how' aria-labelledby='pretty-how-title'>
      <div><span className='pretty-section-number'>01 / {t('THE LITTLE PROCESS')}</span><h2 id='pretty-how-title'>{t('From hello to your own.')}</h2></div>
      {[['01','Choose a friend','Start with a character. There is a whole little world to explore.'],['02','Make it personal','Shape the face, choose a palette, and find its personality.'],['03','Bring it along','Add a little motion. Export your creation and take it anywhere.']].map(([n,title,body]) => <article key={n}><span>{n}</span><h3>{t(title)}</h3><p>{t(body)}</p></article>)}
    </section>
    <section className='pretty-library' id='friends' aria-labelledby='pretty-library-title'>
      <div className='pretty-library-heading'><div><span className='pretty-section-number'>02 / {t('THE CHARACTER CLUB')}</span><h2 id='pretty-library-title'>{t('Good company, endless possibilities.')}</h2><p>{t('A familiar face or an unexpected friend. Every character is a starting point.')}</p></div><span className='pretty-count'>{HOME_EXPLORE_TEMPLATES.length} {t('little personalities')}</span></div>
      <div className='pretty-library-tools'><div className='pretty-filters' role='group' aria-label={t('Character categories')}>{[['all','All friends'],['originals','Originals'],['breeds','Breeds'],['pixel','Pixel friends']].map(([id,label]) => <button key={id} aria-pressed={filter===id} onClick={() => {setFilter(id);setLimit(24)}}>{t(label)}</button>)}</div><label className='pretty-search'><span aria-hidden='true'>⌕</span><input type='search' aria-label={t('Search characters')} placeholder={t('Find a little friend…')} value={search} onChange={e => {setSearch(e.target.value);setLimit(24)}} /></label></div>
      <div className='pretty-character-grid'>{filtered.slice(0,limit).map(item => <button className='pretty-character' key={item.id} aria-label={`${t('Edit')} ${t(item.label)}`} onClick={() => {if(item.effectStyle) onCreateEffectStyle(item.entity,item.effectStyle);else if(item.breed) onCreateBreed(item.entity,item.breed);else onCreate(item.entity)}} onPointerEnter={onPrepareEditor}><div><img src={item.snapshot} loading='lazy' decoding='async' alt='' /><span aria-hidden='true'>↗</span></div><strong>{t(item.label)}</strong><small>{t(item.effectStyle ? 'Pixel friends' : item.breed ? 'Breeds' : 'Originals')}</small></button>)}</div>
      {filtered.length===0 ? <p className='pretty-empty' role='status'>{t('No friends found. Try another name.')}</p> : <p className='pretty-results' aria-live='polite'>{Math.min(limit,filtered.length)} / {filtered.length} {t('characters')}</p>}
      {filtered.length>limit && <button className='pretty-secondary pretty-load-more' onClick={() => setLimit(x=>x+24)}>{t('Meet more friends')} ↓</button>}
    </section>
    <section className='pretty-invitation'><span aria-hidden='true'>✳</span><div><h2>{t('Something only you could make.')}</h2><p>{t('Start small. Try things. Your next favorite character is a few clicks away.')}</p></div><button className='pretty-primary' onClick={openSelected}>{t('Let’s make a character')} ↗</button></section>
    <section className='pretty-developer-guide' id='usage' aria-labelledby='pretty-usage-title'><div><p className='pretty-section-number'>npm / React</p><h2 id='pretty-usage-title'>{t('Use it in your app')}</h2><p>{t('Add a little character to your React app. Start with Siamese Cat, or bring your own from the studio.')}</p><a href='https://github.com/kimookpong/pretty-avatar-2/blob/main/docs/component-usage.md'>{t('Read the component guide')} ↗</a></div><div><pre><code>{AVATAR_NPM_INSTALL}</code></pre><pre><code>{createDefaultComponentExample()}</code></pre></div></section>
    <footer className='pretty-site-footer'><a className='pretty-brand' href={import.meta.env.BASE_URL}>pretty-avatar-2</a><p>{t('A tiny studio for big personalities')}</p><a href='https://github.com/kimookpong/pretty-avatar-2'>GitHub ↗</a></footer>
  </main>
}
