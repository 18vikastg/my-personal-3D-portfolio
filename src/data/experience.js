// Professional experience. Kept deliberately general — no client names,
// internal identifiers or confidential detail.

export const pivotPath = {
  company: "Pivot Path",
  formerly: "formerly Arcolab Private Limited",
  role: "Software Engineer",
  previousRole: "Software Engineer Intern",
  promoted: "Aug 2026",
  period: "Jan 2026 — Present",
  location: "Bengaluru",
  headline:
    "I built a workflow automation product for pharmaceutical and medicine-manufacturing companies — from an empty repo to production.",
  stats: [
    { value: 3000, suffix: "+", label: "users in production, across multiple companies via SSO" },
    { value: 8, suffix: "+", label: "production modules & extensions designed and shipped" },
    { value: 8, suffix: "", label: "engineers now supporting the product" },
  ],
  engine: [
    "States & transitions",
    "Parallel branches",
    "Task assignment",
    "Approvals",
    "Authorization",
    "Preconditions",
    "Delegation",
    "SLA & escalation",
    "Notifications",
    "Audit trail",
  ],
  modules: [
    { name: "Workflow execution", note: "the engine everything else runs on" },
    { name: "Workflow dashboard", note: "who owns what, and what is overdue" },
    { name: "SOP / GxP validation", note: "for regulated manufacturing" },
    { name: "Approval workflows", note: "multi-step, role-aware sign-off" },
    { name: "Form automation & drafts", note: "save now, submit later" },
    { name: "Barcode & QR management", note: "physical things, digital trail" },
    { name: "Data & collection migration", note: "moving schemas without losing history" },
    { name: "Localization", note: "one product, many shop floors" },
    { name: "SLA & scheduler", note: "time-based triggers and escalation" },
    { name: "Screen capture", note: "evidence attached to the step" },
  ],
  how: [
    "Core engine logic in Node.js and TypeScript, built as plugins on a low-code platform (NocoBase).",
    "PostgreSQL schemas and data models for configurable, multi-step workflows.",
    "React + TypeScript dashboards; production deployments with Docker on Linux and Git-based CI/CD.",
    "Agile/Scrum with a team that now maintains and extends what I started.",
  ],
  stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "NocoBase", "Docker", "Linux", "CI/CD"],
};

export const earlier = {
  company: "Arcolab Private Limited",
  role: "Full-Stack Developer Intern",
  period: "Nov 2024 — Mar 2025",
  summary:
    "Built an internal cybersecurity platform adopted by roughly 200+ users to centralise security operations — replacing processes that used to run on manual effort.",
  points: [
    "ITSM ticketing system for XDR incident management.",
    "Modules for security patch management, USB access control and IOC blocking.",
    "Frontend components and backend REST APIs, designed directly with the security team.",
  ],
  stack: ["React", "Node.js", "MongoDB", "MySQL"],
};
