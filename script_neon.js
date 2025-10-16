// Enhanced JavaScript для неонового Python сайта-визитки

// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Анимация бургер-меню
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = hamburger.classList.contains('active') 
                ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translateY(${index === 1 ? 0 : index === 0 ? 7 : -7}px)`
                : 'none';
        });
    });

    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
            });
        });
    });
}

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Улучшенная анимация навигации при прокрутке
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;

    if (navbar) {
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '2px solid rgba(59, 130, 246, 0.4)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(59, 130, 246, 0.2)';
        }

        // Скрытие/показ навигации при прокрутке
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }

    lastScrollY = currentScrollY;
});

// Расширенный Intersection Observer для анимаций
const observerOptions = {
    threshold: [0.1, 0.5],
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Специальные анимации для разных секций
            if (entry.target.classList.contains('skills')) {
                setTimeout(() => animateSkills(), 300);
            }

            if (entry.target.classList.contains('about-stats')) {
                setTimeout(() => animateStats(), 200);
            }

            if (entry.target.classList.contains('projects')) {
                setTimeout(() => animateProjects(), 400);
            }

            // Анимация timeline элементов
            if (entry.target.classList.contains('timeline-item')) {
                const content = entry.target.querySelector('.timeline-content');
                if (content) {
                    content.style.animation = 'slideInFromSide 0.8s ease-out forwards';
                }
            }
        }
    });
}, observerOptions);

// Добавляем наблюдение за элементами
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = [
        'section', '.about-stats', '.skill-item', '.project-item', 
        '.timeline-item', '.feature-item', '.contact-item'
    ].join(', ');

    document.querySelectorAll(elementsToObserve).forEach(el => {
        el.classList.add('fade-in');
        animationObserver.observe(el);
    });
});

// Анимация прогресс-баров навыков с неоновыми эффектами
function animateSkills() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';

            // Добавляем pulsing эффект к заполненным барам
            setTimeout(() => {
                bar.style.animation = 'skillPulse 2s ease-in-out infinite alternate';
            }, 1000);
        }, index * 100);
    });
}

// Анимация статистики с эффектом печатающихся чисел
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);

                // Добавляем glow эффект после завершения анимации
                stat.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.8)';
            }

            let displayValue = Math.floor(current);
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';

            stat.textContent = displayValue;
        }, 16);
    });
}

// Анимация появления проектов
function animateProjects() {
    const projects = document.querySelectorAll('.project-item');
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.style.animation = 'projectAppear 0.8s ease-out forwards';
        }, index * 200);
    });
}

// Обработка формы контактов с улучшенной валидацией
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();

        // Улучшенная валидация
        const errors = [];

        if (!name || name.length < 2) {
            errors.push('Имя должно содержать минимум 2 символа');
        }

        if (!email || !isValidEmail(email)) {
            errors.push('Введите корректный email адрес');
        }

        if (!subject || subject.length < 5) {
            errors.push('Тема должна содержать минимум 5 символов');
        }

        if (!message || message.length < 10) {
            errors.push('Сообщение должно содержать минимум 10 символов');
        }

        if (errors.length > 0) {
            showNotification(errors.join('. '), 'error');
            return;
        }

        // Анимация отправки
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span class="btn-icon">⚙️</span>Отправляется...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'rgba(59, 130, 246, 0.3)';

        // Имитация отправки с реалистичной задержкой
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            showNotification('Сообщение успешно отправлено! Отвечу в ближайшее время.', 'success');
            this.reset();

        } catch (error) {
            showNotification('Произошла ошибка при отправке. Попробуйте еще раз.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }
    });
}

// Улучшенная валидация email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Система уведомлений с неоновыми эффектами
function showNotification(message, type = 'info') {
    // Удаляем существующее уведомление
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };

    const icons = {
        success: '✅',
        error: '❌', 
        info: 'ℹ️',
        warning: '⚠️'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-text">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(15, 15, 35, 0.95);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        border: 2px solid ${colors[type]};
        box-shadow: 0 0 20px ${colors[type]}40, 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        backdrop-filter: blur(10px);
        animation: notificationSlideIn 0.4s ease-out;
        font-family: 'Inter', sans-serif;
    `;

    // Добавляем стили для анимации уведомлений
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes notificationSlideIn {
                from {
                    transform: translateX(100%) scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) scale(1);
                    opacity: 1;
                }
            }

            @keyframes notificationSlideOut {
                from {
                    transform: translateX(0) scale(1);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%) scale(0.8);
                    opacity: 0;
                }
            }

            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s ease, transform 0.2s ease;
                padding: 0;
                margin: 0;
                line-height: 1;
            }

            .notification-close:hover {
                opacity: 1;
                transform: scale(1.1);
            }

            .notification-icon {
                font-size: 1.2rem;
            }

            .notification-text {
                flex: 1;
                line-height: 1.4;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Обработчик закрытия
    const closeBtn = notification.querySelector('.notification-close');
    const closeNotification = () => {
        notification.style.animation = 'notificationSlideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    };

    closeBtn.addEventListener('click', closeNotification);

    // Автоматическое закрытие через 5 секунд
    setTimeout(closeNotification, 5000);
}

// Эффект печатающегося текста для hero секции
function typeWriter() {
    const codeLines = document.querySelectorAll('.hero-text > div');

    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = `typeWriter 1s ease-out forwards`;
        }, index * 600);
    });
}

// Создание анимированных частиц в фоне
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    // Создаем частицы
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #3B82F6;
            border-radius: 50%;
            box-shadow: 0 0 6px #3B82F6;
            animation: floatParticle ${8 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }

    // Добавляем стили анимации частиц
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(particleContainer);
}

// Параллакс эффект для hero секции
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const codeRain = document.querySelector('.code-rain');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (codeRain) {
        codeRain.style.transform = `translateY(${scrolled * 0.1}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Ripple эффект для кнопок
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn')) {
        const button = e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // Добавляем анимацию ripple
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Улучшенная анимация логотипа
function animateLogo() {
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'logoGlow 0.5s ease-out';
        });

        logo.addEventListener('animationend', () => {
            logo.style.animation = 'neonPulse 2s ease-in-out infinite alternate';
        });
    }
}

// Добавляем стили для анимаций
function addAnimationStyles() {
    if (!document.querySelector('#additional-animations')) {
        const style = document.createElement('style');
        style.id = 'additional-animations';
        style.textContent = `
            @keyframes slideInFromSide {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes projectAppear {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @keyframes skillPulse {
                0% {
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                }
                100% {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.4);
                }
            }

            @keyframes logoGlow {
                0% {
                    text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
                }
                50% {
                    text-shadow: 0 0 30px rgba(0, 217, 255, 1), 0 0 40px rgba(59, 130, 246, 0.8);
                }
                100% {
                    text-shadow: 0 0 20px rgba(0, 217, 255, 0.8), 0 0 30px rgba(59, 130, 246, 0.6);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    // Закрываем мобильное меню при изменении размера экрана
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
            });
        }
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем дополнительные стили анимаций
    addAnimationStyles();

    // Запуск анимации печатающегося текста
    setTimeout(typeWriter, 1000);

    // Создание частиц
    createParticles();

    // Анимация логотипа
    animateLogo();

    // Добавляем класс loaded для дополнительных анимаций
    document.body.classList.add('loaded');

    // Добавляем плавное появление всех элементов
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Предзагрузка изображений
function preloadImages() {
    const images = [
        'img/avatar.jpg',
        'img/favicon.ico'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Запуск предзагрузки
preloadImages();

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';

            // Добавляем placeholder для аватара
            if (this.alt && this.alt.includes('avatar')) {
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 4rem;
                    color: white;
                    box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
                `;
                placeholder.textContent = '👨‍💻';
                this.parentNode.appendChild(placeholder);
            }
        });
    });
});

console.log('%c🚀 KodoDrive Portfolio Loaded', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
console.log('%cPython Full Stack Developer', 'color: #8B5CF6; font-size: 14px;');