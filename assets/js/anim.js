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
/* Cris wants these muted previews to autoplay regardless of prefers-reduced-motion */
function load(v){if(!v.getAttribute('src')){v.src=v.dataset.src;}}
function tryPlay(v){v.muted=true;v.defaultMuted=true;v.playsInline=true;load(v);var pr=v.play();if(pr&&pr.catch)pr.catch(function(){v._needsGesture=true;});}
vids.forEach(function(v){v.muted=true;v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('loop','');});
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(en){en.forEach(function(x){var v=x.target;v._vis=x.isIntersecting;if(x.isIntersecting&&!window._vidOpen){tryPlay(v)}else{v.pause()}})},{threshold:.25}):null;
if(io)vids.forEach(function(v){io.observe(v)});else vids.forEach(tryPlay);
function retry(){vids.forEach(function(v){if(v._vis&&v.paused&&!window._vidOpen)tryPlay(v)});}
['pointerdown','touchstart','keydown','scroll'].forEach(function(ev){addEventListener(ev,retry,{passive:true})});
document.addEventListener('visibilitychange',function(){if(!document.hidden)retry()});
var rm=false;
var m=document.getElementById('vidModal');if(!m||!window.bootstrap)return;var p=document.getElementById('vidPlayer'),t=document.getElementById('vidTitle'),bm=new bootstrap.Modal(m);
document.querySelectorAll('button.vid-thumb').forEach(function(b){b.addEventListener('click',function(){window._vidOpen=true;vids.forEach(function(v){v.pause()});var cv=b.querySelector('video');
p.src=b.dataset.video;p.poster=cv.poster;p.muted=false;p.currentTime=0;t.textContent=b.dataset.title+' · Video testimonial';bm.show();p.play().catch(function(){})})});
m.addEventListener('hidden.bs.modal',function(){p.pause();p.removeAttribute('src');p.load();window._vidOpen=false;vids.forEach(function(v){if(v._vis)tryPlay(v)})});
})();
(function(){var f=document.querySelector('[data-flow]');if(!f)return;var steps=[].slice.call(f.querySelectorAll('.flow-step'));
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){f.style.setProperty('--p',1);steps.forEach(function(s){s.classList.add('on')});return;}
var tk=false;function upd(){tk=false;var r=f.getBoundingClientRect(),vh=window.innerHeight;var p=(vh*0.85-r.top)/(r.height+vh*0.35);p=Math.max(0,Math.min(1,p));
f.style.setProperty('--p',p.toFixed(3));var n=steps.length;steps.forEach(function(s,i){s.classList.toggle('on',p>=i/(n-1)-0.001)});}
window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});window.addEventListener('resize',upd);upd();})();
(function(){document.querySelectorAll('[data-bars]').forEach(function(b){if(!('IntersectionObserver' in window)){b.classList.add('on');return}var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){b.classList.add('on');o.disconnect()}},{threshold:.4});o.observe(b)})})();
/* card carousels */
(function(){
var rows=[].slice.call(document.querySelectorAll('[data-hs]'));if(!rows.length)return;
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
rows.forEach(function(r){
 var w=document.createElement('div');w.className='hs';r.parentNode.insertBefore(w,r);w.appendChild(r);r.classList.add('hs-track');
 var ctr=document.createElement('div');ctr.className='hs-ctrl';
 ctr.innerHTML='<div class="hs-progress"><i></i></div><button type="button" class="hs-btn hs-prev" aria-label="Previous"><i class="bi bi-arrow-left"></i></button><button type="button" class="hs-btn hs-next" aria-label="Next"><i class="bi bi-arrow-right"></i></button>';
 w.appendChild(ctr);var prev=ctr.querySelector('.hs-prev'),next=ctr.querySelector('.hs-next'),bar=ctr.querySelector('.hs-progress i');
 function step(){var c=r.children[0];return c?c.getBoundingClientRect().width:300}
 function upd(){var m=r.scrollWidth-r.clientWidth;var p=m>0?r.scrollLeft/m:1;bar.style.transform='scaleX('+Math.max(.06,r.clientWidth/r.scrollWidth+(1-r.clientWidth/r.scrollWidth)*p)+')';
  prev.disabled=r.scrollLeft<=4;next.disabled=r.scrollLeft>=m-4;w.classList.toggle('hs-static',m<=4);}
 prev.addEventListener('click',function(){r.scrollBy({left:-step(),behavior:rm?'auto':'smooth'})});
 next.addEventListener('click',function(){r.scrollBy({left:step(),behavior:rm?'auto':'smooth'})});
 var tk=false;r.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(function(){tk=false;upd()})}},{passive:true});
 addEventListener('resize',upd);setTimeout(upd,300);upd();
 /* drag with mouse */
 var down=false,sx=0,sl=0,moved=false;
 r.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=r.scrollLeft;r.classList.add('dragging')});
 addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4)moved=true;r.scrollLeft=sl-dx});
 addEventListener('pointerup',function(){if(!down)return;down=false;r.classList.remove('dragging');});
 r.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
 /* gentle autoplay */
 if(!rm){var hover=false,vis=false;w.addEventListener('mouseenter',function(){hover=true});w.addEventListener('mouseleave',function(){hover=false});
  w.addEventListener('focusin',function(){hover=true});w.addEventListener('touchstart',function(){hover=true},{passive:true});
  new IntersectionObserver(function(en){vis=en[0].isIntersecting},{threshold:.5}).observe(w);
  setInterval(function(){if(hover||!vis||down||r.querySelector('.xcard.open'))return;var m=r.scrollWidth-r.clientWidth;if(m<=4)return;
   if(r.scrollLeft>=m-4)r.scrollTo({left:0,behavior:'smooth'});else r.scrollBy({left:step(),behavior:'smooth'})},5000);}
});
})();
/* v7: theme toggle, back to top, expandable cards, decor */
(function(){
var root=document.documentElement;
document.querySelectorAll('.theme-toggle').forEach(function(b){b.addEventListener('click',function(){var t=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',t);try{localStorage.setItem('theme',t)}catch(e){}})});
var tt=document.querySelector('.to-top');if(tt){var ring=tt.querySelector('.tt-ring'),C=2*Math.PI*21,k=false;ring.style.strokeDasharray=C;
 function u(){k=false;var h=document.documentElement.scrollHeight-innerHeight,p=h>0?scrollY/h:0;ring.style.strokeDashoffset=C*(1-p);tt.classList.toggle('show',scrollY>500)}
 addEventListener('scroll',function(){if(!k){k=true;requestAnimationFrame(u)}},{passive:true});u();
 tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});}
document.querySelectorAll('.xc-more').forEach(function(m){if(m.children.length!==1||m.firstElementChild.tagName==='UL'){var w=document.createElement('div');while(m.firstChild)w.appendChild(m.firstChild);m.appendChild(w)}});
document.querySelectorAll('.xcard').forEach(function(c){var m=c.querySelector('.xc-more'),t=c.querySelector('h3,h4');if(m&&t&&m.firstElementChild){var h=document.createElement('p');h.className='xc-otitle';h.textContent=t.textContent;m.firstElementChild.insertBefore(h,m.firstElementChild.firstChild)}});
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
document.querySelectorAll('.xcard').forEach(function(c){c.addEventListener('click',function(e){if(e.target.closest('a,button'))return;if(fine&&!c.classList.contains('xcard-proj'))return;c.classList.toggle('open')});
 c.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target===c){c.classList.toggle('open')}})});
var spark='<svg viewBox="0 0 24 24" class="d-spark"><path fill="currentColor" d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z"/></svg>';
var wave='<svg viewBox="0 0 260 60" class="d-wave"><path d="M0 30 Q 32 0 65 30 T 130 30 T 195 30 T 260 30" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
var sets=[['d-ring','tr'],['d-dots','bl'],['spark','tl'],['d-blob','br'],['wave','tr'],['d-dots','tr'],['spark','br'],['d-ring','bl']];
var pos={tr:'top:6%;right:-60px',tl:'top:8%;left:4%',bl:'bottom:6%;left:-40px',br:'bottom:-40px;right:6%'};
document.querySelectorAll('main>section').forEach(function(s,i){var d=document.createElement('div');d.className='deco';d.setAttribute('aria-hidden','true');
 [sets[i%sets.length],sets[(i+3)%sets.length]].forEach(function(x,j){var h=x[0]==='spark'?spark:x[0]==='wave'?wave:'<div class="'+x[0]+'"></div>';var t=document.createElement('div');t.innerHTML=h;var el=t.firstChild;el.setAttribute('style',pos[x[1]]+(j?';animation-delay:-'+(i*1.7)+'s':''));d.appendChild(el)});
 s.insertBefore(d,s.firstChild)});
})();
/* v9 creative gallery */
(function(){var g=document.querySelector('.dz-grid');if(!g)return;var items=[].slice.call(g.querySelectorAll('.dz-item')),lb=document.querySelector('.dz-lb'),im=lb.querySelector('img'),cap=lb.querySelector('.dz-cap'),cur=0;
document.querySelectorAll('.dz-tabs button').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('.dz-tabs button').forEach(function(x){x.classList.remove('active')});b.classList.add('active');var f=b.dataset.f;items.forEach(function(i){i.classList.toggle('hide',f!=='*'&&i.dataset.c!==f)})})});
function vis(){return items.filter(function(i){return !i.classList.contains('hide')})}
function show(n){var v=vis();cur=(n+v.length)%v.length;var a=v[cur],i=a.querySelector('img');im.src=a.href;im.alt=i.alt;cap.textContent=i.alt.replace(/ social media design$/,'')+'  ·  '+(cur+1)+' / '+v.length}
items.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();lb.hidden=false;document.body.style.overflow='hidden';show(vis().indexOf(a))})});
function close(){lb.hidden=true;document.body.style.overflow=''}
lb.querySelector('.dz-x').onclick=close;lb.querySelector('.dz-p').onclick=function(){show(cur-1)};lb.querySelector('.dz-n').onclick=function(){show(cur+1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});
document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)})})();
