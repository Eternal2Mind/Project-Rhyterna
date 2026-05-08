// ─── DİL DESTEĞİ ─────────────────────────────────────────────────────────────
 
const lang = document.documentElement.lang || 'tr';
 
const t = {
  tr: {
    dogrulandi:      'DOĞRULANDI',
    dogrulamaHatasi: 'DOĞRULAMA HATASI',
    captcha:         'Captcha',
    gonderiliyor:    'GÖNDERİLİYOR...',
    gonderildi:      'GÖNDERİLDİ',
    gonder:          'GÖNDER',
    hata:            'HATA',
    baglantiHatasi:  'BAĞLANTI HATASI',
    dogrulama:       'DOĞRULAMA',
    mesajGonderildi: 'MESAJ GÖNDERİLDİ',
  },
  en: {
    dogrulandi:      'VERIFIED',
    dogrulamaHatasi: 'VERIFICATION ERROR',
    captcha:         'Captcha',
    gonderiliyor:    'SENDING...',
    gonderildi:      'SENT',
    gonder:          'SEND',
    hata:            'ERROR',
    baglantiHatasi:  'CONNECTION ERROR',
    dogrulama:       'VERIFICATION',
    mesajGonderildi: 'MESSAGE SENT',
  }
};
 
const i18n = t[lang] || t.tr;

// ─── TOKEN KONTROLÜ ───────────────────────────────────────────────────────────
 
let turnstileToken = null;

// ─── FEEDBACK ELEMANLARI ──────────────────────────────────────────────────────
 
const fbBtn         = document.getElementById('send-btn');
const fbMsg         = document.getElementById('success-msg');
const fbBox         = document.getElementById('feedback-box');
const fbDot         = document.getElementById('captcha-dot');
const fbCaptchaText = document.getElementById('captcha-text');
const fbCaptchaBox  = document.getElementById('captcha-box');
const fbTabs        = document.querySelectorAll('.fb-tab');
const fbTextarea    = document.getElementById('fb-msg');

// ─── TURNSTILE CALLBACK'LERİ ──────────────────────────────────────────────────
 
function onTurnstileSuccess(token) {
  turnstileToken = token;
  fbDot.classList.remove('dogrulaniyor');
  fbDot.classList.add('dogrulandi');
  fbCaptchaText.textContent      = i18n.dogrulandi;
  fbCaptchaBox.style.borderColor = 'rgba(0, 255, 100, 0.8)';
  fbCaptchaText.style.color      = 'rgba(0, 255, 100, 0.8)';
}
 
function onTurnstileError() {
  turnstileToken = null;
  fbDot.classList.remove('dogrulaniyor', 'dogrulandi');
  fbDot.style.borderColor        = 'rgba(255, 50, 50, 0.8)';
  fbCaptchaText.textContent      = i18n.dogrulamaHatasi;
  fbCaptchaText.style.color      = 'rgba(255, 50, 50, 0.8)';
  fbCaptchaBox.style.borderColor = 'rgba(255, 50, 50, 0.8)';
}
 
function onTurnstileExpired() {
  turnstileToken = null;
  fbDot.classList.remove('dogrulandi');
  fbDot.style.borderColor        = '';
  fbCaptchaText.textContent      = i18n.captcha;
  fbCaptchaText.style.color      = '';
  fbCaptchaBox.style.borderColor = '';
}

// ─── SAYFA YÜKLEME ANİMASYONU ─────────────────────────────────────────────────
 
document.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    history.replaceState(null, null, location.pathname);
  }
  const ana = document.querySelector('.ana');
  if (ana) ana.scrollTop = 0;

  document.querySelectorAll('.logo-inner').forEach(el => {
      const length = el.getTotalLength();
      el.style.strokeDasharray = length;
      el.style.strokeDashoffset = length;
    });

  const bgLogo = document.querySelector('.home-bg-logo');
  if (bgLogo) bgLogo.classList.add('logo-anim-start');
 
  setTimeout(() => {
    const overlay = document.querySelector('.page-overlay');
    if (overlay) overlay.classList.add('gizli');
    setTimeout(() => {
      if (bgLogo) {
        if (!bgLogo.dataset.scrollControlled) {
          bgLogo.classList.add('logo-anim-done');
        }
        bgLogo.querySelectorAll('.logo-inner, .logo-triangle, .logo-dot')
          .forEach(el => el.style.willChange = 'auto');
      }
    }, 400);
  }, 1000);
});

// ─── CURSOR TAKİPÇİ ──────────────────────────────────────────────────────────
 
const cursor         = document.querySelector('.cursor-follower');
const interactiveEls = document.querySelectorAll('a, button, [role="button"], .headline, .nav-segment');
 
if (cursor) {
  cursor.style.opacity = '0';
 
  let isMouseDown = false;
  let mouseX = 0, mouseY = 0;
  let rafPending = false;
 
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 8;
    mouseY = e.clientY - 8;
 
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        cursor.style.opacity = '1';
        cursor.style.left    = mouseX + 'px';
        cursor.style.top     = mouseY + 'px';
        rafPending = false;
      });
    }
  });
 
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      if (isMouseDown) cursor.classList.replace('clicked1', 'clicked2');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      if (isMouseDown) cursor.classList.replace('clicked2', 'clicked1');
    });
  });
 
  document.querySelectorAll('.cursor-text-el').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.remove('active');
      cursor.classList.add('text');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('text');
    });
  });
 
  document.addEventListener('mousedown', () => {
    isMouseDown = true;
    cursor.classList.add(cursor.classList.contains('active') ? 'clicked2' : 'clicked1');
  });
 
  document.addEventListener('mouseup', () => {
    isMouseDown = false;
    cursor.classList.remove('clicked1', 'clicked2');
  });
 
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
}

// ─── SOL NAV SCROLL ───────────────────────────────────────────────────────────
 
(function () {
  const scroller = document.querySelector('.ana');
  const pages    = ['home', 'lex-rhyterna', 'devlog', 'social'];
  const segments = document.querySelectorAll('.nav-segment');
 
  const states = [
    [7, 1, 1, 1],
    [1, 7, 1, 1],
    [1, 1, 7, 1],
    [1, 1, 1, 7],
  ];
 
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
 
  // ── Cache: elementler ve offsetTop'lar bir kez alınıyor ──
  const els     = pages.map(id => document.getElementById(id));
  let offsets   = els.map(el => el.offsetTop);
  let rafPending = false;
 
  window.addEventListener('resize', () => {
    offsets = els.map(el => el.offsetTop);
    updateNav();
  }, { passive: true });

  window.visualViewport?.addEventListener('resize', () => {
    offsets = els.map(el => el.offsetTop);
    updateNav();
  }, { passive: true });
 
  function updateNav() {
    const scrollTop = scroller.scrollTop;
 
    let fromIdx = 0;
    let t = 0;
 
    for (let i = 0; i < els.length - 1; i++) {
      if (scrollTop >= offsets[i] && scrollTop < offsets[i + 1]) {
        fromIdx = i;
        t = (scrollTop - offsets[i]) / (offsets[i + 1] - offsets[i]);
        break;
      }
    }
 
    if (scrollTop >= offsets[offsets.length - 1]) {
      fromIdx = els.length - 1;
      t = 0;
    }
 
    const from = states[fromIdx];
    const to   = states[Math.min(fromIdx + 1, states.length - 1)];
 
    segments.forEach((seg, i) => {
      seg.style.flex = lerp(from[i], to[i], t);
    });
  }
 
  // ── rAF throttle ──
  scroller.addEventListener('scroll', () => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        updateNav();
        rafPending = false;
      });
    }
  }, { passive: true });
 
  updateNav();
 
  segments.forEach((seg, i) => {
    seg.addEventListener('click', () => {
      document.getElementById(pages[i])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ─── ÜST BAR (PORTRAIT) ──────────────────────────────────────────────────────
 
(function () {
  const ustBar  = document.getElementById('ust-bar');
  const ustSegs = document.querySelectorAll('.ust-seg');
  const logo    = document.querySelector('.home-logo-kutu');
  const pages   = ['home', 'lex-rhyterna', 'devlog', 'social'];
 
  if (!ustBar) return;
 
  const mq = window.matchMedia('(orientation: portrait)');
 
  function applyOrientation(isPortrait) {
    if (isPortrait) {
      logo?.classList.remove('gorunur');
      logo?.classList.add('gizli');
      setTimeout(() => ustBar.classList.add('gorunur'), 50);
    } else {
      ustBar.classList.remove('gorunur');
      logo?.classList.remove('gizli');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          logo?.classList.add('gorunur');
        });
      });
    }
  }
 
  applyOrientation(mq.matches);
  mq.addEventListener('change', (e) => applyOrientation(e.matches));
 
  const sectionEls = pages.map(id => document.getElementById(id)).filter(Boolean);
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const idx = pages.indexOf(entry.target.id);
        if (idx === -1) return;
        ustSegs.forEach(s => s.classList.remove('aktif'));
        ustSegs[idx]?.classList.add('aktif');
      }
    });
  }, { 
    threshold: 0.5,
  });
 
  sectionEls.forEach(el => observer.observe(el));
 
  ustSegs[0]?.classList.add('aktif');
})();
 
// ─── LOGO SCROLL GÖRÜNÜRLÜĞü (LANDSCAPE) ────────────────────────────────────

(function () {
  const logo = document.querySelector('.home-logo-kutu');
  const home = document.getElementById('home');

  if (!logo || !home) return;

  const mq = window.matchMedia('(orientation: landscape)');
  const bgLogo = document.querySelector('.home-bg-logo');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!mq.matches) return;
      if (entry.isIntersecting) { 
        logo.classList.remove('gorunur');
        bgLogo?.classList.remove('logo-anim-done');
        bgLogo?.querySelector('.logo-text')?.classList.add('logo-text-giris');
        bgLogo.dataset.scrollControlled = 'true';
      } else {
        logo.classList.add('gorunur');
        bgLogo?.classList.add('logo-anim-done');
        bgLogo.dataset.scrollControlled = 'true';
      }
    });
  }, { threshold: 0.5 });

  mq.addEventListener('change', (e) => {
    if (!e.matches) logo.classList.remove('gorunur');
  });

  observer.observe(home);

  setTimeout(() => {
    if (mq.matches) {
      const rect = home.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        logo.classList.remove('gorunur');
      } else {
        logo.classList.add('gorunur');
      }
    }
  }, 100);

})();

// ─── URL GÖZLEMCİSİ ──────────────────────────────────────────────────────────
 
const urlGozlemcisi = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
      history.replaceState(null, null, '#' + entry.target.id);
    }
  });
}, { threshold: 0.6 });
 
document.querySelectorAll('section').forEach(s => urlGozlemcisi.observe(s));
 
// ─── SCROLL OK ───────────────────────────────────────────────────────────────

const scrollOk = document.querySelector('.scroll-ok');
const ana = document.querySelector('.ana');

if (scrollOk && ana) {
  ana.addEventListener('scroll', () => {
    const opacity = Math.max(0, 1 - Math.max(0, ana.scrollTop - 40) / 80);
    scrollOk.style.opacity = opacity;
  }, { passive: true });
}

// ─── FEEDBACK FORMU ───────────────────────────────────────────────────────────
 
async function handleSend() {
  const name = document.getElementById('fb-name').value.trim();
  const text = fbTextarea.value.trim();
  const type = document.querySelector('.fb-tab.aktif')?.dataset.tip || 'genel';
 
  if (!text) {
    fbBox.classList.add('bos-uyari');
    setTimeout(() => fbBox.classList.remove('bos-uyari'), 1200);
    return;
  }
 
  if (!turnstileToken) {
    fbDot.style.borderColor   = 'rgba(255, 50, 50, 0.8)';
    fbCaptchaText.textContent = i18n.dogrulamaHatasi;
    setTimeout(() => {
      fbDot.style.borderColor   = '';
      fbCaptchaText.textContent = i18n.captcha;
    }, 2000);
    return;
  }
 
  fbBtn.textContent         = i18n.gonderiliyor;
  fbBtn.disabled            = true;
  fbDot.classList.add('dogrulandi');
  fbCaptchaText.textContent = i18n.dogrulandi;
 
  try {
    const res = await fetch('https://feedback-worker.emir-sozer007.workers.dev', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, message: text, type, turnstileToken })
    });
 
    if (res.ok) {
      fbBtn.textContent = i18n.gonderildi;
      fbBtn.classList.add('sent');
      fbMsg.classList.add('visible');
      fbBox.classList.add('sent');
 
      setTimeout(() => {
        fbBtn.textContent = i18n.gonder;
        fbBtn.classList.remove('sent');
        fbBtn.disabled    = false;
        fbMsg.classList.remove('visible');
        fbBox.classList.remove('sent');
        fbDot.classList.remove('dogrulandi');
        fbCaptchaText.textContent = i18n.captcha;
        document.getElementById('fb-name').value = '';
        fbTextarea.value = '';
        turnstileToken   = null;
        if (typeof turnstile !== 'undefined') {
          turnstile.reset('.cf-turnstile');
        }
      }, 3000);
 
    } else {
      fbBtn.textContent = i18n.hata;
      fbDot.classList.remove('dogrulandi');
      fbCaptchaText.textContent = i18n.dogrulama;
      setTimeout(() => {
        fbBtn.textContent = i18n.gonder;
        fbBtn.disabled    = false;
      }, 2000);
    }
 
  } catch {
    fbBtn.textContent         = i18n.baglantiHatasi;
    fbDot.classList.remove('dogrulandi');
    fbCaptchaText.textContent = i18n.dogrulamaHatasi;
    setTimeout(() => {
      fbBtn.textContent         = i18n.gonder;
      fbBtn.disabled            = false;
      fbCaptchaText.textContent = i18n.captcha;
    }, 2000);
  }
}
 
// ─── TAB DEĞİŞTİRME ──────────────────────────────────────────────────────────
 
function setTab(el, placeholder) {
  fbTabs.forEach(t => t.classList.remove('aktif'));
  el.classList.add('aktif');
  fbTextarea.placeholder = placeholder;
}