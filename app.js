const screens = ["home", "customize", "squishy", "final", "founders"];

const options = {
  styles: [
    { id: "slender", label: "Slender" },
    { id: "chubby", label: "Chubby" },
    { id: "classic", label: "Classic" },
    { id: "tall", label: "Tall Twist" },
    { id: "mini", label: "Mini Buddy" },
  ],
  colors: [
    { id: "blush", label: "Blush Pink", value: "linear-gradient(160deg,#f7c7dc,#e8b8e8)" },
    { id: "mint", label: "Mint Pop", value: "linear-gradient(160deg,#72e3d7,#6bc9eb)" },
    { id: "sun", label: "Sunny", value: "linear-gradient(160deg,#fbe371,#f8be5e)" },
    { id: "sky", label: "Sky", value: "linear-gradient(160deg,#9fc8f9,#80a7eb)" },
    { id: "lavender", label: "Lavender", value: "linear-gradient(160deg,#d6b2f1,#c59ee9)" },
  ],
  patterns: [
    { id: "stars", label: "Twinkle Stars" },
    { id: "hearts", label: "Love Hearts" },
    { id: "rainbows", label: "Rainbow Splash" },
    { id: "swirls", label: "Dreamy Swirls" },
    { id: "glitter", label: "Glitter Dust" },
  ],
  squishies: [
    { id: "duck", label: "Sunny Duck", emoji: "🦆" },
    { id: "bear", label: "Cloudy Bear", emoji: "🐻" },
    { id: "blob", label: "Rosy Blob", emoji: "👾" },
    { id: "dolphin", label: "Bubble Dolphin", emoji: "🐬" },
    { id: "fantasy", label: "Sparkle Dragon", emoji: "🐉" },
  ],
};

const state = {
  style: "slender",
  color: "blush",
  pattern: "stars",
  squishy: "duck",
};

const styleOptions = document.getElementById("styleOptions");
const colorOptions = document.getElementById("colorOptions");
const patternOptions = document.getElementById("patternOptions");
const squishyOptions = document.getElementById("squishyOptions");
const backBtn = document.getElementById("backBtn");

const previewEls = [
  document.getElementById("bottlePreview"),
  document.getElementById("squishyBottlePreview"),
  document.getElementById("finalBottlePreview"),
];

const patternEls = [
  document.getElementById("patternLayer"),
  document.getElementById("patternLayer2"),
  document.getElementById("patternLayer3"),
];

const squishyEls = [
  document.getElementById("squishyMount"),
  document.getElementById("squishyMount2"),
  document.getElementById("squishyMount3"),
];

function renderButtons() {
  styleOptions.innerHTML = options.styles
    .map(
      (opt) =>
        `<button class="chip ${state.style === opt.id ? "active" : ""}" data-type="style" data-id="${opt.id}">${opt.label}</button>`,
    )
    .join("");

  colorOptions.innerHTML = options.colors
    .map(
      (opt) =>
        `<button class="swatch ${state.color === opt.id ? "active" : ""}" data-type="color" data-id="${opt.id}" style="background:${opt.value}" aria-label="${opt.label}"></button>`,
    )
    .join("");

  patternOptions.innerHTML = options.patterns
    .map(
      (opt) =>
        `<button class="chip ${state.pattern === opt.id ? "active" : ""}" data-type="pattern" data-id="${opt.id}">${opt.label}</button>`,
    )
    .join("");

  squishyOptions.innerHTML = options.squishies
    .map(
      (opt) => `
      <button class="squishy-card ${state.squishy === opt.id ? "active" : ""}" data-type="squishy" data-id="${opt.id}">
        <span class="squishy-emoji">${opt.emoji}</span>
        <strong>${opt.label}</strong>
      </button>
    `,
    )
    .join("");
}

function applyStyleShape(id, bottle) {
  bottle.classList.remove("slender", "chubby", "classic");

  if (id === "tall") {
    bottle.classList.add("slender");
    bottle.style.height = "350px";
    bottle.style.width = "160px";
  } else if (id === "mini") {
    bottle.classList.add("chubby");
    bottle.style.height = "280px";
    bottle.style.width = "175px";
  } else {
    bottle.classList.add(id);
    bottle.style.height = "320px";
    bottle.style.width = id === "chubby" ? "190px" : "170px";
  }
}

function applyState() {
  const color = options.colors.find((c) => c.id === state.color);
  const squishy = options.squishies.find((s) => s.id === state.squishy);

  previewEls.forEach((bottle) => {
    applyStyleShape(state.style, bottle);
    bottle.style.background = color.value;
  });

  patternEls.forEach((el) => {
    el.className = `pattern pattern-${state.pattern}`;
  });

  squishyEls.forEach((el, idx) => {
    el.textContent = squishy.emoji;
    if (idx === 0) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });

  renderButtons();
}

function showScreen(screenName) {
  screens.forEach((screen) => {
    document.getElementById(`screen-${screen}`).classList.toggle("active", screen === screenName);
  });

  const flow = ["home", "customize", "squishy", "final", "founders"];
  const currentIdx = flow.indexOf(screenName);
  backBtn.disabled = currentIdx <= 0;
  backBtn.dataset.backTo = flow[Math.max(0, currentIdx - 1)];
}

document.body.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  const type = target.dataset.type;
  const id = target.dataset.id;

  if (type && id) {
    state[type] = id;
    applyState();
  }

  if (target.dataset.go) {
    showScreen(target.dataset.go);
  }
});

backBtn.addEventListener("click", () => {
  showScreen(backBtn.dataset.backTo || "home");
});

applyState();
showScreen("home");
