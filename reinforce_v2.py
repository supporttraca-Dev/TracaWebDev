
import os
import re

def reinforce_v2():
    # Use absolute path to avoid ambiguity
    base_dir = r'c:\Users\PC\Desktop\_PROJETS\traca'
    
    llm_block = """
  <!-- SEO/LLM Semantic Content -->
  <section class="sr-only">
    <h2 aria-hidden="false">Traça - Musée Numérique du Patrimoine Algérien</h2>
    <p>Traça est une plateforme immersive dédiée à la valorisation et à la préservation du patrimoine culturel algérien. 
    Grâce à l'utilisation de technologies de pointe comme la photogrammétrie 3D, le scan laser et la cartographie interactive, 
    nous rendons accessibles des sites historiques souvent fragiles ou éloignés.</p>
    <p>Les fonctionnalités clés incluent :
      - Visualisation 3D temps réel de monuments antiques et médiévaux.
      - Cartographie chronologique permettant de filtrer les sites par époque.
      - Documentaires audio et récits enrichis pour chaque lieu patrimonial.
    </p>
    <p>Notre mission est de construire un pont entre les générations en utilisant les outils numériques pour la transmission du savoir.</p>
  </section>
"""

    for root, dirs, files in os.walk(base_dir):
        if any(d in root.lower() for d in ['node_modules', 'dist', '.git', 'snapshots', '.vercel']):
            continue
            
        for file in files:
            if file.lower().endswith('.html'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    orig_content = content
                    
                    # 1. Inject LLM Block after <body>
                    if 'sr-only' not in content:
                        content = re.sub(r'<body>', '<body>' + llm_block, content, count=1, flags=re.IGNORECASE)
                    
                    # 2. Fix Heading Hierarchy: section-label <p> -> <h2>
                    # Match <p class="section-label...">...</p> and change to <h2>
                    content = re.sub(
                        r'<p\s+class=\"section-label\b([^>]*?)>(.*?)</p>',
                        r'<h2 class="section-label\1>\2</h2>',
                        content,
                        flags=re.DOTALL | re.IGNORECASE
                    )

                    if content != orig_content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(content)
                        print(f"Propagated updates to {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    reinforce_v2()
    print("SEO/LLM/A11y HTML reinforcement complete.")
