import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Initialisation de l'internationalisation
 */
export async function initI18n() {
  await i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'fr',
      supportedLngs: ['fr', 'en'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      // Ne pas échapper le HTML pour permettre les balises comme <br> ou <em> dans la trad
      interpolation: {
        escapeValue: false, 
      }
    });

  // Met à jour tout le DOM initial
  updateDOM();

  // Écouteur sur le bouton de langue
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    // Affiche la langue opposée à l'actuelle (si on est en fr, le text dit EN)
    langToggleBtn.textContent = i18next.language === 'fr' ? 'EN' : 'FR';

    langToggleBtn.addEventListener('click', async () => {
      const currentLang = i18next.language;
      const nextLang = currentLang === 'fr' ? 'en' : 'fr';
      
      await i18next.changeLanguage(nextLang);
      
      langToggleBtn.textContent = nextLang === 'fr' ? 'EN' : 'FR';
      updateDOM();
    });
  }
}

/**
 * Fonction qui scanne la page et remplace les contenus en fonction des attributs data-i18n
 * Supporte le format : [attribute]key (ex: [html]nav.home ou [placeholder]contact.name)
 */
export function updateDOM() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const attrValue = el.getAttribute('data-i18n');
    if (!attrValue) return;

    // Pattern matching pour [attribute]key
    const match = attrValue.match(/^\[(.*)\](.*)$/);
    
    let targetAttr = null;
    let key = attrValue;

    if (match) {
      targetAttr = match[1];
      key = match[2];
    }

    const translatedText = i18next.t(key);
    
    // Si la clé n'est pas trouvée (retourne la clé elle-même), on ne fait rien
    if (!translatedText || translatedText === key) return;

    if (targetAttr) {
      if (targetAttr === 'html') {
        el.innerHTML = translatedText;
      } else {
        el.setAttribute(targetAttr, translatedText);
      }
    } else {
      // Par défaut (sans crochet), on met à jour le textContent (plus sûr que innerHTML)
      // Mais pour conserver la compatibilité avec les textes simples qui avaient du HTML
      // on vérifie si le texte contient des balises.
      if (translatedText.includes('<') && translatedText.includes('>')) {
        el.innerHTML = translatedText;
      } else {
        el.textContent = translatedText;
      }
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = i18next.language;
}
