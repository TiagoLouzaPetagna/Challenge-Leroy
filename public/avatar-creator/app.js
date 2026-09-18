import { pixels, randomize, validate } from "./engine.js";
import { registerAvatarTools } from "./webmcp.js";
import { setupMotion, resetMotion } from "./motion-v2.js";

const STORAGE_KEY = "casa-digital:avatar:v1";
const HOST_ORIGIN = window.location.origin;
const params = new URLSearchParams(window.location.search);
const embedded = params.get("embedded") === "1";
if (embedded) document.documentElement.classList.add("embedded");

const $ = (selector) => document.querySelector(selector);
const groups = {
  hair: { label: "Cabelo", fields: [["hair", "Cabelo"]] },
  face: {
    label: "Rosto",
    fields: [
      ["eyeShape", "Formato dos olhos"],
      ["nose", "Nariz"],
      ["face", "Expressão"],
    ],
  },
  clothes: {
    label: "Roupas",
    fields: [
      ["top", "Roupa"],
      ["bottom", "Parte de baixo"],
    ],
  },
  shoes: { label: "Calçados", fields: [["shoes", "Calçados"]] },
  accessories: { label: "Acessórios", fields: [["accessory", "Acessório"]] },
  colors: {
    label: "Cores",
    fields: [
      ["skin", "Pele"],
      ["hairColor", "Cabelo"],
      ["eyeColor", "Olhos"],
      ["topColor", "Roupa"],
      ["bottomColor", "Parte de baixo"],
      ["shoeColor", "Calçados"],
      ["accentColor", "Acessório"],
    ],
  },
};

let data;
let state;
let group = "hair";

function notifyHost(type, payload = {}) {
  if (!embedded || window.parent === window) return;
  window.parent.postMessage({ type, payload }, HOST_ORIGIN);
}

function draw(canvas, config, field) {
  const full = document.createElement("canvas");
  full.width = 48;
  full.height = 64;
  full
    .getContext("2d")
    .putImageData(new ImageData(pixels(data, config), 48, 64), 0, 0);

  if (!field) {
    canvas
      .getContext("2d")
      .putImageData(full.getContext("2d").getImageData(0, 0, 48, 64), 0, 0);
    return;
  }

  const box = ["hair", "accessory"].includes(field)
    ? [4, 0, 40, 36]
    : ["eyeShape", "nose", "face"].includes(field)
      ? [10, 18, 28, 18]
      : field === "shoes"
        ? [12, 48, 25, 16]
        : [7, 31, 34, 31];
  canvas.width = 40;
  canvas.height = 40;
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;
  const scale = Math.min(40 / box[2], 40 / box[3]);
  const width = Math.floor(box[2] * scale);
  const height = Math.floor(box[3] * scale);
  context.drawImage(
    full,
    ...box,
    Math.floor((40 - width) / 2),
    Math.floor((40 - height) / 2),
    width,
    height,
  );
}

function note(message) {
  $("#status").textContent = message;
}

function markChanged() {
  $("#save").textContent = "Usar este avatar";
}

function update() {
  draw($("#avatar"), state);
  resetMotion();
  $("#avatar").ariaLabel =
    "Avatar com " +
    data.labels[state.hair] +
    ", " +
    data.labels[state.top] +
    " e " +
    data.labels[state.accessory];
  renderItems();
}

function choose(key, value) {
  state[key] = value;
  markChanged();
  update();
  note(data.labels[value] + " aplicado. Continue montando ou use este avatar.");
}

function sample(field, value) {
  const config = { ...state, [field]: value };
  if (["hair", "eyeShape", "nose", "face"].includes(field)) {
    config.accessory = "nenhum";
  }
  if (field === "eyeShape") config.face = "sorriso";
  if (field === "bottom" && data.bottomHiddenByTop?.[config.top]) {
    config.top = "camiseta";
  }
  return config;
}

function renderItems() {
  const area = $("#items");
  area.replaceChildren();
  area.setAttribute("aria-labelledby", "tab-" + group);

  for (const [field, title] of groups[group].fields) {
    const section = document.createElement("section");
    section.className = "item-section";
    const heading = document.createElement("div");
    heading.className = "section-heading";
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    const selected = document.createElement("span");
    selected.textContent = "Selecionado: " + data.labels[state[field]];
    heading.append(titleElement, selected);
    section.append(heading);

    if (field === "bottom" && data.bottomHiddenByTop?.[state.top]) {
      const hint = document.createElement("p");
      hint.className = "hint";
      hint.textContent =
        "A roupa atual cobre esta peça. Ela volta a aparecer quando você trocar a parte de cima.";
      section.append(hint);
    }

    const list = document.createElement("div");
    list.className = group === "colors" ? "swatches" : "grid";
    for (const value of data.options[field]) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = group === "colors" ? "swatch" : "item";
      button.setAttribute("aria-pressed", String(state[field] === value));
      button.setAttribute("aria-label", title + ": " + data.labels[value]);
      button.dataset.field = field;
      button.dataset.value = value;

      if (group === "colors") {
        const swatch = document.createElement("i");
        swatch.ariaHidden = "true";
        const ramp = data.ramps[field][value];
        swatch.style.background = "#" + (Array.isArray(ramp) ? ramp[1] : ramp);
        button.append(swatch);
      } else {
        const preview = document.createElement("canvas");
        preview.ariaHidden = "true";
        draw(preview, sample(field, value), field);
        button.append(preview);
      }

      const label = document.createElement("span");
      label.className = "label";
      label.textContent = data.labels[value];
      button.append(label);
      button.addEventListener("click", () => {
        choose(field, value);
        requestAnimationFrame(() =>
          [...$("#items").querySelectorAll("button")]
            .find(
              (item) =>
                item.dataset.field === field && item.dataset.value === value,
            )
            ?.focus({ preventScroll: true }),
        );
      });
      list.append(button);
    }
    section.append(list);
    area.append(section);
  }
}

function switchGroup(key) {
  group = key;
  for (const tab of $("#tabs").children) {
    const selected = tab.dataset.group === key;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }
  renderItems();
}

function triggerDownload(href, name) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = name;
  anchor.click();
}

function avatarImageDataUrl() {
  const snapshot = document.createElement("canvas");
  snapshot.width = 48;
  snapshot.height = 64;
  draw(snapshot, state);
  return snapshot.toDataURL("image/png");
}

function readSavedAvatar() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved?.config || typeof saved.config !== "object") return null;
    validate(data, saved.config);
    return saved;
  } catch {
    return null;
  }
}

function saveAvatar() {
  const record = {
    version: 1,
    config: { ...state },
    imageDataUrl: avatarImageDataUrl(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  $("#save").textContent = "Avatar em uso";
  note("Pronto! Este avatar agora aparece no seu perfil.");
  notifyHost("casa-digital:avatar-saved", record);
  return record;
}

function surprise() {
  state = randomize(data, state);
  markChanged();
  update();
  note("Nova combinação criada. Ajuste o que quiser ou use este avatar.");
  return { ...state };
}

async function init() {
  try {
    const response = await fetch("./catalogo.json");
    if (!response.ok) throw new Error("Catálogo indisponível");
    data = await response.json();
    const saved = readSavedAvatar();
    state = saved
      ? { ...data.defaults, ...saved.config }
      : {
          ...data.defaults,
          top: "sueter",
          bottom: "rasgada",
          accessory: "polvo",
          accentColor: "lavanda",
          topColor: "terracota",
        };

    for (const [key, currentGroup] of Object.entries(groups)) {
      const button = document.createElement("button");
      button.id = "tab-" + key;
      button.dataset.group = key;
      button.type = "button";
      button.role = "tab";
      button.setAttribute("aria-controls", "items");
      button.setAttribute("aria-selected", String(key === group));
      button.tabIndex = key === group ? 0 : -1;
      button.textContent = currentGroup.label;
      button.addEventListener("click", () => switchGroup(key));
      button.addEventListener("keydown", (event) => {
        const keys = Object.keys(groups);
        let next;
        if (event.key === "ArrowRight") next = (keys.indexOf(key) + 1) % keys.length;
        if (event.key === "ArrowLeft") {
          next = (keys.indexOf(key) + keys.length - 1) % keys.length;
        }
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = keys.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          switchGroup(keys[next]);
          $("#tab-" + keys[next]).focus();
        }
      });
      $("#tabs").append(button);
    }

    $("#count").textContent = [
      data.options.hair.length + " cabelos",
      data.options.top.length + data.options.bottom.length + " roupas",
      data.options.accessory.length - 1 + " acessórios",
    ].join(" · ");
    $("#surprise").onclick = surprise;
    $("#save").onclick = saveAvatar;
    $("#download").onclick = () => {
      const scale = Number($("#scale").value);
      const canvas = document.createElement("canvas");
      canvas.width = 48 * scale;
      canvas.height = 64 * scale;
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = false;
      const snapshot = document.createElement("canvas");
      snapshot.width = 48;
      snapshot.height = 64;
      draw(snapshot, state);
      context.drawImage(snapshot, 0, 0, canvas.width, canvas.height);
      triggerDownload(
        canvas.toDataURL("image/png"),
        "meu-avatar-" + canvas.width + "x" + canvas.height + ".png",
      );
      note("PNG salvo com fundo transparente.");
    };

    update();
    for (const id of ["surprise", "download", "save"]) {
      $("#" + id).disabled = false;
    }
    if (saved) {
      $("#save").textContent = "Avatar em uso";
      note("Este é o avatar que está no seu perfil. Edite ou teste uma reação.");
    } else {
      note("Escolha uma peça ou comece com “Surpreenda-me”.");
    }
    notifyHost("casa-digital:avatar-ready", {
      hasSavedAvatar: Boolean(saved),
      imageDataUrl: saved?.imageDataUrl || null,
    });
  } catch (error) {
    note("Não foi possível carregar as peças. Recarregue a página.");
    $("#status").classList.add("error");
    notifyHost("casa-digital:avatar-error", { message: String(error) });
    console.error(error);
  }
}

init().then(() => {
  if (!data || !state) return;
  setupMotion(data, () => state);
  registerAvatarTools(document.modelContext, data, {
    read: () => ({ ...state }),
    randomize: surprise,
    configure: (patch) => {
      if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
        throw new Error("Informe um objeto com peças e cores.");
      }
      validate(data, patch);
      state = { ...state, ...patch };
      markChanged();
      update();
      note("Combinação atualizada. Use este avatar quando terminar.");
      return { ...state };
    },
  });
});
