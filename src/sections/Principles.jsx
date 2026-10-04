import { useRef } from "react";
import { useReveal } from "../lib/motion";
import { principles } from "../data/site";
import SectionHead from "../ui/SectionHead";

const Principles = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section id="thinking" ref={scope} aria-labelledby="thinking-title" className="section bg-paper text-paper-ink">
      <div className="shell">
        <SectionHead
          id="thinking-title"
          tone="paper"
          label="How I think"
          title={
            <>
              Opinions I’d defend <span className="serif-accent">in code review.</span>
            </>
          }
          intro="Notes to self, mostly learned the slow way."
        />

        <ol className="max-w-[64rem]">
          {principles.map((p, i) => (
            <li key={p.title} data-reveal className="grid gap-2 border-t border-paper-ink/15 py-7 md:grid-cols-12 md:gap-8 md:py-8">
              <span className="text-sm text-paper-muted md:col-span-1 md:pt-1.5">{i + 1}.</span>
              <h3 className="text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.025em] md:col-span-5">
                {p.title}
              </h3>
              <p className="max-w-[36rem] leading-relaxed text-paper-muted md:col-span-6">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Principles;
