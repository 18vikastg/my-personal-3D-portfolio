import { useId, useState } from "react";
import { FiArrowUpRight, FiGithub, FiPlus } from "react-icons/fi";
import ProjectVisual from "./ProjectVisual";

const Fact = ({ label, children }) => (
  <div className="border-t border-line pt-4">
    <dt className="eyebrow">{label}</dt>
    <dd className="mt-2 leading-relaxed text-fg/85">{children}</dd>
  </div>
);

/** One project told as a short case study: problem → build → engineering → what it shows. */
const ProjectCase = ({ project, index }) => {
  const [open, setOpen] = useState(false);
  const notesId = useId();
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article aria-labelledby={`${project.slug}-title`} className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div data-reveal className={`min-w-0 self-start lg:sticky lg:top-24 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <ProjectVisual project={project} />
      </div>

      <div className={`flex min-w-0 flex-col lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div data-reveal className="flex items-center gap-3">
          <span className="font-mono text-sm text-dim">{number}</span>
          <span className="chip" style={{ color: project.accent, borderColor: `${project.accent}55` }}>
            {project.kind}
          </span>
        </div>
        <h3 id={`${project.slug}-title`} data-reveal className="display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)]">
          {project.title}
        </h3>
        <p data-reveal className="mt-4 text-xl leading-snug text-muted">
          {project.tagline}
        </p>

        <dl data-reveal className="mt-8 space-y-5">
          <Fact label="The problem">{project.problem}</Fact>
          <Fact label="What I built">{project.built}</Fact>
          <Fact label="What it shows">{project.shows}</Fact>
        </dl>

        <div data-reveal className="mt-6 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={notesId}
            className="group flex w-full items-center justify-between py-1 text-left"
          >
            <span className="eyebrow group-hover:text-fg">Engineering notes</span>
            <FiPlus
              aria-hidden="true"
              className={`size-4 text-muted transition-transform duration-500 ease-(--ease-out-expo) ${open ? "rotate-45" : ""}`}
            />
          </button>
          <div
            id={notesId}
            className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-out-expo) ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <ul className="space-y-3 overflow-hidden" inert={!open || undefined}>
              {project.engineering.map((note, i) => (
                <li key={i} className={`flex gap-3 text-[0.95rem] leading-relaxed text-fg/80 ${i === 0 ? "mt-4" : ""}`}>
                  <span className="mt-[0.6em] size-1 shrink-0 rounded-full" style={{ background: project.accent }} />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul data-reveal className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit live <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> — {project.title}</span>
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FiGithub aria-hidden="true" /> Source
              <span className="sr-only"> code for {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCase;
