const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('s', scrollY > 60), { passive: true });

const bar = document.getElementById('bar');
window.addEventListener('scroll', () => {
  const t = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (scrollY / t * 100) + '%';
}, { passive: true });

const kicker = document.getElementById('hkicker');
if (kicker) {
  const text = kicker.textContent;
  kicker.textContent = '';
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'hk-char';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = (0.05 + i * 0.045) + 's';
    kicker.appendChild(span);
  });
}

const phrases = ['the best photos','breathtaking moments','timeless stories','hidden landscapes','raw human emotions','perfect frames'];
let idx = 0;
const mw = document.getElementById('mw');

setInterval(() => {

  mw.classList.remove('landing','in-coming');
  mw.classList.add('out');

  setTimeout(() => {

    mw.classList.remove('out');
    mw.classList.add('in-coming');
    idx = (idx + 1) % phrases.length;
    mw.textContent = phrases[idx];

    void mw.offsetWidth;
    mw.classList.remove('in-coming');
    mw.classList.add('landing');
  }, 520);
}, 2800);

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('on');
    e.target.querySelectorAll('.sk-fill').forEach(b => b.style.width = b.dataset.w + '%');
    obs.unobserve(e.target);
  });
}, { threshold: .14 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

const cobs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, tgt = +el.dataset.count, dur = 1800, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(ease * tgt);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cobs.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => cobs.observe(el));

document.querySelectorAll('.fbt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fbt').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    const f = btn.dataset.f;
    document.querySelectorAll('.gi').forEach((item, i) => {
      const show = f === 'all' || item.dataset.c === f;
      if (show) {
        item.style.display = '';
        item.style.animation = 'none';
        void item.offsetWidth;
        item.style.opacity = '0';
        item.style.animation = `gr .55s ease ${i * .04}s forwards`;
      } else {
        item.style.display = 'none';
      }
    });
  });
});

(function() {
  const cur = document.createElement('div'); cur.id = 'cursor';
  const ring = document.createElement('div'); ring.id = 'cursor-ring';
  document.body.append(cur, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function loop() {
    rx += (mx - rx) * .14;
    ry += (my - ry) * .14;
    cur.style.left  = mx + 'px'; cur.style.top  = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverEls = 'a,button,.gi,.pill,.si,.ph-wrap,.fbt,.tl-item,.sk-item,.qw,.badge-stat,.s-num,.scroll-cue';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
})();

document.querySelectorAll('.fbt').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * .18}px, ${y * .28}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

document.querySelectorAll('.fbt').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const rip = document.createElement('span');
    rip.className = 'ripple';
    const size = Math.max(r.width, r.height);
    rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
    btn.appendChild(rip);
    setTimeout(() => rip.remove(), 600);
  });
});

document.querySelectorAll('.ph-wrap').forEach(wrap => {
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    wrap.style.transform = `scale(1.015) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    wrap.style.transition = 'transform .1s ease';
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = '';
    wrap.style.transition = 'transform .55s cubic-bezier(.16,1,.3,1)';
  });
});

document.querySelectorAll('.gi').forEach(item => {
  item.addEventListener('mousemove', e => {
    const r = item.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    item.style.transform = `scale(1.03) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    item.style.transition = 'transform .1s ease, box-shadow .4s';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
    item.style.transition = 'transform .45s cubic-bezier(.16,1,.3,1), box-shadow .4s';
  });
});

document.querySelectorAll('.si').forEach(icon => {
  icon.addEventListener('mousemove', e => {
    const r = icon.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    icon.style.transform = `translate(${x * .35}px, ${y * .35 - 5}px)`;
    icon.style.transition = 'transform .12s ease, box-shadow .3s, border-color .3s';
  });
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = '';
    icon.style.transition = 'all .35s cubic-bezier(.34,1.56,.64,1)';
  });
});

document.querySelectorAll('.s-num').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const tgt = +el.dataset.count || +el.textContent;
    if (!tgt) return;
    const dur = 600, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * tgt);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
});

document.querySelectorAll('.sk-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('.sk-lbl').style.color = 'var(--gold2)';
  });
  item.addEventListener('mouseleave', () => {
    item.querySelector('.sk-lbl').style.color = '';
  });
});

const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  document.getElementById('home').addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth  - .5) * 14;
    const y = (e.clientY / innerHeight - .5) * 10;
    heroBg.style.transform = `scale(1.07) translate(${x}px, ${y}px)`;
    heroBg.style.transition = 'transform .25s ease';
  });
  document.getElementById('home').addEventListener('mouseleave', () => {
    heroBg.style.transform = '';
    heroBg.style.transition = 'transform 1s ease';
  });
}