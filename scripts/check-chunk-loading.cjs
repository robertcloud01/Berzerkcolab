const vm=require('vm'),fs=require('fs'),path=require('path'),assert=require('assert/strict');
const dir=path.join(__dirname,'../dist');let context;const requested=[];
const document={cookie:'',getElementsByTagName:()=>[],createElement:()=>({getAttribute(){},setAttribute(){},parentNode:{removeChild(){}}}),head:{appendChild(node){requested.push(node.src);const p=path.join(dir,new URL(node.src,'https://local.test').pathname);setImmediate(()=>{try{vm.runInContext(fs.readFileSync(p,'utf8'),context,{filename:p});node.onload?.({type:'load',target:node});}catch(error){console.log(error.message);node.onerror?.({type:'error',target:node});}})}}};
context=vm.createContext({document,setTimeout,clearTimeout,Symbol,console});context.self=context;vm.runInContext(fs.readFileSync(dir+'/_next/static/chunks/webpack-6dce4f512d431e03.js','utf8'),context);vm.runInContext('self.webpackChunk_N_E.push([[999999],{},req=>{self.runtimeRequire=req}])',context);
const nextSource=fs.readFileSync(dir+'/_next/static/chunks/8520-856c1490749434f9.js','utf8');const nextWrapper=nextSource.match(/r\.u=function\(\)\{for\(var r=arguments\.length,n=Array\(r\),o=0;o<r;o\+\+\)n\[o\]=arguments\[o\];return\(0,u\.encodeURIPath\)\(t\(\.\.\.n\)\)\+e\}/)[0];context.r=context.runtimeRequire;context.t=context.runtimeRequire.u;context.e='?dpl=original';context.u={encodeURIPath:value=>value.split('/').map(encodeURIComponent).join('/')};vm.runInContext(nextWrapper,context);
(async()=>{for(const id of [5121,2928,7533,364,1354,7181,9413])await context.runtimeRequire.e(id);assert.equal(requested.length,7);assert.ok(requested.every(p=>!p.includes('%3F')&&!p.includes('%3f')&&p.includes('.rp5.js?dpl=')));console.log('Webpack imports register all seven hero and depth chunks through the Next.js URL encoder:',requested);})().catch(e=>{console.error(e.message);process.exitCode=1});

// Preserve the framework sentinels in every static navigation response.
for(const filename of fs.readdirSync(path.join(dir,'_replica/flight'))){
 if(!filename.endsWith('.txt'))continue;
 const bytes=fs.readFileSync(path.join(dir,'_replica/flight',filename));let cursor=0;
 while(cursor<bytes.length){
  const colon=bytes.indexOf(58,cursor),id=bytes.toString('utf8',cursor,colon),start=colon+1;
  if(bytes[start]===84){const comma=bytes.indexOf(44,start);cursor=comma+1+parseInt(bytes.toString('utf8',start+1,comma),16);continue;}
  let end=bytes.indexOf(10,start);if(end<0)end=bytes.length;
  if(id==='0'){const root=JSON.parse(bytes.toString('utf8',start,end));assert.equal(root.m,'$undefined',filename);assert.deepEqual(root.f[0][0].slice(2,4),['$undefined','$undefined'],filename);}
  cursor=end+1;
 }
}
console.log('All nine navigation payloads preserve the framework sentinels.');
