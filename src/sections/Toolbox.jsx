import { useEffect, useRef, useState } from "react";
import { useReveal } from "../lib/motion";
import { shippedWith, alsoInTheKit, groups } from "../data/stack";
import SectionHead from "../ui/SectionHead";
import { emit } from "../world/bus";

const byGroup = (g) => shippedWith.filter((t) => t.group === g);

/**
 * The stack as evidence rather than a logo wall. Desktop: pick a tool, see
 * where it was used. Smaller screens: the same information as a plain list,
 * so nothing depends on hover or a sticky panel.
 */
const Toolbox = () => {
  const scope = useRef(null);
  const [active, setActive] = useState("TypeScript");
  useReveal(scope);

  const current = shippedWith.find((t) => t.name === active);

  // The 3D world draws the same receipts
  useEffect(() => emit("tool", active), [active]);

  return (
    <section id="toolbox" ref={scope} aria-labelledby="toolbox-title" className="section border-t border-line">
      <div className="shell">
        <SectionHead
          id="toolbox-title"
          label="Toolbox"
          title={
            <>
              A stack with <span className="serif-accent">receipts.</span>
            </>
          }
          intro="Only things I’ve shipped with, and where. Pick one."
        />

        {/* Desktop: interactive */}
        <div className="hidden gap-14 lg:grid lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {groups.map((g) => (
              <div key={g} data-reveal className="grid grid-cols-[7rem_1fr] gap-6">
                <h3 className="pt-1.5 text-sm text-dim">{g}</h3>
                <ul className="flex flex-wrap gap-x-1 gap-y-1">
                  {byGroup(g).map((t) => {
                    const on = t.name === active;
                    return (
                      <li key={t.name}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setActive(t.name)}
                          onPointerEnter={(e) => e.pointerType === "mouse" && setActive(t.name)}
                          className={`rounded-md px-2.5 py-1.5 text-[0.95rem] transition-colors ${
                            on ? "bg-lime text-ink" : "text-fg/80 hover:bg-fg/[0.06] hover:text-fg"
                          }`}
                        >
                          {t.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div aria-live="polite" className="wf-plate sticky top-28 border-l border-line py-4 pl-8">
              <p className="text-sm text-dim">Where I used it</p>
              <p className="mt-2 text-3xl font-medium tracking-[-0.03em]">{current.name}</p>
              <ul className="mt-5 space-y-2">
                {current.usedIn.map((u) => (
                  <li key={u} className="text-lg text-fg/85">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile & tablet: a plain list, one disclosure per group (first one open) */}
        <div className="border-b border-line lg:hidden">
          {groups.map((g, i) => (
            <details
              key={g}
              data-reveal
              open={i === 0}
              onToggle={(e) => e.currentTarget.open && setActive(byGroup(g)[0].name)}
              className="group border-t border-line"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
                <h3 className="font-medium">
                  {g} <span className="ml-1 text-sm font-normal text-dim">{byGroup(g).map((t) => t.name).join(", ")}</span>
                </h3>
                <span aria-hidden="true" className="ml-4 text-dim transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="grid pb-4 sm:grid-cols-2 sm:gap-x-10">
                {byGroup(g).map((t) => (
                  <li key={t.name} className="py-2.5">
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-sm leading-relaxed text-muted">{t.usedIn.join(" · ")}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <p data-reveal className="mt-12 max-w-[40rem] border-t border-line pt-6 text-muted">
          <span className="text-fg">Also in the kit:</span> {alsoInTheKit.join(", ")}.
        </p>
      </div>
    </section>
  );
};

export default Toolbox;
