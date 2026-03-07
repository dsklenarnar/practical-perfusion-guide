const ACCESS_CODE = "perfusion-preview";
const ACCESS_STORAGE_KEY = "practical-perfusion-access";
const CHECKLIST_STORAGE_KEY = "practical-perfusion-checklist";

const backgroundTopics = [
  {
    title: "Why myocardial contrast echocardiography is practical",
    summary:
      "The ASE contrast consensus statement and the EAE/EACVI recommendations both frame contrast echocardiography as a workflow tool, not a niche rescue maneuver. In practice, most failed perfusion studies reflect inconsistent setup, unstable infusion, or excessive mid-study knob changes rather than a limitation of the microbubbles themselves.",
    bullets: [
      "Low-MI contrast-specific imaging allows simultaneous attention to LV cavity opacification and myocardial signal without depending on repeated bolus timing.",
      "Continuous infusion reduces one of the biggest workflow problems in stress echo: having to reacquire windows every time the bubble intensity surges or disappears.",
      "A standardized setup with a dedicated IV, microbore tubing, and a reproducible starting infusion rate matters more than constantly searching for a perfect proprietary preset.",
    ],
  },
  {
    title: "Why continuous infusion became the preferred teaching model",
    summary:
      "The real-time MCE literature from Porter, Wei, Kaul, Senior, and others is built around the same core logic: maintain a steady intravascular microbubble concentration, image at low mechanical index, and use brief high-energy impulses to analyze replenishment. That framework is much easier to teach and reproduce with infusion than with serial boluses.",
    bullets: [
      "Infusion creates a stable baseline, so changes after flash are more likely to represent replenishment kinetics rather than random variation in contrast delivery.",
      "It also improves team communication because the sonographer, nurse, and physician can all describe the study in terms of MI, infusion rate, and flash timing.",
      "At stress, infusion is especially helpful because it preserves continuity while heart rate is changing and the available acquisition window is short.",
    ],
  },
  {
    title: "What the stress echo evidence adds",
    summary:
      "Stress MCE papers showed that real-time perfusion imaging could be performed during exercise or vasodilator stress and that perfusion abnormalities may appear before obvious wall motion changes. That is the practical value proposition for sonographers: better diagnostic confidence when image quality and timing are otherwise working against you.",
    bullets: [
      "The classic exercise MCE work by Wei and colleagues demonstrated that perfusion and wall motion can be assessed together in real time during stress acquisition.",
      "Later stress-imaging studies using contemporary contrast-specific imaging reinforced that a low-MI perfusion approach can improve sensitivity for coronary disease when compared with wall motion assessment alone.",
      "For day-to-day lab practice, the implication is straightforward: sonographers need a reliable acquisition method more than a dramatic one, and the method has to survive motion, tachycardia, and technically difficult patients.",
    ],
  },
  {
    title: "Where this guide fits",
    summary:
      "This site is intentionally focused on bedside acquisition rather than comprehensive interpretation. It translates the guideline and methodology literature into a sonographer-facing workflow: how to prepare the agent, hold a stable infusion, set the scanner, recognize common pitfalls, and capture loops that are still useful when reviewed later by another reader.",
    bullets: [
      "The scanner and agent sections prioritize repeatable knobology over vendor marketing language.",
      "The checklist, hotspot image, and quality section are meant to reduce avoidable technical failure before interpretation even starts.",
      "The references section points back to the original guidance and papers so the educational claims on the site remain anchored to primary sources.",
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
    labelingUrl: "https://www.definityimaging.com/",
    labelingLabel: "Official prescribing information",
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
    labelingUrl: "https://lumason.com/support/",
    labelingLabel: "Official prescribing information",
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
  "Continuous infusion pump or syringe pump dedicated to the contrast line.",
  "Microbore tubing plus a three-way stopcock to minimize dead space.",
  "Agent-specific dilution prepared, labeled, and connected before imaging starts.",
  "Normal saline flush syringes ready at the bedside.",
  "Contrast worksheet or capture sheet for MI, infusion rate, and flash timing.",
  "Label the infusion syringe/bag with agent, concentration, and start time.",
  "Set a timer for bubble agitation (shake syringe every 3–4 minutes).",
  "Capture a reference loop before infusion for baseline comparison.",
  "Log MI, infusion rate, and any flash maneuvers directly on the worksheet.",
  "Export one optimized clip per view plus a sweep showing replenishment.",
];

const stressEchoItems = [
  {
    title: "Why perfusion during stress",
    description:
      "Stress echo is where myocardial contrast earns its keep. Perfusion defects can appear before obvious wall motion changes, especially when tachycardia shortens your window and apical definition degrades.",
  },
  {
    title: "Acquisition principle",
    description:
      "Keep the infusion steady as workload rises, resist the urge to chase every brightness change, and preserve frame rate by narrowing the sector. The target is reproducible replenishment across stress stages rather than a single dramatic flash sequence.",
  },
  {
    title: "What to document",
    description:
      "Record the stress stage, heart rate, MI, infusion rate, and whether a flash-replenishment sequence was used. A useful stress study is not just visually impressive; it is traceable enough that someone else can understand how the image was acquired.",
  },
  {
    title: "How this site should be used at stress",
    description:
      "Treat the machine and agent pathways above as your baseline acquisition protocol, then simplify aggressively as heart rate rises: narrower sector, minimal knob changes, and one reproducible flash-replenishment sequence per stage when clinically useful.",
  },
];

const referenceSections = [
  {
    title: "Guidelines",
    items: [
      {
        label:
          "ASE consensus statement on the clinical applications of ultrasonic contrast agents in echocardiography",
        href:
          "https://www.asecho.org/guideline/american-society-of-echocardiography-consensus-statement-on-the-clinical-applications-of-ultrasonic-contrast-agents-in-echocardiography/",
        source: "ASE",
        note:
          "Operational foundation for UEA use, lab workflow, and contrast-specific imaging practice.",
      },
      {
        label:
          "EAE/EACVI recommendations for contrast echocardiography: update 2009",
        href:
          "https://www.escardio.org/static-file/Escardio/Subspecialty/EACVI/position-papers/EAE-_recommendations-for-contrast-echo.pdf",
        source: "ESC / EACVI PDF",
        note:
          "European reference document covering LV opacification, myocardial perfusion, and acquisition principles.",
      },
      {
        label:
          "ASE guidelines for performance, interpretation, and application of stress echocardiography in ischemic heart disease",
        href:
          "https://www.asecho.org/guideline/guidelines-for-performance-interpretation-and-application-of-stress-echocardiography-in-ischemic-heart-disease/",
        source: "ASE",
        note:
          "Stress-echo framework with specific mention of ultrasound enhancing agents and perfusion imaging.",
      },
    ],
  },
  {
    title: "Canonical MCE acquisition papers",
    items: [
      {
        label:
          "Real-time myocardial blood flow imaging in normal human beings with the use of myocardial contrast echocardiography",
        href: "https://pubmed.ncbi.nlm.nih.gov/11447415/",
        source: "PubMed",
        note:
          "Porter et al. showed continuous-infusion real-time MCE could quantify myocardial blood flow reserve in humans.",
      },
      {
        label:
          "Real-time assessment of myocardial perfusion and wall motion during bicycle and treadmill exercise echocardiography",
        href: "https://pubmed.ncbi.nlm.nih.gov/11693746/",
        source: "PubMed",
        note:
          "Wei et al. established low-MI real-time exercise perfusion imaging as clinically feasible and comparable with SPECT.",
      },
      {
        label:
          "Myocardial perfusion imaging with contrast ultrasound",
        href: "https://pubmed.ncbi.nlm.nih.gov/20159645/",
        source: "PubMed",
        note:
          "Porter and Xie review the microbubble physics, destruction-replenishment model, and continuous-infusion workflow.",
      },
      {
        label:
          "Rapid detection of coronary artery stenoses with real-time perfusion echocardiography during regadenoson stress",
        href: "https://pubmed.ncbi.nlm.nih.gov/21946702/",
        source: "PubMed",
        note:
          "Demonstrates a practical continuous-infusion stress protocol with perfusion outperforming wall motion sensitivity.",
      },
    ],
  },
  {
    title: "Methodology reviews",
    items: [
      {
        label:
          "Assessment of myocardial perfusion with real-time myocardial contrast echocardiography: methodology and clinical applications",
        href: "https://pubmed.ncbi.nlm.nih.gov/16171719/",
        source: "PubMed",
        note:
          "A concise review of acquisition mechanics and clinical interpretation that fits well with this site's teaching goals.",
      },
      {
        label:
          "Clinical applications of contrast echocardiography",
        href: "https://pubmed.ncbi.nlm.nih.gov/15698558/",
        source: "PubMed",
        note:
          "Broad review useful for orienting new learners before they move into stress and perfusion-specific workflows.",
      },
      {
        label:
          "Current recommendations for contrast echocardiography: practical guidance from the British Society of Echocardiography",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5440724/",
        source: "PMC",
        note:
          "Practical artifact-focused guidance on attenuation, shadowing, swirling, blooming, and day-to-day troubleshooting in contrast imaging.",
      },
    ],
  },
];

const featuredExample = {
  title: "Good example: stress apical 4 chamber",
  caption:
    "Strong myocardial opacification with a clean cavity-myocardium balance. Use this as the reference look for a successful study.",
  src: "content/4ch-stress.mov",
  type: "video/quicktime",
};

const pitfallHotspots = [
  {
    id: "hotspot-1",
    title: "Apical blooming / near-field destruction",
    description:
      "Literature on low-MI perfusion imaging repeatedly warns that the apex can look abnormal simply because near-field signal is too hot or bubbles are being destroyed too aggressively. Reduce gain or infusion before calling this a defect.",
    left: "31%",
    top: "24%",
  },
  {
    id: "hotspot-2",
    title: "Lateral wall dropout / attenuation",
    description:
      "Apparent lateral wall hypoenhancement may reflect attenuation rather than true hypoperfusion. Reposition the window, narrow the sector, and reassess cavity brightness before interpreting the segment.",
    left: "66%",
    top: "44%",
  },
  {
    id: "hotspot-3",
    title: "Basal shadowing",
    description:
      "Basal dropout is commonly caused by rib or lung interference in practical MCE acquisition. Heel-toe the probe and trim basal TGC instead of chasing MI or overcalling a fixed perfusion defect.",
    left: "56%",
    top: "74%",
  },
];

const pitfallReferenceImage = {
  src: "content/screenshot.png",
  alt: "Perfusion still frame with three interactive pitfall markers.",
};

const artifactTeachingCards = [
  {
    title: "Attenuation and shadowing",
    signal:
      "A myocardial segment looks dark because the cavity or adjacent tissue is over-attenuating the beam, often in basal or lateral walls.",
    fix:
      "The MCE reviews and guideline documents recommend changing the window first, then reducing overall contrast intensity or gain. A dark segment that improves with repositioning is an artifact until proven otherwise.",
  },
  {
    title: "Blooming and cavity overgain",
    signal:
      "The LV cavity is so bright that endocardial borders blur and myocardium is partly obscured, especially near the apex or in the near field.",
    fix:
      "Back down gain or infusion and keep MI low. The literature is clear that myocardial perfusion cannot be judged reliably when cavity signal overwhelms the myocardium.",
  },
  {
    title: "Swirling from incomplete steady state",
    signal:
      "Contrast density changes beat to beat, with patchy cavity fill and inconsistent myocardial signal.",
    fix:
      "Re-establish a steady infusion before interpreting replenishment. Real-time MCE papers emphasize that destruction-replenishment logic only works when microbubble concentration is stable.",
  },
  {
    title: "False apical defect",
    signal:
      "The apex looks under-opacified even though the rest of the ventricle fills well and there is no coherent territorial pattern.",
    fix:
      "Think near-field destruction, gain, or focal geometry before ischemia. Lower power, rebalance gain, and reacquire the view.",
  },
  {
    title: "Rib or lung artifact",
    signal:
      "Basal or lateral dropout changes with breathing or probe angle and does not behave like a physiologic replenishment abnormality.",
    fix:
      "Move the transducer, heel-toe, or reacquire in a different interspace. The practical guidance literature consistently treats moving shadow as artifact, not perfusion loss.",
    },
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
  stressEcho: document.getElementById("stress-echo"),
  references: document.getElementById("references"),
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
  renderStressEcho();
  renderReferences();
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
    <p>
      <a href="${bubble.labelingUrl}" target="_blank" rel="noreferrer">${bubble.labelingLabel}</a>
    </p>
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
  const cards = (protocol?.pitfalls ?? artifactTeachingCards)
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
  els.pitfallsGrid.innerHTML = `
    ${renderPitfallFigure()}
    ${cards}
  `;
}

function renderPitfallFigure() {
  const hotspots = pitfallHotspots
    .map(
      (hotspot, index) => `
        <div
          class="pitfall-hotspot"
          style="left: ${hotspot.left}; top: ${hotspot.top};"
        >
          <button
            class="pitfall-hotspot__button"
            type="button"
            aria-label="${hotspot.title}"
            aria-describedby="${hotspot.id}"
          >
            <span>${index + 1}</span>
          </button>
          <div class="pitfall-hotspot__tooltip" id="${hotspot.id}">
            <h3>${hotspot.title}</h3>
            <p>${hotspot.description}</p>
          </div>
        </div>
      `,
    )
    .join("");

  return `
    <article class="pitfall-figure">
      <div class="pitfall-figure__copy">
        <div class="badge">Hover the circles</div>
        <h3>Annotated pitfalls reference frame</h3>
        <p>
          This demo overlay shows how still images can become teaching surfaces.
          Hover or focus any circle to reveal the pitfall explainer.
        </p>
      </div>
      <div class="pitfall-annotator">
        <img
          class="pitfall-annotator__image"
          src="${pitfallReferenceImage.src}"
          alt="${pitfallReferenceImage.alt}"
        />
        ${hotspots}
      </div>
    </article>
  `;
}

function renderQuality() {
  if (!els.qualityData) return;
  const protocol = getActiveProtocol();
  const example = renderFeaturedExample();
  if (!protocol) {
    els.qualityData.innerHTML = `
      ${example}
      <p class="placeholder">Select a machine-agent pairing to load data.</p>
    `;
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
    ${example}
    ${metrics}
    ${pearls}
  `;
}

function renderFeaturedExample() {
  return `
    <article class="quality-card quality-card--feature">
      <div class="quality-feature">
        <div class="quality-feature__copy">
          <div class="badge">Featured loop</div>
          <h3>${featuredExample.title}</h3>
          <p>${featuredExample.caption}</p>
        </div>
        <video
          class="quality-feature__video"
          controls
          loop
          playsinline
          preload="metadata"
        >
          <source src="${featuredExample.src}" type="${featuredExample.type}" />
          Your browser does not support embedded video playback.
        </video>
      </div>
    </article>
  `;
}

function renderChecklist() {
  if (!els.checklist) return;
  const savedState = loadChecklistState();
  els.checklist.innerHTML = checklistItems
    .map(
      (item, index) => `
        <li>
          <label class="checklist-item">
            <input
              class="checklist-item__checkbox"
              type="checkbox"
              data-checklist-index="${index}"
              ${savedState[index] ? "checked" : ""}
            />
            <span>${item}</span>
          </label>
        </li>
      `,
    )
    .join("");
  const checkboxes = els.checklist.querySelectorAll("[data-checklist-index]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleChecklistToggle);
  });
}

function renderStressEcho() {
  if (!els.stressEcho) return;
  els.stressEcho.innerHTML = stressEchoItems
    .map(
      (item) => `
        <article class="resource-card">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `,
    )
    .join("");
}

function renderReferences() {
  if (!els.references) return;
  els.references.innerHTML = referenceSections
    .map(
      (section) => `
        <article class="resource-card">
          <h3>${section.title}</h3>
          <ul>
            ${section.items
              .map(
                (item) => `
                  <li>
                    <a href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>
                    <a
                      class="resource-link"
                      href="${item.href}"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Original source (${item.source})
                    </a>
                    <span class="resource-note">${item.note}</span>
                  </li>
                `,
              )
              .join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function loadChecklistState() {
  try {
    const saved = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    return {};
  }
}

function handleChecklistToggle(event) {
  const target = event.currentTarget;
  if (!(target instanceof HTMLInputElement)) return;
  const currentState = loadChecklistState();
  currentState[target.dataset.checklistIndex] = target.checked;
  try {
    window.localStorage.setItem(
      CHECKLIST_STORAGE_KEY,
      JSON.stringify(currentState),
    );
  } catch (error) {
    return;
  }
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
