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

## The Studio (3D-first)

The portfolio is one architectural model you walk through, and the page itself has no layout. The document is just a scroll track; scrolling moves a single camera through about 60 stations. All content is real HTML in reading order (for screen readers and SEO), positioned *inside* the model with CSS `matrix3d`, using the same maths as three.js's CSS3DRenderer. It sits on walls, placards, paper sheets and labels.

```
src/App.jsx            Studio where it can run; Site2D (the flat site) everywhere else
src/studio/            the HTML layer
  Studio.jsx           mounts the world, scroll length, focus→camera, jumps, veil
  StudioNav.jsx        top bar, rooms menu, room rail
  A.jsx, nav.js        anchored block component; rooms + navigation context
  content/*.jsx        all words and links, keyed to world anchors (data-anchor)
src/world/studio/      the world
  create.js            engine: renderer, rooms, path, moods, DOM-in-3D, render-on-demand, watchdog
  path.js              stations → camera poses (fit-to-viewport), scroll mapping, waypoints
  css3d.js             places [data-anchor] elements in 3D (matrix3d)
  kit.js               shared architecture: walls, partitions, blocks, anchors, stations
  rooms/*.js           one place each: entrance, gallery + 5 installations, engineering,
                       thinking, lab, tools, archive, threshold, cinema, signals, contact
src/world/{engine,lighting,materials,quality.js,bus.js}   renderer/loop, moods, palette, tiers, events
src/site2d/Site2D.jsx  the approved 2D site (reduced motion, no WebGL, weak devices, watchdog)
```

**How a room works**

- A room module builds geometry and declares two things:
  - *anchors* (where each HTML block lives);
  - *stations* (where the camera stands, and which mood).
- Content components render `<A k="key">` blocks with the same keys.
- On narrow screens, a station can read one placard. The camera fits the placard's rendered width to the screen, so text lands near 1:1.

**Behaviour**

- Scrolling is never hijacked.
- Focusing any link or button moves the camera to it.
- Frames render only when something changes.
- The watchdog falls back to Site2D if the device can't keep up. Use `?nowatchdog` for QA on software-rendered browsers only.
