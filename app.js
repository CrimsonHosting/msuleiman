/* =============================================================
   Mohammed Suleiman — shared behaviour
   ============================================================= */
(function(){
'use strict';
var $  = function(s,r){ return (r||document).querySelector(s); };
var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };

document.documentElement.classList.remove('no-js');

/* ---- a drawing that doesn't exist yet shows what to draw ---- */
window.slotFail = function(img){
  var box = img.parentNode, slot = box && box.querySelector('.slot');
  img.style.display = 'none';
  if(slot){ slot.hidden = false; }
  if(box && box.classList.contains('obj')) box.classList.add('slotobj');
};
$$('img[onerror]').forEach(function(im){
  if(im.complete && im.naturalWidth === 0) im.dispatchEvent(new Event('error'));
});

/* ---- cards fade up as they arrive ---- */
if('IntersectionObserver' in window){
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); cio.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px',threshold:.05});
  $$('.card, .quote').forEach(function(c,i){
    c.style.transitionDelay = (Math.min(i,7)*60) + 'ms';
    cio.observe(c);
  });
} else {
  $$('.card, .quote').forEach(function(c){ c.classList.add('in'); });
}

/* ---- click any photo or clip to see it big ---- */
var lb = $('#lb');
if(lb){
  var lbx = $('#lbx');
  var shut = function(){
    lb.classList.remove('on');
    var o = lb.querySelector('img,video'); if(o) o.remove();
    document.body.style.overflow = '';
  };
  $$('[data-zoom]').forEach(function(m){
    m.addEventListener('click', function(){
      var src = m.querySelector('video,img'); if(!src) return;
      var n;
      if(src.tagName === 'VIDEO'){
        n = document.createElement('video');
        n.src = src.currentSrc || src.src;
        n.autoplay = n.loop = n.muted = n.playsInline = true;
        n.setAttribute('controls','');
      } else {
        n = document.createElement('img');
        n.src = src.currentSrc || src.src;
        n.alt = src.alt || '';
      }
      lb.appendChild(n); lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    });
  });
  lb.addEventListener('click', function(e){ if(e.target === lb || e.target === lbx) shut(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') shut(); });
}

/* ---- before / after sliders ----
   No pointer capture anywhere. Capture routes every later event to one element,
   and if a single release is ever missed the whole page stops responding.
   Plain document listeners, added on press and removed on release, cannot leak. */
$$('[data-ba]').forEach(function(ba){
  function set(x){
    var r = ba.getBoundingClientRect();
    if(!r.width) return;
    ba.style.setProperty('--p', Math.max(2, Math.min(98,(x - r.left)/r.width*100)) + '%');
  }
  function move(e){ set(e.clientX); }
  function touch(e){ if(e.touches && e.touches[0]) set(e.touches[0].clientX); }
  function stop(){
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', stop);
    document.removeEventListener('touchmove', touch);
    document.removeEventListener('touchend', stop);
    document.removeEventListener('touchcancel', stop);
    window.removeEventListener('blur', stop);
    ba.classList.remove('drag');
  }
  ba.addEventListener('mousedown', function(e){
    if(e.button !== 0) return;
    e.preventDefault();            /* stops the native image drag and text selection */
    ba.classList.add('drag');
    set(e.clientX);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
    window.addEventListener('blur', stop);
  });
  ba.addEventListener('touchstart', function(e){
    touch(e);
    document.addEventListener('touchmove', touch, {passive:true});
    document.addEventListener('touchend', stop);
    document.addEventListener('touchcancel', stop);
  }, {passive:true});
  ba.addEventListener('dragstart', function(e){ e.preventDefault(); });

  if('IntersectionObserver' in window){
    var seen = false;
    new IntersectionObserver(function(es, ob){
      es.forEach(function(e){
        if(e.isIntersecting && !seen){
          seen = true;
          var t0 = null;
          requestAnimationFrame(function step(t){
            if(!t0) t0 = t;
            var k = Math.min(1,(t - t0)/1100);
            ba.style.setProperty('--p',(50 + Math.sin(k*Math.PI*2)*17) + '%');
            if(k < 1) requestAnimationFrame(step); else ba.style.setProperty('--p','50%');
          });
          ob.unobserve(e.target);
        }
      });
    },{threshold:.45}).observe(ba);
  }
});

/* if a previous visit left the page scroll-locked, clear it */
if(!document.querySelector('.lb.on')) document.body.style.overflow = '';

/* ---- only play the video you can see ---- */
if('IntersectionObserver' in window){
  var vio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      var v = e.target;
      if(e.isIntersecting){ var p = v.play(); if(p && p.catch) p.catch(function(){}); }
      else v.pause();
    });
  },{threshold:.12});
  $$('video').forEach(function(v){ vio.observe(v); });
}

/* ---- contact form ---- */
var f = $('#cf');
if(f) f.addEventListener('submit', function(e){
  e.preventDefault();
  var btn = $('#fsub'), ok = $('#fok'), err = $('#ferr');
  ok.className = 'msg'; err.className = 'msg';
  btn.disabled = true;
  var was = btn.textContent; btn.textContent = 'Sending…';
  fetch(f.action,{method:'POST', body:new FormData(f), headers:{Accept:'application/json'}})
    .then(function(r){
      if(r.ok){ ok.className = 'msg ok'; f.reset(); btn.textContent = 'Sent'; }
      else { err.className = 'msg err'; btn.disabled = false; btn.textContent = was; }
    })
    .catch(function(){ err.className = 'msg err'; btn.disabled = false; btn.textContent = was; });
});

/* ---- Get started, and the things shooting out from behind the name ---- */
var stage = $('#stage'), hub = $('#hub'), go = $('#introgo');

function launch(){
  if(!stage || !hub) return;
  var things = $$('.obj', stage);
  var box = stage.getBoundingClientRect();
  var h   = hub.getBoundingClientRect();
  var cx  = (h.left - box.left) + h.width/2;      /* fly out from behind the name */
  var cy  = (h.top  - box.top ) + h.height/2;

  /* stack them all behind the name first */
  things.forEach(function(o, i){
    var b  = o.getBoundingClientRect();
    var dx = cx - ((b.left - box.left) + b.width/2);
    var dy = cy - ((b.top  - box.top ) + b.height/2);
    var spin = (i % 2 ? 1 : -1) * (140 + (i*37) % 90);
    o.dataset.dx = dx; o.dataset.dy = dy;
    o.style.transition = 'none';
    o.style.transform  = 'translate(' + dx + 'px,' + dy + 'px) scale(.06) rotate(' + spin + 'deg)';
    o.style.opacity    = '0';
    o.style.zIndex     = '';
    o.classList.remove('landed');
  });
  void stage.offsetWidth;                          /* flush so the next change animates */
  stage.classList.remove('armed');
  document.body.classList.add('blown');

  /* farthest first, so the big ones lead */
  things.slice().sort(function(a,b){
    return Math.hypot(b.dataset.dx, b.dataset.dy) - Math.hypot(a.dataset.dx, a.dataset.dy);
  }).forEach(function(o, i){
    var t = 60 + i*110;
    setTimeout(function(){
      o.style.transition = 'transform .95s cubic-bezier(.17,1.2,.34,1), opacity .28s ease';
      o.style.transform  = '';                     /* back to the rotate() in the stylesheet */
      o.style.opacity    = '1';
    }, t);
    setTimeout(function(){ o.classList.add('landed'); }, t + 720);
  });

  setTimeout(function(){
    things.forEach(function(o){
      o.style.transition = ''; o.style.opacity = '';
      delete o.dataset.dx; delete o.dataset.dy;
    });
  }, 60 + things.length*110 + 1100);
}

/* everything already out, no button, no animation */
function settled(){
  if(!stage) return;
  stage.classList.remove('armed');
  document.body.classList.add('blown');
  $$('.obj', stage).forEach(function(o){ o.classList.add('landed'); });
}

/* Get started is a once-per-visit thing. Coming back from a page, or using the
   browser's back button, lands you on the finished floor instead of resetting. */
var SEEN = false;
try{ SEEN = sessionStorage.getItem('ms-floor') === '1'; }catch(e){}

if(stage && go && !SEEN){
  var fired = false;
  var start = function(){
    if(fired) return; fired = true;
    try{ sessionStorage.setItem('ms-floor','1'); }catch(e){}
    launch();
  };
  go.addEventListener('click', start);
  document.addEventListener('keydown', function(e){
    if(!fired && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); start(); }
  });
} else {
  settled();
}
/* restoring from the back/forward cache should not rewind it either */
window.addEventListener('pageshow', function(e){
  if(e.persisted && stage && stage.classList.contains('armed')){
    try{ if(sessionStorage.getItem('ms-floor') === '1') settled(); }catch(err){}
  }
});

/* ---- floor: arrow keys walk between the objects ---- */
var objs = $$('.obj[href]');
if(objs.length){
  document.addEventListener('keydown', function(e){
    if(e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var i = objs.indexOf(document.activeElement);
    if(i < 0) i = e.key === 'ArrowRight' ? -1 : 0;
    var n = (i + (e.key === 'ArrowRight' ? 1 : -1) + objs.length) % objs.length;
    objs[n].focus();
  });
}
})();
