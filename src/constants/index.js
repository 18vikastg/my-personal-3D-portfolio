// src/constants/index.js
const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 3, suffix: "+", label: "Internships Completed" },
  { value: 10, suffix: "+", label: "Projects Built & Deployed" },
  { value: 2, suffix: "", label: "GitHub Organizations" },
  { value: 15, suffix: "+", label: "Technologies Mastered" },
];

const logoIconsList = [
  { imgPath: "/images/logos/company-logo-1.png" },
  { imgPath: "/images/logos/company-logo-2.png" },
  { imgPath: "/images/logos/company-logo-3.png" },
  { imgPath: "/images/logos/company-logo-4.png" },
  { imgPath: "/images/logos/company-logo-5.png" },
  { imgPath: "/images/logos/company-logo-6.png" },
  { imgPath: "/images/logos/company-logo-7.png" },
  { imgPath: "/images/logos/company-logo-8.png" },
  { imgPath: "/images/logos/company-logo-9.png" },
  { imgPath: "/images/logos/company-logo-10.png" },
  { imgPath: "/images/logos/company-logo-11.png" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Engineering Mindset",
    desc: "I design scalable, production-ready systems — from AI-powered platforms to real-time queue management — with clean architecture and measurable impact.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Full-Stack Expertise",
    desc: "Proficient across the entire stack: React, Node.js, Python, FastAPI, PostgreSQL, Docker — building end-to-end products that ship.",
  },
  {
    imgPath: "/images/time.png",
    title: "Consistent Deliverer",
    desc: "Track record of completing internships, open-source contributions, and side projects with attention to quality, deadlines, and real-world constraints.",
  },
];

const techStackImgs = [
  { name: "React Developer", imgPath: "/images/logos/react.png" },
  { name: "Python Developer", imgPath: "/images/logos/python.svg" },
  { name: "Backend Developer", imgPath: "/images/logos/node.png" },
  { name: "Interactive Developer", imgPath: "/images/logos/three.png" },
  { name: "Project Manager", imgPath: "/images/logos/git.svg" },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Vikas is currently driving automation and quality improvements across our engineering workflows with remarkable initiative.",
    imgPath: "/images/Arcolab.png",
    logoPath: "/images/Arcolab.ico",
    title: "Software Developer Intern – Arcolab Private Limited",
    date: "January 2026 – Present",
    responsibilities: [
      "Collaborating in Agile/Scrum sprints to customize and extend an open-source platform, developing internal tools that automate operational workflows and reduce manual effort by 25%.",
      "Developed custom plugins and feature modules with unit testing (Jest) to support company-specific requirements, achieving 95% test coverage.",
      "Implemented scalable RESTful API services and frontend components with Docker containerization, enabling robust internal data management for 50+ users.",
      "Stack: React.js, Node.js, TypeScript, Docker, PostgreSQL, Jest",
    ],
  },
  {
    review: "Vikas built a robust full-stack system that streamlined our cybersecurity team's operations. His ability to understand security requirements and translate them into working software was impressive.",
    imgPath: "/images/Arcolab.png",
    logoPath: "/images/Arcolab.ico",
    title: "Full Stack Developer Intern – Arcolab Private Limited",
    date: "November 2024 – March 2025",
    responsibilities: [
      "Developed and deployed a full-stack internal web application for the Cybersecurity division, streamlining ticket handling processes.",
      "Built modules for Security Patch Management, USB Access Control, and IOC Blocking, improving endpoint security compliance.",
      "Designed a custom ITSM ticketing system that reduced resolution time and minimized manual workload.",
      "Stack: React.js, Node.js, Tailwind CSS, MongoDB",
    ],
  },
  {
    review: "Vikas demonstrated strong understanding of web fundamentals and collaborated effectively with our engineering team.",
    imgPath: "/images/pu.png",
    logoPath: "/images/pupilfirst.ico",
    title: "Full Stack Developer Intern – Pupilfirst",
    date: "September 2024 – October 2024",
    responsibilities: [
      "Built responsive web applications using Node.js, Express.js, HTML, CSS, and Bootstrap.",
      "Implemented dynamic frontend features and strengthened understanding of full-stack workflows.",
      "Collaborated with senior developers in code reviews and debugging, enhancing problem-solving skills.",
    ],
  },
];

const expLogos = [
  { name: "logo1", imgPath: "/images/logo1.png" },
  { name: "logo2", imgPath: "/images/logo2.png" },
  { name: "logo3", imgPath: "/images/logo3.png" },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review: "I can't say enough good things about Adrian...",
    imgPath: "/images/client1.png",
  },
  // ... other testimonials
];

const socialImgs = [
  { name: "insta", imgPath: "/images/insta.png" },
  { name: "fb", imgPath: "/images/fb.png" },
  { name: "x", imgPath: "/images/x.png" },
  { name: "linkedin", imgPath: "/images/linkedin.png" },
];

// Tech stack images object
const techStackImages = {
  java: "/images/java-original.svg",
  javascript: "/images/javascript-new.svg",
  typescript: "/images/typescript-original.svg",
  python: "/images/python-logo.svg",
  c: "/images/c-1.svg",
  html: "/images/html5-original.svg",
  css: "/images/css3-original.svg",
  react: "/images/react.js.svg",
  svelte: "/images/svelte-original.svg",
  express: "/images/express-original.svg",
  node: "/images/nodejs-original.svg",
  next: "/images/nextjs-original.svg",
  mongodb: "/images/mongodb-original.svg",
  mysql: "/images/mysql-original.svg",
  postgresql: "/images/postgresql-original.svg",
  bootstrap: "/images/bootstrap.svg",
  tailwind: "/images/tailwind-css.svg",
  bulma: "/images/bulma-plain.svg",
  git: "/images/git-icon-logo.svg",
  linux: "/images/linux-original.svg",
  postman: "/images/getpostman-icon.svg",
  docker: "/images/docker-original.svg",
};
export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons, 
  techStackImgs,   
  techStackImages, 
  navLinks,
};