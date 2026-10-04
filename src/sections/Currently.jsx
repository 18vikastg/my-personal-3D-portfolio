import { useRef } from "react";
import { useReveal } from "../lib/motion";
import { currently } from "../data/site";

const Currently = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section ref={scope} aria-labelledby="currently-title" className="py-16 md:py-24">
      <div className="shell grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p data-reveal="fade" className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span>08</span>
            <span className="h-px w-10 bg-line" aria-hidden="true" />
            <span>Currently</span>
          </p>
          <h2 id="currently-title" data-reveal className="mt-5 text-3xl font-medium tracking-[-0.03em]">
            Exploring <span className="serif-accent text-lime">→</span>
          </h2>
        </div>
        <ul className="md:col-span-8">
          {currently.map((c) => (
            <li
              key={c}
              data-reveal
              className="flex items-center justify-between gap-6 border-t border-line py-4 text-xl tracking-tight md:text-2xl"
            >
              {c}
              <span className="size-1.5 shrink-0 rounded-full bg-fg/25" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Currently;
