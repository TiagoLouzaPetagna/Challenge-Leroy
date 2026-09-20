from __future__ import annotations

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "public" / "avatar-creator" / "catalogo.json"
OUTPUT_DIR = ROOT / "public" / "arcade" / "avatars"

PRESETS = {
    "luk-casa": {
        "skin": "mel",
        "hair": "curto",
        "hairColor": "espresso",
        "eyeColor": "castanho",
        "eyeShape": "amendoados",
        "nose": "arredondado",
        "face": "sorriso",
        "top": "gravata",
        "topColor": "azul",
        "bottom": "calca",
        "bottomColor": "ardosia",
        "shoes": "botas",
        "shoeColor": "couro",
        "accessory": "fones",
        "accentColor": "menta",
    },
    "mari-shield": {
        "skin": "bronze",
        "hair": "trancas",
        "hairColor": "castanho",
        "eyeColor": "verde",
        "eyeShape": "redondos",
        "nose": "delicado",
        "face": "alegre",
        "top": "jaqueta",
        "topColor": "salvia",
        "bottom": "cargo",
        "bottomColor": "oliva",
        "shoes": "tenis",
        "shoeColor": "creme",
        "accessory": "oculos",
        "accentColor": "mel",
    },
    "nana-tech": {
        "skin": "cacau",
        "hair": "afro",
        "hairColor": "lilas",
        "eyeColor": "ambar",
        "eyeShape": "monolid_curvo",
        "nose": "largo",
        "face": "sereno",
        "top": "sueter",
        "topColor": "terracota",
        "bottom": "plissada",
        "bottomColor": "vinho",
        "shoes": "sapatilhas",
        "shoeColor": "carvao",
        "accessory": "polvo",
        "accentColor": "lavanda",
    },
}


def parse_hex(value: str) -> tuple[int, int, int, int]:
    return (int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16), 255)


def palette(data: dict, config: dict) -> list[tuple[int, int, int, int]]:
    ramps = data["ramps"]
    values = [
        None,
        "332b3f",
        *ramps["skin"][config["skin"]],
        ramps["skin"][config["skin"]][0],
        *ramps["hairColor"][config["hairColor"]],
        *ramps["topColor"][config["topColor"]],
        *ramps["bottomColor"][config["bottomColor"]],
        *ramps["shoeColor"][config["shoeColor"]],
        "2d2839",
        ramps["eyeColor"][config["eyeColor"]],
        "fff0d7",
        *ramps["accentColor"][config["accentColor"]],
        "e8c17d",
    ]
    return [(0, 0, 0, 0) if value is None else parse_hex(value) for value in values]


def render(data: dict, patch: dict) -> Image.Image:
    config = {**data["defaults"], **patch}
    pixels = [(0, 0, 0, 0)] * (data["width"] * data["height"])
    colors = palette(data, config)

    for layer in data["order"]:
        if layer == "bottom" and data.get("bottomHiddenByTop", {}).get(config["top"]):
            continue
        if layer == "body":
            variant = "base"
        elif layer in ("hairBack", "hairFront"):
            variant = config["hair"]
        elif layer == "face":
            variant = ":".join((config["face"], config["eyeShape"], config["nose"]))
        else:
            variant = config[layer]

        for x, y, width, color_index in data["pieces"][layer][variant]:
            clip_y = data.get("hairClipY", {}).get(config["accessory"], 0)
            if layer in ("hairBack", "hairFront") and y < clip_y:
                continue
            for xx in range(x, x + width):
                pixels[y * data["width"] + xx] = colors[color_index]

    image = Image.new("RGBA", (data["width"], data["height"]))
    image.putdata(pixels)
    return image.resize((288, 384), Image.Resampling.NEAREST)


def main() -> None:
    data = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, preset in PRESETS.items():
        render(data, preset).save(OUTPUT_DIR / f"{name}.png", optimize=True)


if __name__ == "__main__":
    main()
