
import os
import re

def reinforce_html():
    # Root directory for HTML traversal
    ROOT = '.'
    
    # LLM Descriptive Block
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

    for root, dirs, files in os.walk(ROOT):
        # Skip technical dirs
        if any(d in root for d in ['node_modules', 'dist', '.git', 'snapshots', '.vercel']):
            continue
            
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                orig_content = content
                
                # 1. Inject LLM Block if not already there
                if 'sr-only' not in content:
                    content = content.replace('<body>', '<body>' + llm_block, 1)
                elif 'Traça - Musée Numérique' not in content:
                    # Enrich existing sr-only or add as second block
                    content = content.replace('<body>', '<body>' + llm_block, 1)

                # 2. Fix Heading Hierarchy: section-label <p> -> <h2>
                # We do this carefully to avoid breaking CSS
                content = content.replace('<p class="section-label', '<h2 class="section-label')
                content = content.replace('</p><!-- End of section-label -->', '</h2>') # In case of comments
                # Simple regex for closing tag match
                content = re.sub(r'(<h2 class=\"section-label\"[^>]*>)(.*?)(</p>)', r'\1\2</h2>', content, flags=re.DOTALL)

                # 3. Add ARIA labels to footer socials if missing (Safety check)
                if 'aria-label="Facebook"' not in content:
                    content = content.replace('class="footer-social-link"', 'class="footer-social-link" aria-label="Social Link"', 1)

                if content != orig_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Propagated updates to {filepath}")

if __name__ == "__main__":
    reinforce_html()
    print("SEO/LLM/A11y HTML reinforcement complete.")
