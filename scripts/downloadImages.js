require("dotenv").config({ path: __dirname + "/../.env" });
const axios = require("axios");
const fs    = require("fs-extra");
const path  = require("path");
const db    = require("../database/db");

const ACCESS_KEY  = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("❌ UNSPLASH_ACCESS_KEY missing from .env");
  process.exit(1);
}


const IMAGES_DIR  = path.join(__dirname, "../public/images/places");

async function searchUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${ACCESS_KEY}`;
  const res = await axios.get(url);
  return res.data.results;
}

async function downloadImage(place) {
  const imagePath = path.join(IMAGES_DIR, `${place.slug}.jpg`);

  if (fs.existsSync(imagePath)) {
    console.log(`  Skipped: ${place.name} (already exists)`);
    return;
  }

  const primaryQuery  = `${place.name} ${place.category} Iceland`;
  const fallbackQuery = `${place.name} Iceland landscape`;

  let results   = await searchUnsplash(primaryQuery);
  let usedQuery = primaryQuery;

  if (!results.length) {
    console.log(`  ↩ No results for "${primaryQuery}", trying fallback…`);
    results   = await searchUnsplash(fallbackQuery);
    usedQuery = fallbackQuery;
  }

  if (!results.length) {
    console.log(`  ✗ No image found for: ${place.name}`);
    return;
  }

  const imageUrl = results[0].urls.regular;
  const response = await axios({ url: imageUrl, method: "GET", responseType: "stream" });

  await fs.ensureDir(IMAGES_DIR);
  const writer = fs.createWriteStream(imagePath);
  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  console.log(`  Downloaded: ${place.name}  [query: "${usedQuery}"]`);
}

async function run() {
  await db.init();

  const places = db.all("SELECT name, slug, category FROM places ORDER BY name");

  if (!places.length) {
    console.log("No places found in the database.");
    return;
  }

  console.log(`Found ${places.length} place(s) in the database.\n`);

  for (const place of places) {
    await downloadImage(place);
  }

  console.log("\nDone.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
