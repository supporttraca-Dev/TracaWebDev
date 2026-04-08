import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://traca-weld.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/Logos/logo-traca-symbole%20black_.png`;

function addMetaTags(filepath) {
    if (filepath.includes('node_modules') || filepath.includes('dist')) return;

    let content = fs.readFileSync(filepath, 'utf-8');

    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = content.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i);
    
    if (!titleMatch) return;
    
    const title = titleMatch[1].trim();
    const description = descMatch ? descMatch[1].trim() : "";
    
    let relPath = path.relative(__dirname, filepath).replace(/\\/g, '/');
    let pageUrl = relPath === 'index.html' ? SITE_URL : `${SITE_URL}/${relPath.replace('.html', '')}`;

    const metaTags = `
  <!-- SEO Open Graph & Twitter Cards (Étape 2) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${DEFAULT_IMAGE}" />
  <meta property="og:site_name" content="Traça" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${pageUrl}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${DEFAULT_IMAGE}" />
`;

    if (content.includes('og:title')) {
        console.log(`Skipping ${filepath}, already has OG tags.`);
        return;
    }

    const newContent = content.replace('</head>', `${metaTags}</head>`);
    
    if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        console.log(`Updated ${filepath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            addMetaTags(fullPath);
        }
    }
}

walkDir(__dirname);
