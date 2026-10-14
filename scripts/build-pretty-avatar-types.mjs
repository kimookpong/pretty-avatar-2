import ts from 'typescript'
import fs from 'node:fs'
import path from 'node:path'
const config=ts.readConfigFile('tsconfig.app-source.json',ts.sys.readFile)
const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,process.cwd())
const options={...parsed.options,rootDir:process.cwd(),outDir:path.resolve('packages/pretty-avatar-2/dist/types'),declaration:true,emitDeclarationOnly:true,noEmit:false}
const program=ts.createProgram(['packages/pretty-avatar-2/src/index.tsx','packages/pretty-avatar-2/src/core.ts','src/vite-env.d.ts','src/gifenc.d.ts'],options)
const result=program.emit()
const errors=[...ts.getPreEmitDiagnostics(program),...result.diagnostics].filter(d=>d.category===ts.DiagnosticCategory.Error)
if(errors.length){console.error(ts.formatDiagnosticsWithColorAndContext(errors,{getCanonicalFileName:f=>f,getCurrentDirectory:()=>process.cwd(),getNewLine:()=> '\n'}));process.exit(1)}
function rewrite(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())rewrite(file);else if(file.endsWith('.d.ts'))fs.writeFileSync(file,fs.readFileSync(file,'utf8').replaceAll('@oneworks/avatar','pretty-avatar-2/core').replace(/^import ['"][^'"]+\.(?:s?css)['"];?\s*$/gm,''))}}
rewrite(options.outDir)
fs.copyFileSync('LICENSE','packages/pretty-avatar-2/LICENSE')
