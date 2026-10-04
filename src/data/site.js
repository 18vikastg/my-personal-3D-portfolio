// Single source of truth for identity, links and short copy.
// Every claim here is taken from the résumé (public/Vikas_T_G_Resume.pdf).

export const profile = {
  name: "Vikas T G",
  role: "Software Engineer",
  company: "Pivot Path",
  location: "Bengaluru, India",
  relocation: "Open to relocation",
  email: "vikastg2000@gmail.com",
  resume: "/Vikas_T_G_Resume.pdf",
  site: "https://vikastg.vercel.app",
};

export const socials = {
  github: "https://github.com/18vikastg",
  linkedin: "https://www.linkedin.com/in/vikas-t-g-09692325a/",
  x: "https://x.com/vikastg263399",
  instagram: "https://www.instagram.com/vikas__t__g/",
};

// The person behind the code. Each side links to the section that proves it.
export const sides = [
  { role: "Software Engineer", does: "builds software, products & systems", href: "#experience" },
  { role: "Product Builder", does: "turns ideas into working apps", href: "#work" },
  { role: "Researcher", does: "Best Paper Award, 2026", href: "#proof" },
  { role: "Creator", does: "films & visual storytelling", href: "#silent-stories" },
];

// Silent Stories — the filmmaking side. Copy and credits are as provided by
// Vikas; artwork in public/silent-stories/ is the official poster and logo.
export const silentStories = {
  name: "Silent Stories",
  tagline: "Exploring the unexplored",
  descriptor: "Digital creator · Stories by Vikas T G",
  url: "https://www.instagram.com/thesilentstories._/",
  handle: "@thesilentstories._",
  logo: "/silent-stories/silent-stories-logo.webp",
  film: {
    title: ["ANTAR", "DRISHTI"],
    subtitle: "An Inner Journey",
    poster: "/silent-stories/antardrishti-poster.webp",
    url: "https://www.instagram.com/reel/DaVYc_lpTOT/",
    logline: [
      "Some journeys don’t begin with a destination.",
      "They begin with a question.",
    ],
    question: "“What am I really searching for?”",
    about:
      "ANTARDRISHTI is a cinematic exploration of that question — and the quiet journey that begins when we choose to look within.",
    inspiration: {
      source: "Bhagavad Gita 2.59",
      idea: "True transformation doesn’t come from simply suppressing desire, but from discovering something deeper and more meaningful.",
    },
    credits: [
      { role: "Story, Concept & Direction", name: "Vikas T G" },
      { role: "Edit", name: "@ortivoxcorp" },
      { role: "Special thanks", name: "@_niru_gunnal · @shridhar_math10" },
    ],
  },
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Lab", href: "#lab" },
  { label: "Proof", href: "#proof" },
];

// Rolling facts under the hero — each one is on the résumé.
export const tickerFacts = [
  "3,000+ people use a product I built",
  "Intern → Software Engineer, Aug 2026",
  "8+ production modules shipped",
  "Best Paper Award · IC-SIIT SYNERGY 2026",
  "B.E. Computer Science · JSSATE ’26",
  "Workflow engines · AI tools · storefronts",
];

export const principles = [
  {
    title: "Ship the boring version first.",
    body: "Get the workflow running end to end with the simplest thing that works. Then make it clever — if it still needs to be.",
  },
  {
    title: "Nobody reads the manual.",
    body: "Shop-floor operators and people ordering spices on their phone have the same expectation: the screen should explain itself.",
  },
  {
    title: "Every state change should be explainable.",
    body: "Regulated manufacturing taught me that “who approved this, and when?” is a feature, not a log file. Design for the audit from day one.",
  },
  {
    title: "Configurable, until it isn’t.",
    body: "Building a workflow engine is mostly deciding what becomes a setting and what stays as code. Too much config is just code with worse tooling.",
  },
  {
    title: "When the docs run out, read the source.",
    body: "Plugin work on a low-code platform means living inside someone else’s codebase. The fastest answer is usually one grep away.",
  },
];

export const currently = [
  "AI-powered developer tools",
  "Workflow systems that scale past one team",
  "Frontend architecture that stays fast",
  "Product engineering, end to end",
  "Software roles abroad — Germany especially",
];

export const education = {
  school: "JSS Academy of Technical Education, Bengaluru",
  degree: "B.E. Computer Science & Engineering",
  years: "2022 — 2026",
  cgpa: "8.1 / 10",
};
