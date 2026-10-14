import { createDefaultAvatarDefinition as createBaseDefinition, getAvatarPalette, resolveAvatarCoatPatternDecals } from '@oneworks/avatar'
import { avatarDefinitionToState, createAvatarDefinition, avatarDefinitionToSearchParams } from './avatarDefinition'
import { getAvatarCatBreedTemplate, resolveAvatarCatBreedTemplate } from './avatarBreedTemplates'
import { getAvatarEntityPresetFaceStyle, getAvatarEntityPresetScene } from './avatarEntityPresets'

export const DEFAULT_AVATAR_LABEL = 'Siamese Cat'
export const DEFAULT_AVATAR_BREED = 'siamese'
export const DEFAULT_AVATAR_BACKGROUND = '#f58c43'
export const DEFAULT_AVATAR_SEED = 'v1-pretty-avatar-2-siamese-cat'

/** Fresh concrete state shared by the website, editor and embeddable component. */
export const createPrettyAvatarDefaultState = () => {
  const scene = getAvatarEntityPresetScene('cat')!
  const breed = resolveAvatarCatBreedTemplate(getAvatarCatBreedTemplate(DEFAULT_AVATAR_BREED)!, DEFAULT_AVATAR_SEED)
  return {
    ...avatarDefinitionToState(createBaseDefinition()),
    ...scene,
    cameraBackground: DEFAULT_AVATAR_BACKGROUND,
    entityPreset: 'cat' as const,
    entityParts: breed.entityParts,
    paletteId: breed.paletteId,
    coatPattern: breed.coatPattern,
    faceStyle: getAvatarEntityPresetFaceStyle('cat')!,
    surfaceDecals: resolveAvatarCoatPatternDecals({entityParts:breed.entityParts,entityPreset:'cat',palette:getAvatarPalette(breed.paletteId),paletteId:breed.paletteId,pattern:breed.coatPattern}),
    generation: {version:1 as const,seed:DEFAULT_AVATAR_SEED,fields:[],profileId:DEFAULT_AVATAR_BREED}
  }
}

export const createPrettyAvatarDefaultDefinition = () => createAvatarDefinition(createPrettyAvatarDefaultState())
export const createPrettyAvatarDefaultQuery = () => {
  const params = avatarDefinitionToSearchParams(createPrettyAvatarDefaultDefinition())
  params.set('camera', '1')
  return `?${params.toString()}`
}
