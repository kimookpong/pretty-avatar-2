import { describe, expect, it } from 'vitest'
import { parseAvatarDefinition } from '../packages/avatar/src/index'
import { createPrettyAvatarDefaultDefinition, createPrettyAvatarDefaultQuery } from '../src/defaultAvatar'
describe('shared Siamese default',()=>{
  it('has concrete Siamese anatomy, markings and orange background',()=>{
    const def=createPrettyAvatarDefaultDefinition()
    expect(def.scene.entity.preset).toBe('cat')
    expect(def.scene.appearance.paletteId).toBe('siamese')
    expect(def.scene.camera.background).toBe('#f58c43')
    expect(def.scene.entity.parts).toHaveLength(3)
    expect(def.scene.decals.length).toBeGreaterThan(0)
    expect(()=>parseAvatarDefinition(def)).not.toThrow()
  })
  it('serializes the same concrete definition for the Studio',()=>{
    const def=createPrettyAvatarDefaultDefinition()
    const params=new URLSearchParams(createPrettyAvatarDefaultQuery())
    expect(params.get('breed')).toBe('siamese')
    expect(params.get('palette')).toBe(def.scene.appearance.paletteId)
    expect(params.get('cameraBg')).toBe(def.scene.camera.background)
    expect(params.get('camera')).toBe('1')
    expect(params.get('entityParts')).toBeTruthy()
  })
  it('returns independently editable definitions',()=>{
    const a=createPrettyAvatarDefaultDefinition(),b=createPrettyAvatarDefaultDefinition()
    expect(a).toEqual(b)
    expect(a.scene.entity.parts).not.toBe(b.scene.entity.parts)
  })
})
