import { useRef } from "react";
import { useReveal } from "../lib/motion";
import { currently } from "../data/site";

const Currently = () => {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section id="currently" ref={scope} aria-labelledby="currently-title" className="py-16 md:py-24">
      <div className="shell grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p data-reveal className="eyebrow">
            Currently
          </p>
          <h2 id="currently-title" data-reveal className="mt-4 text-2xl font-medium tracking-[-0.02em] md:text-3xl">
            Thinking about
          </h2>
        </div>
        <ul className="md:col-span-8">
          {currently.map((c) => (
            <li
              key={c}
              data-reveal
              className="border-t border-line py-3.5 text-lg md:text-xl"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Currently;
