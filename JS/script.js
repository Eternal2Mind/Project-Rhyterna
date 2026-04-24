// ─── URL Gözlemcisi ──────────────────────────────────────────────────────────

const urlGozlemcisi = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            history.replaceState(null, null, '#' + entry.target.id);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('section').forEach(s => urlGozlemcisi.observe(s));


// ─── Cursor Takipçi ──────────────────────────────────────────────────────────

const cursor = document.querySelector('.cursor-follower');
const interactiveEls = document.querySelectorAll('a, button, [role="button"], .headline, nav-segment');

if (cursor) {
    cursor.style.opacity = '0';

    let isMouseDown = false;

    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.left = (e.clientX - 8) + 'px';
        cursor.style.top  = (e.clientY - 8) + 'px';
    });

    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            if (isMouseDown) {
                cursor.classList.replace('clicked1', 'clicked2');
            }
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            if (isMouseDown) {
                cursor.classList.replace('clicked2', 'clicked1');
            }
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


// ─── Sayfa Yükleme Animasyonu ─────────────────────────────────────────────────

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 2s ease-in-out';
    document.body.style.opacity = '1';
});


// ─── Sol Nav Scroll ───────────────────────────────────────────────────────────

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
        const els      = pages.map(id => document.getElementById(id));
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
            document.getElementById(pages[i])?.scrollIntoView({ behavior: 'smooth' });
        });
    });
})();