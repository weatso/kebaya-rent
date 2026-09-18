import { execSync } from 'child_process';
import { createRequire } from 'module';
import { unlinkSync } from 'fs';

const require = createRequire(import.meta.url);
const ffmpegPath = require('ffmpeg-static');

const INPUT = './public/Assets/TA-2026-09-18-20-00-14-High-ended-965440640113525.mp4';
const OUTPUT = './public/Assets/hero-video.webm';

console.log(`FFmpeg path: ${ffmpegPath}`);
console.log(`Converting ${INPUT} → ${OUTPUT}...`);

// VP9 WebM — best quality/size ratio for web
// -crf 30 = good quality, reasonable file size
// -b:v 0  = variable bitrate (let crf control quality)
// -an     = strip audio (hero background video doesn't need audio)
const cmd = `"${ffmpegPath}" -i "${INPUT}" -c:v libvpx-vp9 -crf 35 -b:v 1M -an -vf "scale=1920:-2" -deadline good -cpu-used 2 -row-mt 1 "${OUTPUT}" -y`;

try {
  console.log('Encoding VP9 WebM (this may take a minute)...');
  execSync(cmd, { stdio: 'inherit' });
  console.log(`\n✓ Converted to WebM: ${OUTPUT}`);

  // Delete original MP4
  unlinkSync(INPUT);
  console.log(`✗ Deleted original MP4`);
} catch (err) {
  console.error('Conversion failed:', err.message);
}
