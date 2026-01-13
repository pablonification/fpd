const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function findPngFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findPngFiles(fullPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertToWebP(inputPath, quality = 85) {
  const outputPath = inputPath.replace(/\.png$/i, '.webp');
  const inputStats = fs.statSync(inputPath);
  const inputSize = inputStats.size;

  try {
    await sharp(inputPath).webp({ quality }).toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSize = outputStats.size;
    const savings = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

    console.log(
      `✓ ${path.relative(PUBLIC_DIR, inputPath)} → .webp (${formatBytes(inputSize)} → ${formatBytes(outputSize)}, -${savings}%)`
    );

    return { input: inputSize, output: outputSize };
  } catch (err) {
    console.error(`✗ Failed: ${inputPath} - ${err.message}`);
    return { input: inputSize, output: inputSize };
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function main() {
  console.log('Finding PNG files in public/...\n');

  const pngFiles = await findPngFiles(PUBLIC_DIR);
  console.log(`Found ${pngFiles.length} PNG files\n`);

  let totalInput = 0;
  let totalOutput = 0;

  for (const file of pngFiles) {
    const { input, output } = await convertToWebP(file);
    totalInput += input;
    totalOutput += output;
  }

  console.log('\n--- Summary ---');
  console.log(`Total before: ${formatBytes(totalInput)}`);
  console.log(`Total after:  ${formatBytes(totalOutput)}`);
  console.log(
    `Saved: ${formatBytes(totalInput - totalOutput)} (${(((totalInput - totalOutput) / totalInput) * 100).toFixed(1)}%)`
  );
}

main().catch(console.error);
