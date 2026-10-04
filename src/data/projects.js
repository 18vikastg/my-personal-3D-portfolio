// Selected work, written as short case studies.
// Facts come from each project's repository / live site and the résumé.
// `visual.kind`: "image" uses a real screenshot; "queue" / "inbox" render an
// illustrative UI sketch for projects without a hosted demo.

export const projects = [
  {
    slug: "swanand-spices",
    title: "Swanand Spices",
    kind: "Live product",
    tagline: "A real storefront for a real family kitchen in Sirsi.",
    problem:
      "A family kitchen in Sirsi, Karnataka sells Malenadu pepper, turmeric, honey, ghee and snacks — mostly to people who would rather send a WhatsApp message than fill in a checkout form.",
    built:
      "A storefront that meets customers where they already are: browse, search, build a cart, and the site writes the WhatsApp order for you.",
    engineering: [
      "Cart and wishlist state in React context, persisted to storage so a half-built order survives a closed tab.",
      "Order composer that turns the cart into a clean WhatsApp message — sanitising free-text input and never presenting a partial sum as the total.",
      "Optional address autofill via browser geolocation + reverse geocoding, with every failure mode mapped to a plain-language message.",
      "Per-page metadata and structured data so a small local brand can actually be found.",
    ],
    shows: "Product judgement for non-technical users — and shipping something a real business depends on.",
    stack: ["React", "Vite", "Tailwind CSS", "React Router", "Framer Motion"],
    links: { live: "https://swanand-spices.vercel.app/" },
    visual: { kind: "image", src: "/work/swanand-spices.webp", alt: "Swanand Spices homepage: “The taste of Malenadu, from our kitchen to yours.”" },
    accent: "#e9b949",
  },
  {
    slug: "preplink",
    title: "PrepLink",
    kind: "Live · Full stack",
    tagline: "A placement portal for JSSATE, Bengaluru — with an AI career guide built in.",
    problem:
      "Placement season involves four kinds of people — students, faculty, recruiters and admins — who each need a different view of the same jobs, eligibility rules and applications.",
    built:
      "A role-based portal: students track CGPA-based eligibility and applications, recruiters post roles and review candidates, faculty and admins see the whole pipeline.",
    engineering: [
      "Role-based access control and separate dashboards over one shared REST API (Node.js + Express + MongoDB).",
      "AI-powered resume analysis using Python NLP models, plus an AI career guide that generates role-specific roadmaps.",
      "Application tracking from “applied” to outcome, with filtering by company, role and requirements.",
    ],
    shows: "Modelling one domain for several user roles without building four separate apps.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Python NLP"],
    links: {
      live: "https://jss-placement-portal-demo.vercel.app/",
      github: "https://github.com/18vikastg/jss-placement-portal-demo",
    },
    visual: { kind: "image", src: "/work/preplink.webp", alt: "PrepLink landing page — JSSATEB Placement Portal" },
    accent: "#c4513f",
  },
  {
    slug: "health-queue",
    title: "Smart Health Queue",
    kind: "Open source · Research",
    tagline: "Hospital queue management that puts urgency ahead of arrival order.",
    problem:
      "In a busy outpatient department, a first-come-first-served line means the sickest patient can wait the longest — and nobody knows how long they will wait.",
    built:
      "An open-source queue system with priority-based scheduling, appointments and live notifications, built with the HEALTHBOTS team and written up as a research project.",
    engineering: [
      "Priority-aware queue logic, with Redis holding the hot queue state.",
      "Socket.IO pushes position changes to patients and staff the moment the queue moves.",
      "React Native client for patients; activity dashboards for hospital staff.",
    ],
    shows: "Real-time systems, and turning a messy physical process into a predictable one.",
    stack: ["React Native", "Node.js", "PostgreSQL", "Redis", "Socket.IO"],
    links: { github: "https://github.com/HEALTHBOTS/hospital-queue-management-system" },
    visual: { kind: "queue" },
    accent: "#4fd1a5",
  },
  {
    slug: "mock-interview",
    title: "AI Mock Interview",
    kind: "Live · AI",
    tagline: "Interview practice that adapts to the role you are actually applying for.",
    problem:
      "Generic interview question lists don’t match a specific role or experience level, and you get no feedback on how you answered.",
    built:
      "A mock interview platform that generates questions for your role and level with the Gemini API, evaluates your answers and produces a feedback report.",
    engineering: [
      "Prompting Gemini for role- and experience-specific question sets, then for structured evaluation of each answer.",
      "Interview sessions and feedback reports stored in PostgreSQL so progress can be reviewed later.",
    ],
    shows: "Putting an LLM behind a focused product instead of a chat box.",
    stack: ["Next.js", "Gemini API", "PostgreSQL", "Tailwind CSS"],
    links: {
      live: "https://ai-mock-interview-qx7g.vercel.app/",
      github: "https://github.com/18vikastg/AI-Mock-Interview",
    },
    visual: { kind: "image", src: "/work/mock-interview.webp", alt: "AI Mock Interview landing page — “Ace your next interview”" },
    accent: "#7aa2ff",
  },
  {
    slug: "onebox",
    title: "OneBox",
    kind: "AI · Backend",
    tagline: "Every inbox in one place, already sorted.",
    problem: "Juggling Gmail and Outlook accounts means the important replies get buried under everything else.",
    built:
      "An email aggregator that syncs multiple IMAP accounts, classifies each email with the OpenAI API, and pings Slack or a webhook when something matters.",
    engineering: [
      "IMAP sync for Gmail and Outlook with automated synchronisation and error recovery.",
      "AI classification pipeline into categories like Interested, Meeting Booked and Out of Office.",
      "Full-text search over synced mail using SQLite FTS.",
    ],
    shows: "Backend plumbing — sync, retries, search — with AI as one stage in a pipeline.",
    stack: ["Node.js", "Express.js", "Python", "SQLite FTS", "OpenAI API"],
    links: { github: "https://github.com/18vikastg/onebox" },
    visual: { kind: "inbox" },
    accent: "#ff8a5b",
  },
];
