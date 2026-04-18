    const cursor = document.querySelector('.cursor-follower');

    if (cursor) {
        // 1. Basılı tutma durumunu takip eden değişken
        let isMouseDown = false;

        // 2. Fare hareketi (İmleci takip ettir)
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = (e.clientX - 10) + 'px';
            cursor.style.top = (e.clientY - 10) + 'px';
        });

        // 3. Linklerin ve butonların üzerine gelme mantığı
        const links = document.querySelectorAll('a, button, .headline h1, .headline p');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                
                // YENİ: Eğer fare basılıyken linke girersek clicked2 (turuncu tık) yap
                if (isMouseDown) {
                    cursor.classList.remove('clicked1');
                    cursor.classList.add('clicked2');
                }
            });

            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                
                // YENİ: Linkten çıkınca eğer hala basılıysa normal tıklama rengine (clicked1) dön
                if (isMouseDown) {
                    cursor.classList.remove('clicked2');
                    cursor.classList.add('clicked1');
                }
            });
        });

        // 4. Sayfada herhangi bir yerde basma ve bırakma
        document.addEventListener('mousedown', () => {
            isMouseDown = true; // Basılı tutulduğunu hatırla
            
            if (cursor.classList.contains('active')) {
                cursor.classList.add('clicked2');
            } else {
                cursor.classList.add('clicked1');
            }
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false; // Bırakıldığını hatırla
            
            // Hafif bir gecikmeyle efektleri temizle
            setTimeout(() => {
                cursor.classList.remove('clicked1');
                cursor.classList.remove('clicked2');
            }, 100);
        });

        // 5. Ekrandan çıkma/girme (Görünürlük)
        document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

    } else {
        console.error("Hata: '.cursor-follower' bulunamadı!");
    }