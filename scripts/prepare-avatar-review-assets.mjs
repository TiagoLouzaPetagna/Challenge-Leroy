import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const sourceDirectory = path.resolve("assets/avatar/review");
const outputDirectory = path.resolve("public/avatar/review/master-approved-v1");

const files = [
  ["master-approved-v1/body-base.png", "body-base.png"],
  ["master-approved-v1/underwear-default.png", "underwear-default.png"],
  ["eye-variants-v1/face-eyes-rounded.png", "face-eyes-rounded.png"],
  [
    "eye-variants-v1/face-eyes-almond-upturned.png",
    "face-eyes-almond-upturned.png",
  ],
];

await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  files.map(([source, output]) =>
    sharp(path.join(sourceDirectory, source))
      .resize(256, 384, {
        fit: "fill",
        kernel: sharp.kernel.nearest,
      })
      .png({ compressionLevel: 9, palette: false })
      .toFile(path.join(outputDirectory, output)),
  ),
);

console.log("Camadas de revisão preparadas em 256 x 384 px.");
