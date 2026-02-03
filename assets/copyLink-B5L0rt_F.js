var d=(a,t,o)=>new Promise((r,i)=>{var y=e=>{try{c(o.next(e))}catch(n){i(n)}},s=e=>{try{c(o.throw(e))}catch(n){i(n)}},c=e=>e.done?r(e.value):Promise.resolve(e.value).then(y,s);c((o=o.apply(a,t)).next())});import{y as p,am as l,v as m}from"./index-DCFn-PJE.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],b=p("link",u);function k(a){return d(this,null,function*(){try{yield navigator.clipboard.writeText(a),l("Ссылка скопирована в буфер обмена")}catch(t){f(a)}})}function f(a){const t=document.createElement("textarea");t.value=a,t.setAttribute("readonly",""),t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();try{document.execCommand("copy"),l("Ссылка скопирована в буфер обмена")}catch(o){m("Не удалось скопировать ссылку")}finally{document.body.removeChild(t)}}export{b as L,k as c};
