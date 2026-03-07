# Practical Perfusion Guide

An interactive, story-style site that walks echocardiographers through a pragmatic perfusion imaging workflow. Visitors scroll through five anchored sections—Background, Machine & Probe, Ultrasound Enhancing Agent, Common Pitfalls, and Quality Data—while choosing hardware/agent combos to reveal tailored knobology and QA cues. A sticky “NYT story” style nav keeps orientation, and a lightweight password gate protects in-progress test publishes.

## Getting started

1. The project is zero-build—everything is static HTML/CSS/JS.
2. For local preview, open `index.html` directly or serve with `python -m http.server` to unlock clipboard support.
3. Use the hero buttons to jump to Background or Machine sections, then click a machine + agent card to populate the downstream panels.

## Project structure

```
index.html        # Layout, section scaffolding, sticky nav, password gate markup
styles/main.css   # Visual system, story layout, animations, gate + nav styling
scripts/app.js    # Data model, dynamic rendering, scroll observers, password logic
```

### Content architecture

- **Background** (`backgroundTopics`): collapsible myth-busting cards so details stay hidden until needed.
- **Machine & Probe** (`machines`): card grid plus a detail panel that shows positioning pearls, knobology, and the infusion walkthrough once an agent is selected.
- **Ultrasound Enhancing Agent** (`bubbles`): prep + sustainment checklists per agent with reusable data for both cards and the detail drawer.
- **Protocols** (`protocols`): each machine/agent pairing contains stages, pitfalls, quality metrics, and QA pearls. Selecting a combo populates the Machine detail, Pitfalls section, and Quality section simultaneously.
- **Checklist** (`checklistItems`): evergreen QA guardrails mirrored in the Quality section’s CTA button.

Everything is data-driven: add a new machine, agent, or protocol by appending to the respective arrays in `scripts/app.js`.

## Password gating & test publishing

- The overlay gate uses the `ACCESS_CODE` constant near the top of `scripts/app.js`. Change it before publishing; it’s case-insensitive and stored in `localStorage` (`ACCESS_STORAGE_KEY`) after a successful unlock.
- This repo now includes `netlify.toml`, so Netlify will publish directly from the project root with no build command.
- For a remote password-protected test URL:
  1. Push this folder to GitHub.
  2. In Netlify, create a new site from that GitHub repo.
  3. Leave the build command empty; Netlify will read `netlify.toml` and publish `.`.
  4. After the first deploy, open **Site configuration -> Access & security -> Visitor access** and enable password protection.
  5. Share the resulting `*.netlify.app` URL plus the Netlify password with reviewers.
- If you want a one-off deploy without GitHub, use [Netlify Drop](https://app.netlify.com/drop). The config file still works there, but Git-backed deploys are cleaner for iteration.
- Because the app is static, any file host (S3/CloudFront, GitHub Pages, Render static) works—just ensure HTTPS so clipboard access and password gate behave consistently.

## Extending the guide

- **Media hooks**: add a `media` property to protocol stages (filename + caption) and render it inside `renderTechnique()`.
- **Quant data**: wire sparklines or charts into the Quality section by extending the `quality.metrics` objects with arrays of datapoints.
- **More branches**: if you add infusion styles (bolus vs infusion), introduce another selection grid and extend the protocol lookup keys.
- **Dynamic polish**: the intersection observers in `initStoryNav()` and `initAnimations()` are centralized—hook more effects there as you add sections.

## Next steps

1. Populate `/content` with cine loops/stills so each protocol stage can link to media.
2. Add lab-branding or dark-mode toggles by swapping CSS custom properties in `:root`.
3. When ready for author-friendly editing, migrate the static data into Markdown/JSON and hydrate it with Astro, Eleventy, or another SSG—this markup is already component-friendly.
