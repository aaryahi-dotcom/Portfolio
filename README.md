# Aaryahi Ahluwalia — Portfolio

<div align="center">

### AI Engineer · B.Tech CS-AI, Banasthali Vidyapith (2024–28)

A single-page personal portfolio showcasing explainable ML pipelines, LLM-integrated
backends, and cloud-native AI systems — built on a heavily customized fork of a
Bootstrap/GSAP animated template.

<p>
  <a href="https://github.com/aaryahi-dotcom/Portfolio">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" />
  </a>
  <a href="https://www.linkedin.com/in/aaryahi-ahluwalia-4a3962345">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</p>

</div>

---

## Overview

This site is a static, single-page portfolio (`index.html`, no build step) covering:

- **Hero** — "AI/ML Engineer" headline, five focus pills (Explainable ML & Risk
  Intelligence, Autonomous Systems & Robotics, LLM Agents & RAG, Computer Vision,
  Cloud-Native Backend Engineering), and quick stats (2+ international
  internships, 10+ projects shipped, 6+ major AI/ML systems built)
- **About** — bio + a monospace "spec card" (`FUNCTION / CURRENTLY / BUILDING TOWARD /
  DOMAINS / STATUS`) in place of a portrait photo
- **Skills** — six numbered rows (Languages, AI/ML, Development, Systems &
  Engineering, Cloud & Tools, Security & Recon) over an interactive mouse-tracking
  grid background
- **Projects** — six featured cards (RiskPulse, RedShift, ArthSetu, Agastya,
  AirMouse, AEGIS), each with a short description. Cards without a confirmed link
  or screenshot use `assets/images/projects/placeholder.svg`. A **More Projects**
  list below covers CodeOptimizer AI and reconai
- **Work Experience** — Origen Technologies, ISIT Global, and an upcoming Barclays
  stint
- **Recommendation** — reference excerpt and reference letter from Origen
  Technologies
- **Certificates** — gallery of Microsoft Azure AZ-900, Finvesta '26 (Top 10
  National Finalist), and DreamBuilder (Thunderbird / ASU)
- **Research & Writing** — the published "SAIL Model" LinkedIn piece plus
  forthcoming entries (RedShift citation-fidelity paper, AI olfaction review,
  paper critiques). Forthcoming items have a status tag instead of a link
- **FAQ** — accordion covering projects, stack, availability, and what I'm working
  on now
- **Contact** — email, phone, languages, LinkedIn/GitHub, and a contact form
  (currently `action="#"` — not wired to a backend yet; needs Formspree or a small
  serverless endpoint, plus `name` attributes on the inputs)

## Tech Stack

- **Markup/Styling:** HTML5, Bootstrap 5, custom CSS (HSL design tokens for the
  magenta / cream / charcoal / burgundy palette)
- **Animation:** GSAP (`ScrollSmoother`, `ScrollTrigger`, `SplitText`,
  `ScrollToPlugin`), AOS (scroll reveals)
- **Interactivity:** jQuery, vanilla JS (mouse-tilt on the About card, mouse-tracking
  skills grid, in-page anchor scrolling wired through `ScrollSmoother`)
- **No build step** — everything is served as static files

## Project Structure

```
shan-portfolio/
├── index.html                  # entire single-page site
├── assets/
│   ├── css/main.css            # base styles + appended custom overrides
│   ├── js/
│   │   ├── main.js             # preloader, sticky nav, offcanvas, counters, etc.
│   │   ├── custom-gsap.js      # ScrollSmoother setup
│   │   └── ...                 # AOS, magnific-popup, swiper, tw-cursor, etc.
│   ├── images/
│   │   ├── projects/           # project card thumbnails + placeholder.svg
│   │   ├── certificates/       # AZ-900, Finvesta, DreamBuilder, Origen letter
│   │   ├── thumbs/             # skills-section images, about portrait
│   │   └── shapes/, icons/, logo/
│   ├── wenfonts/                # icon font
│   └── Aaryahi_Ahluwalia_Resume.pdf
└── README.md
```

## Running Locally

No dependencies or build tools required — it's plain HTML/CSS/JS.

```bash
git clone https://github.com/aaryahi-dotcom/Portfolio.git
cd Portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

> If you edit `main.css` or any `<script>` file, bump the `?v=` query string on its
> `<link>`/`<script>` tag in `index.html` — the dev server sends no cache headers, so
> stale assets are the most common source of "my change isn't showing up."

## Deployment

Static files only — deploy by pointing any static host (Netlify, Vercel, GitHub
Pages, etc.) at the repo root. No build command is needed.

## Contact

- **LinkedIn:** [aaryahi-ahluwalia](https://www.linkedin.com/in/aaryahi-ahluwalia-4a3962345)
- **GitHub:** [@aaryahi-dotcom](https://github.com/aaryahi-dotcom)
