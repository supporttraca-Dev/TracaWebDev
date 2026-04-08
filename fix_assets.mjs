import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');

// Ensure directories exist
const newDirs = ['videos', 'logos', 'images', 'fonts'];
for (const dir of newDirs) {
  const fullPath = path.join(publicDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

// Helper to move file or directory
function moveEntity(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
     if (!fs.existsSync(newPath)) {
         fs.renameSync(oldPath, newPath);
     } else {
         // handle merge or overwrite
         if (fs.statSync(oldPath).isDirectory()) {
             const items = fs.readdirSync(oldPath);
             for(const item of items) {
                 moveEntity(path.join(oldPath, item), path.join(newPath, item));
             }
             fs.rmdirSync(oldPath);
         } else {
             fs.renameSync(oldPath, newPath);
         }
     }
  }
}

console.log('--- Moving files ---');
// Videos
moveEntity(path.join(publicDir, 'intro.mp4'), path.join(publicDir, 'videos', 'intro.mp4'));
moveEntity(path.join(publicDir, 'intro-mobile.mp4'), path.join(publicDir, 'videos', 'intro-mobile.mp4'));

// Logos
moveEntity(path.join(publicDir, 'Logos'), path.join(publicDir, 'logos'));

// Images
if (fs.existsSync(path.join(publicDir, 'assets', 'images'))) {
    moveEntity(path.join(publicDir, 'assets', 'images'), path.join(publicDir, 'images'));
}
if (fs.existsSync(path.join(publicDir, 'fondatrice'))) {
    moveEntity(path.join(publicDir, 'fondatrice'), path.join(publicDir, 'images', 'fondatrice'));
}

// Fonts
moveEntity(path.join(publicDir, 'typography'), path.join(publicDir, 'fonts'));

// Cleanup old empty dirs
['assets', 'Logos', 'fondatrice', 'typography'].forEach(d => {
   const dPath = path.join(publicDir, d);
   if (fs.existsSync(dPath)) {
       try { fs.rmdirSync(dPath) } catch(e) {}
   }
});

console.log('--- Replacing Paths in Files ---');

// recursively get files
function getFiles(dir, extArray) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue; // ignore
        if (entry.name === 'docs') continue; // ignore local documentation
        
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...getFiles(fullPath, extArray));
        } else {
            if (extArray.includes(path.extname(entry.name).toLowerCase())) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

const filesToUpdate = getFiles(projectRoot, ['.html', '.css', '.js']);

// Paths to find and replace
const replacements = [
    { find: /\.\/public\/typography\//g, replace: '/fonts/' },
    { find: /\.\/typography\//g, replace: '/fonts/' },
    { find: /\/typography\//g, replace: '/fonts/' },
    
    { find: /\.\/Logos\//g, replace: '/logos/' },
    { find: /\/Logos\//g, replace: '/logos/' },
    
    { find: /\.\/assets\/images\//g, replace: '/images/' },
    { find: /\/assets\/images\//g, replace: '/images/' },
    { find: /\.\/images\//g, replace: '/images/' },
    
    { find: /\.\/fondatrice\//g, replace: '/images/fondatrice/' },
    { find: /\/fondatrice\//g, replace: '/images/fondatrice/' },
    
    { find: /\.\/intro\.mp4/g, replace: '/videos/intro.mp4' },
    { find: /\/intro\.mp4/g, replace: '/videos/intro.mp4' },
    
    { find: /\.\/intro-mobile\.mp4/g, replace: '/videos/intro-mobile.mp4' },
    { find: /\/intro-mobile\.mp4/g, replace: '/videos/intro-mobile.mp4' },
];

for (const filePath of filesToUpdate) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    for (const r of replacements) {
        content = content.replace(r.find, r.replace);
    }
    
    // fix duplicate replacements just in case
    content = content.replace(/\/videos\/videos\//g, '/videos/');
    content = content.replace(/\/logos\/logos\//g, '/logos/');
    content = content.replace(/\/images\/images\//g, '/images/');
    content = content.replace(/\/fonts\/fonts\//g, '/fonts/');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated:', path.relative(projectRoot, filePath));
    }
}
console.log('done.');
