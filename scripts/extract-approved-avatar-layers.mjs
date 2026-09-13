import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const [masterPath, faceMaskPath, underwearMaskPath, outputDirectory] =
  process.argv.slice(2);

if (!masterPath || !faceMaskPath || !underwearMaskPath || !outputDirectory) {
  throw new Error(
    "Uso: node scripts/extract-approved-avatar-layers.mjs <master> <mascara-rosto> <mascara-roupa> <saida>",
  );
}

async function readRgba(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { data, width: info.width, height: info.height };
}

function assertSameCanvas(reference, candidate, label) {
  if (
    reference.width !== candidate.width ||
    reference.height !== candidate.height
  ) {
    throw new Error(`${label} não usa o mesmo quadro do Master.`);
  }
}

function getForegroundMask(image) {
  const { data, width, height } = image;
  const pixelCount = width * height;
  const background = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;

  const isLightBackground = (pixelIndex) => {
    const offset = pixelIndex * 4;
    return (
      data[offset] >= 215 &&
      data[offset + 1] >= 215 &&
      data[offset + 2] >= 215
    );
  };

  const enqueue = (pixelIndex) => {
    if (background[pixelIndex] || !isLightBackground(pixelIndex)) return;
    background[pixelIndex] = 1;
    queue[tail++] = pixelIndex;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const pixelIndex = queue[head++];
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);

    if (x > 0) enqueue(pixelIndex - 1);
    if (x + 1 < width) enqueue(pixelIndex + 1);
    if (y > 0) enqueue(pixelIndex - width);
    if (y + 1 < height) enqueue(pixelIndex + width);
  }

  const foreground = new Uint8Array(pixelCount);
  for (let index = 0; index < pixelCount; index += 1) {
    foreground[index] = background[index] ? 0 : 1;
  }
  return foreground;
}

function keepLargestComponents(mask, width, height, count) {
  const visited = new Uint8Array(mask.length);
  const components = [];
  const queue = new Int32Array(mask.length);

  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || visited[start]) continue;

    let head = 0;
    let tail = 0;
    const pixels = [];
    visited[start] = 1;
    queue[tail++] = start;

    while (head < tail) {
      const pixelIndex = queue[head++];
      pixels.push(pixelIndex);
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);

      const neighbors = [];
      if (x > 0) neighbors.push(pixelIndex - 1);
      if (x + 1 < width) neighbors.push(pixelIndex + 1);
      if (y > 0) neighbors.push(pixelIndex - width);
      if (y + 1 < height) neighbors.push(pixelIndex + width);

      for (const neighbor of neighbors) {
        if (mask[neighbor] && !visited[neighbor]) {
          visited[neighbor] = 1;
          queue[tail++] = neighbor;
        }
      }
    }

    components.push(pixels);
  }

  components.sort((left, right) => right.length - left.length);
  const result = new Uint8Array(mask.length);
  for (const component of components.slice(0, count)) {
    for (const pixelIndex of component) result[pixelIndex] = 1;
  }
  return result;
}

function getComponents(mask, width, height) {
  const visited = new Uint8Array(mask.length);
  const components = [];
  const queue = new Int32Array(mask.length);

  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || visited[start]) continue;

    let head = 0;
    let tail = 0;
    const pixels = [];
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    visited[start] = 1;
    queue[tail++] = start;

    while (head < tail) {
      const pixelIndex = queue[head++];
      pixels.push(pixelIndex);
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);

      const neighbors = [];
      if (x > 0) neighbors.push(pixelIndex - 1);
      if (x + 1 < width) neighbors.push(pixelIndex + 1);
      if (y > 0) neighbors.push(pixelIndex - width);
      if (y + 1 < height) neighbors.push(pixelIndex + width);

      for (const neighbor of neighbors) {
        if (mask[neighbor] && !visited[neighbor]) {
          visited[neighbor] = 1;
          queue[tail++] = neighbor;
        }
      }
    }

    components.push({ pixels, minX, maxX, minY, maxY });
  }

  return components;
}

function createLayer(master, selection) {
  const output = Buffer.alloc(master.data.length);
  for (let index = 0; index < selection.length; index += 1) {
    if (!selection[index]) continue;
    const offset = index * 4;
    output[offset] = master.data[offset];
    output[offset + 1] = master.data[offset + 1];
    output[offset + 2] = master.data[offset + 2];
    output[offset + 3] = 255;
  }
  return output;
}

async function writeRgba(filePath, image, data) {
  await sharp(data, {
    raw: { width: image.width, height: image.height, channels: 4 },
  })
    .png()
    .toFile(filePath);
}

const master = await readRgba(masterPath);
const faceMaskImage = await readRgba(faceMaskPath);
const underwearMaskImage = await readRgba(underwearMaskPath);
assertSameCanvas(master, faceMaskImage, "A máscara do rosto");
assertSameCanvas(master, underwearMaskImage, "A máscara da roupa-base");

const masterForeground = getForegroundMask(master);
// As imagens geradas orientam a extração, mas os pixels finais e as máscaras
// semânticas são calculados sobre o próprio Master aprovado.
keepLargestComponents(
  getForegroundMask(faceMaskImage),
  master.width,
  master.height,
  2,
);
const underwearCandidate = keepLargestComponents(
  getForegroundMask(underwearMaskImage),
  master.width,
  master.height,
  1,
);
const underwearBounds = {
  minX: master.width,
  maxX: 0,
  minY: master.height,
  maxY: 0,
};
for (let index = 0; index < underwearCandidate.length; index += 1) {
  if (!underwearCandidate[index]) continue;
  const x = index % master.width;
  const y = Math.floor(index / master.width);
  underwearBounds.minX = Math.min(underwearBounds.minX, x);
  underwearBounds.maxX = Math.max(underwearBounds.maxX, x);
  underwearBounds.minY = Math.min(underwearBounds.minY, y);
  underwearBounds.maxY = Math.max(underwearBounds.maxY, y);
}

const darkEyePixels = new Uint8Array(masterForeground.length);
for (let index = 0; index < masterForeground.length; index += 1) {
  if (!masterForeground[index]) continue;
  const x = index % master.width;
  const y = Math.floor(index / master.width);
  if (
    x < master.width * 0.35 ||
    x > master.width * 0.65 ||
    y < master.height * 0.2 ||
    y > master.height * 0.34
  ) {
    continue;
  }
  const offset = index * 4;
  if (
    master.data[offset] < 120 &&
    master.data[offset + 1] < 90 &&
    master.data[offset + 2] < 90
  ) {
    darkEyePixels[index] = 1;
  }
}

const eyeComponents = getComponents(
  darkEyePixels,
  master.width,
  master.height,
)
  .sort((left, right) => right.pixels.length - left.pixels.length)
  .slice(0, 2);

if (eyeComponents.length !== 2) {
  throw new Error("Não foi possível localizar os dois olhos do Master.");
}

const bodySelection = new Uint8Array(masterForeground.length);
const faceSelection = new Uint8Array(masterForeground.length);
const underwearSelection = new Uint8Array(masterForeground.length);

for (let index = 0; index < masterForeground.length; index += 1) {
  if (!masterForeground[index]) continue;
  const x = index % master.width;
  const y = Math.floor(index / master.width);
  const isInsideEye = eyeComponents.some(
    (eye) =>
      x >= eye.minX && x <= eye.maxX && y >= eye.minY && y <= eye.maxY,
  );

  const offset = index * 4;
  const red = master.data[offset];
  const green = master.data[offset + 1];
  const blue = master.data[offset + 2];
  const isNeutralGarmentPixel =
    Math.abs(red - green) <= 28 && Math.abs(green - blue) <= 35;
  const isBakedLightBackground = red >= 215 && green >= 215 && blue >= 215;
  const isInsideUnderwearBounds =
    x >= underwearBounds.minX &&
    x <= underwearBounds.maxX &&
    y >= underwearBounds.minY &&
    y <= underwearBounds.maxY;

  if (isInsideEye) faceSelection[index] = 1;
  else if (isInsideUnderwearBounds && isNeutralGarmentPixel) {
    underwearSelection[index] = 1;
  } else if (!isBakedLightBackground) bodySelection[index] = 1;
}

const bodyLayer = createLayer(master, bodySelection);
const faceLayer = createLayer(master, faceSelection);
const underwearLayer = createLayer(master, underwearSelection);
const composite = Buffer.alloc(master.data.length);

for (let offset = 0; offset < composite.length; offset += 4) {
  for (const layer of [bodyLayer, faceLayer, underwearLayer]) {
    if (!layer[offset + 3]) continue;
    composite[offset] = layer[offset];
    composite[offset + 1] = layer[offset + 1];
    composite[offset + 2] = layer[offset + 2];
    composite[offset + 3] = layer[offset + 3];
  }
}

const masterClean = Buffer.from(composite);

if (!masterClean.equals(composite)) {
  throw new Error("A recomposição não reproduziu exatamente o Master aprovado.");
}

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeRgba(path.join(outputDirectory, "master-approved.png"), master, masterClean),
  writeRgba(path.join(outputDirectory, "body-base.png"), master, bodyLayer),
  writeRgba(path.join(outputDirectory, "face-default.png"), master, faceLayer),
  writeRgba(
    path.join(outputDirectory, "underwear-default.png"),
    master,
    underwearLayer,
  ),
  writeRgba(path.join(outputDirectory, "composite-check.png"), master, composite),
]);

const countPixels = (mask) => mask.reduce((total, value) => total + value, 0);
console.log(
  JSON.stringify(
    {
      canvas: `${master.width}x${master.height}`,
      exactComposite: true,
      pixels: {
        body: countPixels(bodySelection),
        face: countPixels(faceSelection),
        underwear: countPixels(underwearSelection),
      },
      outputDirectory,
    },
    null,
    2,
  ),
);
