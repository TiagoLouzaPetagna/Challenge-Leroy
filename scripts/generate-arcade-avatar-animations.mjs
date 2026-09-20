import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const creatorDirectory = path.resolve(projectDirectory, "..", "criador-avatar-rapido", "dist");
const outputDirectory = path.join(projectDirectory, "public", "arcade", "avatars");

const { animatedPixels, idleFrames, waveFrames } = await import(
  pathToFileURL(path.join(creatorDirectory, "animation.js")).href
);
const { reactionFrames, animatedAccessories, cosmeticTiming } = await import(
  pathToFileURL(path.join(creatorDirectory, "reactions.js")).href
);

const data = JSON.parse(
  await fs.readFile(path.join(creatorDirectory, "catalogo.json"), "utf8"),
);

const presets = {
  "luk-casa": {
    config: {
      skin: "mel",
      hair: "curto",
      hairColor: "espresso",
      eyeColor: "castanho",
      eyeShape: "amendoados",
      nose: "arredondado",
      face: "sorriso",
      top: "gravata",
      topColor: "azul",
      bottom: "calca",
      bottomColor: "ardosia",
      shoes: "botas",
      shoeColor: "couro",
      accessory: "fones",
      accentColor: "menta",
    },
    timeline: [idleFrames, idleFrames, reactionFrames.celebrate, idleFrames],
  },
  "mari-shield": {
    config: {
      skin: "bronze",
      hair: "trancas",
      hairColor: "castanho",
      eyeColor: "verde",
      eyeShape: "redondos",
      nose: "delicado",
      face: "alegre",
      top: "jaqueta",
      topColor: "salvia",
      bottom: "cargo",
      bottomColor: "oliva",
      shoes: "tenis",
      shoeColor: "creme",
      accessory: "oculos",
      accentColor: "mel",
    },
    timeline: [idleFrames, idleFrames, waveFrames, idleFrames],
  },
  "nana-tech": {
    config: {
      skin: "cacau",
      hair: "afro",
      hairColor: "lilas",
      eyeColor: "ambar",
      eyeShape: "monolid_curvo",
      nose: "largo",
      face: "sereno",
      top: "sueter",
      topColor: "terracota",
      bottom: "plissada",
      bottomColor: "vinho",
      shoes: "sapatilhas",
      shoeColor: "carvao",
      accessory: "polvo",
      accentColor: "lavanda",
    },
    timeline: [idleFrames, reactionFrames.laugh, idleFrames, waveFrames, idleFrames],
  },
};

function expandTimeline(config, groups) {
  const frames = [];
  let elapsed = 0;

  for (const pose of groups.flat()) {
    let remaining = pose.ms;
    while (remaining > 0) {
      const timing = animatedAccessories.has(config.accessory)
        ? cosmeticTiming(config.accessory, elapsed)
        : { phase: 0, remaining };
      const duration = Math.min(remaining, timing.remaining);
      frames.push({
        pose: {
          ...pose,
          ...(animatedAccessories.has(config.accessory)
            ? { cosmeticPhase: timing.phase }
            : {}),
        },
        duration,
      });
      elapsed += duration;
      remaining -= duration;
    }
  }

  return frames;
}

await fs.mkdir(outputDirectory, { recursive: true });

for (const [name, preset] of Object.entries(presets)) {
  const config = { ...data.defaults, ...preset.config };
  const frames = expandTimeline(config, preset.timeline);
  const rawFrames = frames.map(({ pose }) =>
    Buffer.from(animatedPixels(data, config, pose)),
  );

  await sharp(Buffer.concat(rawFrames), {
    raw: {
      width: data.width,
      height: data.height * frames.length,
      channels: 4,
      pageHeight: data.height,
    },
  })
    .webp({
      lossless: true,
      loop: 0,
      delay: frames.map(({ duration }) => duration),
      effort: 6,
    })
    .toFile(path.join(outputDirectory, `${name}-animated.webp`));
}

console.log(`Avatares animados exportados em ${outputDirectory}`);
