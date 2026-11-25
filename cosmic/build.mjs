import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const catalog=read('catalog.json').trim().replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
const html=read('template.html').replace('/*CATALOG*/',()=>catalog).replace('/*COSMIC*/',()=>read('scene.js').trim());
writeFileSync(fileURLToPath(new URL('../reference.html',import.meta.url)),html);
