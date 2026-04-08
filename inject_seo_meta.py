import os
import re

SITE_URL = "https://traca-weld.vercel.app"
DEFAULT_IMAGE = f"{SITE_URL}/Logos/logo-traca-symbole%20black_.png"

def add_meta_tags(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extraire title et description existants
    title_match = re.search(r'<title>(.*?)<\/title>', content, re.IGNORECASE | re.DOTALL)
    desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"\s*\/?>', content, re.IGNORECASE | re.DOTALL)
    
    if not title_match:
        return
    
    title = title_match.group(1).strip()
    description = desc_match.group(1).strip() if desc_match else ""
    
    # Path relatif pour l'URL
    rel_path = filepath.split('_PROJETS\\traca\\')[-1].replace('\\', '/')
    if rel_path == 'index.html':
        page_url = SITE_URL
    else:
        page_url = f"{SITE_URL}/{rel_path.replace('.html', '')}"

    # Construire les nouvelles balises
    meta_tags = f"""
  <!-- SEO Open Graph & Twitter Cards (Étape 2) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{page_url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{DEFAULT_IMAGE}" />
  <meta property="og:site_name" content="Traça" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="{page_url}" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{DEFAULT_IMAGE}" />
"""
    # Si les tags existent déjà, on passe ou on remplace (ici on va juste injecter si pas de "og:title")
    if "og:title" in content:
        print(f"Skipping {filepath}, already has OG tags.")
        return

    # Inserer juste avant </head>
    new_content = content.replace("</head>", f"{meta_tags}</head>")
    
    # Check si on a match
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Failed to update {filepath}")


for root, _, files in os.walk(os.path.dirname(os.path.abspath(__file__))):
    if "node_modules" in root or "dist" in root:
        continue
    for file in files:
        if file.endswith('.html'):
            add_meta_tags(os.path.join(root, file))
