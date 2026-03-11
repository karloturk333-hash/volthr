// scripts/seed-blog-images.mjs
// Usage: SANITY_TOKEN=<your-token> node scripts/seed-blog-images.mjs
// Downloads images from picsum.photos and patches them as coverImage on blog posts.

import { createClient } from "@sanity/client";
import https from "https";
import { Buffer } from "buffer";

const client = createClient({
  projectId: "qrf7o22v",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Each blog post gets a unique picsum image by seed (deterministic, always same image)
// picsum.photos/seed/{seed}/1200/675 gives a consistent image per seed
const blogImageMap = [
  { slug: "zasto-svaki-obrtnik-treba-web-stranicu", seed: "web-obrtnik" },
  { slug: "seo-za-obrtnike-5-koraka", seed: "seo-google" },
  { slug: "eu-digitalni-vauceri-2026", seed: "eu-fondovi" },
  { slug: "kako-odabrati-web-agenciju", seed: "web-agencija" },
  { slug: "ai-alati-za-male-poduzetnike", seed: "ai-tech" },
  { slug: "ai-automatizira-svakodnevne-zadatke", seed: "automation" },
  { slug: "ai-za-drustvene-mreze-konzistentan-sadrzaj", seed: "social-media" },
  { slug: "ai-smanjuje-troskove-malog-biznisa", seed: "cost-savings" },
  { slug: "ai-email-marketing-mailovi-koji-se-citaju", seed: "email-mkt" },
  { slug: "ai-chatbot-na-webu-donosi-klijente", seed: "chatbot-web" },
  { slug: "ai-za-ponude-i-fakture-5x-brze", seed: "invoices-docs" },
  { slug: "ai-seo-prva-stranica-googlea", seed: "seo-analytics" },
  { slug: "ai-organizacija-posla-termini", seed: "organization" },
  { slug: "ai-pomaze-obrtnicima-konkurirati-velikima", seed: "craftsman" },
  { slug: "ai-strategija-za-rast-biznisa", seed: "growth-strategy" },
];

/**
 * Download image from picsum.photos (follows redirects)
 */
function downloadImage(seed) {
  const url = `https://picsum.photos/seed/${seed}/1200/675`;

  return new Promise((resolve, reject) => {
    const tryUrl = (targetUrl, attempts = 0) => {
      https
        .get(targetUrl, (res) => {
          if (
            (res.statusCode === 301 || res.statusCode === 302) &&
            res.headers.location
          ) {
            if (attempts > 5) {
              reject(new Error(`Too many redirects for seed ${seed}`));
              return;
            }
            tryUrl(res.headers.location, attempts + 1);
            return;
          }

          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for seed ${seed}`));
            return;
          }

          const chunks = [];
          res.on("data", (chunk) => chunks.push(chunk));
          res.on("end", () => {
            const buffer = Buffer.concat(chunks);
            const contentType = res.headers["content-type"] || "image/jpeg";
            resolve({ buffer, contentType });
          });
          res.on("error", reject);
        })
        .on("error", reject);
    };

    tryUrl(url);
  });
}

async function uploadToSanity(buffer, contentType, filename) {
  return client.assets.upload("image", buffer, { filename, contentType });
}

async function patchPost(slug, assetId) {
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id }`,
    { slug }
  );

  if (!post) {
    console.log(`  SKIP: No post found for slug "${slug}"`);
    return false;
  }

  await client
    .patch(post._id)
    .set({
      coverImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
    })
    .commit();

  return true;
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error("Missing SANITY_TOKEN.");
    process.exit(1);
  }

  console.log(`Adding cover images to ${blogImageMap.length} blog posts...\n`);

  let success = 0;
  let failed = 0;

  for (const { slug, seed } of blogImageMap) {
    try {
      process.stdout.write(`  [${slug}] Downloading...`);
      const { buffer, contentType } = await downloadImage(seed);
      console.log(` ${(buffer.length / 1024).toFixed(0)}KB`);

      process.stdout.write(`  Uploading to Sanity...`);
      const asset = await uploadToSanity(buffer, contentType, `blog-${slug}.jpg`);
      console.log(` ${asset._id}`);

      process.stdout.write(`  Patching post...`);
      const patched = await patchPost(slug, asset._id);
      if (patched) {
        console.log(` OK`);
        success++;
      } else {
        failed++;
      }
      console.log();
    } catch (err) {
      console.log(` FAIL: ${err.message}`);
      failed++;
      console.log();
    }
  }

  console.log(`\nDone! ${success} patched, ${failed} failed.`);
}

main();
