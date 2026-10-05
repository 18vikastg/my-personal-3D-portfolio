import { earlier, pivotPath as pp } from "../../data/experience";
import { A } from "../A";

// Machine part labels. Module names appear only where a shipped module
// genuinely corresponds to that part of the flow.
const PARTS = [
  ["scan", "Intake · barcode & QR"],
  ["state", "State · forms & drafts"],
  ["task", "Task · workflow execution"],
  ["assign", "Assignment · roles, delegation"],
  ["sched", "Scheduler"],
  ["sla", "SLA timer"],
  ["escalate", "Escalation"],
  ["dashboard", "Workflow dashboard"],
  ["review", "Review · parallel · SOP/GxP validation"],
  ["reject", "Rejected → back to draft"],
  ["audit", "Audit trail · who, what, when"],
  ["done", "Completed · approved"],
];

/**
 * The engineering floor: words are on the architecture — the story on the
 * long wall, numbers over the machine, names on the machine's parts, the
 * parts list where the line ends, and the earlier role in its alcove.
 */
const Engineering = () => (
  <section className="contents" aria-labelledby="studio-exp">
    <A k="eng:intro" className="placard" width={520}>
      <p className="kicker">Experience</p>
      <h2 id="studio-exp" className="mt-2 text-[40px] font-medium leading-[1.05] tracking-[-0.03em]">
        From intern to the engineer <span className="serif-accent">behind the product.</span>
      </h2>
      <p className="mt-5 text-[26px] font-medium tracking-tight">{pp.company}</p>
      <p className="text-muted">
        {pp.formerly} · {pp.period} · {pp.location}
      </p>
      <ol className="mt-4 space-y-1 text-[16px]" aria-label="Role history">
        <li>
          <span className="text-dim">Jan 2026</span> — {pp.previousRole}
        </li>
        <li>
          <span className="text-lime">{pp.promoted} — promoted</span> — {pp.role}
        </li>
      </ol>
      <p className="mt-5 text-[20px] leading-snug">{pp.headline}</p>
      <p className="mt-4 text-[14px] text-muted">The machine beside you is a working model of that kind of engine. Walk along it.</p>
    </A>

    <A k="eng:stats" className="sign" width={[760, 520]}>
      <dl className="grid grid-cols-3 gap-8">
        {pp.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="mt-2 text-[17px] leading-snug text-muted">{s.label}</dt>
            <dd className="text-[64px] font-medium leading-none tracking-[-0.03em]">
              {s.value.toLocaleString("en-US")}
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </A>

    {PARTS.map(([key, text]) => (
      <A key={key} k={`eng:part-${key}`} className="tag">
        {text}
      </A>
    ))}
    <A k="eng:illustrative" className="sign" width={520}>
      <p className="font-mono text-[18px] text-dim">Illustrative model · not a real process, client or dataset</p>
    </A>

    <A k="eng:how" className="placard" width={560}>
      <p className="kicker">The parts list — modules I designed and shipped</p>
      <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px]">
        {pp.modules.map((m) => (
          <li key={m.name}>
            <span className="block font-medium">{m.name}</span>
            <span className="block text-[13px] text-muted">{m.note}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[15px] text-fg/85">
        <span className="text-fg">The engine handles</span> {pp.engine.slice(0, -1).join(", ")} and {pp.engine.at(-1)}.
      </p>
      <p className="kicker mt-5">How it’s built</p>
      <ul className="mt-2 space-y-1.5 text-[15px] text-fg/85">
        {pp.how.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden="true" className="text-dim">–</span>
            {h}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[12px] text-dim">{pp.stack.join(" · ")}</p>
    </A>

    <A k="eng:arcolab" className="placard" width={430}>
      <p className="kicker">Before that</p>
      <h3 className="mt-2 text-[24px] font-medium tracking-tight">{earlier.role}</h3>
      <p className="text-muted">
        {earlier.company} · {earlier.period}
      </p>
      <p className="mt-3">{earlier.summary}</p>
      <ul className="mt-3 space-y-1 text-[15px] text-fg/85">
        {earlier.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span aria-hidden="true" className="text-dim">–</span>
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[12px] text-dim">{earlier.stack.join(" · ")}</p>
    </A>
  </section>
);

export default Engineering;
