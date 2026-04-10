/**
 * compress-gallery.mjs
 * Run once: node compress-gallery.mjs
 * Requires: npm install sharp
 */

import sharp from 'sharp';
import { readdir, rename } from 'fs/promises';
import { join, extname } from 'path';

const GALLERY_DIR = './public/gallery';
const OUTPUT_QUALITY = 82;       // JPEG quality — visually lossless for wedding photos
const MAX_WIDTH     = 2400;      // Sufficient for a 30-inch monitor
const BACKUP_SUFFIX = '.bak';    // Original files will be kept as *.jpg.bak

async function main() {
  const files = (await readdir(GALLERY_DIR))
    .filter(f => /\.(jpe?g)$/i.test(f));

  console.log(`Found ${files.length} images. Compressing...`);

  for (const file of files) {
    const inputPath  = join(GALLERY_DIR, file);
    const outputPath = join(GALLERY_DIR, file + BACKUP_SUFFIX); // temp

    // Backup original
    await rename(inputPath, outputPath);

    try {
      const info = await sharp(outputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: OUTPUT_QUALITY, mozjpeg: true })
        .toFile(inputPath);

      const sizeMB_orig   = (await import('fs')).statSync(outputPath).size / 1_048_576;
      const sizeMB_result = info.size / 1_048_576;

      console.log(
        `${file.padEnd(10)} ${sizeMB_orig.toFixed(2)} MB → ${sizeMB_result.toFixed(2)} MB` +
        `  (${Math.round((1 - sizeMB_result / sizeMB_orig) * 100)}% smaller)`
      );
    } catch (err) {
      // Restore original if something fails
      await rename(outputPath, inputPath);
      console.error(`Failed: ${file}`, err);
    }
  }

  console.log('\nDone. Originals kept as *.jpg.bak — delete when satisfied.');
}

main();
