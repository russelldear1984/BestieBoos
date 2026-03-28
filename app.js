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
    { id: "blush", label: "Blush Pink", value: "linear-gradient(165deg,#f8d1e6 0%,#f2b6dd 43%,#deb6f4 100%)" },
    { id: "mint", label: "Mint Pop", value: "linear-gradient(165deg,#79ece1 0%,#74d8ef 45%,#96c7f8 100%)" },
    { id: "sun", label: "Sunny", value: "linear-gradient(165deg,#ffe990 0%,#ffd36a 42%,#f9ab63 100%)" },
    { id: "sky", label: "Sky", value: "linear-gradient(165deg,#b6d7fb 0%,#95bdf6 46%,#8ea3ef 100%)" },
    { id: "lavender", label: "Lavender", value: "linear-gradient(165deg,#e2c8ff 0%,#d2b5fb 44%,#c7a4ef 100%)" },
  ],
  patterns: [
    { id: "stars", label: "Twinkle Stars" },
    { id: "hearts", label: "Love Hearts" },
    { id: "rainbows", label: "Rainbow Splash" },
    { id: "swirls", label: "Dreamy Swirls" },
    { id: "glitter", label: "Glitter Dust" },
  ],
  squishies: [
    { id: "duck", label: "Sunny Duck", type: "duck", body: "#ffcf59", belly: "#fff4c5", accent: "#ff9f4d" },
    { id: "bear", label: "Cloudy Bear", type: "bear", body: "#ff6f96", belly: "#fff2ba", accent: "#ff9db6" },
    { id: "blob", label: "Rosy Blob", type: "blob", body: "#ff7f86", belly: "#fff6cb", accent: "#ffb2a7" },
    { id: "dolphin", label: "Bubble Dolphin", type: "dolphin", body: "#79b7ff", belly: "#e5f3ff", accent: "#9ad6ff" },
    { id: "fantasy", label: "Sparkle Dragon", type: "dragon", body: "#b687ff", belly: "#f8ebff", accent: "#ffb8df" },
  ],
};

const state = {
  style: "slender",
  color: "blush",
  pattern: "stars",
  squishy: "bear",
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

const squishySVG = (s) => {
  const ears =
    s.type === "bear"
      ? `<circle cx="34" cy="22" r="10" fill="${s.body}"/><circle cx="86" cy="22" r="10" fill="${s.body}"/>`
      : s.type === "duck"
      ? `<ellipse cx="24" cy="44" rx="8" ry="10" fill="${s.body}"/><ellipse cx="96" cy="44" rx="8" ry="10" fill="${s.body}"/>`
      : s.type === "dragon"
      ? `<path d="M22 36 L34 18 L44 34" fill="${s.accent}"/><path d="M74 34 L86 18 L98 36" fill="${s.accent}"/>`
      : "";

  const fin =
    s.type === "dolphin"
      ? `<path d="M20 54 C30 32,54 28,72 36 C88 44,98 58,92 70 C76 82,42 83,24 74 Z" fill="${s.body}"/><path d="M72 36 L84 24 L88 42 Z" fill="${s.accent}"/>`
      : `<path d="M24 52 C24 28,96 28,96 56 C96 85,78 100,60 100 C42 100,24 85,24 52Z" fill="${s.body}"/>`;

  return `
  <svg class="squishy-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="shine-${s.id}" cx="32%" cy="24%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    ${ears}
    ${fin}
    <ellipse cx="60" cy="108" rx="30" ry="6" fill="#000" opacity="0.15"/>
    <ellipse cx="60" cy="72" rx="21" ry="16" fill="${s.belly}" opacity="0.95"/>
    <ellipse cx="60" cy="56" rx="38" ry="34" fill="url(#shine-${s.id})" />
    <circle cx="48" cy="53" r="3.8" fill="#111"/>
    <circle cx="72" cy="53" r="3.8" fill="#111"/>
    <path d="M53 64 Q60 69 67 64" stroke="#1f1f1f" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="61" r="3" fill="#ffabc4" opacity="0.7"/>
    <circle cx="78" cy="61" r="3" fill="#ffabc4" opacity="0.7"/>
  </svg>`;
};

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
    .map((opt) => {
      const selected = state.squishy === opt.id ? "active" : "";
      return `
      <button class="squishy-card ${selected}" data-type="squishy" data-id="${opt.id}">
        <span class="squishy-thumb">${squishySVG(opt)}</span>
        <strong>${opt.label}</strong>
      </button>`;
    })
    .join("");
}

function applyStyleShape(id, bottle) {
  bottle.classList.remove("slender", "chubby", "classic", "tall", "mini");
  bottle.classList.add(id);

  if (id === "tall") {
    bottle.style.height = "360px";
    bottle.style.width = "162px";
  } else if (id === "mini") {
    bottle.style.height = "270px";
    bottle.style.width = "170px";
  } else if (id === "chubby") {
    bottle.style.height = "318px";
    bottle.style.width = "196px";
  } else if (id === "classic") {
    bottle.style.height = "318px";
    bottle.style.width = "172px";
  } else {
    bottle.style.height = "336px";
    bottle.style.width = "172px";
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
    el.innerHTML = squishySVG(squishy);
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

  const currentIdx = screens.indexOf(screenName);
  backBtn.disabled = currentIdx <= 0;
  backBtn.dataset.backTo = screens[Math.max(0, currentIdx - 1)];
}

document.body.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  const { type, id, go } = target.dataset;

  if (type && id) {
    state[type] = id;
    applyState();
  }

  if (go) {
    showScreen(go);
  }
});

backBtn.addEventListener("click", () => {
  showScreen(backBtn.dataset.backTo || "home");
});

applyState();
showScreen("home");
