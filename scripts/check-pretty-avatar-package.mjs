import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {execFileSync} from 'node:child_process'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {PrettyAvatar} from '../packages/pretty-avatar-2/dist/index.js'
import {createPrettyAvatarDefaultDefinition,parseAvatarDefinition} from '../packages/pretty-avatar-2/dist/core.js'
const manifest=JSON.parse(fs.readFileSync('packages/pretty-avatar-2/package.json','utf8'))
assert.equal(manifest.name,'pretty-avatar-2')
assert.notEqual(manifest.private,true)
assert.ok(!Object.values(manifest.dependencies??{}).some(v=>/^(?:workspace|file):/.test(v)))
const def=parseAvatarDefinition(createPrettyAvatarDefaultDefinition())
assert.equal(def.scene.appearance.paletteId,'siamese')
assert.equal(def.scene.camera.background,'#f58c43')
assert.ok(renderToString(React.createElement(PrettyAvatar,{size:128})).includes('<svg'))
const packed=JSON.parse(execFileSync('npm',['pack','./packages/pretty-avatar-2','--dry-run','--json','--ignore-scripts'],{encoding:'utf8'}))[0]
for(const name of ['dist/index.js','dist/core.js','dist/style.css','LICENSE','README.md'])assert.ok(packed.files.some(f=>f.path===name),`Missing ${name}`)
for(const entry of Object.values(manifest.exports)){
  for(const file of typeof entry==='string'?[entry]:Object.values(entry))assert.ok(fs.existsSync(path.join('packages/pretty-avatar-2',file)),`Missing export ${file}`)
}
assert.ok(!packed.files.some(f=>f.path.includes('node_modules')||f.path.endsWith('.tgz')))
console.log(`Verified public exports, Node core, React SSR and ${packed.files.length} packed files (${packed.size} bytes).`)
