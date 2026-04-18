/* Start cursor follower */
const cursor = document.querySelector('.cursor-follower');
const interactiveElements = document.querySelectorAll('a, button, [role="button"], .headline');
if (cursor) {

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        let PosX = 0;
        let PosY = 0;

        cursor.classList.add('is-mobile');

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                cursor.style.transition = 'opacity 0.01s ease-in-out';
                cursor.style.opacity = '0.8';
                cursor.style.transform = 'scale(1)';
            
                cursor.classList.add('is-hover');

                PosX = e.touches[0].clientX - 6;
                PosY = e.touches[0].clientY - 6;

                cursor.style.left = PosX + 'px';
                cursor.style.top = PosY + 'px';
            });

            element.addEventListener('touchend', () => {
                cursor.style.transition = 'opacity 0.6s ease-in-out';
                cursor.style.opacity = '0';
                cursor.style.transform = 'scale(0.5)';
            
                cursor.classList.remove('is-hover');
            });

            element.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                PosX = e.touches[0].clientX - 6;
                PosY = e.touches[0].clientY - 6;
                
                cursor.style.left = PosX + 'px';
                cursor.style.top = PosY + 'px';
            }});
        });
        document.addEventListener('touchstart', (e) => {
            
            cursor.style.transition = 'opacity 0.01s ease-in-out';
            cursor.style.opacity = '0.8';
            cursor.style.transform = 'scale(1)';

            PosX = e.touches[0].clientX - 6;
            PosY = e.touches[0].clientY - 6;

            cursor.style.left = PosX + 'px';
            cursor.style.top = PosY + 'px';
        });

        document.addEventListener('touchmove', (e) => {
            
            if (e.touches.length > 0) {
                PosX = e.touches[0].clientX - 6;
                PosY = e.touches[0].clientY - 6;
                
                cursor.style.left = PosX + 'px';
                cursor.style.top = PosY + 'px';
            }
        });

        document.addEventListener('touchend', () => {

            cursor.style.transition = 'opacity 0.1s ease-in-out';
            cursor.style.opacity = '0';
            cursor.style.transform = 'scale(0.5)';
        });

    } else {
        let isMouseDown = false;
        let lastX = 0;
        let lastY = 0;

        /* 1. ================Mouse movement - Make it follow the mouse================ */

        document.addEventListener('mousemove', (e) => {
            lastX = e.clientX - 8;
            lastY = e.clientY - 8;

            /* Calculate new position */
            cursor.style.left = lastX + 'px';
            cursor.style.top = lastY + 'px';
        });

        /* 2. ================Hover effects on links and buttons================ */

        /* Add listener to each element */
        interactiveElements.forEach(element => {
            /* When mouse enters the element */
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active'); /* Add active class */

                /* If mouse is down apply clicked2 effect */
                if (isMouseDown) {
                    cursor.classList.remove('clicked1');
                    cursor.classList.add('clicked2');
                }
            });

            /* When mouse leaves the element */
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active'); /* Remove active class */

                /* If mouse is down apply clicked1 effect */
                if (isMouseDown) {
                    cursor.classList.remove('clicked2');
                    cursor.classList.add('clicked1');
                }
            });
        });

        /* 3. ================Random click on page================ */

        document.addEventListener('mousedown', () => {
            isMouseDown = true; /* Save mouse down state */

            /* If cursor is active, apply clicked2 effect, else apply clicked1 effect */
            if (cursor.classList.contains('active')) {
                cursor.classList.add('clicked2');
            } else {
                cursor.classList.add('clicked1');
            }
        });

        /* 4. ================Remove effects when mouse is released================ */

        document.addEventListener('mouseup', () => {
            isMouseDown = false; /* Reset mouse down state */

            /* Remove effects */
            cursor.classList.remove('clicked1');
            cursor.classList.remove('clicked2');
        });

        /* 5. ================Enter/Leave from screen - Show/Hide cursor================ */

        /* Hide cursor if mouse leaves the document */
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        /* Show cursor if mouse enters the document */
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        }
    }
else {
    /* Write error message to console if cursor-follower div is not found */
    console.error("HATA: '.cursor-follower' div'i HTML'de bulunamadı!");
}