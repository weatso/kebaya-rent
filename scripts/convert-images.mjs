import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';

const ASSETS_DIR = './public/Assets';

async function convertToAvif() {
  const files = await readdir(ASSETS_DIR);
  const jpgs = files.filter(f => /\.jpe?g$/i.test(f));

  console.log(`Found ${jpgs.length} JPG files to convert...`);

  for (const file of jpgs) {
    const inputPath = join(ASSETS_DIR, file);
    const baseName = file.replace(/\.jpe?g$/i, '');
    const outputPath = join(ASSETS_DIR, `${baseName}.avif`);

    try {
      await sharp(inputPath)
        .avif({ quality: 72, effort: 4 })
        .toFile(outputPath);

      const origStats = await sharp(inputPath).metadata();
      const newStats = await sharp(outputPath).metadata();
      
      console.log(`✓ ${file} → ${baseName}.avif (${origStats.width}x${origStats.height})`);

      // Delete original JPG
      await unlink(inputPath);
      console.log(`  ✗ Deleted ${file}`);
    } catch (err) {
      console.error(`✗ Failed: ${file} — ${err.message}`);
    }
  }

  console.log('\nDone! All JPGs converted to AVIF and originals removed.');
}

convertToAvif();
