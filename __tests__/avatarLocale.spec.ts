import { describe, expect, it } from 'vitest'
import { AVATAR_LOCALES, normalizeAvatarLocale, translateAvatarText } from '../src/avatarLocale'
describe('English and Thai locale support', () => {
  it('offers only English and Thai and accepts regional variants', () => {
    expect(AVATAR_LOCALES.map(x => x.id)).toEqual(['en','th'])
    expect(normalizeAvatarLocale('en-US')).toBe('en')
    expect(normalizeAvatarLocale('th-TH')).toBe('th')
    expect(normalizeAvatarLocale('TH')).toBe('th')
    expect(normalizeAvatarLocale('zh-Hans')).toBeNull()
    expect(normalizeAvatarLocale('fr')).toBeNull()
  })
  it('translates the homepage, tools, exports and composite catalog labels', () => {
    expect(translateAvatarText('th','Open the studio')).toBe('เปิดสตูดิโอ')
    expect(translateAvatarText('th','Effects')).toBe('เอฟเฟกต์')
    expect(translateAvatarText('th','Download PNG')).toBe('ดาวน์โหลด PNG')
    expect(translateAvatarText('th','Dog ear size')).toBe('ขนาดหูสุนัข')
    expect(translateAvatarText('th','Cat · Chunky Pixel')).toBe('แมว · พิกเซลใหญ่')
    expect(translateAvatarText('th','My custom project')).toBe('My custom project')
    expect(translateAvatarText('en','Effects')).toBe('Effects')
  })
})
