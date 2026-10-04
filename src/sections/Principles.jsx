import { useRef } from "react";
import { useReveal } from "../lib/motion";
import { principles } from "../data/site";
import SectionHead from "../ui/SectionHead";

const Principles = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section
      id="thinking"
      ref={scope}
      aria-labelledby="thinking-title"
      className="section mx-2 rounded-[2rem] bg-paper text-paper-ink md:mx-4 md:rounded-[3rem]"
    >
      <div className="shell">
        <SectionHead
          id="thinking-title"
          tone="paper"
          index="03"
          label="How I think"
          title={
            <>
              Opinions I’d defend <span className="serif-accent">in code review.</span>
            </>
          }
        />

        <ol>
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              className="group grid gap-3 border-t border-paper-ink/15 py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <span className="font-mono text-sm text-paper-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em] transition-transform duration-500 ease-(--ease-out-expo) md:col-span-6 md:group-hover:translate-x-2">
                {p.title}
              </h3>
              <p className="text-lg leading-relaxed text-paper-muted md:col-span-5">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Principles;
