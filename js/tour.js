/* ============================================================
   TRACA — Visite Guidée (V1.3 - Ajustements Fins)
   ============================================================ */

const TOUR_STEPS = [
    { path: '/index.html', audio: '/audio/guided-tour/home_intro.mp3' },
    { path: '/explorer.html', audio: '/audio/guided-tour/explorer.mp3' },
    { path: '/lieux/funeraire.html', audio: '/audio/guided-tour/lieu.mp3' },
    { path: '/carte.html', audio: '/audio/guided-tour/carte.mp3' },
    { path: '/articles.html', audio: '/audio/guided-tour/articles.mp3' },
    { path: '/contact.html', audio: '/audio/guided-tour/contact.mp3' }
];

const AMBIENCE_AUDIO_URL = '/audio/guide_ambience.mp3';

/* ====================================================================
   SCROLL LIEUX — Réglage direct de la vitesse (px/sec)
   → Modifier cette valeur unique pour ajuster le scroll du chapitre Lieux
   → Plus la valeur est BASSE, plus le scroll est LENT et confortable
   → Recommandé : 35 à 50 px/s  |  Actuel : 40 px/s
   ==================================================================== */
const SCROLL_SPEED_LIEUX = 40;

class GuidedTour {
    constructor() {
        this.isActive = sessionStorage.getItem('traca_tour_active') === 'true';
        let p = window.location.pathname;
        if (p === '/' || p === '') p = '/index.html';
        this.currentPath = p;

        this.currentIndex = TOUR_STEPS.findIndex(step =>
            step.path === this.currentPath || step.path.replace('.html', '') === this.currentPath
        );

        this.audioElement = null;
        this.ambienceAudio = null;
        this.scrollAnimation = null;
        this.mapRotationAnimation = null;
        this.isScrolling = false;

        this.boundInterruptionHandler = this.handleUserInterruption.bind(this);
        this.interrupted = false;
        this.autoNextTimeout = null;

        document.addEventListener('DOMContentLoaded', () => this.init());
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(() => this.init(), 100);
        }

        window.addEventListener('beforeunload', () => {
            if (this.isActive && this.ambienceAudio) {
                sessionStorage.setItem('traca_ambience_time', this.ambienceAudio.currentTime);
            }
        });
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;

        this.injectStyles();

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('skipIntro') === 'true') {
            window.history.replaceState({}, document.title, window.location.pathname);
            document.body.classList.remove('tour-no-scroll');
        }

        if (!this.isActive && (this.currentPath === '/index.html' || this.currentPath === '/')) {
            this.injectStartButton();
        }

        if (this.isActive) {
            const savedTime = sessionStorage.getItem('traca_ambience_time');
            this.resumeAmbience(savedTime ? parseFloat(savedTime) : 0);

            if (this.currentIndex !== -1) {
                this.injectUnifiedToast();
                setTimeout(() => this.startChapter(), 500);
            } else {
                this.injectUnifiedToast();
                this.highlightSkipButton();
            }
        }
    }

    injectStyles() {
        if (document.getElementById('traca-tour-style')) return;
        const style = document.createElement('style');
        style.id = 'traca-tour-style';
        style.textContent = `
            .tour-no-scroll { overflow: hidden !important; touch-action: none; }
            
            #tour-start-btn {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 1000;
                background: rgba(201,150,58,0.9);
                color: var(--white);
                border: 1px solid rgba(249,246,239,0.2);
                padding: 12px 24px;
                border-radius: 30px;
                font-family: var(--font-sans);
                font-size: 0.75rem;
                font-weight: 500;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                cursor: pointer;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #tour-start-btn:hover {
                transform: translateY(-2px);
                background: var(--gold);
                box-shadow: 0 6px 20px rgba(201,150,58,0.4);
            }

            #tour-unified-toast {
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%) translateY(20px);
                z-index: 10000;
                background: rgba(10, 8, 7, 0.85);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(249, 246, 239, 0.15);
                padding: 12px 20px;
                border-radius: 30px;
                display: flex;
                align-items: center;
                gap: 16px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.4s, transform 0.4s;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                overflow: hidden;
            }
            #tour-unified-toast.active {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
                pointer-events: all;
            }
            .tour-toast-actions {
                display: flex;
                gap: 8px;
            }
            .tour-toast-actions button {
                background: transparent;
                border: 1px solid transparent;
                color: rgba(249, 246, 239, 0.85);
                padding: 6px 14px;
                border-radius: 20px;
                font-family: var(--font-sans);
                font-size: 0.7rem;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                cursor: pointer;
                transition: background 0.3s, color 0.3s, border-color 0.4s;
            }
            #toast-btn-skip:hover { background: rgba(249, 246, 239, 0.1); color: var(--ivory); }
            #toast-btn-quit:hover { background: rgba(201, 150, 58, 0.15); color: var(--gold); border-color: rgba(201,150,58,0.4); }
            
            /* Clignotement du bouton Passer / Auto-suite */
            .tour-btn-pulse {
                animation: pulseSkipBtn 2s infinite ease-in-out;
                border-color: rgba(201,150,58,0.4) !important;
                color: var(--gold) !important;
            }
            @keyframes pulseSkipBtn {
                0% { box-shadow: 0 0 0 0 rgba(201,150,58,0.3); }
                50% { box-shadow: 0 0 0 8px rgba(201,150,58,0); }
                100% { box-shadow: 0 0 0 0 rgba(201,150,58,0); }
            }
            
            /* Indicateur audio You */
            .tour-audio-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: rgba(249, 246, 239, 0.1);
                color: rgba(249, 246, 239, 0.6);
                font-size: 0.75rem;
                transition: all 0.3s;
            }
            .tour-audio-indicator.playing {
                background: rgba(201, 150, 58, 0.2);
                color: var(--gold);
                animation: glowYouBtn 1.5s infinite alternate ease-in-out;
            }
            @keyframes glowYouBtn {
                from { box-shadow: 0 0 5px rgba(201,150,58,0.3); transform: scale(1); }
                to { box-shadow: 0 0 15px rgba(201,150,58,0.8); transform: scale(1.05); }
            }
            
            .tour-toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                background: var(--gold);
                width: 0%;
                opacity: 0;
                transition: opacity 0.3s;
            }
            .tour-toast-progress.running {
                opacity: 1;
                animation: toastProgress 4s linear forwards;
            }
            @keyframes toastProgress {
                100% { width: 100%; }
            }

            #tour-transition-overlay {
                position: fixed;
                inset: 0;
                background: var(--ink);
                z-index: 20000;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
            }
            #tour-transition-overlay.active {
                opacity: 1;
                pointer-events: all;
            }

            .tour-popup-overlay {
                position: fixed;
                inset: 0;
                background: rgba(10, 8, 7, 0.75);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.4s, visibility 0.4s;
            }
            .tour-popup-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .tour-popup {
                background: rgba(26, 22, 18, 0.85);
                color: var(--ivory);
                padding: 48px;
                border-radius: 8px;
                border: 1px solid rgba(249, 246, 239, 0.15);
                max-width: 440px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 50px rgba(0,0,0,0.6);
                transform: translateY(15px) scale(0.97);
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .tour-popup-overlay.active .tour-popup {
                transform: translateY(0) scale(1);
            }
            .tour-popup-title {
                font-family: var(--font-serif);
                font-size: 1.8rem;
                color: var(--gold);
                margin-bottom: 20px;
                font-weight: 400;
                line-height: 1.2;
            }
            .tour-popup-text {
                font-family: var(--font-sans);
                font-size: 0.95rem;
                color: rgba(249, 246, 239, 0.8);
                line-height: 1.7;
                margin-bottom: 36px;
            }
            .tour-popup-actions {
                display: flex;
                flex-direction: column;
                gap: 12px;
                align-items: center;
            }
            .tour-btn-primary {
                background: rgba(201,150,58,0.15);
                color: var(--gold);
                border: 1px solid var(--gold);
                padding: 12px 24px;
                border-radius: 4px;
                font-family: var(--font-sans);
                font-size: 0.7rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.2em;
                cursor: pointer;
                transition: all 0.3s;
                width: 100%;
                max-width: 260px;
            }
            .tour-btn-primary:hover {
                background: var(--gold);
                color: var(--white);
            }
            .tour-btn-secondary {
                background: transparent;
                color: rgba(249, 246, 239, 0.6);
                border: 1px solid transparent;
                padding: 10px 24px;
                font-family: var(--font-sans);
                font-size: 0.65rem;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                cursor: pointer;
                transition: all 0.3s;
            }
            .tour-btn-secondary:hover {
                color: var(--ivory);
            }

            @media (max-width: 768px) {
                #tour-start-btn { bottom: 20px; right: 20px; padding: 10px 20px; font-size: 0.7rem; }
                #tour-unified-toast { padding: 8px 14px; bottom: 20px; }
                .tour-toast-actions button { font-size: 0.6rem; padding: 6px 10px; }
            }
        `;
        document.head.appendChild(style);

        if (!document.getElementById('tour-transition-overlay')) {
            const trans = document.createElement('div');
            trans.id = 'tour-transition-overlay';
            document.body.appendChild(trans);
        }
    }

    injectStartButton() {
        if (document.getElementById('tour-start-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'tour-start-btn';
        btn.innerHTML = '▶ Visite guidée';
        btn.onclick = () => this.showStartPopup();
        document.body.appendChild(btn);
    }

    injectUnifiedToast() {
        if (document.getElementById('tour-unified-toast')) return;
        const toast = document.createElement('div');
        toast.id = 'tour-unified-toast';
        toast.innerHTML = `
            <div id="tour-audio-indicator" class="tour-audio-indicator">🔊</div>
            <div class="tour-toast-actions">
                <button id="toast-btn-skip">⏭ Passer</button>
                <button id="toast-btn-quit">✕ Quitter</button>
            </div>
            <div id="tour-toast-progress-bar" class="tour-toast-progress"></div>
        `;
        document.body.appendChild(toast);

        // Events
        document.getElementById('toast-btn-skip').onclick = () => {
            if (this.autoNextTimeout) this.clearAutoNext();
            this.skipChapter();
        };
        document.getElementById('toast-btn-quit').onclick = () => {
            if (this.autoNextTimeout) this.clearAutoNext();
            this.quitTour();
        };

        requestAnimationFrame(() => toast.classList.add('active'));
    }

    highlightSkipButton() {
        const skip = document.getElementById('toast-btn-skip');
        if (skip) {
            skip.classList.add('tour-btn-pulse');
            skip.innerHTML = '⏭ Auto-suite...';
        }
    }

    /* Interruption: Rend le contrôle immédiatement à l'utilisateur */
    listenForInterruption() {
        this.interrupted = false;
        document.addEventListener('wheel', this.boundInterruptionHandler, { passive: true });
        document.addEventListener('touchstart', this.boundInterruptionHandler, { passive: true });
        document.addEventListener('mousedown', this.boundInterruptionHandler, { passive: true });
    }

    removeInterruptionListeners() {
        document.removeEventListener('wheel', this.boundInterruptionHandler);
        document.removeEventListener('touchstart', this.boundInterruptionHandler);
        document.removeEventListener('mousedown', this.boundInterruptionHandler);
    }

    handleUserInterruption(e) {
        if (!this.isActive || this.interrupted) return;

        // Ignorer les clics sur l'interface du tour
        if (e && e.target && e.target.closest && e.target.closest('#tour-control-panel, #tour-start-btn, .tour-popup-overlay, #tour-unified-toast')) {
            return;
        }

        // Vérifier si le clic est sur une zone interactive (lien, bouton, carte, etc.)
        const isInteractive = e && e.target && e.target.closest && e.target.closest('a, button, input, select, textarea, canvas, iframe, .leaflet-container, [role="button"], [tabindex]:not([tabindex="-1"])');

        // Gérer le clic ou touch (mousedown / touchstart)
        if (e && (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'click')) {
            if (isInteractive) {
                // Tâche unique Priorité 1 : Destruction complète de la visite guidée
                sessionStorage.removeItem('traca_tour_active');
                this.isActive = false;
                this.interrupted = true;
                this.removeInterruptionListeners();

                // Arrêt immédiat scroll / UX
                this.stopAutoScroll();
                this.cleanVisualEffects();
                this.clearAutoNext();

                // Destruction complète de l'UI
                const toast = document.getElementById('tour-unified-toast');
                if (toast) toast.remove();

                // Arrêt immédiat de TOUTES les voix et musiques (sans fade)
                if (this.audioElement) {
                    this.audioElement.pause();
                    this.audioElement.src = "";
                }
                if (this.ambienceAudio) {
                    this.ambienceAudio.pause();
                    this.ambienceAudio.src = "";
                }

                const startBtn = document.getElementById('tour-start-btn');
                if (startBtn) startBtn.style.display = 'block';

                return; // User reprend le contrôle 100%
            } else if (e.type === 'mousedown') {
                // Exception : Clic sur zone NON interactive ignoré.
                // Ne coupe pas l'audio ni le scroll.
                return;
            }
        }

        // --- Ancien comportement (pour le Wheel/Scroll manuel pur) ---
        this.interrupted = true;
        this.removeInterruptionListeners();

        // Tout stopper immédiatement
        this.stopAutoScroll();
        this.cleanVisualEffects();
        this.clearAutoNext();

        // Stopper l'audio vocal de manière abrupte mais légèrement fondue
        if (this.audioElement) {
            this.fadeAudioOut(this.audioElement, () => this.cleanAudio());
        }

        // Subtilement inviter l'utilisateur à passer au chapitre suivant quand il le voudra
        this.highlightSkipButton();
    }

    showStartPopup() {
        this.createPopup(
            'Visite Guidée',
            'Commencez une exploration sonore à travers le patrimoine algérien.<br><br>Laissez-vous guider, une ambiance auditive vous accompagne étape par étape. Vous pouvez reprendre le contrôle à tout instant.',
            [
                {
                    text: 'Commencer l\'expérience', class: 'tour-btn-primary', action: () => {
                        this.closePopup();
                        this.startTour();
                    }
                },
                { text: 'Non merci', class: 'tour-btn-secondary', action: () => this.closePopup() }
            ]
        );
    }

    createPopup(title, text, buttons) {
        if (this.popupEl) this.popupEl.remove();

        const overlay = document.createElement('div');
        overlay.className = 'tour-popup-overlay';
        document.body.classList.add('tour-no-scroll');

        let buttonsHtml = buttons.map((btn, i) => `<button class="${btn.class}" id="tour-popup-btn-${i}">${btn.text}</button>`).join('');

        overlay.innerHTML = `
            <div class="tour-popup">
                <h3 class="tour-popup-title">${title}</h3>
                <p class="tour-popup-text">${text}</p>
                <div class="tour-popup-actions">
                    ${buttonsHtml}
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        buttons.forEach((btn, i) => {
            document.getElementById(`tour-popup-btn-${i}`).onclick = btn.action;
        });

        requestAnimationFrame(() => overlay.classList.add('active'));
        this.popupEl = overlay;
    }

    closePopup() {
        if (this.popupEl) {
            this.popupEl.classList.remove('active');
            setTimeout(() => {
                if (this.popupEl) this.popupEl.remove();
                this.popupEl = null;
                if (!this.isScrolling && !this.isActive) {
                    document.body.classList.remove('tour-no-scroll');
                }
            }, 400);
        }
    }

    triggerTransition(callback) {
        this.removeInterruptionListeners();
        const trans = document.getElementById('tour-transition-overlay');
        if (trans) {
            trans.classList.add('active');
            setTimeout(() => {
                if (callback) callback();
            }, 800);
        } else {
            if (callback) callback();
        }
    }

    startTour() {
        sessionStorage.setItem('traca_tour_active', 'true');
        this.isActive = true;

        const startBtn = document.getElementById('tour-start-btn');
        if (startBtn) startBtn.style.display = 'none';

        this.injectUnifiedToast();

        if (this.currentIndex !== 0) {
            this.triggerTransition(() => {
                window.location.href = TOUR_STEPS[0].path;
            });
        } else {
            this.startAmbience(0);
            this.startChapter();
        }
    }

    startAmbience(startAt = 0) {
        if (this.ambienceAudio) return;
        this.ambienceAudio = new Audio(AMBIENCE_AUDIO_URL);
        this.ambienceAudio.loop = true;
        this.ambienceAudio.volume = 0.08;

        if (startAt > 0) {
            this.ambienceAudio.currentTime = startAt;
        }

        let playPromise = this.ambienceAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => console.warn("Ambience blocked: ", e));
        }
    }

    resumeAmbience(startAt = 0) {
        this.startAmbience(startAt);
    }

    fadeAudioIn(audio, targetVolume, durationMs) {
        if (!audio) return;
        const steps = 20;
        let v = audio.volume || 0;
        const diff = targetVolume - v;
        const stepAmount = diff / steps;

        const interval = setInterval(() => {
            v += stepAmount;
            if ((stepAmount > 0 && v >= targetVolume) || (stepAmount < 0 && v <= targetVolume)) {
                audio.volume = targetVolume;
                clearInterval(interval);
            } else {
                try { audio.volume = v; } catch (e) { }
            }
        }, durationMs / steps);
    }

    fadeAudioOut(audio, callback) {
        if (!audio) {
            if (callback) callback();
            return;
        }
        const fadeDuration = 800;
        const steps = 15;
        let v = audio.volume;
        const stepAmount = v / steps;

        const fadeInterval = setInterval(() => {
            v -= stepAmount;
            if (v <= 0) {
                clearInterval(fadeInterval);
                audio.pause();
                if (callback) callback();
            } else {
                try { audio.volume = v; } catch (e) { }
            }
        }, fadeDuration / steps);
    }

    cleanAudio() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = "";
            this.audioElement = null;
        }
    }

    quitTour() {
        sessionStorage.setItem('traca_tour_active', 'false');
        this.isActive = false;

        this.removeInterruptionListeners();

        this.fadeAudioOut(this.audioElement);
        this.fadeAudioOut(this.ambienceAudio, () => {
            if (this.ambienceAudio) {
                this.ambienceAudio.src = "";
                this.ambienceAudio = null;
            }
        });

        this.triggerTransition(() => {
            this.stopAutoScroll();
            this.cleanVisualEffects();

            if (this.currentPath !== '/index.html') {
                window.location.href = '/index.html?skipIntro=true';
            } else {
                window.location.href = '/index.html?skipIntro=true';
            }
        });
    }

    skipChapter() {
        this.fadeAudioOut(this.audioElement, () => {
            this.cleanAudio();
            this.triggerTransition(() => this.nextChapter());
        });
    }

    startChapter() {
        const step = TOUR_STEPS[this.currentIndex];
        if (!step) return;

        this.cleanAudio();

        const overlay = document.getElementById('intro-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 1000);
        }

        this.audioElement = new Audio(step.audio);
        this.audioElement.volume = 1.0;
        this.audioElement.preload = 'auto';

        // Appel .load() en premier pour déclencher le téléchargement AVANT d'attacher les listeners
        this.audioElement.load();

        this.audioElement.addEventListener('error', () => {
            console.error("Audio failed to load", step.audio);
            this.startVisuals(10);
            setTimeout(() => {
                if (this.isActive && !this.interrupted) this.highlightSkipButton();
            }, 10000);
        });

        this.audioFinished = false;
        this.scrollFinished = false;

        const onAudioReady = () => {
            if (!this.isActive) return;
            const durationSeconds = this.audioElement.duration || 30; // fallback 30s si durée inconnue

            // Délai de respirations (1s) avant la narration V1.6
            setTimeout(() => {
                if (!this.isActive || this.interrupted) return;

                this.audioElement.play().catch(e => {
                    console.warn("Autoplay blocked. Tour will scroll silently.", e);
                });

                this.startVisuals(durationSeconds);
                this.listenForInterruption();
            }, 1000);
        };

        // Vérifier si l'audio est déjà prêt (cache) après avoir appelé .load()
        if (this.audioElement.readyState >= 3) {
            onAudioReady();
        } else {
            this.audioElement.addEventListener('canplaythrough', onAudioReady, { once: true });
        }

        this.audioElement.addEventListener('play', () => {
            const ind = document.getElementById('tour-audio-indicator');
            if (ind) ind.classList.add('playing');
        });

        this.audioElement.addEventListener('pause', () => {
            const ind = document.getElementById('tour-audio-indicator');
            if (ind) ind.classList.remove('playing');
        });

        this.audioElement.addEventListener('ended', () => {
            const ind = document.getElementById('tour-audio-indicator');
            if (ind) ind.classList.remove('playing');
            if (this.isActive && !this.interrupted) {
                this.highlightSkipButton();
                this.audioFinished = true;
                this.checkAutoNext();
            }
        });

        this.prefetchNext();
    }

    checkAutoNext() {
        if (!this.isActive || this.interrupted) return;
        if (this.audioFinished && this.scrollFinished) {
            if (!this.autoNextTimeout) {
                this.triggerAutoNext();
            }
        }
    }

    triggerAutoNext() {
        // Fin de l'expérience sur la page de contact
        if (this.currentPath === '/contact.html' || this.currentPath === '/contact') {
            this.quitTour();
            return;
        }

        // Lancer la barre de progression (4s)
        const bar = document.getElementById('tour-toast-progress-bar');
        if (bar) bar.classList.add('running');

        this.autoNextTimeout = setTimeout(() => {
            if (this.isActive && !this.interrupted) {
                this.clearAutoNext();
                this.skipChapter();
            }
        }, 4000);
    }

    clearAutoNext() {
        if (this.autoNextTimeout) {
            clearTimeout(this.autoNextTimeout);
            this.autoNextTimeout = null;
        }
        const bar = document.getElementById('tour-toast-progress-bar');
        if (bar) bar.classList.remove('running');
    }

    prefetchNext() {
        const nextStep = TOUR_STEPS[this.currentIndex + 1];
        if (!nextStep) return;

        // Prefetch HTML page
        let htmlLink = document.querySelector(`link[rel="prefetch"][href="${nextStep.path}"]`);
        if (!htmlLink) {
            htmlLink = document.createElement('link');
            htmlLink.rel = 'prefetch';
            htmlLink.href = nextStep.path;
            document.head.appendChild(htmlLink);
        }

        // Preload Audio sequence
        let audioLink = document.querySelector(`link[rel="preload"][href="${nextStep.audio}"]`);
        if (!audioLink) {
            audioLink = document.createElement('link');
            audioLink.rel = 'preload';
            audioLink.as = 'fetch'; // works better across browsers for media
            audioLink.href = nextStep.audio;
            document.head.appendChild(audioLink);
        }
    }

    startVisuals(durationSeconds) {
        if (this.currentPath === '/carte.html') {
            this.startMapRotation(durationSeconds);
        } else {
            this.startAutoScroll(durationSeconds);
        }
        this.initHighlightEffects();
        this.initContactEffect();
    }

    getTargetY() {
        let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        let targetY = maxScroll;

        if (this.currentPath.startsWith('/lieux/')) {
            // Arrêt sur la section Expérience 3D (PAS le footer)
            const section3d = document.querySelector('.experience-section');
            if (section3d) {
                targetY = (section3d.getBoundingClientRect().top + window.scrollY) - (window.innerHeight * 0.3);
            } else {
                targetY = Math.round(maxScroll * 0.6);
            }
        } else {
            switch (this.currentPath) {
                case '/index.html': {
                    const el = document.querySelector('.section.background-ivory-dark'); // "Une vision institutionnelle"
                    if (el) targetY = (el.getBoundingClientRect().bottom + window.scrollY) - window.innerHeight + 100;
                    break;
                }
                case '/explorer.html': {
                    const el = document.querySelector('.section-sm.background-ink'); // "Ce lieu sont génériques"
                    if (el) targetY = (el.getBoundingClientRect().bottom + window.scrollY) - window.innerHeight + 100;
                    break;
                }
                case '/articles.html': {
                    // "scroll jusqu’à inscription email et footer."
                    targetY = maxScroll; // Aller jusqu'au bout garanti
                    break;
                }
                case '/contact.html': {
                    const el = document.querySelector('.form-submit'); // Bouton 'Envoyer le message'
                    if (el) targetY = (el.getBoundingClientRect().bottom + window.scrollY) - (window.innerHeight / 2);
                    break;
                }
            }
        }
        return Math.max(0, Math.min(targetY, maxScroll));
    }

    startAutoScroll(durationSeconds) {
        document.body.classList.add('tour-no-scroll');
        this.isScrolling = true;

        window.scrollTo(0, 0);
        const startY = 0;

        // On attend que la page se stabilise avant de calculer les hauteurs (800ms)
        setTimeout(() => {
            if (!this.isScrolling || this.interrupted) return;

            const targetY = this.getTargetY();
            const audioDurationMs = durationSeconds * 1000;

            // Vitesse de scroll : utiliser SCROLL_SPEED_LIEUX pour les pages Lieux
            const speedPxPerSec = this.currentPath.startsWith('/lieux/') ? SCROLL_SPEED_LIEUX : 75;
            let timeToScrollMs = targetY === 0 ? 0 : (targetY / speedPxPerSec) * 1000;

            // On calcule un délai pour que le scroll se termine exactement à la fin de l'audio (-500ms marge)
            let delayMs = audioDurationMs - timeToScrollMs - 500;
            let durationMs = timeToScrollMs;

            // Si le scroll prend plus de temps que l'audio (page trop longue),
            // on cale le scroll sur la durée exacte de l'audio (l'audio est le maître du rythme).
            if (delayMs < 0) {
                delayMs = 0;
                durationMs = audioDurationMs;
            }

            let startTime = null;

            const step = (timestamp) => {
                if (!this.isScrolling || this.interrupted) return;
                if (!startTime) startTime = timestamp;

                const elapsed = timestamp - startTime;
                const progress = durationMs > 0 ? Math.min(elapsed / durationMs, 1) : 1;

                // Fluid constant easing across all pages (Linear with soft easeOut towards end)
                const easeOutQuad = t => t * (2 - t);
                const currentY = startY + (easeOutQuad(progress)) * targetY;

                window.scrollTo({
                    top: currentY,
                    left: 0,
                    behavior: 'auto'
                });

                if (progress < 1) {
                    this.scrollAnimation = requestAnimationFrame(step);
                } else {
                    document.body.classList.remove('tour-no-scroll'); // Done scrolling, unlock

                    // Fin du scroll sur les pages Lieux : on libère juste le scroll,
                    // sans cliquer automatiquement sur l'expérience 3D (cela coupait l'audio).

                    this.scrollFinished = true;
                    this.checkAutoNext();
                }
            };

            if (durationMs > 0) {
                // Initialisation différée pour synchroniser la fin
                setTimeout(() => {
                    if (this.isScrolling && !this.interrupted) {
                        this.scrollAnimation = requestAnimationFrame(step);
                    }
                }, Math.max(0, delayMs));
            } else {
                this.scrollFinished = true;
                this.checkAutoNext();
            }
        }, 800);
    }

    stopAutoScroll() {
        this.isScrolling = false;
        if (this.scrollAnimation) cancelAnimationFrame(this.scrollAnimation);
        if (this.mapRotationAnimation) cancelAnimationFrame(this.mapRotationAnimation);
        if (this.mapTimeout) clearTimeout(this.mapTimeout);
        document.body.classList.remove('tour-no-scroll');
    }

    startMapRotation(durationSeconds) {
        this.isScrolling = true;
        document.body.classList.add('tour-no-scroll');

        const totalDurationMs = durationSeconds * 1000;
        const ORBIT_DELAY_MS = 1500; // Démarrage 1,5s après l'audio
        const orbitDurationMs = totalDurationMs - ORBIT_DELAY_MS;

        const attemptRotate = () => {
            if (!this.isScrolling || this.interrupted) return;
            const map = window.tracaMapInstance;
            if (!map) {
                this.mapTimeout = setTimeout(attemptRotate, 300);
                return;
            }

            let startTime = null;
            const startBearing = map.getBearing();

            // Pitch documentaire fixe
            map.setPitch(50);

            // Vitesse : rotation lente et constante (degrés par milliseconde)
            // ~0.004 rad/frame ≈ 0.23 deg/frame ≈ 14 deg/sec → ~360° sur 26s
            const degreesPerMs = 360 / orbitDurationMs;

            const step = (timestamp) => {
                if (!this.isScrolling || this.interrupted) return;
                if (!startTime) startTime = timestamp;

                const elapsed = timestamp - startTime;

                if (elapsed < orbitDurationMs) {
                    // Rotation linéaire pure — aucune accélération, aucun easing
                    const currentBearing = startBearing + (elapsed * degreesPerMs);
                    map.setBearing(currentBearing);

                    this.mapRotationAnimation = requestAnimationFrame(step);
                } else {
                    // Fin naturelle — arrêt propre
                    document.body.classList.remove('tour-no-scroll');
                    this.scrollFinished = true;
                    this.checkAutoNext();
                }
            };

            if (map.isStyleLoaded()) {
                this.mapRotationAnimation = requestAnimationFrame(step);
            } else {
                map.once('idle', () => {
                    this.mapRotationAnimation = requestAnimationFrame(step);
                });
            }
        };

        // Lancer l'orbite exactement 1,5s après le début de l'audio
        this.mapTimeout = setTimeout(() => {
            if (!this.interrupted) {
                attemptRotate();
            }
        }, ORBIT_DELAY_MS);
    }

    initHighlightEffects() {
        if (this.currentPath !== '/explorer.html' && this.currentPath !== '/articles.html') return;

        const cards = document.querySelectorAll('.site-card, .article-secondary-card, .article-featured');
        if (cards.length === 0) return;

        this.highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('tour-highlight');
                } else {
                    entry.target.classList.remove('tour-highlight');
                }
            });
        }, { threshold: 0.5, rootMargin: "-15% 0px -15% 0px" });

        cards.forEach(el => this.highlightObserver.observe(el));
    }

    initContactEffect() {
        if (this.currentPath !== '/contact.html') return;
        const btn = document.querySelector('.form-submit');
        if (btn) btn.classList.add('tour-pulse-element-green');
    }

    cleanVisualEffects() {
        if (this.highlightObserver) {
            this.highlightObserver.disconnect();
            document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
        }
        const pulse = document.querySelector('.tour-pulse-element');
        if (pulse) pulse.classList.remove('tour-pulse-element');
        const pulseGreen = document.querySelector('.tour-pulse-element-green');
        if (pulseGreen) pulseGreen.classList.remove('tour-pulse-element-green');

        const skip = document.getElementById('tour-btn-skip');
        if (skip) {
            skip.classList.remove('tour-btn-pulse');
            skip.innerHTML = '⏭ Passer le chapitre';
        }
    }

    nextChapter() {
        if (this.currentIndex >= TOUR_STEPS.length - 1) {
            // V1.6 : Fin automatique de la visite sans popup. On quitte.
            this.quitTour();
            return;
        }

        const nextIndex = this.currentIndex + 1;
        window.location.href = TOUR_STEPS[nextIndex].path;
    }
}

new GuidedTour();
