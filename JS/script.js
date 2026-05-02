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

function onTurnstileSuccess(token) {
  turnstileToken = token;
  const dot  = document.getElementById('captcha-dot');
  const text = document.getElementById('captcha-text');
  const box  = document.getElementById('captcha-box');
  dot.classList.remove('dogrulaniyor');
  dot.classList.add('dogrulandi');
  text.textContent      = i18n.dogrulandi;
  box.style.borderColor = 'rgba(0, 255, 100, 0.8)';
  text.style.color      = 'rgba(0, 255, 100, 0.8)';
}

function onTurnstileError() {
  turnstileToken = null;
  const dot  = document.getElementById('captcha-dot');
  const text = document.getElementById('captcha-text');
  const box  = document.getElementById('captcha-box');
  dot.classList.remove('dogrulaniyor', 'dogrulandi');
  dot.style.borderColor = 'rgba(255, 50, 50, 0.8)';
  text.textContent      = i18n.dogrulamaHatasi;
  text.style.color      = 'rgba(255, 50, 50, 0.8)';
  box.style.borderColor = 'rgba(255, 50, 50, 0.8)';
}

function onTurnstileExpired() {
  turnstileToken = null;
  const dot  = document.getElementById('captcha-dot');
  const text = document.getElementById('captcha-text');
  const box  = document.getElementById('captcha-box');
  dot.classList.remove('dogrulandi');
  dot.style.borderColor = '';
  text.textContent      = i18n.captcha;
  text.style.color      = '';
  box.style.borderColor = '';
}


// ─── SAYFA YÜKLEME ANİMASYONU ─────────────────────────────────────────────────

window.addEventListener('load', () => {
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 2s ease-in-out';
  document.body.style.opacity    = '1';
});


// ─── CURSOR TAKİPÇİ ──────────────────────────────────────────────────────────

const cursor         = document.querySelector('.cursor-follower');
const interactiveEls = document.querySelectorAll('a, button, [role="button"], .headline, nav-segment');

if (cursor) {
  cursor.style.opacity = '0';

  let isMouseDown = false;

  document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursor.style.left    = (e.clientX - 8) + 'px';
    cursor.style.top     = (e.clientY - 8) + 'px';
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
  const pages    = ['home', 'lex-rhyterna', 'social'];
  const segments = document.querySelectorAll('.nav-segment');

  const states = [
    [8, 1, 1],
    [1, 8, 1],
    [1, 1, 8],
  ];

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function updateNav() {
    const els       = pages.map(id => document.getElementById(id));
    const scrollTop = scroller.scrollTop;

    let fromIdx = 0;
    let t = 0;

    for (let i = 0; i < els.length - 1; i++) {
      if (scrollTop >= els[i].offsetTop && scrollTop < els[i + 1].offsetTop) {
        fromIdx = i;
        t = (scrollTop - els[i].offsetTop) / (els[i + 1].offsetTop - els[i].offsetTop);
        break;
      }
    }

    if (scrollTop >= els[els.length - 1].offsetTop) {
      fromIdx = els.length - 1;
      t = 0;
    }

    const from = states[fromIdx];
    const to   = states[Math.min(fromIdx + 1, states.length - 1)];

    segments.forEach((seg, i) => {
      seg.style.flex = lerp(from[i], to[i], t);
    });
  }

  scroller.addEventListener('scroll', updateNav, { passive: true });
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
  const pages   = ['home', 'lex-rhyterna', 'social'];

  if (!ustBar) return;

  const mq = window.matchMedia('(orientation: portrait)');

  function handleOrientation(e) {
    if (e.matches) {
      setTimeout(() => ustBar.classList.add('gorunur'), 50);
    } else {
      ustBar.classList.remove('gorunur');
    }
  }

  if (mq.matches) {
    setTimeout(() => ustBar.classList.add('gorunur'), 100);
  }

  mq.addEventListener('change', handleOrientation);

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
  }, { threshold: 0.5 });

  sectionEls.forEach(el => observer.observe(el));

  ustSegs[0]?.classList.add('aktif');
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


// ─── FEEDBACK FORMU ───────────────────────────────────────────────────────────

async function handleSend() {
  const btn         = document.getElementById('send-btn');
  const msg         = document.getElementById('success-msg');
  const box         = document.getElementById('feedback-box');
  const dot         = document.getElementById('captcha-dot');
  const captchaText = document.getElementById('captcha-text');
  const name        = document.getElementById('fb-name').value.trim();
  const text        = document.getElementById('fb-msg').value.trim();
  const type        = document.querySelector('.fb-tab.aktif')?.dataset.tip || 'genel';

  if (!text) {
    box.classList.add('bos-uyari');
    setTimeout(() => box.classList.remove('bos-uyari'), 1200);
    return;
  }

  if (!turnstileToken) {
    dot.style.borderColor   = 'rgba(255, 50, 50, 0.8)';
    captchaText.textContent = i18n.dogrulamaHatasi;
    setTimeout(() => {
      dot.style.borderColor   = '';
      captchaText.textContent = i18n.captcha;
    }, 2000);
    return;
  }

  btn.textContent         = i18n.gonderiliyor;
  btn.disabled            = true;
  dot.classList.add('dogrulandi');
  captchaText.textContent = i18n.dogrulandi;

  try {
    const res = await fetch('https://feedback-worker.emir-sozer007.workers.dev', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, message: text, type, turnstileToken })
    });

    if (res.ok) {
      btn.textContent = i18n.gonderildi;
      btn.classList.add('sent');
      msg.classList.add('visible');
      box.classList.add('sent');

      setTimeout(() => {
        btn.textContent = i18n.gonder;
        btn.classList.remove('sent');
        btn.disabled    = false;
        msg.classList.remove('visible');
        box.classList.remove('sent');
        dot.classList.remove('dogrulandi');
        captchaText.textContent = i18n.captcha;
        document.getElementById('fb-name').value = '';
        document.getElementById('fb-msg').value  = '';
        turnstileToken = null;
        turnstile.reset('.cf-turnstile');
      }, 3000);

    } else {
      btn.textContent = i18n.hata;
      dot.classList.remove('dogrulandi');
      captchaText.textContent = i18n.dogrulama;
      setTimeout(() => {
        btn.textContent = i18n.gonder;
        btn.disabled    = false;
      }, 2000);
    }

  } catch {
    btn.textContent         = i18n.baglantiHatasi;
    dot.classList.remove('dogrulandi');
    captchaText.textContent = i18n.dogrulamaHatasi;
    setTimeout(() => {
      btn.textContent         = i18n.gonder;
      btn.disabled            = false;
      captchaText.textContent = i18n.captcha;
    }, 2000);
  }
}


// ─── TAB DEĞİŞTİRME ──────────────────────────────────────────────────────────

function setTab(el, placeholder) {
  document.querySelectorAll('.fb-tab').forEach(t => t.classList.remove('aktif'));
  el.classList.add('aktif');
  document.getElementById('fb-msg').placeholder = placeholder;
}