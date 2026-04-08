"""
Script SEO — Étapes 7 & 8 : Accessibilité + Performance
- Ajoute lang="fr" sur <html> si manquant
- Ajoute <link rel="canonical"> si absent
- Ajoute loading="lazy" sur les images sans ce flag
- Ajoute role="main" + aria-label sur <main> si absent
- Ajoute <meta name="theme-color"> si absent
- Corrige les SVG sans aria-hidden dans les footer/nav
"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE_URL = "https://traca-weld.vercel.app"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    
    # --- 1. Assurer lang="fr" sur <html> ---
    content = re.sub(r'<html(?!\s[^>]*lang=)[^>]*>', lambda m: m.group().replace('<html', '<html lang="fr"'), content, count=1)

    # --- 2. theme-color meta (si absent) ---
    if 'theme-color' not in content and '</head>' in content:
        content = content.replace(
            '</head>',
            '  <meta name="theme-color" content="#F9F6EF" />\n</head>',
            1
        )

    # --- 3. canonical (si absent) ---
    if 'rel="canonical"' not in content and '</head>' in content:
        rel_path = os.path.relpath(filepath, ROOT).replace('\\', '/')
        if rel_path == 'index.html':
            canonical_url = SITE_URL + '/'
        else:
            canonical_url = SITE_URL + '/' + rel_path
        content = content.replace(
            '</head>',
            f'  <link rel="canonical" href="{canonical_url}" />\n</head>',
            1
        )

    # --- 4. loading="lazy" sur les <img> sans attribut de chargement ---
    def maybe_lazy(m):
        tag = m.group(0)
        # Ne pas toucher aux images above-the-fold (logo hero, nav) — déjà chargées rapidement
        if 'nav-symbol-logo' in tag or 'hero-logo-typo' in tag or 'footer-logo-img' in tag:
            return tag
        if 'loading=' not in tag:
            tag = tag.replace('<img', '<img loading="lazy"', 1)
        return tag
    content = re.sub(r'<img\b[^>]*>', maybe_lazy, content, flags=re.IGNORECASE)

    # --- 5. aria-hidden="true" sur les SVGs décoratifs (footer, nav icons) ---
    def aria_hide_svg(m):
        tag = m.group(0)
        if 'aria-' not in tag:
            tag = tag.replace('<svg', '<svg aria-hidden="true" focusable="false"', 1)
        return tag
    content = re.sub(r'<svg\b[^>]*>', aria_hide_svg, content, flags=re.IGNORECASE)

    # --- 6. <main> avec role et aria-label si présent sans attributs ---
    content = re.sub(
        r'<main id="main-content">',
        '<main id="main-content" role="main" aria-label="Contenu principal">',
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✔ Updated: {os.path.relpath(filepath, ROOT)}")
    else:
        print(f"  Skipped: {os.path.relpath(filepath, ROOT)}")

def walk_html(directory):
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist', '.vercel', '.netlify', 'snapshots')]
        for file in files:
            if file.endswith('.html'):
                walk_html_file(os.path.join(root, file))

def walk_html_file(filepath):
    process_file(filepath)

if __name__ == '__main__':
    walk_html(ROOT)
    print("\n✅ Étapes 7 & 8 terminées.")
