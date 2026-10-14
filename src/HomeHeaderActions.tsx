import './HomeHeaderActions.scss'

import { LanguageSwitcher } from './LanguageSwitcher'
import { useAvatarLocale } from './avatarLocale'

const AVATAR_GITHUB_URL = 'https://github.com/kimookpong/pretty-avatar-2'

export const HomeHeaderActions = () => {
  const { t } = useAvatarLocale()
  return (
    <>
      <a
        className='avatar-app__github-link'
        href={AVATAR_GITHUB_URL}
        target='_blank'
        rel='noreferrer'
        aria-label={t('Open Avatar on GitHub')}
        title='GitHub'
      >
        <svg viewBox='0 0 20 20' aria-hidden='true'>
          <path d='M10 1.9a8.1 8.1 0 0 0-2.6 15.8c.4.1.6-.2.6-.4v-1.6c-2.4.5-2.9-1-2.9-1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4a3.1 3.1 0 0 1 .8-2.2c-.1-.2-.4-1.1.1-2.2 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 2 .1 2.2.5.6.8 1.4.8 2.2 0 3.1-2 3.8-3.9 4 .3.3.6.8.6 1.6v2.4c0 .3.2.5.6.4A8.1 8.1 0 0 0 10 1.9Z' />
        </svg>
      </a>
      <LanguageSwitcher />
    </>
  )
}
