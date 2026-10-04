import { useRef } from "react";
import { useReveal } from "../lib/motion";
import { pivotPath as pp, earlier } from "../data/experience";
import SectionHead from "../ui/SectionHead";
import WorkflowDiagram from "../ui/WorkflowDiagram";

const Experience = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section id="experience" ref={scope} aria-labelledby="exp-title" className="section border-t border-line">
      <div className="shell">
        <SectionHead
          id="exp-title"
          label="Experience"
          title={
            <>
              From intern to the engineer <span className="serif-accent">behind the product.</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Company rail — a row on tablet, a sticky column on desktop */}
          <aside className="lg:col-span-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:sticky lg:top-28 lg:block">
              <div data-reveal>
                <p className="text-3xl font-medium tracking-[-0.03em]">{pp.company}</p>
                <p className="mt-1 text-muted">{pp.formerly}</p>
                <p className="mt-3 text-sm text-dim">
                  {pp.period} · {pp.location}
                </p>
              </div>

              <ol data-reveal className="border-l border-line pl-5 lg:mt-8" aria-label="Role history">
                <li className="relative pb-5">
                  <span aria-hidden="true" className="absolute -left-[1.55rem] top-1.5 size-2 rounded-full bg-fg/40" />
                  <p className="text-sm text-dim">Jan 2026</p>
                  <p>{pp.previousRole}</p>
                </li>
                <li className="relative">
                  <span aria-hidden="true" className="absolute -left-[1.55rem] top-1.5 size-2 rounded-full bg-lime" />
                  <p className="text-sm text-lime">{pp.promoted} — promoted</p>
                  <p className="font-medium">{pp.role}</p>
                </li>
              </ol>

              <p data-reveal className="stack-line sm:col-span-2 lg:mt-8">
                {pp.stack.join(" · ")}
              </p>
            </div>
          </aside>

          {/* The story */}
          <div className="min-w-0 lg:col-span-8">
            <p data-reveal className="max-w-[34ch] text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.025em]">
              {pp.headline}
            </p>

            <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8">
              {pp.stats.map((s) => (
                <div key={s.label} data-reveal className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 text-sm leading-snug text-muted">{s.label}</dt>
                  <dd className="text-4xl font-medium tracking-[-0.03em] md:text-5xl">
                    {s.value.toLocaleString("en-US")}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>

            <div data-reveal className="mt-14">
              <WorkflowDiagram />
            </div>

            <p data-reveal className="mt-6 max-w-[40rem] leading-relaxed text-muted">
              <span className="text-fg">The engine handles</span> {pp.engine.slice(0, -1).join(", ")} and {pp.engine.at(-1)}.
            </p>

            <h3 data-reveal className="mt-14 text-lg font-medium">
              Modules I designed and shipped
            </h3>
            <ul className="mt-4 grid sm:grid-cols-2 sm:gap-x-10">
              {pp.modules.map((m) => (
                <li key={m.name} data-reveal className="border-t border-line py-3.5">
                  <span className="block font-medium">{m.name}</span>
                  <span className="block text-sm text-muted">{m.note}</span>
                </li>
              ))}
            </ul>

            <h3 data-reveal className="mt-14 text-lg font-medium">
              How it’s built
            </h3>
            <ul className="mt-4 max-w-[42rem] space-y-2.5">
              {pp.how.map((h) => (
                <li key={h} data-reveal className="flex gap-3 leading-relaxed text-fg/85">
                  <span aria-hidden="true" className="text-dim">
                    –
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Earlier role */}
        <article data-reveal aria-labelledby="earlier-title" className="mt-20 grid gap-6 border-t border-line pt-8 md:mt-28 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="eyebrow">Before that</p>
            <h3 id="earlier-title" className="mt-3 text-xl font-medium tracking-tight">
              {earlier.role}
            </h3>
            <p className="text-muted">{earlier.company}</p>
            <p className="mt-2 text-sm text-dim">{earlier.period}</p>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <p className="max-w-[40rem] text-lg leading-relaxed">{earlier.summary}</p>
            <ul className="mt-4 max-w-[40rem] space-y-1.5 text-muted">
              {earlier.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="text-dim">
                    –
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="stack-line mt-5">{earlier.stack.join(" · ")}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Experience;
