import sys

with open('style.css', 'rb') as f:
    text = f.read().decode('utf-8', errors='ignore')

lines = text.split('\n')
start = max(0, len(lines) - 150)
for i, line in enumerate(lines[start:]):
    print(f"{start + i + 1}: {line}")
