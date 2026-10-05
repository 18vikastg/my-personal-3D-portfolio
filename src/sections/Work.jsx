import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useReveal } from "../lib/motion";
import { projects } from "../data/projects";
import { socials } from "../data/site";
import SectionHead from "../ui/SectionHead";
import { ProjectBrief, ProjectCase } from "../ui/ProjectCase";

const withShots = projects.filter((p) => p.visual);
const textOnly = projects.filter((p) => !p.visual);

const Work = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section id="work" ref={scope} aria-labelledby="work-title" className="section">
      <div className="shell">
        <SectionHead
          id="work-title"
          label="Selected work"
          title={
            <>
              Things I’ve built, and <span className="serif-accent">why.</span>
            </>
          }
          intro="Each one had real users, a real constraint or a question I couldn’t let go of. The “how it’s built” notes are for the engineers."
        />

        <div className="space-y-20 md:space-y-28 lg:space-y-36">
          {withShots.map((p, i) => (
            <ProjectCase key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-20 md:mt-28 lg:mt-36">
          <h3 data-reveal className="text-lg text-muted">
            Two more — no screenshots, the good parts live in the repo.
          </h3>
          <div className="mt-8 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
            {textOnly.map((p) => (
              <ProjectBrief key={p.slug} project={p} />
            ))}
          </div>
        </div>

        <p data-reveal className="mt-16 text-muted md:mt-20">
          Everything else, including the half-finished ones, is on{" "}
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-fg">
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
};

export default Work;
