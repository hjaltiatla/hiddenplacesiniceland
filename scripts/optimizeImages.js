/**
 * Image optimization script
 * Generates responsive image sizes for better performance
 *
 * Install: npm install sharp --save-dev
 * Run: node scripts/optimizeImages.js
 */

const fs = require('fs-extra');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Error: sharp is not installed.');
  console.log('📦 Install it with: npm install sharp --save-dev');
  process.exit(1);
}

const IMAGES_DIR = path.join(__dirname, '../public/images/places');
const SIZES = {
  thumbnail: 300,   // For cards/lists
  medium: 800,      // For detail pages
  large: 1600       // For hero images
};

async function optimizeImage(imagePath) {
  const basename = path.basename(imagePath, '.jpg');
  const dirname = path.dirname(imagePath);

  console.log(`📸 Processing: ${basename}.jpg`);

  try {
    // Generate thumbnail (300px width)
    await sharp(imagePath)
      .resize(SIZES.thumbnail, null, { withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .toFile(path.join(dirname, `${basename}-thumb.jpg`));

    // Generate medium (800px width)
    await sharp(imagePath)
      .resize(SIZES.medium, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(dirname, `${basename}-medium.jpg`));

    // Generate large (1600px width)
    await sharp(imagePath)
      .resize(SIZES.large, null, { withoutEnlargement: true })
      .jpeg({ quality: 90, progressive: true })
      .toFile(path.join(dirname, `${basename}-large.jpg`));

    // Optimize original
    await sharp(imagePath)
      .jpeg({ quality: 90, progressive: true })
      .toFile(path.join(dirname, `${basename}-optimized.jpg`));

    // Replace original with optimized
    fs.renameSync(
      path.join(dirname, `${basename}-optimized.jpg`),
      imagePath
    );

    console.log(`  ✅ Generated: thumb (${SIZES.thumbnail}px), medium (${SIZES.medium}px), large (${SIZES.large}px)`);
  } catch (error) {
    console.error(`  ❌ Failed to process ${basename}.jpg:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Images directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => f.endsWith('.jpg') && !f.includes('-thumb') && !f.includes('-medium') && !f.includes('-large'));

  if (files.length === 0) {
    console.log('✅ No images to optimize');
    return;
  }

  console.log(`Found ${files.length} images to optimize\n`);

  for (const file of files) {
    await optimizeImage(path.join(IMAGES_DIR, file));
  }

  console.log('\n✅ Image optimization complete!');
  console.log('💡 Update imageUrl.js to serve responsive sizes');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
