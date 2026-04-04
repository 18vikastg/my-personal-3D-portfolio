import React, { useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaBuilding } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'AI / ML', 'Full Stack', 'Open Source', 'Mobile']

const projects = [
  {
    title: "AdGenesis",
    subtitle: "AI-Powered Design Platform",
    description: "A Canva-inspired design tool with a custom fine-tuned GPT-2 ML model for instant text-to-design generation. Features a Fabric.js canvas editor, 50+ templates, brand kit management, and multi-format export — 100% free with no OpenAI costs.",
    image: "/images/adgenesis-preview.png",
    github: "https://github.com/18vikastg/adgenesis",
    live: null,
    tags: ["React", "FastAPI", "PyTorch", "Fabric.js", "PostgreSQL"],
    categories: ["AI / ML", "Full Stack"],
    featured: true,
    badge: "AI Platform",
    badgeColor: "from-purple-500 to-pink-500",
  },
  {
    title: "Hospital Queue Management",
    subtitle: "HEALTHBOTS Organization",
    description: "A mobile-first hospital queue system built under the HEALTHBOTS GitHub organization. Features real-time queue tracking with Socket.IO, patient registration, doctor dashboards, and push notifications — built with React Native and a robust Node.js/TypeScript backend.",
    image: "/images/hospital-queue-preview.png",
    github: "https://github.com/HEALTHBOTS/hospital-queue-management-system",
    live: null,
    tags: ["React Native", "Node.js", "TypeScript", "Socket.IO", "PostgreSQL", "Prisma"],
    categories: ["Full Stack", "Open Source", "Mobile"],
    featured: true,
    badge: "Open Source",
    badgeColor: "from-emerald-500 to-teal-500",
    org: "HEALTHBOTS",
  },
  {
    title: "AI Mock Interview Platform",
    subtitle: "Real-time AI Evaluation",
    description: "An AI-driven mock interview platform with adaptive question generation and real-time performance analysis using the Gemini API. Role and level-based customization with detailed analytics, automated feedback reports, and support for 50+ concurrent sessions.",
    image: "/images/Ai-Mock_Interview.png",
    github: "https://github.com/18vikastg/AI-Mock-Interview",
    live: null,
    tags: ["React.js", "Next.js", "Gemini API", "PostgreSQL", "Tailwind CSS"],
    categories: ["AI / ML", "Full Stack"],
    featured: false,
    badge: "AI Powered",
    badgeColor: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI College Placement Portal",
    subtitle: "Full-Stack Platform + NLP",
    description: "A comprehensive placement management platform for students, faculty, recruiters, and admins. Integrated AI-powered resume analysis with Python NLP models and analytics dashboards visualising placement trends, salary distributions, and recruiter statistics.",
    image: "/images/placement-portal.jpg",
    github: "https://github.com/18vikastg/jss-placement-portal-demo",
    live: null,
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Python NLP"],
    categories: ["AI / ML", "Full Stack"],
    featured: false,
    badge: "Full Stack",
    badgeColor: "from-orange-500 to-yellow-500",
  },
  {
    title: "OneBox – Email Aggregator",
    subtitle: "AI-Powered Multi-Tenant",
    description: "A multi-tenant email sync platform with IMAP support for Gmail and Outlook. Built intelligent email categorisation using RAG with GPT-3.5, full-text search (SQLite FTS), smart reply suggestions, and Slack/webhook notifications — 99% uptime design.",
    image: "/images/onebox.jpeg",
    github: "https://github.com/18vikastg/onebox",
    live: null,
    tags: ["Python", "Node.js", "Express.js", "OpenAI GPT-3.5", "SQLite FTS"],
    categories: ["AI / ML", "Full Stack"],
    featured: false,
    badge: "AI Powered",
    badgeColor: "from-blue-500 to-cyan-500",
  },
  {
    title: "Medical ChatBot",
    subtitle: "LLM + Vector Search",
    description: "An AI-powered health assistant using Flask, LangChain, LLaMA2, and Pinecone/FAISS vector store. Processes medical databases for contextual Q&A with RAG architecture and responsive web interface for patient-facing interactions.",
    image: "/images/medical chatbot.png",
    github: "https://github.com/18vikastg/medical-chatbot",
    live: null,
    tags: ["Python", "Flask", "LangChain", "LLaMA2", "FAISS"],
    categories: ["AI / ML"],
    featured: false,
    badge: "AI / LLM",
    badgeColor: "from-red-500 to-pink-500",
  },
]

const TagPill = ({ tag }) => (
  <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/70 border border-white/10 whitespace-nowrap">
    {tag}
  </span>
)

const ProjectCard = ({ project, index, cardRef }) => (
  <div
    ref={cardRef}
    className="project-card group relative flex flex-col bg-[#0e0e10] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/25 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-1"
  >
    {/* Image */}
    <div className="relative overflow-hidden h-52">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('no-img'); }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent opacity-70" />

      {/* Badge */}
      <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.badgeColor} text-white shadow-lg`}>
        {project.badge}
      </span>

      {/* Org badge */}
      {project.org && (
        <span className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-sm">
          <FaBuilding size={10} />
          {project.org}
        </span>
      )}
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6 gap-4">
      <div>
        <p className="text-xs font-medium text-purple-400 uppercase tracking-widest mb-1">{project.subtitle}</p>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">{project.title}</h3>
        <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-2 border-t border-white/5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium"
        >
          <FaGithub size={16} />
          {project.org ? `${project.org} / GitHub` : 'View Code'}
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium ml-auto"
          >
            <FaExternalLinkAlt size={13} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
)

const FeaturedCard = ({ project, cardRef }) => (
  <div
    ref={cardRef}
    className="featured-card group relative flex flex-col md:flex-row bg-[#0e0e10] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_60px_rgba(139,92,246,0.2)] hover:-translate-y-1 col-span-1 md:col-span-2"
  >
    {/* Image */}
    <div className="relative overflow-hidden md:w-1/2 h-64 md:h-auto">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0e10] hidden md:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent md:hidden" />

      {/* Badge */}
      <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${project.badgeColor} text-white shadow-lg tracking-wide`}>
        {project.badge}
      </span>

      {project.org && (
        <span className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-sm">
          <FaBuilding size={10} />
          {project.org}
        </span>
      )}
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between md:w-1/2 p-8 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-widest rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
            Featured
          </span>
          <p className="text-xs font-medium text-white/50 uppercase tracking-widest">{project.subtitle}</p>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">{project.title}</h3>
        <p className="text-sm md:text-base text-white/60 leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t border-white/5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-200 font-semibold text-sm group/link"
        >
          <FaGithub size={18} />
          <span className="group-hover/link:underline">{project.org ? `${project.org} on GitHub` : 'View on GitHub'}</span>
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-200 font-semibold text-sm ml-auto group/link"
          >
            <FaExternalLinkAlt size={14} />
            <span className="group-hover/link:underline">Live Demo</span>
          </a>
        )}
      </div>
    </div>
  </div>
)

const ShowCaseSection = () => {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const cardRefs = useRef(projects.map(() => React.createRef()))

  useGSAP(() => {
    cardRefs.current.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(ref.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (index % 3) * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    gsap.fromTo('.showcase-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    )
  }, [])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.categories.includes(activeFilter))

  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section
      id="work"
      ref={sectionRef}
      className="w-full py-20 md:py-32 px-5 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="showcase-header mb-16 text-center">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Things I've <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Built</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A selection of projects — from AI platforms to open-source mobile apps — that reflect my depth across the stack.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === f
                  ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  : 'bg-transparent border-white/15 text-white/60 hover:border-white/30 hover:text-white/80'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Featured projects (full width cards) */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featured.map((project, i) => (
              <FeaturedCard
                key={project.title}
                project={project}
                cardRef={cardRefs.current[projects.indexOf(project)]}
              />
            ))}
          </div>
        )}

        {/* Remaining projects (3-col grid) */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {rest.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={projects.indexOf(project)}
                cardRef={cardRefs.current[projects.indexOf(project)]}
              />
            ))}
          </div>
        )}

        {/* GitHub CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/18vikastg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] font-medium"
          >
            <FaGithub size={20} />
            View all projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default ShowCaseSection
