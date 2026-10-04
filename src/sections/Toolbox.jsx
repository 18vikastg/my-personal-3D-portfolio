import { useRef, useState } from "react";
import { useReveal } from "../lib/motion";
import { shippedWith, alsoInTheKit, groups } from "../data/stack";
import SectionHead from "../ui/SectionHead";

/**
 * The stack as evidence rather than a logo wall: pick a tool, see where it
 * was actually used.
 */
const Toolbox = () => {
  const scope = useRef(null);
  const [active, setActive] = useState("TypeScript");
  useReveal(scope);

  const current = shippedWith.find((t) => t.name === active);

  return (
    <section id="toolbox" ref={scope} aria-labelledby="toolbox-title" className="section border-t border-line">
      <div className="shell">
        <SectionHead
          id="toolbox-title"
          index="05"
          label="Toolbox"
          title={
            <>
              A stack with <span className="serif-accent">receipts.</span>
            </>
          }
          intro="Not a list of logos. Pick a tool and see where I actually used it."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Usage panel */}
          <div className="sticky top-[4.5rem] z-10 -mx-[var(--gutter)] bg-ink/95 px-[var(--gutter)] py-4 backdrop-blur lg:order-2 lg:col-span-5 lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <div aria-live="polite" className="rounded-3xl border border-line bg-ink-2 p-5 lg:sticky lg:top-28 lg:p-8">
              <p className="eyebrow">Used in</p>
              <p className="mt-2 text-3xl font-medium tracking-[-0.03em] text-lime lg:text-5xl">{current.name}</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 lg:mt-8 lg:block lg:space-y-0">
                {current.usedIn.map((u) => (
                  <li key={u} className="text-sm text-fg/85 lg:flex lg:items-center lg:gap-3 lg:border-t lg:border-line lg:py-3 lg:text-lg">
                    <span className="hidden text-dim lg:inline" aria-hidden="true">
                      →
                    </span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tool grid */}
          <div className="space-y-8 lg:order-1 lg:col-span-7">
            {groups.map((g) => (
              <div key={g} data-reveal className="grid gap-3 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <h3 className="eyebrow pt-2.5">{g}</h3>
                <ul className="flex flex-wrap gap-2">
                  {shippedWith
                    .filter((t) => t.group === g)
                    .map((t) => {
                      const on = t.name === active;
                      return (
                        <li key={t.name}>
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => setActive(t.name)}
                            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(t.name)}
                            className={`rounded-full border px-4 py-2 text-[0.95rem] transition-colors duration-300 ${
                              on ? "border-lime bg-lime text-ink" : "border-line-strong text-fg/85 hover:border-fg"
                            }`}
                          >
                            {t.name}
                            <sup className={`ml-1 font-mono text-[0.6rem] ${on ? "text-ink/60" : "text-dim"}`}>{t.usedIn.length}</sup>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}

            <div data-reveal className="grid gap-3 border-t border-line pt-8 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <h3 className="eyebrow pt-1">Also in the kit</h3>
              <p className="text-muted">{alsoInTheKit.join(" · ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toolbox;
