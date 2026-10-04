// Side quests, prototypes and experiments. Smaller than "Work", but they show
// what I reach for when nobody is asking.

export const lab = [
  {
    name: "Wingman, native in VS Code",
    what: "Wired an open-source AI coding assistant into the VS Code source itself instead of shipping it as an extension.",
    tags: ["TypeScript", "VS Code internals", "AI"],
    status: "Experiment",
    href: "https://github.com/18vikastg/vscode-wingman-native",
    image: "/work/wingman.webp",
  },
  {
    name: "AdGenesis",
    what: "A Canva-style design tool with a fine-tuned GPT-2 model for text-to-design — no paid API in the loop.",
    tags: ["React", "FastAPI", "PyTorch", "Fabric.js"],
    status: "Live",
    href: "https://adgenesis.vercel.app",
    image: "/work/adgenesis.webp",
  },
  {
    name: "MuteMate",
    what: "Real-time American Sign Language recognition: letters, numbers and common words, assembled into sentences.",
    tags: ["Python", "Computer vision"],
    status: "Prototype",
    href: "https://github.com/18vikastg/mute-mate",
  },
  {
    name: "AI Resume Analyzer",
    what: "Parses a résumé, scores it and recommends skills and courses — NLP with spaCy behind a Streamlit UI.",
    tags: ["Python", "Streamlit", "spaCy"],
    status: "Prototype",
    href: "https://github.com/18vikastg/ai-resume-analyser",
  },
  {
    name: "Zentry-inspired motion site",
    what: "A study in scroll-driven animation: clip-path transitions, video storytelling and GSAP timelines.",
    tags: ["React", "GSAP"],
    status: "Live",
    href: "https://vikas-animation-site.vercel.app",
    image: "/work/animation-site.webp",
  },
  {
    name: "Focus Flow",
    what: "A tiny session tracker: stopwatch, task log, session history. Built because I needed it.",
    tags: ["TypeScript"],
    status: "Live",
    href: "https://focusflowbyvikastg.netlify.app/",
  },
  {
    name: "This website",
    what: "v3. v2 had a 3D room with RGB lighting in it. It was a phase. This one ships ~1 MB less JavaScript.",
    tags: ["React", "Vite", "GSAP", "Tailwind"],
    status: "You are here",
    href: "https://github.com/18vikastg/my-personal-3D-portfolio",
  },
];
