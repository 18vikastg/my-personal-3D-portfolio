import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useReveal } from "../lib/motion";
import { lab } from "../data/lab";
import SectionHead from "../ui/SectionHead";

const Lab = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section id="lab" ref={scope} aria-labelledby="lab-title" className="section">
      <div className="shell">
        <SectionHead
          id="lab-title"
          label="Lab"
          title={
            <>
              Things I build when <span className="serif-accent">nobody asked.</span>
            </>
          }
          intro="Experiments, prototypes and side quests. Some are polished, some are held together with hope. All of them taught me something."
        />

        <ul className="border-b border-line">
          {lab.map((item) => (
            <li key={item.name} data-reveal>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-2 border-t border-line py-6 md:grid-cols-12 md:items-baseline md:gap-8"
              >
                <span className="md:col-span-4">
                  <span className="inline-flex items-center gap-2 text-xl font-medium tracking-[-0.02em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 md:text-2xl">
                    {item.name}
                    <FiArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-dim group-hover:text-fg" />
                  </span>
                  <span className="mt-1 block text-sm text-dim">{item.status}</span>
                </span>
                <span className="leading-relaxed text-muted md:col-span-5">{item.what}</span>
                <span className="stack-line md:col-span-3 md:text-right">{item.tags.join(" · ")}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Lab;
