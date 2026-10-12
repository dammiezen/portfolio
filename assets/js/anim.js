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
