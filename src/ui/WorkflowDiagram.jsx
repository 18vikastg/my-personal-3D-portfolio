/**
 * Explanatory state graph of the kind of workflow the engine runs: a draft
 * passes a precondition, splits into parallel reviews, joins at approval, and
 * every hop lands in the audit trail. Generic by design — no real process,
 * client or data is depicted. Static on purpose: it's a diagram, not a demo.
 */

const W = 120;
const H = 44;
const nodes = [
  { id: "draft", label: "Draft", x: 10, y: 98 },
  { id: "submit", label: "Submitted", x: 175, y: 98 },
  { id: "qa", label: "QA review", x: 350, y: 30 },
  { id: "prod", label: "Prod review", x: 350, y: 166 },
  { id: "approve", label: "Approved", x: 525, y: 98 },
  { id: "done", label: "Released", x: 690, y: 98 },
];
const by = Object.fromEntries(nodes.map((n) => [n.id, n]));
const curve = (a, b) => {
  const x1 = by[a].x + W;
  const y1 = by[a].y + H / 2;
  const x2 = by[b].x;
  const y2 = by[b].y + H / 2;
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2 - 4},${y2}`;
};
const edges = [
  ["draft", "submit"],
  ["submit", "qa"],
  ["submit", "prod"],
  ["qa", "approve"],
  ["prod", "approve"],
  ["approve", "done"],
];
const notes = [
  { x: 262, y: 26, text: "precondition ✓" },
  { x: 262, y: 236, text: "delegated" },
  { x: 615, y: 84, text: "SLA → escalate" },
];

const steps = [
  ["Draft", ""],
  ["Submitted", "precondition checked"],
  ["QA review + Prod review", "in parallel; either can be delegated"],
  ["Approved", "SLA timer, escalates if late"],
  ["Released", ""],
];

const WorkflowDiagram = () => (
  <figure className="border-y border-line py-8">
    <svg viewBox="0 0 820 250" className="hidden w-full md:block" role="img" aria-labelledby="wf-desc">
      <desc id="wf-desc">
        A draft is submitted, passes a precondition, splits into parallel QA and production reviews, joins at approval
        with an SLA and escalation, and is released. Every transition is recorded in the audit trail.
      </desc>
      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#8a877f" />
        </marker>
      </defs>
      {edges.map(([a, b]) => (
        <path key={a + b} d={curve(a, b)} fill="none" stroke="#8a877f" strokeWidth="1.25" markerEnd="url(#arrow)" />
      ))}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x} y={n.y} width={W} height={H} rx="6" fill="#121212" stroke="rgb(255 255 255 / 0.22)" />
          <text x={n.x + W / 2} y={n.y + H / 2 + 5} textAnchor="middle" fill="#f2efe8" className="font-mono text-[13px]">
            {n.label}
          </text>
        </g>
      ))}
      {notes.map((t) => (
        <text key={t.text} x={t.x} y={t.y} textAnchor="middle" fill="#a8a59d" className="font-mono text-[11px]">
          {t.text}
        </text>
      ))}
    </svg>

    {/* Small screens: the same flow, top to bottom */}
    <ol className="space-y-0 border-l border-line-strong pl-5 md:hidden" aria-label="Example workflow">
      {steps.map(([label, note]) => (
        <li key={label} className="relative pb-5 last:pb-0">
          <span aria-hidden="true" className="absolute -left-[1.6rem] top-2 size-2 rounded-full bg-fg/60" />
          <span className="font-mono text-sm">{label}</span>
          {note && <span className="block text-sm text-muted">{note}</span>}
        </li>
      ))}
    </ol>

    <p className="sr-only">
      The example flow: Draft, then Submitted once a precondition passes, then QA review and Prod review in parallel
      (either can be delegated), then Approved within an SLA that escalates if late, then Released.
    </p>
    <figcaption className="mt-6 text-sm leading-relaxed text-muted">
      How the engine thinks, roughly. Every arrow above is a transition with rules attached, and every transition is
      written to the audit trail: who, what, when. <span className="text-dim">(Illustrative — not a real process.)</span>
    </figcaption>
  </figure>
);

export default WorkflowDiagram;
