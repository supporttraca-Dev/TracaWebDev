import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollProgress() {
    // 1. Restriction : Seulement sur les pages Lieux ou Articles
    const path = window.location.pathname;
    const isLieuOrArticle = path.includes('/lieux/') || path.includes('/articles/') || document.body.classList.contains('is-lieu-page');
    
    // Si ce n'est pas une page longue de type "Lieu" ou "Article", on annule l'injection
    if (!isLieuOrArticle) return;

    // 2. Injecter le CSS
    const styleId = 'traca-scroll-progress-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .traca-scroll-indicator {
                position: fixed;
                right: 24px;
                top: 50%;
                transform: translateY(-50%);
                width: 12px;
                height: 25vh; /* Plus petite (25vh au lieu de 40vh) */
                z-index: 9999;
                
                pointer-events: none; /* Ne gêne jamais les clics */
                display: flex;
                flex-direction: column;
                align-items: center;
                opacity: 0; /* Apparaît au scroll */
                transition: opacity 0.6s ease;
            }

            .traca-scroll-indicator.is-visible {
                opacity: 1;
            }

            /* Le Rail Statique (La ligne très fine) */
            .traca-scroll-track {
                position: relative;
                width: 1px;
                height: 100%;
                background-color: rgba(201, 150, 58, 0.2); /* Doré semi-transparent */
            }

            /* Flèches haut et bas */
            .traca-scroll-arrow {
                width: 0; 
                height: 0; 
                border-left: 3px solid transparent;
                border-right: 3px solid transparent;
                margin: 4px 0;
            }
            .traca-scroll-arrow.top {
                border-bottom: 4px solid #C9963A;
            }
            .traca-scroll-arrow.bottom {
                border-top: 4px solid #C9963A;
            }

            /* Le Curseur Dynamique (La Pilule Or) */
            .traca-scroll-thumb {
                position: absolute;
                top: 0; /* Géré en JS via GSAP */
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 24px; /* Plus petite */
                background-color: #C9963A; /* La couleur OR du site */
                box-shadow: 0 0 12px rgba(201, 150, 58, 0.6); /* Halo lumineux doré */
                border-radius: 4px;
                will-change: top;
            }
        `;
        document.head.appendChild(style);
    }

    // 3. Injecter le HTML
    const trackHTML = `
        <div class="traca-scroll-indicator" id="traca-scroll-progress" aria-hidden="true">
            <div class="traca-scroll-arrow top"></div>
            <div class="traca-scroll-track" id="traca-scroll-track-element">
                <div class="traca-scroll-thumb" id="traca-scroll-thumb-element"></div>
            </div>
            <div class="traca-scroll-arrow bottom"></div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', trackHTML);

    const indicatorContainer = document.getElementById('traca-scroll-progress');
    const thumb = document.getElementById('traca-scroll-thumb-element');

    // 4. Moteur GSAP ScrollTrigger
    // On lie la position top (0% à 100%) au défilement de la page entière
    ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            const progress = self.progress; // de 0.0 à 1.0

            // -- Apparition après 5% de scroll ET Disparition à la fin (< 98%)
            if (progress > 0.05 && progress < 0.98) {
                indicatorContainer.classList.add('is-visible');
            } else {
                indicatorContainer.classList.remove('is-visible');
            }

            // -- Déplacement fluide du curseur (24px de hauteur pour la thumb)
            gsap.set(thumb, { top: `calc(${progress * 100}% - ${progress * 24}px)` });
        }
    });
}
