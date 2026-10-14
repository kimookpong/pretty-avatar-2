import {describe,it,expect} from 'vitest'
import {parseAvatarDefinition} from '../packages/avatar/src/index'
import {createPrettyAvatarDefaultDefinition} from '../src/defaultAvatar'
import {serializeComponentDefinition,createCurrentComponentExample} from '../src/avatarComponentUsage'
describe('Studio component examples',()=>{
  it('serializes the edited avatar and selected size without changing its definition',()=>{
    const def=createPrettyAvatarDefaultDefinition()
    const edited={...def,scene:{...def.scene,camera:{...def.scene.camera,background:'#123456'},view:{...def.scene.view,yaw:0.75}}}
    const result=parseAvatarDefinition(JSON.parse(serializeComponentDefinition(edited,512)))
    expect(result.scene.camera.background).toBe('#123456')
    expect(result.scene.camera.size).toBe(512)
    expect(result.scene.view.yaw).toBe(0.75)
    expect(result.scene.entity.parts).toEqual(edited.scene.entity.parts)
    expect(edited.scene.camera.size).toBe(256)
    expect(createCurrentComponentExample(512)).toContain("import avatar from './avatar.json'")
    expect(createCurrentComponentExample(512)).toContain('size={512}')
  })
})
