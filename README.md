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

- **Hero** — role tagline, quick stats (internships, projects shipped, systems built)
- **About** — bio + a monospace "spec card" (`FUNCTION / CURRENTLY / BUILDING TOWARD /
  DOMAINS / STATUS`) in place of a portrait photo
- **Skills** — five numbered rows (Languages, AI/ML, Development, Systems &
  Engineering, Cloud & Tools) over an interactive mouse-tracking grid background
- **Projects** — 8 project cards (ArthSetu, Agastya, Macro-Financial Stress Tester,
  NeuroPlanAI, CodeOptimizer AI, DevDna, a Java banking simulator, Lecture Lullaby)
- **Work Experience** — Origen Technologies, ISIT Global, and an upcoming Barclays
  stint
- **Recommendation** — reference excerpt from Origen Technologies
- **Articles** — a featured write-up ("The SAIL Model")
- **FAQ** — accordion covering stack, focus areas, and availability
- **Contact** — LinkedIn, GitHub, and a certificate gallery (Microsoft Azure AZ-900,
  Origen reference letter)

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
│   │   ├── projects/           # project card thumbnails
│   │   ├── certificates/       # AZ-900, Origen reference letter
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
