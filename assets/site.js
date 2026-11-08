(function(){
  // YouTube erst nach Klick laden
  document.querySelectorAll('.yt button').forEach(function(b){
    b.addEventListener('click',function(){
      var box=b.parentNode, f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+box.dataset.id+'?autoplay=1&rel=0';
      f.allow='autoplay; encrypted-media; fullscreen'; f.allowFullscreen=true;
      box.innerHTML=''; box.appendChild(f);
    });
  });
  // Lightbox
  var imgs=[].slice.call(document.querySelectorAll('.post-body img[data-full]'));
  if(!imgs.length) return;
  var lb=document.createElement('div'); lb.className='lb';
  lb.innerHTML='<img alt=""><button class="x" aria-label="Schließen">×</button><button class="l" aria-label="Zurück">‹</button><button class="r" aria-label="Weiter">›</button><div class="c"></div>';
  document.body.appendChild(lb);
  var big=lb.querySelector('img'), cnt=lb.querySelector('.c'), i=0;
  function show(n){ i=(n+imgs.length)%imgs.length; big.src=imgs[i].dataset.full; cnt.textContent=(i+1)+' / '+imgs.length; }
  function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  imgs.forEach(function(im,n){ im.addEventListener('click',function(){ show(n); lb.classList.add('open'); document.body.style.overflow='hidden'; }); });
  lb.querySelector('.x').onclick=close;
  lb.querySelector('.l').onclick=function(e){e.stopPropagation();show(i-1)};
  lb.querySelector('.r').onclick=function(e){e.stopPropagation();show(i+1)};
  lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown',function(e){ if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close(); if(e.key==='ArrowLeft')show(i-1); if(e.key==='ArrowRight')show(i+1); });
  var x0=null; lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){ if(x0===null)return; var d=e.changedTouches[0].clientX-x0; if(Math.abs(d)>50) show(i+(d<0?1:-1)); x0=null; });
})();
