import React, { useRef, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const ShowCaseSection = () => {
  const sectionRef = useRef(null)
  const project1Ref = useRef(null)
  const project2Ref = useRef(null)
  const project3Ref = useRef(null)
  const project4Ref = useRef(null)
  const project5Ref = useRef(null)
  const project6Ref = useRef(null)

  // Array of refs for easy mapping
  const projectRefs = [
    project1Ref,
    project2Ref,
    project3Ref,
    project4Ref,
    project5Ref,
    project6Ref,
  ]

  useGSAP(() => {
    projectRefs.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3 * (index + 1),
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom-=100',
            },
          }
        )
      }
    })
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      )
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* Project 1 */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper">
              <a
                href="https://github.com/18vikastg/AI-Mock-Interview"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/Ai-Mock_Interview.png"
                  alt="AI Mock Interview"
                />
              </a>
            </div>
            <div className="text-content">
              <h2>An AI-powered mock interview platform</h2>
              <p className="text-white-50 md:text-xl">
                An advanced, interactive AI-powered mock interview application built with Next.js, Tailwind CSS, Gemini API, PostgreSQL, and Drizzle ORM. It simulates realistic job interviews, offering dynamic question prompts, real-time feedback, session history, and detailed performance analytics to help candidates sharpen their skills and boost their confidence.
              </p>
              <a
                href="https://github.com/18vikastg/AI-Mock-Interview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 inline-block flex items-center gap-2"
              >
                <FaGithub size={20} />
                View on GitHub
              </a>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            {/* Project 2 */}
            <div className="project2" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <a
                  href="https://github.com/18vikastg/portal-for-placement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/placement-portal.jpg"
                    alt="Placement Management System"
                  />
                </a>
              </div>
              <h2>Placement Management System</h2>
              <p>
                A full-stack web application designed to streamline campus placements by connecting students, lecturers, and administrators. Features include role-based login, student profile management, real-time placement updates, company insights, interview preparation resources, and an admin dashboard to manage drives and notifications.
              </p>
              <a
                href="https://github.com/18vikastg/portal-for-placement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 inline-block flex items-center gap-2"
              >
                <FaGithub size={20} />
                View on GitHub
              </a>
            </div>

            {/* Project 3 */}
            <div className="project3" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffe7eb]">
                <a
                  href="https://github.com/18vikastg/medical-chatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/medical chatbot.png"
                    alt="Medical ChatBot"
                  />
                </a>
              </div>
              <h2>Medical ChatBot</h2>
              <p>
                An AI-powered health assistant built with Flask, LangChain, LLaMA2, and Pinecone (FAISS) that processes medical databases and streamlines symptom lookup, medical Q&A, and treatment guidance using Retrieval-Augmented Generation for fast, informed responses.
              </p>
              <a
                href="https://github.com/18vikastg/medical-chatbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 inline-block flex items-center gap-2"
              >
                <FaGithub size={20} />
                View on GitHub
              </a>
            </div>

            {/* Project 4 */}
            <div className="project4" ref={project4Ref}>
              <div className="image-wrapper bg-[#ffe7eb]">
                <a
                  href="https://github.com/18vikastg/animation-site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/zentry-interior-image01.png"
                    alt="Animation-Site"
                  />
                </a>
              </div>
              <h2>Zentry-Inspired Animated Website</h2>
              <p>
                A visually rich, scroll-triggered animation website built with React.js, GSAP, and Tailwind CSS—featuring geometric transitions, 3D hover effects, and seamless video storytelling for a modern, luxurious UI/UX experience.
              </p>
              <a
                href="https://github.com/18vikastg/animation-site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 inline-block flex items-center gap-2"
              >
                <FaGithub size={20} />
                View on GitHub
              </a>
            </div>

            {/* Project 5 */}
            <div className="project5" ref={project5Ref}>
              <div className="image-wrapper bg-[#ffe7eb]">
                <a
                  href="https://github.com/18vikastg/vscode-wingman-native"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/wingman-native.png"
                    alt="AI-Native VS Code (Wingman Integration)"
                  />
                </a>
              </div>
              <h2>AI-Native VS Code (Wingman Integration)</h2>
              <p>
                A custom-built version of Visual Studio Code with Wingman AI seamlessly integrated as a native, always-on coding assistant — no extensions, no setup. This project reimagines the IDE experience by baking in AI capabilities at the system level, offering real-time suggestions, doc generation, and refactoring across platforms. Fully open-source and developer-ready for building next-gen AI-powered tools.
              </p>
              <a
                href="https://github.com/18vikastg/vscode-wingman-native"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 inline-block flex items-center gap-2"
              >
                <FaGithub size={20} />
                View on GitHub
              </a>
            </div>

            {/* Project 6 */}
            <div className="project6" ref={project6Ref}>
              <div className="image-wrapper bg-[#ffe7eb]">
                <a
                  href="https://github.com/18vikastg/fund-managemnet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/.jpeg"
                    alt="FundVerify – AI-Powered Decentralized Public Fund Management"
                  />
                </a>
              </div>
              <h2>FundVerify – AI-Powered Decentralized Public Fund Management</h2>
              <p>
                A blockchain-based system that transforms government fund allocation using Ethereum smart contracts and AI-driven document verification. FundVerify ensures transparent, staged fund disbursement with public voting, decentralized governance, and automated RAG-based analysis of utilization reports—enhancing accountability, reducing corruption, and streamlining bureaucratic inefficiencies through verifiable AI and Web3 integration.
              </p>
              <a
                href="https://github.com/18vikastg/fund-managemnet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 inline-block flex items-center gap-2"
              >
                <FaGithub size={20} />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowCaseSection