import re
import os

def robust_replace(filename):
    if not os.path.exists(filename):
        print(f"File not found: {filename}")
        return
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Mise à jour des couleurs (Contrastes)
    # --gold: #C9963A -> #A67C30
    # --ink-muted: #7A6E65 -> #5F554F
    content = re.sub(r'--gold:\s*#C9963A', '--gold: #A67C30', content)
    content = re.sub(r'--ink-muted:\s*#7A6E65', '--ink-muted: #5F554F', content)
    
    # 2. Taille de police navigation
    # font-size: 0.7rem -> 0.85rem
    # letter-spacing: 0.18em -> 0.12em
    content = re.sub(
        r'\.nav-center a\s*\{([^}]*?)font-size:\s*0\.7rem',
        r'.nav-center a {\1font-size: 0.85rem',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'\.nav-center a\s*\{([^}]*?)letter-spacing:\s*0\.18em',
        r'.nav-center a {\1letter-spacing: 0.12rem',
        content,
        flags=re.DOTALL
    )
    
    # 3. Focus-visible et Lang Toggle
    if '#lang-toggle:focus-visible' not in content:
        focus_styles = """
#lang-toggle:focus-visible,
.nav-center a:focus-visible,
.btn-primary:focus-visible,
.btn-secondary:focus-visible,
.btn-ghost:focus-visible {
  outline: 2px solid var(--algerian-green);
  outline-offset: 4px;
}
"""
        content += focus_styles

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Mise à jour réussie de {filename}")

robust_replace('style.css')
