// The toolbox, organised by evidence: each tool maps to the places it was
// actually used. Tools not tied to a project here live in `alsoInTheKit`.

export const shippedWith = [
  { name: "TypeScript", group: "Language", usedIn: ["Pivot Path workflow engine", "VS Code × Wingman", "Focus Flow"] },
  { name: "JavaScript", group: "Language", usedIn: ["Swanand Spices", "PrepLink", "AI Mock Interview", "OneBox"] },
  { name: "Python", group: "Language", usedIn: ["Churn research (Best Paper)", "AI Resume Analyzer", "MuteMate", "PrepLink resume analysis"] },
  { name: "SQL", group: "Language", usedIn: ["Pivot Path schemas", "AI Mock Interview", "OneBox search"] },

  { name: "React", group: "Frontend", usedIn: ["Pivot Path dashboards", "Swanand Spices", "PrepLink", "Arcolab security platform"] },
  { name: "Next.js", group: "Frontend", usedIn: ["AI Mock Interview"] },
  { name: "React Native", group: "Frontend", usedIn: ["Smart Health Queue"] },
  { name: "Tailwind CSS", group: "Frontend", usedIn: ["Swanand Spices", "PrepLink", "AI Mock Interview", "This site"] },
  { name: "Framer Motion", group: "Frontend", usedIn: ["Swanand Spices"] },
  { name: "GSAP", group: "Frontend", usedIn: ["This site", "Zentry-inspired motion site"] },

  { name: "Node.js", group: "Backend", usedIn: ["Pivot Path workflow engine", "PrepLink", "Smart Health Queue", "OneBox", "Arcolab security platform"] },
  { name: "Express.js", group: "Backend", usedIn: ["PrepLink", "OneBox"] },
  { name: "REST APIs", group: "Backend", usedIn: ["PrepLink", "Arcolab security platform", "Pivot Path"] },
  { name: "Socket.IO", group: "Backend", usedIn: ["Smart Health Queue"] },
  { name: "Plugin development", group: "Backend", usedIn: ["Pivot Path — plugins on an open-source platform"] },

  { name: "PostgreSQL", group: "Data", usedIn: ["Pivot Path schemas", "Smart Health Queue", "AI Mock Interview"] },
  { name: "MongoDB", group: "Data", usedIn: ["PrepLink", "Arcolab security platform"] },
  { name: "MySQL", group: "Data", usedIn: ["Arcolab security platform"] },
  { name: "SQLite", group: "Data", usedIn: ["OneBox full-text search"] },
  { name: "Redis", group: "Data", usedIn: ["Smart Health Queue"] },

  { name: "Docker", group: "Ship", usedIn: ["Pivot Path production deploys"] },
  { name: "Linux", group: "Ship", usedIn: ["Pivot Path production deploys", "Daily driver"] },
  { name: "Git + CI/CD", group: "Ship", usedIn: ["Pivot Path", "Everything else"] },

  { name: "Gemini API", group: "AI", usedIn: ["AI Mock Interview"] },
  { name: "OpenAI API", group: "AI", usedIn: ["OneBox classification"] },
  { name: "scikit-learn + SHAP", group: "AI", usedIn: ["Churn research (Best Paper)"] },
];

export const alsoInTheKit = ["Java", "Vue", "Svelte / SvelteKit", "Django", "Jest", "Postman"];

export const groups = ["Language", "Frontend", "Backend", "Data", "Ship", "AI"];
