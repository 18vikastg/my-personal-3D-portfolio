import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TitleHeader from "../components/TitleHeader";
import TechIcon from "../components/Models/TechLogos/Techicon";
import { techStackImages, techStackIcons } from "../constants";

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  }, []);

  const techCategories = [
    {
      id: "programming",
      title: "Programming Languages",
      sub: "💻 Core Languages",
      items: [
        { id: "java", name: "Java", imgKey: "java" },
        { id: "javascript", name: "JavaScript", imgKey: "javascript" },
        { id: "typescript", name: "TypeScript", imgKey: "typescript" },
        { id: "c", name: "C", imgKey: "c" }
      ]
    },
    {
      id: "web",
      title: "Web Development",
      sub: "🌐 Frontend & Backend",
      items: [
        { id: "html", name: "HTML", imgKey: "html" },
        { id: "css", name: "CSS", imgKey: "css" },
        { id: "react", name: "React.js", imgKey: "react" },
        { id: "svelte", name: "Svelte", imgKey: "svelte" },
        { id: "express", name: "Express.js", imgKey: "express" },
        { id: "node", name: "Node.js", imgKey: "node" },
        { id: "next", name: "Next.js", imgKey: "next" }
      ]
    },
    {
      id: "databases",
      title: "Databases",
      sub: "🗄️ Data Storage",
      items: [
        { id: "mongodb", name: "MongoDB", imgKey: "mongodb" },
        { id: "mysql", name: "SQL", imgKey: "mysql" },
        { id: "postgresql", name: "PostgreSQL", imgKey: "postgresql" }
      ]
    },
    {
      id: "styling",
      title: "Styling Frameworks",
      sub: "🎨 UI Design",
      items: [
        { id: "bootstrap", name: "Bootstrap", imgKey: "bootstrap" },
        { id: "tailwind", name: "Tailwind CSS", imgKey: "tailwind" },
        { id: "bulma", name: "Bulma", imgKey: "bulma" }
      ]
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      sub: "🛠️ Development Tools",
      items: [
        { id: "git", name: "Git", imgKey: "git" },
        { id: "linux", name: "Linux", imgKey: "linux" },
        { id: "postman", name: "Postman", imgKey: "postman" }
      ]
    }
  ];

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />

        {/* 3D Models Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-2">My Developer Roles</h3>
          <p className="text-[#839CB5] mb-6">✨ Specialized in these technologies</p>
          <div className="tech-grid">
            {techStackIcons.map((tech) => (
              <div
                key={tech.name}
                className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
              >
                <div className="tech-card-animated-bg" />
                <div className="tech-card-content">
                  <div className="tech-icon-wrapper h-40">
                    <TechIcon model={tech} />
                  </div>
                  <div className="padding-x w-full">
                    <p className="font-medium">{tech.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2D Tech Stack Sections */}
        {techCategories.map((category) => (
          <div key={category.id} className="mb-20">
            <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
            <p className="text-[#839CB5] mb-6">{category.sub}</p>
            <div className="tech-grid">
              {category.items.map((tech) => (
                <div
                  key={`${category.id}-${tech.id}`}
                  className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
                >
                  <div className="tech-card-animated-bg" />
                  <div className="tech-card-content">
                    <div className="tech-icon-wrapper">
                      <img 
                        src={techStackImages[tech.imgKey]} 
                        alt={tech.name}
                        className="w-16 h-16 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="padding-x w-full">
                      <p className="font-medium">{tech.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;