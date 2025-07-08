import React, { useRef } from 'react'
import { FaGithub } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const ShowCaseSection = () => {
  const sectionRef = useRef(null)
  const projectRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]

  useGSAP(() => {
    // Animation for each project
    projectRefs.forEach((ref, index) => {
      if (ref.current) {
        gsap.from(ref.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        })
      }
    })

    // Section fade in
    if (sectionRef.current) {
      gsap.from(sectionRef.current, { 
        opacity: 0, 
        duration: 1 
      })
    }
  }, [])

  const projects = [
    {
      title: "AI Mock Interview",
      description: "An advanced, interactive AI-powered mock interview application built with Next.js, Tailwind CSS, Gemini API, PostgreSQL, and Drizzle ORM.",
      image: "/images/Ai-Mock_Interview.png",
      link: "https://github.com/18vikastg/AI-Mock-Interview"
    },
    {
      title: "Placement Management System",
      description: "A full-stack web application designed to streamline campus placements by connecting students, lecturers, and administrators.",
      image: "/images/placement-portal.jpg",
      link: "https://github.com/18vikastg/portal-for-placement"
    },
    {
      title: "Medical ChatBot",
      description: "An AI-powered health assistant built with Flask, LangChain, LLaMA2, and Pinecone (FAISS) that processes medical databases.",
      image: "/images/medical chatbot.png",
      link: "https://github.com/18vikastg/medical-chatbot"
    },
    {
      title: "Zentry-Inspired Website",
      description: "A visually rich, scroll-triggered animation website built with React.js, GSAP, and Tailwind CSS.",
      image: "/images/zentry-interior-image01.png",
      link: "https://github.com/18vikastg/animation-site"
    },
    {
      title: "AI-Native VS Code",
      description: "A custom-built version of Visual Studio Code with Wingman AI seamlessly integrated as a native coding assistant.",
      image: "/images/wingman-native.png",
      link: "https://github.com/18vikastg/vscode-wingman-native"
    },
    {
      title: "FundVerify",
      description: "A blockchain-based system that transforms government fund allocation using Ethereum smart contracts and AI-driven document verification.",
      image: "/images/.jpeg",
      link: "https://github.com/18vikastg/fund-managemnet"
    }
  ]

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="app-showcase w-full py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center text-white">My Projects</h2>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={projectRefs[index]}
              className="project-card bg-gray-900 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="image-wrapper md:w-1/2 h-64 md:h-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
                
                <div className="text-content md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                  >
                    <FaGithub size={20} />
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShowCaseSection