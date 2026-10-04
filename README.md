# vikastg.vercel.app

Personal site of **Vikas T G**: software engineer, product builder, creator.

Single-page React app, written as chapters:

`00 Intro → 01 Work → 02 Experience → 03 How I think → 04 Lab → 05 Toolbox → 06 Proof → 07 Outside the IDE (Silent Stories) → 08 Currently → 09 Let's build`

## Stack

- React 19 + Vite 6
- Tailwind CSS v4 (design tokens in `src/index.css` under `@theme`)
- GSAP + ScrollTrigger for small one-time reveals. All of it respects `prefers-reduced-motion`.
- three.js for the 3D world (`src/world/`) and the noren (`src/lib/noren.js`, adapted from ThreeUI Community, MIT). Both are code-split and lazy-loaded.
- EmailJS for the contact form. It's lazy-loaded and optional: without the env vars below, the form opens a pre-filled email instead.

## Project layout

```
src/
  data/       ← all copy & facts (site, projects, experience, lab, stack)
  lib/        ← motion helper (useReveal) and the noren scene
  ui/         ← reusable pieces (Nav, SectionHead, ProjectCase, WorkflowDiagram…)
  sections/   ← one file per chapter
  world/      ← the 3D world behind the page (see below)
public/
  work/            ← project screenshots & portrait (WebP)
  silent-stories/  ← official Silent Stories logo + ANTARDRISHTI poster
  Vikas_T_G_Resume.pdf, og.png, favicon.svg, robots.txt, sitemap.xml
```

To change what the site says, edit `src/data/*`. Every claim there should match the résumé.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build && npm run preview
npm run lint
```

## Contact form (optional)

Set these in `.env.local` or in your Vercel project settings:

```
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

The template receives `from_name`, `from_email` and `message`.

## The 3D world

The HTML is always the content. `src/world/` adds a space behind it: one fixed canvas and one camera that moves between chapters as you scroll.

- `quality.js` picks a tier: high on desktop, medium on tablet, low on phones. It's off for reduced motion, no WebGL, Save-Data or low-memory devices, and the approved 2D site is what shows then.
- `rig.js` maps scroll position to the camera, using where each `<section id>` actually sits on the page.
- `engine.js` owns the renderer, the fog and the Silent Stories mood shift, and an FPS watchdog. When frames are slow it lowers resolution first, then turns the world off.
- `stations/` has one module per chapter.
- `bus.js` lets the content tell the world what you're reading (the current project, the selected tool).

Everything 3D loads after the page is idle, as separate chunks.
