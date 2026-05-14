document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => scrollObserver.observe(el));

    const slides = document.querySelectorAll('.gallery-slide');
    const dotsContainer = document.querySelector('.gallery-dots');
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    let currentSlide = 0;

    if (slides.length > 0 && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        prevBtn.addEventListener('click', () => updateSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => updateSlide(currentSlide + 1));
    }
    const modal = document.getElementById('modal');
    const openBtns = document.querySelectorAll('.open-modal');
    const closeBtn = document.querySelector('.close-modal');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');

            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = 'Поле не может быть пустым';
                isValid = false;
            }
            const phoneDigits = phone.value.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                document.getElementById('phoneError').textContent = 'Введите корректный номер (мин. 10 цифр)';
                isValid = false;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                document.getElementById('emailError').textContent = 'Неверный формат email';
                isValid = false;
            }

            if (isValid) {
                alert('✅ Заявка успешно отправлена!');
                contactForm.reset();
            }
        });
    }
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = ''; 
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.style.color = '#ffffff';
                link.style.fontWeight = 'bold';
            }
        });
    });

});




    const closeModal = () => {
        modal.classList.remove('open');
        document.body.classList.remove('modal-lock');
        form.reset(); // Очищаем поля при закрытии
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));

    // 2. Закрытие по крестику
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // 3. Закрытие по клику на синий фон (вне окна)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 4. Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // 5. Обработка отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Здесь можно добавить отправку данных на сервер (fetch/AJAX)
        // Пока просто показываем уведомление и закрываем
        alert('Заявка отправлена! Менеджер свяжется c вами в ближайшее время.');
        
        closeModal();
    });