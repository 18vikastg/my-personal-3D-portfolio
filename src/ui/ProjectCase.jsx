import { useId, useState } from "react";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";

const ProjectLinks = ({ project }) => (
  <p className="flex flex-wrap gap-x-6 gap-y-2">
    {project.links.live && (
      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 font-medium text-lime">
        Visit live <FiArrowUpRight aria-hidden="true" />
        <span className="sr-only"> — {project.title}</span>
      </a>
    )}
    {project.links.github && (
      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1">
        Source on GitHub <FiArrowUpRight aria-hidden="true" />
        <span className="sr-only"> — {project.title}</span>
      </a>
    )}
  </p>
);

/** Expandable "how it's built" notes. A real button, so it works on touch and keyboard. */
const EngineeringNotes = ({ notes }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-t border-line pt-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex min-h-11 w-full items-center justify-between text-left text-sm text-muted hover:text-fg"
      >
        How it’s built
        <FiPlus aria-hidden="true" className={`size-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      <div id={id} className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <ul className="overflow-hidden" inert={!open || undefined}>
          {notes.map((note) => (
            <li key={note} className="flex gap-3 pb-3 text-[0.95rem] leading-relaxed text-fg/80 first:pt-1">
              <span aria-hidden="true" className="text-dim">
                –
              </span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Fact = ({ label, children }) => (
  <div>
    <dt className="text-sm text-dim">{label}</dt>
    <dd className="mt-1 leading-relaxed text-fg/85">{children}</dd>
  </div>
);

/** A project with a real screenshot: image first, then the story. */
export const ProjectCase = ({ project, flip }) => (
  <article data-project={project.slug} aria-labelledby={`${project.slug}-title`} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
    <figure data-reveal className={`min-w-0 self-start lg:sticky lg:top-24 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
      <img
        src={project.visual.src}
        alt={project.visual.alt}
        loading="lazy"
        decoding="async"
        width="1200"
        height="750"
        className="aspect-[16/10] w-full rounded-md border border-line object-cover object-top"
      />
    </figure>

    <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
      <p data-reveal className="eyebrow">
        {project.kind}
      </p>
      <h3 id={`${project.slug}-title`} data-reveal className="mt-3 text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-tight tracking-[-0.03em]">
        {project.title}
      </h3>
      <p data-reveal className="mt-2 max-w-[34rem] text-lg leading-snug text-muted">
        {project.tagline}
      </p>

      <dl data-reveal className="mt-8 grid gap-6 md:grid-cols-2 md:gap-x-10 lg:grid-cols-1">
        <Fact label="The problem">{project.problem}</Fact>
        <Fact label="What I built">{project.built}</Fact>
        <div className="md:col-span-2 lg:col-span-1">
          <Fact label="Why it matters">{project.shows}</Fact>
        </div>
      </dl>

      <div data-reveal className="mt-8">
        <EngineeringNotes notes={project.engineering} />
      </div>

      <p data-reveal className="stack-line mt-6">
        {project.stack.join(" · ")}
      </p>
      <div data-reveal className="mt-5">
        <ProjectLinks project={project} />
      </div>
    </div>
  </article>
);

/** A project without screenshots, told in text only. */
export const ProjectBrief = ({ project }) => (
  <article data-project={project.slug} aria-labelledby={`${project.slug}-title`} data-reveal className="min-w-0 border-t border-line pt-6">
    <p className="eyebrow">{project.kind}</p>
    <h3 id={`${project.slug}-title`} className="mt-3 text-2xl font-medium tracking-[-0.025em] md:text-3xl">
      {project.title}
    </h3>
    <p className="mt-2 text-lg leading-snug text-muted">{project.tagline}</p>
    <p className="mt-5 max-w-[36rem] leading-relaxed text-fg/85">
      {project.problem} {project.built}
    </p>
    <div className="mt-6">
      <EngineeringNotes notes={project.engineering} />
    </div>
    <p className="stack-line mt-5">{project.stack.join(" · ")}</p>
    <div className="mt-4">
      <ProjectLinks project={project} />
    </div>
  </article>
);
