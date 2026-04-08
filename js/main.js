/* ============================================================
   TRACA — Shared JavaScript
   ============================================================ */
import './tour.js';

// ── Nav & Back-to-Top scroll effects ────────────────────────
const nav = document.getElementById('nav');
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Scroll reveal (IntersectionObserver) ──────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));


// ── Feature list staggered reveal ─────────────────────────────
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.feature-item');
            items.forEach((item, i) => {
                setTimeout(() => item.classList.add('visible'), i * 120);
            });
            featureObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-list').forEach(el => featureObserver.observe(el));

// ── 3D Experience Launcher ─────────────────────────────────────
const launcher = document.getElementById('experience-launcher');
const heroLauncher = document.getElementById('experience-launcher-hero');
const iframeContainer = document.getElementById('sketchfab-container');

const launch3D = () => {
    if (!launcher || !iframeContainer) return;
    launcher.classList.add('launching');

    // Smooth transition
    setTimeout(() => {
        launcher.style.display = 'none';
        iframeContainer.classList.add('active');

        // Set iframe src on click (performance: lazy load)
        const iframe = iframeContainer.querySelector('iframe');
        if (iframe && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
        }
    }, 600);
};

if (launcher) {
    launcher.addEventListener('click', launch3D);
}
if (heroLauncher) {
    heroLauncher.addEventListener('click', launch3D);
}

// ── Audio Player (Real Playback) ───────────────────────────────
const audioToggle = document.getElementById('audio-toggle');
const audioWave = document.getElementById('audio-wave');
const audioElement = document.getElementById('audio-element');
const audioMute = document.getElementById('audio-mute');
const volumeSlider = document.getElementById('volume-slider');

if (audioToggle && audioElement) {
    let isPlaying = false;

    audioToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        audioToggle.classList.toggle('playing', isPlaying);
        if (audioWave) audioWave.classList.toggle('active', isPlaying);

        if (isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }

        const label = audioToggle.querySelector('.audio-label');
        if (label) {
            label.textContent = isPlaying ? 'Pause la narration' : 'Écouter la narration';
        }
    });

    audioElement.addEventListener('ended', () => {
        isPlaying = false;
        audioToggle.classList.remove('playing');
        if (audioWave) audioWave.classList.remove('active');
        const label = audioToggle.querySelector('.audio-label');
        if (label) label.textContent = 'Écouter la narration';
    });

    // Volume & Mute Logic
    if (audioMute && volumeSlider) {
        let lastVolume = 1;

        volumeSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            audioElement.volume = val;
            audioElement.muted = (val == 0);
            updateMuteIcon(val == 0);
            if (val > 0) lastVolume = val;
        });

        audioMute.addEventListener('click', () => {
            audioElement.muted = !audioElement.muted;
            if (audioElement.muted) {
                volumeSlider.value = 0;
            } else {
                volumeSlider.value = lastVolume;
            }
            updateMuteIcon(audioElement.muted);
        });

        const updateMuteIcon = (isMuted) => {
            audioMute.textContent = isMuted ? '🔇' : '🔊';
        };
    }
}

// ── Site Cards Hover (explorer page) ──────────────────────────
document.querySelectorAll('.site-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.site-card').forEach(c => {
            if (c !== card) c.classList.add('dimmed');
        });
    });
    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.site-card').forEach(c => c.classList.remove('dimmed'));
    });
});

// ── Language Toggle ────────────────────────────────────────────
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    let currentLang = 'fr';
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        langToggle.textContent = currentLang.toUpperCase();
        document.documentElement.lang = currentLang;
        // Visual feedback only for MVP
        langToggle.classList.add('switching');
        setTimeout(() => langToggle.classList.remove('switching'), 300);
    });
}

// ── Gallery Lightbox (Enhanced & Navigable) ────────────────────
const museumGallery = document.querySelector('.gallery-grid-museum');
if (museumGallery) {
    const items = Array.from(museumGallery.querySelectorAll('.gallery-museum-inner'));
    const lightbox = document.createElement('div');
    lightbox.className = 'traca-lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Fermer">×</button>
        <button class="lightbox-prev" aria-label="Précédent">‹</button>
        <button class="lightbox-next" aria-label="Suivant">›</button>
        <div class="lightbox-content">
            <div class="lightbox-img-wrap">
                <img src="" alt="Agrandissement" class="lightbox-img">
            </div>
            <div class="lightbox-counter">0 / 0</div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector('.lightbox-img');
    const counter = lightbox.querySelector('.lightbox-counter');
    let currentIndex = 0;

    const updateLightbox = (index) => {
        currentIndex = index;
        const item = items[currentIndex];
        // Extract URL from background-image: url("...")
        const style = item.style.backgroundImage || window.getComputedStyle(item).backgroundImage;
        const url = style.replace(/url\(['"]?(.*?)['"]?\)/, '$1');

        img.style.opacity = '0';
        setTimeout(() => {
            img.src = url;
            img.onload = () => { img.style.opacity = '1'; };
            counter.textContent = `${currentIndex + 1} / ${items.length}`;
        }, 200);
    };

    const openLightbox = (index) => {
        updateLightbox(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const nextImage = () => {
        updateLightbox((currentIndex + 1) % items.length);
    };

    const prevImage = () => {
        updateLightbox((currentIndex - 1 + items.length) % items.length);
    };

    // Events
    items.forEach((item, index) => {
        item.parentElement.addEventListener('click', () => openLightbox(index));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target.classList.contains('lightbox-content')) closeLightbox(); });

    // Keyboard Nav
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    });
}

// ── Internal Smooth Scroll (Narrative) ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ── Intro Video Logic (Index Only) ──────────────────────────────
(function () {
    const overlay = document.getElementById('intro-overlay');
    const video = document.getElementById('intro-video');

    // Only execute if we are on the page containing the video
    if (!overlay || !video) return;

    const urlParams = new URLSearchParams(window.location.search);
    const isForceIntro = urlParams.get('forceIntro') === 'true';
    const isTourActive = sessionStorage.getItem('traca_tour_active') === 'true';
    const hasIntroPlayed = sessionStorage.getItem('traca_intro_played') === 'true';

    // Règle 1 : On nettoie d'abord l'URL paramètre si présent
    if (isForceIntro) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Règle 2 : Ne JAMAIS afficher si visite guidée en cours ou retour via skipIntro
    if (isTourActive || urlParams.get('skipIntro') === 'true') {
        overlay.style.display = 'none';
        overlay.remove();
        return;
    }

    // Règle 3 : Affichage conditionnel (1ere visite ou clic logo)
    if (hasIntroPlayed && !isForceIntro) {
        overlay.style.display = 'none';
        overlay.remove();
        return;
    }

    // Afficher l'intro
    sessionStorage.setItem('traca_intro_played', 'true'); // On marque comme vue

    const FADE_MS = 600;

    function dismiss() {
        if (overlay._dismissed) return;
        overlay._dismissed = true;
        overlay.style.transition = `opacity ${FADE_MS}ms ease`;
        overlay.style.opacity = '0';
        setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, FADE_MS + 50);
    }

    // Sélection dynamique de la source vidéo (Mobile vs Desktop)
    const isMobile = window.innerWidth <= 768;
    video.src = isMobile ? '/videos/intro-mobile.mp4' : '/videos/intro.mp4';

    // On s'assure que la vidéo se lance sans encombre avec l'audio
    video.muted = false;
    const p = video.play();

    if (p !== undefined) {
        p.catch(() => {
            // Si blocage navigateur (Autoplay Policy), on tente en muted (automatique, pas de bouton)
            video.muted = true;
            video.play().catch(dismiss);
        });
    }

    video.addEventListener('ended', dismiss);
    video.addEventListener('error', dismiss);

    // Sécurité anti-freeze
    setTimeout(() => {
        dismiss();
    }, Math.max((video.duration || 10) * 1000 + 1000, 15000));
})();

// ── Globals utils (FAQ, etc) ──────────────────────────────────────────
// FAQ Accordion
document.querySelectorAll('.faq-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-accordion-item.open').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-accordion-btn').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});
