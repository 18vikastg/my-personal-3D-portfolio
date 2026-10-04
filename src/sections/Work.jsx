import { useRef } from "react";
import { FiGithub } from "react-icons/fi";
import { useReveal } from "../lib/motion";
import { projects } from "../data/projects";
import { socials } from "../data/site";
import SectionHead from "../ui/SectionHead";
import ProjectCase from "../ui/ProjectCase";

const Work = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section id="work" ref={scope} aria-labelledby="work-title" className="section">
      <div className="shell">
        <SectionHead
          id="work-title"
          index="01"
          label="What I build"
          title={
            <>
              Selected <span className="serif-accent">work.</span>
            </>
          }
          intro="Things with real users, real constraints or a real question behind them. Open the engineering notes for the how."
        />

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectCase key={p.slug} project={p} index={i} />
          ))}
        </div>

        <p data-reveal className="mt-24 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted md:mt-32">
          More on GitHub — including the half-finished ones.
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 text-fg"
          >
            <FiGithub aria-hidden="true" /> github.com/18vikastg
          </a>
        </p>
      </div>
    </section>
  );
};

export default Work;
