import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const [
  masterPath,
  bodyPath,
  underwearPath,
  defaultFacePath,
  roundedReferencePath,
  almondReferencePath,
  outputDirectory,
] = process.argv.slice(2);

if (!outputDirectory) {
  throw new Error(
    "Uso: node scripts/build-eye-variants.mjs <master> <corpo> <roupa> <rosto-padrao> <ref-redondo> <ref-amendoado> <saida>",
  );
}

async function readRgba(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

function getComponents(mask, width, height) {
  const visited = new Uint8Array(mask.length);
  const queue = new Int32Array(mask.length);
  const components = [];

  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || visited[start]) continue;
    let head = 0;
    let tail = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    const pixels = [];
    visited[start] = 1;
    queue[tail++] = start;

    while (head < tail) {
      const index = queue[head++];
      pixels.push(index);
      const x = index % width;
      const y = Math.floor(index / width);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      const neighbors = [];
      if (x > 0) neighbors.push(index - 1);
      if (x + 1 < width) neighbors.push(index + 1);
      if (y > 0) neighbors.push(index - width);
      if (y + 1 < height) neighbors.push(index + width);
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

function findDefaultEyeBounds(face) {
  const alpha = new Uint8Array(face.width * face.height);
  for (let index = 0; index < alpha.length; index += 1) {
    alpha[index] = face.data[index * 4 + 3] ? 1 : 0;
  }
  const components = getComponents(alpha, face.width, face.height)
    .sort((left, right) => right.pixels.length - left.pixels.length)
    .slice(0, 2)
    .sort((left, right) => left.minX - right.minX);
  if (components.length !== 2) throw new Error("Os olhos padrão não foram localizados.");
  return components;
}

function findGeneratedEyes(image) {
  const windows = [
    { minX: 0.2, maxX: 0.5 },
    { minX: 0.5, maxX: 0.8 },
  ];
  return windows.map((window, eyeIndex) => {
    const minX = Math.floor(image.width * window.minX);
    const maxX = Math.ceil(image.width * window.maxX);
    const minY = Math.floor(image.height * 0.45);
    const maxY = Math.ceil(image.height * 0.65);
    const dark = new Uint8Array(image.width * image.height);

    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const index = y * image.width + x;
        const offset = index * 4;
        if (
          image.data[offset] < 100 &&
          image.data[offset + 1] < 90 &&
          image.data[offset + 2] < 90
        ) {
          dark[index] = 1;
        }
      }
    }

    const candidates = getComponents(dark, image.width, image.height)
      .filter(
        (component) =>
          component.pixels.length > 100 &&
          component.minX > minX + 2 &&
          component.maxX < maxX - 2 &&
          component.minY > minY + 2 &&
          component.maxY < maxY - 2,
      )
      .sort((left, right) => right.pixels.length - left.pixels.length);

    if (!candidates[0]) {
      throw new Error(`O olho ${eyeIndex + 1} não foi localizado na proposta.`);
    }
    return candidates[0];
  });
}

async function createEyeSprite(image, component, targetWidth, targetHeight) {
  const sourceWidth = component.maxX - component.minX + 1;
  const sourceHeight = component.maxY - component.minY + 1;
  const source = Buffer.alloc(sourceWidth * sourceHeight * 4);

  for (let y = component.minY; y <= component.maxY; y += 1) {
    for (let x = component.minX; x <= component.maxX; x += 1) {
      const sourceIndex = y * image.width + x;
      const sourceOffset = sourceIndex * 4;
      const red = image.data[sourceOffset];
      const green = image.data[sourceOffset + 1];
      const blue = image.data[sourceOffset + 2];
      const isDarkEye = red < 110 && green < 95 && blue < 95;
      const isHighlight = red > 180 && green > 180 && blue > 180;
      if (!isDarkEye && !isHighlight) continue;

      const targetIndex =
        (y - component.minY) * sourceWidth + (x - component.minX);
      const targetOffset = targetIndex * 4;
      source[targetOffset] = red;
      source[targetOffset + 1] = green;
      source[targetOffset + 2] = blue;
      source[targetOffset + 3] = 255;
    }
  }

  const { data } = await sharp(source, {
    raw: { width: sourceWidth, height: sourceHeight, channels: 4 },
  })
    .resize(targetWidth, targetHeight, { fit: "fill", kernel: "nearest" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: targetWidth, height: targetHeight };
}

function skinTerms(x, y, width, height) {
  const normalizedX = (x - width / 2) / width;
  const normalizedY = (y - height / 2) / height;
  return [
    1,
    normalizedX,
    normalizedY,
    normalizedX * normalizedX,
    normalizedX * normalizedY,
    normalizedY * normalizedY,
    normalizedX ** 3,
    normalizedX * normalizedX * normalizedY,
    normalizedX * normalizedY * normalizedY,
    normalizedY ** 3,
  ];
}

function solveLinearSystem(matrix, vector) {
  const size = vector.length;
  const augmented = matrix.map((row, index) => [...row, vector[index]]);
  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) {
        pivot = row;
      }
    }
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const divisor = augmented[column][column];
    for (let cell = column; cell <= size; cell += 1) {
      augmented[column][cell] /= divisor;
    }
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      for (let cell = column; cell <= size; cell += 1) {
        augmented[row][cell] -= factor * augmented[column][cell];
      }
    }
  }
  return augmented.map((row) => row[size]);
}

function fitSkinModel(master, eyeBounds) {
  const termCount = 10;
  const normalMatrix = Array.from({ length: termCount }, () =>
    Array(termCount).fill(0),
  );
  const channelVectors = Array.from({ length: 3 }, () =>
    Array(termCount).fill(0),
  );

  for (let y = 260; y <= 550; y += 3) {
    for (let x = 340; x <= 680; x += 3) {
      if (
        eyeBounds.some(
          (eye) =>
            x >= eye.minX - 3 &&
            x <= eye.maxX + 3 &&
            y >= eye.minY - 3 &&
            y <= eye.maxY + 3,
        )
      ) {
        continue;
      }
      const offset = (y * master.width + x) * 4;
      const red = master.data[offset];
      const green = master.data[offset + 1];
      const blue = master.data[offset + 2];
      if (!master.data[offset + 3] || red < 170 || green < 90 || blue < 60) {
        continue;
      }
      const terms = skinTerms(x, y, master.width, master.height);
      for (let row = 0; row < termCount; row += 1) {
        for (let column = 0; column < termCount; column += 1) {
          normalMatrix[row][column] += terms[row] * terms[column];
        }
        channelVectors[0][row] += terms[row] * red;
        channelVectors[1][row] += terms[row] * green;
        channelVectors[2][row] += terms[row] * blue;
      }
    }
  }

  return channelVectors.map((vector) => solveLinearSystem(normalMatrix, vector));
}

function paintSkinPatch(layer, master, bounds, skinModel) {
  const margin = 28;
  for (let y = bounds.minY - margin; y <= bounds.maxY + margin; y += 1) {
    for (let x = bounds.minX - margin; x <= bounds.maxX + margin; x += 1) {
      const outputOffset = (y * master.width + x) * 4;
      const terms = skinTerms(x, y, master.width, master.height);
      const horizontalDistance = Math.max(bounds.minX - x, x - bounds.maxX, 0);
      const verticalDistance = Math.max(bounds.minY - y, y - bounds.maxY, 0);
      const outsideDistance = Math.max(horizontalDistance, verticalDistance);
      const blendWeight = Math.max(0, 1 - outsideDistance / margin);
      for (let channel = 0; channel < 3; channel += 1) {
        const prediction = skinModel[channel].reduce(
          (sum, coefficient, index) => sum + coefficient * terms[index],
          0,
        );
        layer[outputOffset + channel] = Math.round(
          master.data[outputOffset + channel] * (1 - blendWeight) +
            Math.max(0, Math.min(255, prediction)) * blendWeight,
        );
      }
      layer[outputOffset + 3] = 255;
    }
  }
}

function paintSprite(layer, canvasWidth, sprite, centerX, centerY) {
  const startX = Math.round(centerX - sprite.width / 2);
  const startY = Math.round(centerY - sprite.height / 2);
  for (let y = 0; y < sprite.height; y += 1) {
    for (let x = 0; x < sprite.width; x += 1) {
      const sourceOffset = (y * sprite.width + x) * 4;
      if (!sprite.data[sourceOffset + 3]) continue;
      const outputOffset = ((startY + y) * canvasWidth + startX + x) * 4;
      sprite.data.copy(layer, outputOffset, sourceOffset, sourceOffset + 4);
    }
  }
}

function overlay(layers) {
  const result = Buffer.alloc(layers[0].length);
  for (const layer of layers) {
    for (let offset = 0; offset < layer.length; offset += 4) {
      if (!layer[offset + 3]) continue;
      layer.copy(result, offset, offset, offset + 4);
    }
  }
  return result;
}

async function writeRgba(filePath, canvas, data) {
  await sharp(data, {
    raw: { width: canvas.width, height: canvas.height, channels: 4 },
  })
    .png()
    .toFile(filePath);
}

async function buildVariant({
  name,
  generatedReference,
  targetWidth,
  targetHeight,
}) {
  const generatedEyes = findGeneratedEyes(generatedReference);
  const faceLayer = Buffer.alloc(master.data.length);
  for (const bounds of defaultEyeBounds) {
    paintSkinPatch(faceLayer, master, bounds, skinModel);
  }

  for (let index = 0; index < 2; index += 1) {
    const bounds = defaultEyeBounds[index];
    const sprite = await createEyeSprite(
      generatedReference,
      generatedEyes[index],
      targetWidth,
      targetHeight,
    );
    paintSprite(
      faceLayer,
      master.width,
      sprite,
      (bounds.minX + bounds.maxX) / 2,
      (bounds.minY + bounds.maxY) / 2,
    );
  }

  const composite = overlay([body.data, underwear.data, faceLayer]);
  await Promise.all([
    writeRgba(path.join(outputDirectory, `face-${name}.png`), master, faceLayer),
    writeRgba(path.join(outputDirectory, `preview-${name}.png`), master, composite),
  ]);
}

const [master, body, underwear, defaultFace, roundedReference, almondReference] =
  await Promise.all([
    readRgba(masterPath),
    readRgba(bodyPath),
    readRgba(underwearPath),
    readRgba(defaultFacePath),
    readRgba(roundedReferencePath),
    readRgba(almondReferencePath),
  ]);

for (const image of [body, underwear, defaultFace]) {
  if (image.width !== master.width || image.height !== master.height) {
    throw new Error("As camadas-base não usam o mesmo quadro do Master.");
  }
}

const defaultEyeBounds = findDefaultEyeBounds(defaultFace);
const skinModel = fitSkinModel(master, defaultEyeBounds);
await mkdir(outputDirectory, { recursive: true });
await buildVariant({
  name: "eyes-rounded",
  generatedReference: roundedReference,
  targetWidth: 62,
  targetHeight: 62,
});
await buildVariant({
  name: "eyes-almond-upturned",
  generatedReference: almondReference,
  targetWidth: 78,
  targetHeight: 38,
});

console.log(
  JSON.stringify(
    {
      canvas: `${master.width}x${master.height}`,
      variants: ["eyes-rounded", "eyes-almond-upturned"],
      outputDirectory,
    },
    null,
    2,
  ),
);
