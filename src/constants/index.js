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
    name: "Testimonials",
    link: "#testimonials",
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
  { value: 1, suffix: "+", label: "Internships Completed" },
  { value: 8, suffix: "+", label: "Personal & Academic Projects" },
  { value: 3, suffix: "+", label: "Full-Stack Applications Deployed" },
  { value: 5, suffix: "+", label: "Technologies Mastered" },
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
    title: "Problem-Solving Mindset",
    desc: "I enjoy building practical tech solutions — from placement portals to AI-powered systems — that solve real-world problems.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Rapid Learner",
    desc: "I quickly adapt to new tools and technologies like LangChain, Flask, Prisma, or blockchain when a project demands it.",
  },
  {
    imgPath: "/images/time.png",
    title: "Consistent & Focused",
    desc: "Balancing internships, college, and projects has taught me how to stay consistent and finish what I start.",
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
    review: "Vikas built a robust full-stack system that streamlined our cybersecurity team's operations...",
    imgPath: "/images/Arcolab.png",
    logoPath: "/images/Arcolab.ico",
    title: "Full Stack Developer Intern – Arcolab Private Limited",
    date: "November 2024 – March 2025",
    responsibilities: [
      "Designed, developed, and deployed a web application for internal Cybersecurity operations.",
      "Created an ITSM-ticketing system for managing XDR incidents, reducing manual effort.",
      "Built modules for Security Patch tracking, USB control, and IOC blocking to enhance endpoint protection.",
      "Worked closely with the internal security team to gather requirements and ensure smooth integration.",
      "Tech Stack: MongoDB, SQL, SvelteKit, Node.js, Tailwind CSS",
    ],
  },
  {
    review: "Vikas demonstrated a strong understanding of web fundamentals...",
    imgPath: "/images/pu.png",
    logoPath: "/images/pupilfirst.ico",
    title: "Full Stack Developer Intern - Pupilfirst",
    date: "September 2024 - October 2024",
    responsibilities: [
      "Developed optimized, responsive websites using Node.js, Express.js, JavaScript, HTML, CSS, and Bootstrap.",
      "Implemented dynamic features to improve interactivity and user flow.",
      "Collaborated with senior developers to debug and enhance frontend performance.",
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
  javascript: "/images/javascript-new.svg",  // Updated to new path
  typescript: "/images/typescript-original.svg",
  c: "/images/c-1.svg",                     // Updated to new path
  html: "/images/html5-original.svg",
  css: "/images/css3-original.svg",
  react: "/images/react.js.svg",            // Updated to new path
  svelte: "/images/svelte-original.svg",
  express: "/images/express-original.svg",
  node: "/images/nodejs-original.svg",
  next: "/images/nextjs-original.svg",
  mongodb: "/images/mongodb-original.svg",
  mysql: "/images/mysql-original.svg",
  postgresql: "/images/postgresql-original.svg",
  bootstrap: "/images/bootstrap.svg",        // Updated to new path
  tailwind: "/images/tailwind-css.svg",     // Updated to new path
  bulma: "/images/bulma-plain.svg",
  git: "/images/git-icon-logo.svg",         // Updated to new path
  linux: "/images/linux-original.svg",
  postman: "/images/getpostman-icon.svg"
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