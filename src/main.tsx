import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './base.scss'
import './pretty-theme.scss'
import '@fontsource/fraunces/600.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/ibm-plex-sans-thai/400.css'
import '@fontsource/ibm-plex-sans-thai/600.css'

import { AvatarLocaleProvider } from './avatarLocale'
import Root from './Root'

document.documentElement.classList.remove('dark')
try { window.localStorage.removeItem('pretty-avatar-2-theme') } catch { /* Storage is optional. */ }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AvatarLocaleProvider>
      <Root />
    </AvatarLocaleProvider>
  </StrictMode>
)
