
import sys
import os

def replace_in_file(filename, old, new):
    if not os.path.exists(filename):
        print(f"File not found: {filename}")
        return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    if old in content:
        new_content = content.replace(old, new)
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully updated {filename}")
    else:
        # Debug: print a small chunk of old and content to see why it fails
        print(f"Could not find target in {filename}")

# 1. Colors
old_colors = """  --gold: #C9963A;
  --gold-light: #E2B96A;
  --gold-pale: #F4E4C1;
  --algerian-green: #458B73;
  --green-soft: #6BA891;
  --green-pale: #D4EDE5;
  --ink: #000000;
  --ink-soft: #3D3530;
  --ink-muted: #7A6E65;
  --white: #FFFFFF;"""

new_colors = """  --gold: #A67C30;
  --gold-light: #E2B96A;
  --gold-pale: #F4E4C1;
  --algerian-green: #458B73;
  --green-soft: #6BA891;
  --green-pale: #D4EDE5;
  --ink: #000000;
  --ink-soft: #3D3530;
  --ink-muted: #5F554F;
  --white: #FFFFFF;"""

# 2. Nav links
old_nav = """.nav-center a {
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
  transition: color 0.3s;
  position: relative;
  padding-bottom: 2px;
}"""

new_nav = """.nav-center a {
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  transition: color 0.3s;
  position: relative;
  padding: 4px 0;
}"""

# 3. Lang toggle
old_lang = """#lang-toggle {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--ink);
  background: none;
  border: 1px solid rgba(122, 110, 101, 0.3);
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}"""

new_lang = """#lang-toggle {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--ink);
  background: none;
  border: 1.5px solid rgba(95, 85, 79, 0.4);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

#lang-toggle:focus-visible,
.nav-center a:focus-visible,
.btn-primary:focus-visible,
.btn-secondary:focus-visible,
.btn-ghost:focus-visible {
  outline: 2px solid var(--algerian-green);
  outline-offset: 4px;
}"""

style_file = r'style.css'
replace_in_file(style_file, old_colors, new_colors)
replace_in_file(style_file, old_nav, new_nav)
replace_in_file(style_file, old_lang, new_lang)
