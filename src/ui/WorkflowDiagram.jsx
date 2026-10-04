/**
 * Illustrative state graph of the kind of workflow the engine runs:
 * a draft moves through preconditions, splits into parallel reviews, joins
 * at approval, and every hop lands in the audit trail. Generic by design —
 * no real process, client or data is depicted.
 */

const W = 120;
const H = 46;
const nodes = [
  { id: "draft", label: "Draft", x: 10, y: 107 },
  { id: "submit", label: "Submitted", x: 175, y: 107 },
  { id: "qa", label: "QA review", x: 350, y: 37 },
  { id: "prod", label: "Prod review", x: 350, y: 177 },
  { id: "approve", label: "Approved", x: 525, y: 107 },
  { id: "done", label: "Released", x: 690, y: 107 },
];
const by = Object.fromEntries(nodes.map((n) => [n.id, n]));
const right = (n) => [n.x + W, n.y + H / 2];
const left = (n) => [n.x, n.y + H / 2];
const curve = (a, b) => {
  const [x1, y1] = right(by[a]);
  const [x2, y2] = left(by[b]);
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
};
const edges = [
  ["draft", "submit"],
  ["submit", "qa"],
  ["submit", "prod"],
  ["qa", "approve"],
  ["prod", "approve"],
  ["approve", "done"],
];
// Order in which the highlight travels (parallel reviews light up together)
const step = { draft: 0, submit: 1, qa: 2, prod: 2, approve: 3, done: 4 };

const notes = [
  { x: 262, y: 30, text: "precondition ✓" },
  { x: 262, y: 222, text: "delegated →" },
  { x: 612, y: 88, text: "SLA 24h · escalate" },
];

const WorkflowDiagram = () => (
  <figure className="rounded-3xl border border-line bg-ink-2 p-5 md:p-8">
    <figcaption className="mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-dim">
      <span>How the engine thinks</span>
      <span>illustrative — not a real process</span>
    </figcaption>

    {/* Desktop / tablet: graph */}
    <svg viewBox="0 0 820 260" className="hidden w-full md:block" role="img" aria-labelledby="wf-desc">
      <desc id="wf-desc">
        A draft is submitted, passes a precondition, splits into parallel QA and production reviews, joins at approval
        with an SLA and escalation, and is released. Every transition is recorded in the audit trail.
      </desc>
      {edges.map(([a, b]) => (
        <g key={a + b}>
          <path d={curve(a, b)} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="1.5" />
          <path d={curve(a, b)} fill="none" stroke="#d4ff3a" strokeOpacity="0.55" strokeWidth="1.5" className="edge-flow" />
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.id} className="wf-node" style={{ "--d": `${step[n.id] * 0.9}s` }}>
          <rect x={n.x} y={n.y} width={W} height={H} rx="23" />
          <text x={n.x + W / 2} y={n.y + H / 2 + 5} textAnchor="middle" className="font-mono text-[13px]">
            {n.label}
          </text>
        </g>
      ))}
      {notes.map((t) => (
        <text key={t.text} x={t.x} y={t.y} textAnchor={t.anchor ?? "middle"} className="fill-[#8a877f] font-mono text-[11px]">
          {t.text}
        </text>
      ))}
      <text x="410" y="252" textAnchor="middle" className="fill-[#8a877f] font-mono text-[11px]">
        every hop → audit trail (who · what · when)
      </text>
    </svg>

    {/* Mobile: the same flow as a vertical list */}
    <ol className="space-y-2 md:hidden" aria-label="Example workflow">
      {[["Draft"], ["Submitted", "precondition ✓"], ["QA review ∥ Prod review", "parallel · delegated"], ["Approved", "SLA 24h · escalate"], ["Released"]].map(
        ([label, note], i) => (
          <li key={label} className="wf-row flex items-center gap-3 rounded-2xl border border-line px-4 py-3" style={{ "--d": `${i * 0.9}s` }}>
            <span className="font-mono text-xs text-dim">0{i + 1}</span>
            <span className="font-mono text-sm">{label}</span>
            {note && <span className="ml-auto text-right font-mono text-[0.65rem] text-dim">{note}</span>}
          </li>
        )
      )}
      <li className="pt-2 text-center font-mono text-[0.65rem] text-dim">every hop → audit trail</li>
    </ol>
  </figure>
);

export default WorkflowDiagram;
