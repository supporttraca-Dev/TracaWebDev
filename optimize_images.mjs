import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const MAX_SIZE = 0; // Convert all images to WebP regardless of size

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', 'snapshots', 'dist', '.git'].includes(entry.name)) continue;
    
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name)) {
      const stats = fs.statSync(fullPath);
      if (stats.size > MAX_SIZE) {
        console.log(`Optimizing: ${fullPath} (${(stats.size/1024/1024).toFixed(2)} MB)`);
        const ext = path.extname(entry.name);
        const webpPath = fullPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
        
        try {
          // Si le fichier webp n'a pas deja ete cree par precaution
          if (!fs.existsSync(webpPath)) {
             await sharp(fullPath).webp({ quality: 78 }).toFile(webpPath);
             console.log(`  -> Created ${webpPath}`);
          }
          // Update references
          updateReferences(entry.name, path.basename(webpPath));
          // Delete old file
          fs.unlinkSync(fullPath);
          console.log(`  -> Deleted original ${fullPath}`);
        } catch(e) {
          console.error(`  -> Failed to optimize ${fullPath}`, e);
        }
      }
    }
  }
}

function updateReferences(oldName, newName) {
  const filesToSearch = [
    ...getFilesByExt('.', '.html'),
    ...getFilesByExt('.', '.css')
  ];
  
  for (const file of filesToSearch) {
    let content = fs.readFileSync(file, 'utf8');
    // Global replace
    if (content.includes(oldName)) {
      content = content.replace(new RegExp(oldName, 'g'), newName);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`  -> Updated ref in ${file}`);
    }
  }
}

function getFilesByExt(dir, ext) {
  let results = [];
  try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (['node_modules', 'snapshots', 'dist', '.git'].includes(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results = results.concat(getFilesByExt(fullPath, ext));
        } else if (entry.isFile() && entry.name.endsWith(ext)) {
          results.push(fullPath);
        }
      }
  } catch(e) {}
  return results;
}

processDirectory('.').then(() => console.log('Done image optimization'));
