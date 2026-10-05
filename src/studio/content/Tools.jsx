import { useEffect, useState } from "react";
import { alsoInTheKit, groups, placeOf, places, shippedWith } from "../../data/stack";
import { emit } from "../../world/bus";
import { A } from "../A";

/** The tool wall: tags on the pegboard; strings run to where each was used. */
const Tools = ({ narrow }) => {
  const [active, setActive] = useState("TypeScript");
  useEffect(() => emit("tool", active), [active]);
  const tool = shippedWith.find((t) => t.name === active);

  return (
    <section className="contents" aria-labelledby="studio-tools">
      <A k="tools:title" className="sign text-center" width={[1100, 520]}>
        <p className="kicker">Toolbox</p>
        <h2 id="studio-tools" className="mt-2 text-[56px] font-medium leading-none tracking-[-0.03em]">
          A stack with <span className="serif-accent">receipts.</span>
        </h2>
      </A>
      <A k="tools:board" width={narrow ? 560 : 1500}>
        <div className={`grid gap-6 ${narrow ? "grid-cols-2" : "grid-cols-6"}`}>
          {groups.map((g) => (
            <div key={g}>
              <h3 className="font-mono text-[14px] uppercase tracking-[0.16em] text-muted">{g}</h3>
              <ul className="mt-3 flex flex-col items-start gap-2">
                {shippedWith
                  .filter((t) => t.group === g)
                  .map((t) => {
                    const on = t.name === active;
                    return (
                      <li key={t.name}>
                        <button
                          type="button"
                          data-tool={t.name}
                          aria-pressed={on}
                          onClick={() => setActive(t.name)}
                          onPointerEnter={(e) => e.pointerType === "mouse" && setActive(t.name)}
                          className={`rounded-[3px] border px-3 py-1.5 text-[19px] transition-colors ${
                            on ? "border-lime bg-lime text-ink" : "border-line-strong bg-ink/80 text-fg hover:border-fg"
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
      </A>
      <A k="tools:places" className="placard" width={420}>
        <p className="kicker">Places</p>
        <ul className="mt-3 space-y-2.5 text-[18px]">
          {places.map(([name], i) => {
            const used = tool.usedIn.some((u) => placeOf(u) === i);
            return (
              <li key={name} data-place={i} className={used ? "text-lime" : "text-muted"}>
                {name}
              </li>
            );
          })}
        </ul>
      </A>
      <A k="tools:used" className="placard" width={420} aria-live="polite">
        <p className="kicker">Where I used it</p>
        <p className="mt-2 text-[30px] font-medium tracking-tight">{tool.name}</p>
        <ul className="mt-3 space-y-1.5">
          {tool.usedIn.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <p className="mt-5 text-[14px] text-muted">
          <span className="text-fg">Also in the kit:</span> {alsoInTheKit.join(", ")}.
        </p>
      </A>
    </section>
  );
};

export default Tools;
