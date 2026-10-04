# vikastg.vercel.app

Personal site of **Vikas T G**: software engineer, product builder, creator.

Single-page React app, written as chapters:

`00 Intro → 01 Work → 02 Experience → 03 How I think → 04 Lab → 05 Toolbox → 06 Proof → 07 Outside the IDE (Silent Stories) → 08 Currently → 09 Let's build`

## Stack

- React 19 + Vite 6
- Tailwind CSS v4 (design tokens in `src/index.css` under `@theme`)
- GSAP + ScrollTrigger for reveals, counters and scroll-scrubbed moments. All of it respects `prefers-reduced-motion`.
- EmailJS for the contact form. It's lazy-loaded and optional: without the env vars below, the form opens a pre-filled email instead.

## Project layout

```
src/
  data/       ← all copy & facts (site, projects, experience, lab, stack)
  lib/        ← motion helpers (useReveal, useMagnetic)
  ui/         ← reusable pieces (Nav, SectionHead, ProjectCase, WorkflowDiagram…)
  sections/   ← one file per chapter
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
