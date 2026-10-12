(function(){
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js-anim');
if(rm){document.documentElement.classList.add('reduced');return;}
var sel='section h1,section h2,section .sec-label,section .lead-sm,.soft-card,.card-dark,.card-photo,.p-5,.p-6,.p-7,.card-portfolio,.accordion-item,.list-check li,.row.py-5';
var els=[].slice.call(document.querySelectorAll(sel)).filter(function(e){return !e.closest('.hero-title')&&!e.closest('footer')});
els.forEach(function(e){e.classList.add('reveal');var p=e.parentElement,sibs=p?[].slice.call(p.children).filter(function(s){return s.classList.contains('reveal')}):[];var i=sibs.indexOf(e);
var col=e.closest('[class*="col"]');if(col&&col.parentElement){i=Math.max(i,[].indexOf.call(col.parentElement.children,col));}e.style.transitionDelay=Math.min(i,6)*80+'ms';});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
els.forEach(function(e){io.observe(e)});
function count(el){var t=el.textContent.trim(),m=t.match(/^([^\d]*)([\d,]+)(.*)$/);if(!m)return;var n=parseInt(m[2].replace(/,/g,'')),s=performance.now(),d=1400;
(function f(now){var p=Math.min((now-s)/d,1),v=Math.round(n*(1-Math.pow(1-p,3)));el.textContent=m[1]+v.toLocaleString()+m[3];if(p<1)requestAnimationFrame(f)})(s);}
var cio=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){count(x.target);cio.unobserve(x.target)}})},{threshold:.6});
document.querySelectorAll('.count').forEach(function(e){cio.observe(e)});
})();
(function(){
var vids=[].slice.call(document.querySelectorAll('video.card-vid'));
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function load(v){if(!v.src){v.src=v.dataset.src;}}
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(en){en.forEach(function(x){var v=x.target;v._vis=x.isIntersecting;if(x.isIntersecting&&!rm&&!window._vidOpen){load(v);v.play().catch(function(){})}else{v.pause()}})},{threshold:.35}):null;
vids.forEach(function(v){if(io)io.observe(v)});
var m=document.getElementById('vidModal');if(!m||!window.bootstrap)return;var p=document.getElementById('vidPlayer'),t=document.getElementById('vidTitle'),bm=new bootstrap.Modal(m);
document.querySelectorAll('button.vid-thumb').forEach(function(b){b.addEventListener('click',function(){window._vidOpen=true;vids.forEach(function(v){v.pause()});var cv=b.querySelector('video');
p.src=b.dataset.video;p.poster=cv.poster;p.muted=false;p.currentTime=0;t.textContent=b.dataset.title+' · Video testimonial';bm.show();p.play().catch(function(){})})});
m.addEventListener('hidden.bs.modal',function(){p.pause();p.removeAttribute('src');p.load();window._vidOpen=false;vids.forEach(function(v){if(v._vis&&!rm){load(v);v.play().catch(function(){})}})});
})();
(function(){var f=document.querySelector('[data-flow]');if(!f)return;var steps=[].slice.call(f.querySelectorAll('.flow-step'));
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){f.style.setProperty('--p',1);steps.forEach(function(s){s.classList.add('on')});return;}
var tk=false;function upd(){tk=false;var r=f.getBoundingClientRect(),vh=window.innerHeight;var p=(vh*0.85-r.top)/(r.height+vh*0.35);p=Math.max(0,Math.min(1,p));
f.style.setProperty('--p',p.toFixed(3));var n=steps.length;steps.forEach(function(s,i){s.classList.toggle('on',p>=i/(n-1)-0.001)});}
window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});window.addEventListener('resize',upd);upd();})();
(function(){document.querySelectorAll('[data-bars]').forEach(function(b){if(!('IntersectionObserver' in window)){b.classList.add('on');return}var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){b.classList.add('on');o.disconnect()}},{threshold:.4});o.observe(b)})})();
/* pinned horizontal scroll */
(function(){
var rows=[].slice.call(document.querySelectorAll('[data-hs]'));if(!rows.length)return;
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches,mq=window.matchMedia('(max-width: 767.98px)');
var items=rows.map(function(r){var w=document.createElement('div');w.className='hs';var st=document.createElement('div');st.className='hs-sticky';
r.parentNode.insertBefore(w,r);w.appendChild(st);st.appendChild(r);r.classList.add('hs-track');
var pb=document.createElement('div');pb.className='hs-progress';pb.innerHTML='<i></i>';st.appendChild(pb);return{w:w,st:st,r:r,pb:pb.firstChild,ov:0}});
function layout(){var native=rm||mq.matches;items.forEach(function(it){it.r.style.transform='';it.w.style.height='';it.st.style.top='';
 it.w.classList.toggle('hs-native',native);it.w.classList.remove('hs-pinned');if(native)return;
 var ov=it.r.scrollWidth-it.st.clientWidth;it.ov=ov;if(ov<=8)return;it.w.classList.add('hs-pinned');
 var vh=window.innerHeight,h=it.st.offsetHeight;it.w.style.height=(h+ov)+'px';it.st.style.top=Math.max(80,(vh-h)/2)+'px';});upd();}
var tk=false;function upd(){tk=false;items.forEach(function(it){if(!it.w.classList.contains('hs-pinned'))return;var r=it.w.getBoundingClientRect(),top=parseFloat(it.st.style.top)||0;
 var p=(top-r.top)/(r.height-it.st.offsetHeight);p=Math.max(0,Math.min(1,p));it.r.style.transform='translate3d('+(-p*it.ov)+'px,0,0)';it.pb.style.transform='scaleX('+p+')';});}
window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});
window.addEventListener('resize',function(){clearTimeout(window._hsT);window._hsT=setTimeout(layout,150)});
if(mq.addEventListener)mq.addEventListener('change',layout);
window.addEventListener('load',layout);layout();
})();
