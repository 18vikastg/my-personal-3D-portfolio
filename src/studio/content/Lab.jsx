import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { lab } from "../../data/lab";
import { emit } from "../../world/bus";
import { A } from "../A";

const CONTROLS = [
  ["density", "Density"],
  ["twist", "Twist"],
  ["noise", "Noise"],
];

/** The Lab: the room is an experiment you can change; the side projects are specimens. */
const Lab = () => {
  const [params, setParams] = useState({ density: 0.7, twist: 0.35, noise: 0.25 });
  useEffect(() => emit("lab", params), [params]);

  return (
    <section className="contents" aria-labelledby="studio-lab">
      <A k="lab:title" className="sign text-center" width={[980, 520]}>
        <p className="kicker">Lab</p>
        <h2 id="studio-lab" className="mt-3 text-[64px] font-medium leading-none tracking-[-0.03em]">
          Things I build when <span className="serif-accent">nobody asked.</span>
        </h2>
        <p className="mt-4 text-[22px] text-muted">
          Experiments, prototypes and side quests. Some are polished, some are held together with hope.
        </p>
      </A>
      <A k="lab:controls" className="placard" width={420}>
        <p className="kicker">This room is one of them</p>
        <p className="mt-2 text-[16px] text-fg/85">Change a parameter and the structure reorganises. Or press into it with your pointer.</p>
        <div className="mt-4 space-y-4">
          {CONTROLS.map(([key, label]) => (
            <label key={key} className="block">
              <span className="flex justify-between font-mono text-[13px] text-muted">
                {label}
                <span>{params[key].toFixed(2)}</span>
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={params[key]}
                onChange={(e) => setParams((p) => ({ ...p, [key]: +e.target.value }))}
                className="mt-2 w-full accent-[#d4ff3a]"
              />
            </label>
          ))}
        </div>
      </A>
      <ul className="contents">
        {lab.map((item, i) => (
          <A key={item.name} k={`lab:item-${i}`} as="li" className="placard" width={340}>
            <p className="kicker">{item.status}</p>
            <h3 className="mt-2 text-[22px] font-medium tracking-tight">
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                {item.name} <FiArrowUpRight aria-hidden="true" className="size-4 text-dim" />
              </a>
            </h3>
            <p className="mt-2 text-[15px] text-fg/85">{item.what}</p>
            <p className="mt-3 font-mono text-[12px] text-dim">{item.tags.join(" · ")}</p>
          </A>
        ))}
      </ul>
    </section>
  );
};

export default Lab;
