const ACCESS_CODE = "perfusion-preview";
const ACCESS_STORAGE_KEY = "practical-perfusion-access";

const backgroundTopics = [
  {
    title: "Myth: Perfusion contrast is finicky",
    summary:
      "Perfusion protocols fail mostly from inconsistent infusion, not fragile bubbles.",
    bullets: [
      "Steady-state infusion keeps myocardium saturated without constant boluses.",
      "Modern scanners automatically scale MI in 0.01 increments—use it liberally.",
      "Prep errors (under-shaken vials, foamy tubing) explain >70% of failed studies.",
    ],
  },
  {
    title: "Why continuous infusion beats bolus",
    summary:
      "Infusion keeps LV cavity bright while MI stays low, so you can flash when needed.",
    bullets: [
      "Minimal hemodynamic impact: <2 mL/min infusion equals a maintenance IV drip.",
      "Predictable replenishment curves make quality tracking (arrival, peak, decay) easy.",
      "No waiting for the next bolus—flash, pause 8 seconds, resume.",
    ],
  },
  {
    title: "Evidence snapshot",
    summary:
      "High-volume centers show reproducible perfusion imaging across scanners.",
    bullets: [
      "Cleveland Clinic and UofL echo labs published similar MI windows (0.05–0.12).",
      "Contrast lab downtime dropped 30% after standardizing infusion checklists.",
      "Apical perfusion scoring improved from 68% to 91% when teams logged QA metrics.",
    ],
  },
];

const machines = [
  {
    id: "epiq",
    name: "Philips EPIQ",
    badge: "CnTI / PureWave",
    probe: "X5-1 PureWave",
    summary:
      "CnTI preset with easily tunable MI. Great for optimizing apex fill without nuking the myocardium.",
    positioning: [
      "Keep depth 16–18 cm so the focus icon sits mid-LV.",
      "Leave MFI off; use dual screen only for troubleshooting.",
      "Use PureWave probe; neutral wrist to avoid rib dropout.",
    ],
    keyKnobs: [
      "Preset: Cardiac >> Contrast (CnTI)",
      "Mechanical Index: 0.08–0.12 (single knob under 'Power')",
      "TGC: Level baseline at mid-LV, drop two bottom sliders slightly",
    ],
  },
  {
    id: "vivid",
    name: "GE Vivid Pioneer",
    badge: "B-Flow Fusion",
    probe: "M5Sc-D Matrix",
    summary:
      "Vivid's contrast+B-Flow overlay keeps endocardial definition visible even with low MI.",
    positioning: [
      "Set depth 18 cm; keep focus below LV apex.",
      "Use the adaptive gain knob instead of default TGC for quick sweeps.",
      "Rock probe heel-toe to keep basal segments away from ribs.",
    ],
    keyKnobs: [
      "Preset: Adult Contrast >> Low MI",
      "Mechanical Index: 0.05–0.10 (Acoustic Output dial)",
      "Dynamic Range: 60–65 dB for microbubble-only fill",
    ],
  },
];

const bubbles = [
  {
    id: "definity",
    name: "Definity",
    badge: "Durable / High signal",
    summary:
      "Robust microbubble with predictable acoustic response. Handles aggressive flash impulses.",
    prep: [
      "Activate vial for 45 sec; draw 1.5 mL into a 3 mL syringe.",
      "Dilute into 30 mL NS bag (1.5 mL Definity + 28.5 mL saline).",
      "Prime microbore tubing slowly to avoid foam.",
    ],
    sustainment: [
      "Keep bag gently inverted or swirl every 3 minutes.",
      "Label the line with start time and concentration.",
      "Bins easily with standard PCA pumps—set occlusion alarm low.",
    ],
  },
  {
    id: "lumason",
    name: "Lumason",
    badge: "Low viscosity",
    summary:
      "Ready-to-use sulfur hexafluoride bubble with softer response—perfect for fragile LV segments.",
    prep: [
      "Reconstitute per kit, withdraw entire syringe (5 mL).",
      "Mix 5 mL Lumason into 45 mL NS syringe (50 mL total).",
      "Keep the syringe gently agitated every few minutes.",
    ],
    sustainment: [
      "Use syringe pump with microbore tubing to limit settling.",
      "Store spare syringes at room temp; cold Lumason attenuates signal.",
      "Flush 2 mL NS through the stopcock every 3 minutes.",
    ],
  },
];

const protocols = [
  {
    id: "epiq-definity",
    machineId: "epiq",
    bubbleId: "definity",
    title: "EPIQ + Definity steady state",
    summary:
      "Use CnTI at MI 0.10 with SmartInfuse to hold a smooth myocardial blush while keeping LV cavity bright.",
    meta: [
      { label: "MI", value: "0.10 (allow 0.08–0.12)" },
      { label: "Infusion start", value: "1.3 mL/min (≈3 drops/s)" },
      { label: "Flash", value: "CnTI Flash key @ 1.0 MI" },
    ],
    stages: [
      {
        title: "Preset + probe",
        bullets: [
          "Load Cardiac CnTI preset, verify PureWave probe connected.",
          "Depth 16–18 cm; move focus marker to mid LV cavity.",
          "Baseline gain to where myocardium is just visible, then drop 5 clicks.",
        ],
      },
      {
        title: "Infusion dial-in",
        bullets: [
          "Start SmartInfuse or syringe pump at 1.3 mL/min.",
          "After 30 sec, titrate MI down to 0.08 if swirling persists.",
          "Keep the apex bright by bumping overall gain +2 if it lags.",
        ],
      },
      {
        title: "Optimization cues",
        bullets: [
          "If basal segments wash out first, lower depth to bring focus up.",
          "Toggle dual screen for one heartbeat to confirm endocardial outline, then return to full screen.",
          "Use the right knob to trim TGC base two notches for pulmonary venous clutter.",
        ],
      },
      {
        title: "Rescue maneuvers",
        bullets: [
          "Short flash (Flash button once) for wall dropout, then pause infusion 10 sec.",
          "If LV cavity dims, spike the infusion to 1.8 mL/min for 1 minute, then settle back.",
        ],
      },
    ],
    pitfalls: [
      {
        title: "Apex never fully clears",
        signal: "Diffuse swirling beyond beat 4 despite good basal fill.",
        fix: "Drop MI to 0.08 and pause infusion 10 seconds before restarting at 1.5 mL/min.",
      },
      {
        title: "Overbright cavity",
        signal: "Chordal dropout from near-field saturation.",
        fix: "Dial infusion back to 1.0 mL/min and tilt probe toe-down to widen LV.",
      },
      {
        title: "Flash rebound artifact",
        signal: "Myocardium looks speckled after flash sequence.",
        fix: "Lengthen pause to 12 seconds and keep MI ≤0.12 between flashes.",
      },
    ],
    quality: {
      metrics: [
        { label: "LV arrival", value: "4–6 s", note: "Apex should opacify by beat 3." },
        { label: "Full replenishment", value: "8–10 s", note: "After 1.0 MI flash." },
        { label: "Frame rate", value: "28–32 fps", note: "Sector ≤50°." },
      ],
      pearls: [
        "Log SmartInfuse changes directly on the worksheet.",
        "Store one cine pre-flash and one post-flash for QA review.",
        "Note MI and infusion in the DICOM header comments.",
      ],
    },
  },
  {
    id: "epiq-lumason",
    machineId: "epiq",
    bubbleId: "lumason",
    title: "EPIQ + Lumason finesse",
    summary:
      "Lumason likes a gentler MI; keep CnTI at 0.07–0.09 and lean on flash to refresh difficult segments.",
    meta: [
      { label: "MI", value: "0.09 (cap at 0.10)" },
      { label: "Infusion start", value: "1.0 mL/min (≈2 drops/s)" },
      { label: "Flush", value: "2 mL NS every 3 min" },
    ],
    stages: [
      {
        title: "Preset + filters",
        bullets: [
          "CnTI preset, enable PureWave spatial compounding OFF.",
          "Depth 18 cm, single focus mid LV, sector width 45° to keep high frame rate.",
          "Lower wall filter to the minimum (WF 1) to protect low-amplitude return.",
        ],
      },
      {
        title: "Infusion workflow",
        bullets: [
          "Begin at 1.0 mL/min via syringe pump; confirm smooth drip column.",
          "After 60 sec, if LV cavity looks hazy, nudge MI up 0.01 and repeat.",
          "Give a 2 mL flush every 3 minutes to keep bubbles suspended.",
        ],
      },
      {
        title: "Optimization cues",
        bullets: [
          "If glittering artifact appears, reduce overall gain 3 clicks and narrow the sector further.",
          "Use single-beat recordings to avoid gating challenges with low MI.",
          "Flash basal segments with short diastolic bursts (0.9 MI) rather than full sweep.",
        ],
      },
      {
        title: "Rescue maneuvers",
        bullets: [
          "Stir syringe gently between views; Lumason stratifies quickly.",
          "If apex hollow, briefly increase infusion to 1.5 mL/min for 30 sec while holding MI constant.",
        ],
      },
    ],
    pitfalls: [
      {
        title: "Signal fades mid-study",
        signal: "Basal segments fade after 3 minutes.",
        fix: "Re-agitate syringe and give a 2 mL saline push before resuming.",
      },
      {
        title: "Noise glitter",
        signal: "Twinkling artifact over myocardium.",
        fix: "Lower MI to 0.07 and engage narrow sector (≤40°).",
      },
      {
        title: "Flash fatigue",
        signal: "No replenishment after flash.",
        fix: "Allow a full 15 seconds before restarting infusion; Lumason needs longer recovery.",
      },
    ],
    quality: {
      metrics: [
        { label: "LV arrival", value: "5–7 s", note: "Expect softer slope vs Definity." },
        { label: "Full replenishment", value: "10–12 s", note: "Lumason recovers slower—plan ahead." },
        { label: "Frame rate", value: "26–30 fps", note: "Maintain >25 fps for strain overlays." },
      ],
      pearls: [
        "Document every flush to correlate with cine brightness jumps.",
        "Tag cine loops with 'Lumason infusion' for easy PACS search.",
        "Track syringe time; discard and redraw after 15 minutes.",
      ],
    },
  },
  {
    id: "vivid-definity",
    machineId: "vivid",
    bubbleId: "definity",
    title: "Vivid Pioneer + Definity control",
    summary:
      "Leverage the B-Flow overlay to preserve border sharpness while pulsing MI 0.06–0.09.",
    meta: [
      { label: "MI", value: "0.08 (swing 0.06–0.10)" },
      { label: "Infusion start", value: "1.2 mL/min" },
      { label: "Frame rate", value: "≥25 fps" },
    ],
    stages: [
      {
        title: "Preset alignment",
        bullets: [
          "Adult Contrast preset, add B-Flow mix at 20% opacity.",
          "Depth 18 cm; set dual focus (base + apex) if available.",
          "Dynamic Range 62 dB; drop color priority to avoid bleed.",
        ],
      },
      {
        title: "Infusion workflow",
        bullets: [
          "Start infusion at 1.2 mL/min; observe for 3 cardiac cycles.",
          "Lock Acoustic Output at 7; if swirling persists, lower to 6.",
          "Raise compression knob only after checking B-Flow overlay for dropout.",
        ],
      },
      {
        title: "Optimization cues",
        bullets: [
          "Use live quad view (2D + B-Flow) when adjusting infusion so the LV border stays crisp.",
          "When apex fills late, push frame rate to >28 fps by narrowing the sector.",
          "Tap 'High Contrast' tool for one beat to burn through basal shadowing.",
        ],
      },
      {
        title: "Rescue maneuvers",
        bullets: [
          "Use the flash button (1.1 MI) then pause infusion for 8 sec before restarting.",
          "If LV cavity over-bright, reduce infusion to 0.9 mL/min and raise MI to 0.09.",
        ],
      },
    ],
    pitfalls: [
      {
        title: "B-Flow washout",
        signal: "Overlay disappears after flash.",
        fix: "Toggle B-Flow off/on and keep opacity <25% to avoid masking myocardium.",
      },
      {
        title: "Dual focus lag",
        signal: "Frame rate drops under 20 fps.",
        fix: "Disable dual focus until infusion stabilized; narrow sector.",
      },
      {
        title: "Near-field noise",
        signal: "Right atrium speckles obscure view.",
        fix: "Lift probe slightly and drop compression 3 clicks.",
      },
    ],
    quality: {
      metrics: [
        { label: "LV arrival", value: "4–5 s", note: "B-Flow overlay shows cavity within beat 2." },
        { label: "Full replenishment", value: "7–9 s", note: "Monitor via quad view." },
        { label: "Frame rate", value: "25–30 fps", note: "Use adaptive PRF to stay fast." },
      ],
      pearls: [
        "Screenshot the B-Flow mix knob for QA records.",
        "Label loops 'B-Flow mix %' so physicians know overlay level.",
        "Record one cine with overlay off for baseline comparison.",
      ],
    },
  },
  {
    id: "vivid-lumason",
    machineId: "vivid",
    bubbleId: "lumason",
    title: "Vivid Pioneer + Lumason finesse",
    summary:
      "Exploit Lumason's soft backscatter by keeping MI 0.05–0.07 and leaning on adaptive gain sweeps.",
    meta: [
      { label: "MI", value: "0.06" },
      { label: "Infusion start", value: "0.9 mL/min" },
      { label: "Refresh", value: "Short flash every 2 min" },
    ],
    stages: [
      {
        title: "Preset setup",
        bullets: [
          "Adult Contrast preset, B-Flow overlay OFF initially to judge fill.",
          "Sector width 40°; depth 17 cm; focus arrow 1 cm below apex.",
          "Engage 'Smooth' speckle reduction at level 1 only.",
        ],
      },
      {
        title: "Infusion workflow",
        bullets: [
          "Infuse at 0.9 mL/min; watch for apex before turning B-Flow back on.",
          "Use adaptive gain knob instead of TGC for micro tweaks between beats.",
          "If LV cavity grainy, drop MI to 0.05 and raise infusion to 1.1 mL/min.",
        ],
      },
      {
        title: "Optimization cues",
        bullets: [
          "Record apical 4 first; Lumason signal tails off faster in basal windows.",
          "When shimmer appears, engage B-Flow at 10% opacity for one sweep.",
          "Avoid B-mode compression changes during infusion—they reset MI silently.",
        ],
      },
      {
        title: "Rescue maneuvers",
        bullets: [
          "Short double flash then 2 mL saline push if apex still dark.",
          "Swap to dual screen with fundamental reference when endocardium looks over-suppressed.",
        ],
      },
    ],
    pitfalls: [
      {
        title: "Overlay overpowering signal",
        signal: "B-Flow obliterates faint contrast.",
        fix: "Keep overlay ≤15% and reintroduce only after infusion stabilizes.",
      },
      {
        title: "Sector drift",
        signal: "Frame rate plunges under 22 fps with wide sector.",
        fix: "Lock width at 40° and use zoom for basal views.",
      },
      {
        title: "Syringe sediment",
        signal: "Microbubbles layer within syringe.",
        fix: "Invert syringe gently every 2 minutes or remix a fresh dose.",
      },
    ],
    quality: {
      metrics: [
        { label: "LV arrival", value: "5–6 s", note: "Expect soft but even fill." },
        { label: "Full replenishment", value: "9–11 s", note: "Use short flash to confirm." },
        { label: "Frame rate", value: "24–28 fps", note: "Maintain >24 fps even with overlays." },
      ],
      pearls: [
        "Track adaptive gain settings per view for QA reproducibility.",
        "Tag loops with MI/infusion pairs so attending can correlate brightness.",
        "Capture one cine showing syringe pump screen for documentation.",
      ],
    },
  },
];

const checklistItems = [
  "Time-out: confirm agent, dose, IV patency, and absence of shunts.",
  "20G or larger IV in the right antecubital with dedicated line—no shared drips.",
  "Label the infusion syringe/bag with agent, concentration, and start time.",
  "Set a timer for bubble agitation (shake syringe every 3–4 minutes).",
  "Capture a reference loop before infusion for baseline comparison.",
  "Log MI, infusion rate, and any flash maneuvers directly on the worksheet.",
  "Export one optimized clip per view plus a sweep showing replenishment.",
];

const selection = {
  machineId: null,
  bubbleId: null,
};

let activeProtocolId = null;

const els = {
  background: document.getElementById("background-topics"),
  machineGrid: document.getElementById("machine-grid"),
  bubbleGrid: document.getElementById("bubble-grid"),
  machineCompare: document.getElementById("machine-compare"),
  machineDetail: document.getElementById("machine-detail"),
  bubbleDetail: document.getElementById("bubble-detail"),
  pitfallsGrid: document.getElementById("pitfalls-grid"),
  qualityData: document.getElementById("quality-data"),
  checklist: document.getElementById("checklist"),
};

function init() {
  renderBackground();
  renderMachineOptions();
  renderBubbleOptions();
  renderMachineDetail();
  renderBubbleDetail();
  renderPitfalls();
  renderQuality();
  renderChecklist();
  setupGate();
  wireButtons();
  initStoryNav();
  initAnimations();
}

function renderBackground() {
  if (!els.background) return;
  els.background.innerHTML = "";
  backgroundTopics.forEach((topic) => {
    const details = document.createElement("details");
    details.className = "disclosure";
    details.innerHTML = `
      <summary>${topic.title}</summary>
      <p>${topic.summary}</p>
      <ul>${topic.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
    `;
    els.background.appendChild(details);
  });
}

function renderMachineOptions() {
  if (!els.machineGrid) return;
  els.machineGrid.innerHTML = "";
  machines.forEach((machine) => {
    const card = document.createElement("article");
    card.className =
      "option-card" +
      (selection.machineId === machine.id ? " is-selected" : "");
    card.setAttribute("role", "listitem");
    card.innerHTML = `
      <div class="badge">${machine.badge}</div>
      <h3>${machine.name}</h3>
      <p>${machine.summary}</p>
      <ul>
        ${machine.keyKnobs.map((knob) => `<li>${knob}</li>`).join("")}
      </ul>
    `;
    card.addEventListener("click", () => handleMachineSelection(machine.id));
    els.machineGrid.appendChild(card);
  });
}

function renderBubbleOptions() {
  if (!els.bubbleGrid) return;
  els.bubbleGrid.innerHTML = "";
  bubbles.forEach((bubble) => {
    const card = document.createElement("article");
    card.className =
      "option-card" +
      (selection.bubbleId === bubble.id ? " is-selected" : "");
    card.setAttribute("role", "listitem");
    card.innerHTML = `
      <div class="badge">${bubble.badge}</div>
      <h3>${bubble.name}</h3>
      <p>${bubble.summary}</p>
      <h4>Prep essentials</h4>
      <ul>
        ${bubble.prep.map((step) => `<li>${step}</li>`).join("")}
      </ul>
    `;
    card.addEventListener("click", () => handleBubbleSelection(bubble.id));
    els.bubbleGrid.appendChild(card);
  });
}

function renderMachineDetail() {
  if (!els.machineDetail) return;
  const machine = machines.find((m) => m.id === selection.machineId);
  if (!machine) {
    els.machineDetail.innerHTML =
      '<p class="placeholder">Tap a machine to load probe tips and knobology.</p>';
    return;
  }
  const protocol = getActiveProtocol();
  const technique = protocol
    ? renderTechnique(protocol)
    : '<p class="placeholder">Select an agent to load the infusion walkthrough for this scanner.</p>';
  els.machineDetail.innerHTML = `
    <h3>${machine.name}</h3>
    <p>${machine.summary}</p>
    <div class="badge">Probe: ${machine.probe}</div>
    <div class="split">
      <div>
        <h4>Positioning</h4>
        <ul>${machine.positioning.map((tip) => `<li>${tip}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Key knobs</h4>
        <ul>${machine.keyKnobs.map((tip) => `<li>${tip}</li>`).join("")}</ul>
      </div>
    </div>
    ${technique}
  `;
}

function renderBubbleDetail() {
  if (!els.bubbleDetail) return;
  const bubble = bubbles.find((b) => b.id === selection.bubbleId);
  if (!bubble) {
    els.bubbleDetail.innerHTML =
      '<p class="placeholder">Select an agent to reveal prep, dilution, and sustainment steps.</p>';
    return;
  }
  els.bubbleDetail.innerHTML = `
    <h3>${bubble.name}</h3>
    <p>${bubble.summary}</p>
    <div class="split">
      <div>
        <h4>Prep steps</h4>
        <ul>${bubble.prep.map((step) => `<li>${step}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Sustainment</h4>
        <ul>${bubble.sustainment.map((s) => `<li>${s}</li>`).join("")}</ul>
      </div>
    </div>
  `;
}

function renderPitfalls() {
  if (!els.pitfallsGrid) return;
  const protocol = getActiveProtocol();
  if (!protocol) {
    els.pitfallsGrid.innerHTML =
      '<p class="placeholder">Pick a machine and an agent to surface pitfalls.</p>';
    return;
  }
  els.pitfallsGrid.innerHTML = protocol.pitfalls
    .map(
      (pitfall) => `
      <article class="pitfall-card">
        <h3>${pitfall.title}</h3>
        <p><strong>Signal:</strong> ${pitfall.signal}</p>
        <p><strong>Fix:</strong> ${pitfall.fix}</p>
      </article>
    `,
    )
    .join("");
}

function renderQuality() {
  if (!els.qualityData) return;
  const protocol = getActiveProtocol();
  if (!protocol) {
    els.qualityData.innerHTML =
      '<p class="placeholder">Select a machine-agent pairing to load data.</p>';
    return;
  }
  const metrics = protocol.quality.metrics
    .map(
      (metric) => `
        <div class="quality-card">
          <h3>${metric.label}</h3>
          <p class="metric">${metric.value}<span>${metric.note}</span></p>
        </div>
      `,
    )
    .join("");
  const pearls = `
    <div class="quality-card">
      <h3>QA pearls</h3>
      <ul>
        ${protocol.quality.pearls.map((pearl) => `<li>${pearl}</li>`).join("")}
      </ul>
    </div>
  `;
  els.qualityData.innerHTML = `
    ${metrics}
    ${pearls}
  `;
}

function renderChecklist() {
  if (!els.checklist) return;
  els.checklist.innerHTML = checklistItems
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderTechnique(protocol) {
  const metaBadges = protocol.meta
    .map(
      (item) => `
        <div class="badge">${item.label}: ${item.value}</div>
      `,
    )
    .join("");
  const stages = protocol.stages
    .map(
      (stage) => `
        <section class="technique-stage">
          <h4>${stage.title}</h4>
          <ul>${stage.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
        </section>
      `,
    )
    .join("");
  return `
    <section class="technique">
      <h3>Infusion walkthrough</h3>
      <p>${protocol.summary}</p>
      <div class="meta-badges">${metaBadges}</div>
      ${stages}
    </section>
  `;
}

function handleMachineSelection(machineId) {
  selection.machineId =
    selection.machineId === machineId ? null : machineId;
  renderMachineOptions();
  setProtocolFromSelection();
}

function handleBubbleSelection(bubbleId) {
  selection.bubbleId =
    selection.bubbleId === bubbleId ? null : bubbleId;
  renderBubbleOptions();
  renderBubbleDetail();
  setProtocolFromSelection();
}

function setProtocolFromSelection() {
  if (selection.machineId && selection.bubbleId) {
    const match = protocols.find(
      (protocol) =>
        protocol.machineId === selection.machineId &&
        protocol.bubbleId === selection.bubbleId,
    );
    activeProtocolId = match ? match.id : null;
  } else {
    activeProtocolId = null;
  }
  renderMachineDetail();
  renderPitfalls();
  renderQuality();
}

function getActiveProtocol() {
  return protocols.find((protocol) => protocol.id === activeProtocolId) ?? null;
}

function setupGate() {
  const gate = document.getElementById("access-gate");
  const form = document.getElementById("access-form");
  const input = document.getElementById("access-input");
  const error = document.getElementById("access-error");
  if (!gate || !form || !input || !error) return;
  const alreadyGranted =
    typeof window !== "undefined" &&
    window.localStorage.getItem(ACCESS_STORAGE_KEY) === "granted";
  if (alreadyGranted) {
    hideGate();
    return;
  }
  gate.classList.add("is-visible");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (value.toLowerCase() === ACCESS_CODE.toLowerCase()) {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, "granted");
      hideGate();
    } else {
      error.hidden = false;
      input.value = "";
      input.focus();
    }
  });

  function hideGate() {
    gate.classList.remove("is-visible");
    gate.setAttribute("aria-hidden", "true");
  }
}

function wireButtons() {
  const startFlow = document.getElementById("start-flow");
  const showBasics = document.getElementById("show-basics");
  const toggleMachineCompare = document.getElementById(
    "toggle-machine-compare",
  );
  const checklistBtn = document.getElementById("download-checklist");

  startFlow?.addEventListener("click", () => {
    document
      .getElementById("machine-heading")
      ?.scrollIntoView({ behavior: "smooth" });
  });

  showBasics?.addEventListener("click", () => {
    document
      .getElementById("background")
      ?.scrollIntoView({ behavior: "smooth" });
  });

  toggleMachineCompare?.addEventListener("click", () => {
    if (!els.machineCompare) return;
    const isHidden = els.machineCompare.hasAttribute("hidden");
    if (isHidden) {
      els.machineCompare.removeAttribute("hidden");
    } else {
      els.machineCompare.setAttribute("hidden", "");
    }
  });

  checklistBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(checklistItems.join("\n"));
      checklistBtn.textContent = "Copied!";
      setTimeout(() => (checklistBtn.textContent = "Copy universal checklist"), 2000);
    } catch (error) {
      checklistBtn.textContent = "Press ⌘+C to copy";
      setTimeout(() => (checklistBtn.textContent = "Copy universal checklist"), 2000);
    }
  });
}

function initStoryNav() {
  const nav = document.getElementById("story-nav-list");
  const progress = document.querySelector(".progress__bar");
  if (!nav || !progress) return;
  const links = Array.from(nav.querySelectorAll(".story-link"));
  const sections = links
    .map((link) => document.getElementById(link.dataset.target ?? ""))
    .filter(Boolean);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.target;
      const target = document.getElementById(targetId ?? "");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = links.find(
          (link) => link.dataset.target === entry.target.id,
        );
        if (!activeLink) return;
        links.forEach((l) => l.classList.remove("is-active"));
        activeLink.classList.add("is-active");
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((section) => observer.observe(section));

  const updateProgress = () => {
    const scrollable =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = window.scrollY / scrollable;
    progress.style.transform = `scaleX(${Math.min(Math.max(scrolled, 0), 1)})`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

function initAnimations() {
  const animatedEls = document.querySelectorAll(".animate");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 },
  );
  animatedEls.forEach((el) => observer.observe(el));
}

init();
