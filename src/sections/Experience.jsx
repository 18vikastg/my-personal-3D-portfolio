import { useRef } from "react";
import { useReveal } from "../lib/motion";
import { pivotPath as pp, earlier } from "../data/experience";
import SectionHead from "../ui/SectionHead";
import Counter from "../ui/Counter";
import WorkflowDiagram from "../ui/WorkflowDiagram";

const Experience = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section id="experience" ref={scope} aria-labelledby="exp-title" className="section border-t border-line">
      <div className="shell">
        <SectionHead
          id="exp-title"
          index="02"
          label="Experience"
          title={
            <>
              From intern to the engineer <span className="serif-accent">behind the product.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Company rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div data-reveal>
                <p className="text-4xl font-medium tracking-[-0.03em]">{pp.company}</p>
                <p className="mt-1 text-muted">{pp.formerly}</p>
              </div>

              <ol data-reveal className="mt-8 space-y-0 border-l border-line pl-6" aria-label="Role history">
                <li className="relative pb-6">
                  <span className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full border border-line-strong bg-ink" />
                  <p className="font-mono text-xs text-dim">Jan 2026</p>
                  <p className="mt-1">{pp.previousRole}</p>
                </li>
                <li className="relative">
                  <span className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full bg-lime ring-4 ring-lime/20" />
                  <p className="font-mono text-xs text-lime">{pp.promoted} · promoted</p>
                  <p className="mt-1 font-medium">{pp.role}</p>
                </li>
              </ol>

              <p data-reveal className="mt-8 font-mono text-xs text-dim">
                {pp.period} · {pp.location}
              </p>

              <ul data-reveal className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack at Pivot Path">
                {pp.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* The story */}
          <div className="lg:col-span-8">
            <p data-reveal className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.03em]">
              {pp.headline}
            </p>

            <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
              {pp.stats.map((s) => (
                <div key={s.label} data-reveal className="flex flex-col-reverse justify-end bg-ink p-6 md:p-8">
                  <dt className="mt-3 text-sm leading-snug text-muted">{s.label}</dt>
                  <dd className="text-5xl font-medium tracking-[-0.04em] md:text-6xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>

            <div data-reveal className="mt-12">
              <WorkflowDiagram />
            </div>

            <div data-reveal className="mt-6">
              <p className="eyebrow mb-3">The engine handles</p>
              <ul className="flex flex-wrap gap-1.5">
                {pp.engine.map((e) => (
                  <li key={e} className="chip !text-fg/80">
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16">
              <h3 data-reveal className="eyebrow">
                Modules I designed &amp; shipped
              </h3>
              <ol className="mt-5 grid sm:grid-cols-2 sm:gap-x-10">
                {pp.modules.map((m, i) => (
                  <li key={m.name} data-reveal className="group flex items-baseline gap-4 border-t border-line py-4">
                    <span className="font-mono text-xs text-dim transition-colors group-hover:text-lime">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-lg font-medium tracking-tight">{m.name}</span>
                      <span className="block text-sm text-muted">{m.note}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-16">
              <h3 data-reveal className="eyebrow">
                How it’s built
              </h3>
              <ul className="mt-5 space-y-3">
                {pp.how.map((h) => (
                  <li key={h} data-reveal className="flex gap-3 text-lg leading-relaxed text-fg/85">
                    <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Earlier role */}
        <article data-reveal aria-labelledby="earlier-title" className="mt-24 grid gap-8 rounded-3xl border border-line p-6 md:mt-32 md:p-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Before that</p>
            <h3 id="earlier-title" className="mt-4 text-2xl font-medium tracking-tight">
              {earlier.role}
            </h3>
            <p className="mt-1 text-muted">{earlier.company}</p>
            <p className="mt-4 font-mono text-xs text-dim">{earlier.period}</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl leading-snug tracking-tight">{earlier.summary}</p>
            <ul className="mt-6 space-y-2 text-muted">
              {earlier.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true">→</span>
                  {p}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
              {earlier.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Experience;
