const ACCESS_CODE = "perfusion-preview";
const ACCESS_STORAGE_KEY = "practical-perfusion-access";
const CHECKLIST_STORAGE_KEY = "practical-perfusion-checklist";
const ROLE_STORAGE_KEY = "practical-perfusion-role";

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
    badge: "Contrast-specific / phased array",
    probe: "X5-1 or S5-1 cardiac probe",
    summary:
      "Use a contrast-specific cardiac preset with a low-MI starting point, then adjust gain, focus, and output to preserve myocardial signal while maintaining LV cavity opacification.",
    positioning: [
      "Use a contrast-capable adult cardiac probe and keep the LV centered without excessive depth.",
      "Start with focus at or just beyond mid-LV, then move it toward the near field only if apical destruction needs troubleshooting.",
      "Use the apical window with neutral wrist and minor heel-toe adjustments to limit rib or lung shadowing.",
    ],
    keyKnobs: [
      "Preset: contrast-specific cardiac mode (CnTI-style low-MI imaging)",
      "Mechanical Index: start around 0.08-0.12 and titrate to maintain myocardial signal without premature destruction",
      "Gain/TGC: keep cavity bright, myocardium visible, and avoid near-field overgain at the apex",
    ],
  },
  {
    id: "vivid",
    name: "GE Vivid Pioneer",
    badge: "Contrast-specific / phased array",
    probe: "Contrast-capable cardiac phased-array probe",
    summary:
      "Use the low-MI adult contrast workflow with a cardiac phased-array probe, then optimize output, gain, and sector width for a stable perfusion sequence.",
    positioning: [
      "Keep sector width narrow enough to protect frame rate once the LV is fully in view.",
      "Set focus at or slightly beyond the LV cavity; avoid chasing the apex with repeated focus changes once the image is usable.",
      "Use small heel-toe adjustments to keep basal segments clear of ribs and lung.",
    ],
    keyKnobs: [
      "Preset: adult contrast / low-MI contrast mode",
      "Mechanical Index: start around 0.05-0.10 and titrate based on cavity persistence and myocardial clearing after flash",
      "Gain/Dynamic range: adjust for a visible cavity and interpretable myocardium without blooming or shadowing",
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
      acquisitionTargets: [
        "Uniform cavity opacification without persistent swirling after steady state is reached.",
        "Myocardial contrast visible in all interpretable segments before flash, without cavity blooming.",
        "One clean flash-replenishment sequence with clear refill tracking over several beats.",
      ],
      document: [
        "Record MI, infusion rate, and whether any flash sequence was used.",
        "Note any gain, focus, or sector-width adjustment that materially changed image quality.",
        "Save one representative cine before flash and one during replenishment.",
      ],
      acceptableStudy: [
        "LV cavity fills quickly and remains stable during acquisition.",
        "Resting wall motion and resting perfusion appearance are internally consistent.",
        "Any suspected defect persists after artifact correction and reacquisition.",
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
      acquisitionTargets: [
        "Stable LV cavity signal without patchy layering from settling or under-mixing.",
        "Visible myocardial contrast at low MI before any flash maneuver.",
        "Replenishment captured long enough to judge slower Lumason refill behavior.",
      ],
      document: [
        "Document flush timing because it can visibly change cavity intensity.",
        "Record syringe age and whether the mixture was re-agitated during the study.",
        "Save a clip that shows both cavity fill and myocardial appearance in the same view.",
      ],
      acceptableStudy: [
        "Signal remains interpretable after repeat agitation or flush if needed.",
        "The apex is not undercalled because of near-field weakness alone.",
        "A suspected defect is not just reduced bubble concentration from settling.",
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
      acquisitionTargets: [
        "Adequate cavity fill while preserving border definition through the B-Flow mix.",
        "Frame rate remains high enough to judge replenishment, not just border appearance.",
        "At least one acquisition with overlay minimized or off for reference comparison.",
      ],
      document: [
        "Capture the B-Flow mix percentage or overlay setting used for the stored cine.",
        "Note when dual focus or overlay changes were needed to maintain quality.",
        "Record whether flash was interpreted on overlay or contrast-only view.",
      ],
      acceptableStudy: [
        "Overlay does not hide true myocardial signal.",
        "Frame rate remains adequate after all display features are enabled.",
        "Suspected perfusion defects remain visible when the overlay is simplified.",
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
      acquisitionTargets: [
        "Soft but homogeneous cavity fill without overlay suppressing contrast signal.",
        "Apex and basal segments both remain assessable at the selected frame rate.",
        "Any overlay or smoothing feature stays subordinate to the contrast image.",
      ],
      document: [
        "Log adaptive gain settings if they materially alter the view.",
        "Record overlay percentage and any temporary switch back to reference imaging.",
        "Store one clip that demonstrates the final optimized appearance used for interpretation.",
      ],
      acceptableStudy: [
        "The image remains interpretable even after overlay settings are reduced.",
        "Apparent abnormalities are not just sector-width or frame-rate artifacts.",
        "There is enough stored cine to review both cavity quality and myocardial refill.",
      ],
      pearls: [
        "Track adaptive gain settings per view for QA reproducibility.",
        "Tag loops with MI/infusion pairs so attending can correlate brightness.",
        "Capture one cine showing syringe pump screen for documentation.",
      ],
    },
  },
];

const checklistSections = [
  {
    title: "Supplies",
    items: [
      "20G or larger IV in the right antecubital with a dedicated contrast line.",
      "Continuous infusion pump or syringe pump reserved for the contrast study.",
      "Microbore tubing and a three-way stopcock to reduce dead space.",
      "Prepared ultrasound enhancing agent with the intended dilution ready to connect.",
      "Normal saline flush syringes available at the bedside.",
      "Clearly labeled infusion syringe or bag with agent name and concentration.",
    ],
  },
  {
    title: "Administrative",
    items: [
      "Product labeling available for the selected agent.",
      "Institutional contrast documentation workflow or worksheet ready before the exam starts.",
      "Order, indication, and contrast consent process completed per local policy.",
      "Patient identifiers, IV site, and any relevant contraindication screening confirmed.",
      "Study team aligned on whether the exam is resting perfusion, stress perfusion, or LV opacification only.",
    ],
  },
];

const stressEchoOverview = {
  title: "Why MCE is useful during stress",
  description:
    "Myocardial contrast is most helpful when stress shortens the available imaging window and endocardial definition becomes less reliable. Low-MI perfusion imaging can show delayed replenishment before obvious wall motion changes, while also preserving LV cavity definition in patients who become technically difficult at peak stress.",
  bullets: [
    "Perfusion can become abnormal before wall motion visibly changes.",
    "Contrast helps maintain interpretable apical views as heart rate rises.",
    "A steady infusion makes stress-stage comparison more reproducible than repeated boluses.",
  ],
};

const stressEchoWorkflow = [
  {
    step: "1. Rest baseline",
    detail:
      "Acquire low-MI baseline loops first and confirm the infusion has reached a stable steady state before any flash sequence.",
  },
  {
    step: "2. Rest flash-replenishment",
    detail:
      "Capture a clean flash-replenishment sequence at rest so you know what normal refill looks like in that patient and that view.",
  },
  {
    step: "3. Stress stage optimization",
    detail:
      "As heart rate rises, narrow the sector, protect frame rate, and avoid unnecessary gain or MI changes once the image is usable.",
  },
  {
    step: "4. Peak or near-peak stress capture",
    detail:
      "Store the stress loop that best represents cavity definition and perfusion. If using flash, record enough post-flash beats to judge replenishment rather than just the flash itself.",
  },
  {
    step: "5. Recovery if needed",
    detail:
      "If peak images are limited by motion or artifact, use early recovery to repeat the same view with the same setup while the physiologic information is still useful.",
  },
];

const interpretationOverview = {
  title: "Basic interpretation checkpoints",
  bullets: [
    "Interpret perfusion in end-systolic frames and compare rest with stress using the same acquisition settings whenever possible.",
    "A true stress defect should persist after artifact correction and should not be explained by attenuation, apical destruction, or unstable cavity opacification.",
    "Normal hyperemic myocardium should replenish faster than at rest; delayed or incomplete refill at stress is more concerning than mild resting heterogeneity.",
    "Wall motion and perfusion should be read together. A fixed resting contrast defect with normal resting wall motion is usually artifact.",
    "If cavity signal is lost after flash or the sequence captures too few post-flash beats, treat the loop as nondiagnostic rather than overcalling ischemia.",
  ],
};

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
      {
        label:
          "Guidelines for the Cardiac Sonographer in the Performance of Contrast Echocardiography: A Focused Update from the American Society of Echocardiography",
        href:
          "https://www.asecho.org/wp-content/uploads/2025/05/2014_Contrast-Sonography.pdf",
        source: "ASE PDF",
        note:
          "Most useful artifact table for this site. Table 2 lays out common contrast problems and the sonographer correction method.",
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
  [
    {
      id: "hotspot-1a",
      title: "Apex-endocardial border swirling",
      description:
        "The ASE sonographer update identifies apical swirling as a classic apex-endocardial artifact. The correction is to use real-time very low MI imaging and increase infusion rate if the cavity is not reaching a stable steady state.",
      left: "28%",
      top: "34%",
    },
    {
      id: "hotspot-1b",
      title: "Apex-myocardium reduced contrast",
      description:
        "Reduced apical myocardial contrast can be artifactual. Table 2 recommends increasing near-field TGC under resting conditions and temporarily moving focus into the near field.",
      left: "63%",
      top: "58%",
    },
  ],
  [
    {
      id: "hotspot-2a",
      title: "Apex-endocardial border swirling",
      description:
        "The ASE sonographer update identifies apical swirling as a classic apex-endocardial artifact. The correction is to use real-time very low MI imaging and increase infusion rate if the cavity is not reaching a stable steady state.",
      left: "42%",
      top: "26%",
    },
    {
      id: "hotspot-2b",
      title: "Apex-myocardium reduced contrast",
      description:
        "Reduced apical myocardial contrast can be artifactual. Table 2 recommends increasing near-field TGC under resting conditions and temporarily moving focus into the near field.",
      left: "70%",
      top: "66%",
    },
  ],
  [
    {
      id: "hotspot-3a",
      title: "Apex-endocardial border swirling",
      description:
        "The ASE sonographer update identifies apical swirling as a classic apex-endocardial artifact. The correction is to use real-time very low MI imaging and increase infusion rate if the cavity is not reaching a stable steady state.",
      left: "22%",
      top: "48%",
    },
    {
      id: "hotspot-3b",
      title: "Apex-myocardium reduced contrast",
      description:
        "Reduced apical myocardial contrast can be artifactual. Table 2 recommends increasing near-field TGC under resting conditions and temporarily moving focus into the near field.",
      left: "58%",
      top: "30%",
    },
  ],
  [
    {
      id: "hotspot-4a",
      title: "Apex-endocardial border swirling",
      description:
        "The ASE sonographer update identifies apical swirling as a classic apex-endocardial artifact. The correction is to use real-time very low MI imaging and increase infusion rate if the cavity is not reaching a stable steady state.",
      left: "36%",
      top: "62%",
    },
    {
      id: "hotspot-4b",
      title: "Apex-myocardium reduced contrast",
      description:
        "Reduced apical myocardial contrast can be artifactual. Table 2 recommends increasing near-field TGC under resting conditions and temporarily moving focus into the near field.",
      left: "74%",
      top: "40%",
    },
  ],
  [
    {
      id: "hotspot-5a",
      title: "Apex-endocardial border swirling",
      description:
        "The ASE sonographer update identifies apical swirling as a classic apex-endocardial artifact. The correction is to use real-time very low MI imaging and increase infusion rate if the cavity is not reaching a stable steady state.",
      left: "30%",
      top: "22%",
    },
    {
      id: "hotspot-5b",
      title: "Apex-myocardium reduced contrast",
      description:
        "Reduced apical myocardial contrast can be artifactual. Table 2 recommends increasing near-field TGC under resting conditions and temporarily moving focus into the near field.",
      left: "67%",
      top: "72%",
    },
  ],
];

const pitfallReferenceImage = {
  src: "content/screenshot.png",
  alt: "Perfusion still frame with three interactive pitfall markers.",
};

const qualityGuardrails = [
  {
    title: "Flash-replenishment timing",
    detail:
      "Assess perfusion at end-systole and time the flash so the low-MI end-systolic frames are interpretable immediately afterward.",
  },
  {
    title: "Post-flash capture length",
    detail:
      "Record at least 5 post-flash beats and ideally 10-15 cycles so replenishment can actually be judged.",
  },
  {
    title: "What a good flash looks like",
    detail:
      "The flash should clear myocardium while preserving a visible LV cavity. If myocardium is not cleared, add flash frames before increasing MI.",
  },
  {
    title: "Immediate post-flash appearance",
    detail:
      "Aim for dark myocardium and a light but still visible LV cavity. If both are wiped out, it is too destructive; if myocardium stays bright, the flash was inadequate.",
  },
  {
    title: "Keep settings stable once optimized",
    detail:
      "Once infusion rate, gain, MI, and focus are optimized, keep them constant through the sequence.",
  },
  {
    title: "Replenishment benchmarks",
    detail:
      "Normal resting replenishment is about 4-5 seconds after flash; during hyperemic stress it should be about 2 seconds.",
  },
  {
    title: "Rule out attenuation before calling a defect",
    detail:
      "If delay is limited to basal segments in apical windows, suspect attenuation first. Reacquire before calling it abnormal.",
  },
];

const artifactTeachingCards = [
  {
    title: "Swirling at the apex-endocardial border",
    signal:
      "The LV apex never becomes uniformly opacified and instead shows a smoke-like pattern rather than a clean cavity border.",
    fix:
      "Per the ASE sonographer guideline, move to real-time very low MI imaging and increase infusion rate. Lower frame rate and temporary near-field focus can also help prevent apical destruction.",
  },
  {
    title: "Reduced contrast in the apex-myocardium interface",
    signal:
      "Apical myocardium looks under-opacified even though the cavity is present, creating a false suggestion of reduced resting perfusion.",
    fix:
      "Increase near-field TGC and temporarily move focus to the near field. The ASE document also recommends foreshortened apical windows to bring basal segments closer to the transducer when needed.",
  },
  {
    title: "Reduced myocardial contrast in basal segments",
    signal:
      "Basal myocardium looks darker than expected even though resting wall motion is otherwise normal.",
    fix:
      "Treat this as artifact first. The ASE table emphasizes that if resting wall motion is normal, a resting contrast defect is artifactual; use that principle when setting receiver gain.",
  },
  {
    title: "Inadequate LV cavity contrast during continuous infusion",
    signal:
      "The cavity never develops reliable opacification despite an infusion-based protocol.",
    fix:
      "Check the IV site, increase the infusion rate, make sure the agent is not too dilute, and confirm that it is still adequately mixed. A small bolus can be a fallback.",
  },
  {
    title: "Shadowing of basal or mid segments",
    signal:
      "Basal or mid segments disappear because cavity contrast is too dense and begins to attenuate the beam.",
    fix:
      "Slow the infusion or reduce bolus size and flush rate. The ASE guidance specifically notes that infusion reduces shadowing problems and is easier to correct than bolus-based attenuation.",
    },
];

const selection = {
  machineId: null,
  bubbleId: null,
};

const audience = {
  role: "sonographer",
};

const storyNavState = {
  observer: null,
  refresh: null,
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
  interpretation: document.getElementById("interpretation"),
  references: document.getElementById("references"),
};

function init() {
  document.body.classList.add("js-ready");
  initializeRole();
  renderBackground();
  renderMachineOptions();
  renderBubbleOptions();
  renderMachineDetail();
  renderBubbleDetail();
  renderPitfalls();
  renderQuality();
  renderChecklist();
  renderStressEcho();
  renderInterpretation();
  renderReferences();
  setupGate();
  wireButtons();
  initStoryNav();
  initAnimations();
}

function initializeRole() {
  const savedRole =
    typeof window !== "undefined"
      ? window.localStorage.getItem(ROLE_STORAGE_KEY)
      : null;
  audience.role = savedRole === "cardiologist" ? "cardiologist" : "sonographer";
  applyRole();
}

function applyRole() {
  document.body.dataset.role = audience.role;
  const roleButtons = Array.from(
    document.querySelectorAll(".role-toggle__button"),
  );
  roleButtons.forEach((button) => {
    const isActive = button.dataset.role === audience.role;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  const cardiologistOnlyEls = Array.from(
    document.querySelectorAll(".role-only--cardiologist"),
  );
  const isCardiologist = audience.role === "cardiologist";
  cardiologistOnlyEls.forEach((element) => {
    element.hidden = !isCardiologist;
  });
  window.requestAnimationFrame(() => {
    storyNavState.refresh?.();
  });
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
      (pitfall, index) => `
      <article class="pitfall-teaching-card">
        <div class="pitfall-teaching-card__content">
          <div class="badge">Artifact ${index + 1}</div>
          <h3>${pitfall.title}</h3>
          <p><strong>Signal:</strong> ${pitfall.signal}</p>
          <p><strong>Fix:</strong> ${pitfall.fix}</p>
        </div>
        <div class="pitfall-teaching-card__media">
          ${renderPitfallFigure(index)}
        </div>
      </article>
    `,
    )
    .join("");
  els.pitfallsGrid.innerHTML = `
    ${cards}
  `;
}

function renderPitfallFigure(index) {
  const hotspotSet = pitfallHotspots[index % pitfallHotspots.length];
  const hotspots = hotspotSet
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
    <div class="pitfall-figure" aria-label="Annotated pitfalls reference frame ${index + 1}">
      <div class="pitfall-annotator">
        <div class="pitfall-annotator__viewport">
          <img
            class="pitfall-annotator__image"
            src="${pitfallReferenceImage.src}"
            alt="${pitfallReferenceImage.alt}"
          />
        </div>
        <div class="pitfall-annotator__overlay">
          ${hotspots}
        </div>
      </div>
    </div>
  `;
}

function renderQuality() {
  if (!els.qualityData) return;
  const protocol = getActiveProtocol();
  const example = renderFeaturedExample();
  const guardrails = `
    <details class="disclosure quality-disclosure">
      <summary>Core data quality recommendations</summary>
      <div class="quality-card quality-card--guardrails">
        <ul>
          ${qualityGuardrails
            .map(
              (item) => `
                <li>
                  <strong>${item.title}:</strong> ${item.detail}
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
    </details>
  `;
  if (!protocol) {
    els.qualityData.innerHTML = `
      ${example}
      ${guardrails}
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
  const targets = `
    <div class="quality-card">
      <h3>Acquisition targets</h3>
      <ul>
        ${protocol.quality.acquisitionTargets.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
  const documentation = `
    <div class="quality-card">
      <h3>What to document</h3>
      <ul>
        ${protocol.quality.document.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
  const usableStudy = `
    <div class="quality-card">
      <h3>When the study is usable</h3>
      <ul>
        ${protocol.quality.acceptableStudy.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
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
    ${guardrails}
    ${metrics}
    ${targets}
    ${documentation}
    ${usableStudy}
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
  let runningIndex = 0;
  els.checklist.innerHTML = checklistSections
    .map((section) => {
      const items = section.items
        .map((item) => {
          const index = runningIndex;
          runningIndex += 1;
          return `
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
          `;
        })
        .join("");
      return `
        <li class="checklist-group">
          <h3>${section.title}</h3>
          <ul class="checklist checklist--nested">
            ${items}
          </ul>
        </li>
      `;
    })
    .join("");
  const checkboxes = els.checklist.querySelectorAll("[data-checklist-index]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleChecklistToggle);
  });
}

function renderStressEcho() {
  if (!els.stressEcho) return;
  els.stressEcho.innerHTML = `
    <article class="resource-card resource-card--wide">
      <h3>${stressEchoOverview.title}</h3>
      <p>${stressEchoOverview.description}</p>
      <ul>
        ${stressEchoOverview.bullets.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
    <article class="resource-card resource-card--wide">
      <h3>Stress workflow schematic</h3>
      <div class="workflow">
        ${stressEchoWorkflow
          .map(
            (item) => `
              <div class="workflow-step">
                <div class="workflow-step__marker"></div>
                <div class="workflow-step__content">
                  <h4>${item.step}</h4>
                  <p>${item.detail}</p>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderInterpretation() {
  if (!els.interpretation) return;
  els.interpretation.innerHTML = `
    <article class="resource-card resource-card--wide">
      <h3>${interpretationOverview.title}</h3>
      <ul>
        ${interpretationOverview.bullets.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderReferences() {
  if (!els.references) return;
  els.references.innerHTML = referenceSections
    .map(
      (section) => `
        <details class="disclosure resource-disclosure">
          <summary>${section.title}</summary>
          <div class="resource-card">
            <ul>
              ${section.items
                .map(
                  (item) => `
                    <li>
                      <a href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>
                      <span class="resource-note">${item.note}</span>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          </div>
        </details>
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
  const roleButtons = Array.from(
    document.querySelectorAll(".role-toggle__button"),
  );

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
      await navigator.clipboard.writeText(
        checklistSections
          .map(
            (section) =>
              `${section.title}\n${section.items.map((item) => `- ${item}`).join("\n")}`,
          )
          .join("\n\n"),
      );
      checklistBtn.textContent = "Copied!";
      setTimeout(() => (checklistBtn.textContent = "Copy universal checklist"), 2000);
    } catch (error) {
      checklistBtn.textContent = "Press ⌘+C to copy";
      setTimeout(() => (checklistBtn.textContent = "Copy universal checklist"), 2000);
    }
  });

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextRole =
        button.dataset.role === "cardiologist" ? "cardiologist" : "sonographer";
      audience.role = nextRole;
      applyRole();
      try {
        window.localStorage.setItem(ROLE_STORAGE_KEY, audience.role);
      } catch (error) {
        return;
      }
    });
  });
}

function initStoryNav() {
  const nav = document.getElementById("story-nav-list");
  const flowPaths = Array.from(
    document.querySelectorAll(".flow-progress__fill path"),
  );
  if (!nav) return;
  const allLinks = Array.from(nav.querySelectorAll(".story-link"));

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const link = target.closest(".story-link");
    if (!(link instanceof HTMLButtonElement)) return;
    const targetId = link.dataset.target;
    const section = document.getElementById(targetId ?? "");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const refreshObservedSections = () => {
    storyNavState.observer?.disconnect();
    const visibleLinks = allLinks.filter((link) => link.offsetParent !== null);
    const sections = visibleLinks
      .map((link) => document.getElementById(link.dataset.target ?? ""))
      .filter((section) => section && section.offsetParent !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeLink = visibleLinks.find(
            (link) => link.dataset.target === entry.target.id,
          );
          if (!activeLink) return;
          allLinks.forEach((link) => link.classList.remove("is-active"));
          activeLink.classList.add("is-active");
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((section) => observer.observe(section));
    storyNavState.observer = observer;
  };

  storyNavState.refresh = refreshObservedSections;
  refreshObservedSections();

  if (flowPaths.length) {
    flowPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.setProperty("--flow-length", String(length));
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });
  }

  const updateProgress = () => {
    const scrollable =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = scrollable > 0 ? window.scrollY / scrollable : 0;
    const clampedScrolled = Math.min(Math.max(scrolled, 0), 1);

    if (flowPaths.length) {
      const totalPaths = flowPaths.length;
      const scaledProgress = clampedScrolled * totalPaths;
      flowPaths.forEach((path, index) => {
        const length = Number.parseFloat(
          path.style.getPropertyValue("--flow-length") || "0",
        );
        const branchProgress = Math.min(Math.max(scaledProgress - index, 0), 1);
        path.style.strokeDashoffset = String(length * (1 - branchProgress));
      });
    }
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
