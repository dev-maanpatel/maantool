import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';
import prettier from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';
import cssPlugin from 'prettier/plugins/postcss';
import babelPlugin from 'prettier/plugins/babel';
import { minify } from 'terser';

export const downloadBlob=(blob,name)=>{const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
export const downloadText=(text,name,type='text/plain')=>downloadBlob(new Blob([text],{type}),name);
export async function processImage(file,slug,opts={}){
 if(!file||!file.type.startsWith('image/')) throw new Error('Choose a valid image file.');
 if(file.size>20*1024*1024) throw new Error('Image must be smaller than 20 MB.');
 const img=await createImageBitmap(file); let w=img.width,h=img.height;
 if(slug==='image-resizer'){w=Math.max(1,Number(opts.width)||w);h=Math.max(1,Number(opts.height)||h);if(opts.lock){const ratio=img.width/img.height;if(opts.changed==='width')h=Math.round(w/ratio);else w=Math.round(h*ratio);}}
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');if(opts.type==='image/jpeg'||slug==='png-to-jpg') {ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);}ctx.drawImage(img,0,0,w,h);img.close?.();
 const type=slug==='jpg-to-png'?'image/png':slug==='png-to-jpg'?'image/jpeg':slug==='webp-converter'?'image/webp':(opts.type||file.type);const quality=slug==='image-compressor'?Number(opts.quality??80)/100:Number(opts.quality??90)/100;
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('This image format could not be generated.')),type,quality));
 const ext=type==='image/jpeg'?'jpg':type.split('/')[1];return {blob,width:w,height:h,type,name:`${file.name.replace(/\.[^.]+$/,'')}.${ext}`,before:file.size,after:blob.size};
}
export async function processPdf(slug,files,pages=''){
 if(!files.length) throw new Error('Choose at least one file.');
 const out=await PDFDocument.create();
 if(slug==='pdf-merger'){
  for(const f of files){if(f.type!=='application/pdf'&&!f.name.toLowerCase().endsWith('.pdf'))throw new Error('Only PDF files are supported.');const src=await PDFDocument.load(await f.arrayBuffer());const copied=await out.copyPages(src,src.getPageIndices());copied.forEach(p=>out.addPage(p));}
 } else if(slug==='images-to-pdf'){
  for(const f of files){const bytes=await f.arrayBuffer();let img;if(f.type==='image/png')img=await out.embedPng(bytes);else if(['image/jpeg','image/jpg'].includes(f.type))img=await out.embedJpg(bytes);else throw new Error('Images to PDF supports PNG and JPEG files.');const page=out.addPage([img.width,img.height]);page.drawImage(img,{x:0,y:0,width:img.width,height:img.height});}
 } else {
  const f=files[0];if(!f.name.toLowerCase().endsWith('.pdf')&&f.type!=='application/pdf')throw new Error('Choose a PDF file.');const src=await PDFDocument.load(await f.arrayBuffer());let indexes=[];
  if(slug==='pdf-splitter'){const [a,b]=pages.split('-').map(Number);if(!a||!b||a>b||b>src.getPageCount())throw new Error(`Enter a valid page range from 1 to ${src.getPageCount()}, e.g. 1-${src.getPageCount()}.`);indexes=Array.from({length:b-a+1},(_,i)=>a-1+i);}else{indexes=pages.split(',').map(x=>Number(x.trim())-1).filter(x=>Number.isInteger(x)&&x>=0&&x<src.getPageCount());if(!indexes.length)throw new Error(`Enter page numbers between 1 and ${src.getPageCount()}, separated by commas.`);}
  const copied=await out.copyPages(src,indexes);copied.forEach(p=>out.addPage(p));
 }
 return new Blob([await out.save()],{type:'application/pdf'});
}
export async function runTool(slug,input,extra={}){
 switch(slug){
 case 'json-formatter':case 'json-validator':{const parsed=JSON.parse(input);return slug==='json-validator'?'Valid JSON ✓':JSON.stringify(parsed,null,2)}
 case 'html-formatter':return prettier.format(input,{parser:'html',plugins:[htmlPlugin]});
 case 'css-minifier':return (await prettier.format(input,{parser:'css',plugins:[cssPlugin]})).replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').replace(/\s*([{}:;,])\s*/g,'$1').trim();
 case 'javascript-minifier':{const r=await minify(input);if(r.error)throw r.error;return r.code||'';}
 case 'base64-encoder':return btoa(unescape(encodeURIComponent(input)));
 case 'base64-decoder':return decodeURIComponent(escape(atob(input.trim())));
 case 'url-encoder':return encodeURIComponent(input);
 case 'url-decoder':return decodeURIComponent(input);
 case 'case-converter':return ({upper:input.toUpperCase(),lower:input.toLowerCase(),title:input.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()),sentence:input.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g,c=>c.toUpperCase())})[extra.mode||'upper'];
 case 'remove-extra-spaces':return input.replace(/[\t ]+/g,' ').replace(/ *\n */g,'\n').replace(/\n{3,}/g,'\n\n').trim();
 case 'text-reverser':return extra.mode==='words'?input.split(/\s+/).reverse().join(' '):extra.mode==='lines'?input.split('\n').reverse().join('\n'):[...input].reverse().join('');
 case 'qr-code-generator':return QRCode.toDataURL(input||'https://toolmaan.example',{width:640,margin:2,errorCorrectionLevel:'H'});
 default:throw new Error('This tool does not support text processing.');
 }
}
export function countText(s){return {words:(s.trim().match(/\S+/g)||[]).length,characters:s.length,noSpaces:s.replace(/\s/g,'').length,sentences:(s.match(/[.!?]+(?=\s|$)/g)||[]).length,lines:s? s.split(/\r\n|\r|\n/).length:0,reading:Math.ceil((s.trim().match(/\S+/g)||[]).length/200)}}
