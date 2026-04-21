/* Start cursor follower system */
const cursor = document.querySelector('.cursor-follower');
const interactiveElements = document.querySelectorAll('a, button, [role="button"], .headline');

if (cursor) {
    /* Hide cursor on page load */
    cursor.style.opacity = '0';

    /* ===== DESKTOP MOUSE DEVICE - ORIGINAL FUNCTIONALITY ===== */
    let isMouseDown = false;
    let lastX = 0;
    let lastY = 0;

    /* 1. Mouse movement - Follow cursor */
    document.addEventListener('mousemove', (e) => {
        lastX = e.clientX - 8;
        lastY = e.clientY - 8;

        cursor.style.opacity = '1'; /* Make visible */
        cursor.style.left = lastX + 'px';
        cursor.style.top = lastY + 'px';
    });

    /* 2. Hover effects on interactive elements */
    interactiveElements.forEach(element => {
        /* Mouse enter - Add active class (orange) */
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');

            /* If mouse is pressed, apply different effect */
            if (isMouseDown) {
                cursor.classList.remove('clicked1');
                cursor.classList.add('clicked2');
            }
        });

        /* Mouse leave - Remove active class */
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');

            /* If mouse still pressed, apply clicked1 effect */
            if (isMouseDown) {
                cursor.classList.remove('clicked2');
                cursor.classList.add('clicked1');
            }
        });
    });

    /* 3. Mouse down anywhere on page */
    document.addEventListener('mousedown', () => {
        isMouseDown = true;

        /* Apply different effects based on cursor state */
        if (cursor.classList.contains('active')) {
            cursor.classList.add('clicked2'); /* Orange while over interactive element */
        } else {
            cursor.classList.add('clicked1'); /* Green while over normal area */
        }
    });

    /* 4. Mouse up - Remove click effects */
    document.addEventListener('mouseup', () => {
        isMouseDown = false;

        cursor.classList.remove('clicked1');
        cursor.classList.remove('clicked2');
    });

    /* 5. Mouse leave/enter screen - Show/Hide cursor */
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0'; /* Hide when leaving */
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1'; /* Show when entering */
    });
}
 else {
    /* Error handling */
    console.error("ERROR: '.cursor-follower' element not found in HTML!");
}

/* ===== PAGE LOAD ANIMATION ===== */
window.addEventListener('load', () => {
    /* Fade in body on page load */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 2s ease-in-out';
    document.body.style.opacity = '1';
});