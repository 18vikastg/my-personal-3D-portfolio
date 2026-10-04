/**
 * The preview inside a project case study: a real screenshot in a browser
 * frame, or — for projects without a hosted demo — a small, clearly labelled
 * UI sketch drawn in markup.
 */

const Bar = ({ w, className = "" }) => (
  <span className={`block h-2 rounded-full bg-fg/15 ${className}`} style={{ width: w }} />
);

const QueueSketch = ({ accent }) => {
  const rows = [
    { token: "A-07", level: "Emergency", pos: "Now", hot: true },
    { token: "B-12", level: "High", pos: "2" },
    { token: "A-03", level: "Normal", pos: "3" },
    { token: "C-21", level: "Normal", pos: "4" },
    { token: "B-15", level: "Normal", pos: "5" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
        <span>OPD · live queue</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full" style={{ background: accent }} /> socket connected
        </span>
      </div>
      <ol className="flex flex-1 flex-col gap-2">
        {rows.map((r) => (
          <li
            key={r.token}
            className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${
              r.hot ? "border-transparent text-ink" : "border-line bg-ink/40"
            }`}
            style={r.hot ? { background: accent } : undefined}
          >
            <span className="font-mono text-sm font-semibold whitespace-nowrap">{r.token}</span>
            <Bar w="38%" className={r.hot ? "!bg-ink/25" : ""} />
            <span
              className={`ml-auto rounded-full px-2 py-0.5 font-mono text-[0.65rem] ${
                r.hot ? "bg-ink/15" : "border border-line text-muted"
              }`}
            >
              {r.level}
            </span>
            <span className="w-8 text-right font-mono text-xs">{r.pos}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const InboxSketch = ({ accent }) => {
  const mails = [
    { tag: "Interested", w: "62%" },
    { tag: "Meeting booked", w: "48%" },
    { tag: "Out of office", w: "55%" },
    { tag: "Not interested", w: "40%" },
    { tag: "Spam", w: "52%" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-5 md:p-8">
      <div className="flex items-center gap-2 rounded-xl border border-line bg-ink/40 px-4 py-2.5 font-mono text-xs text-muted">
        <span aria-hidden="true">⌕</span> search across 2 inboxes
        <span className="ml-auto rounded border border-line px-1.5 py-0.5 text-[0.6rem]">FTS</span>
      </div>
      <ul className="flex flex-1 flex-col gap-2">
        {mails.map((m, i) => (
          <li key={m.tag} className="flex items-center gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3">
            <span className="size-7 shrink-0 rounded-full bg-fg/10" />
            <span className="flex flex-1 flex-col gap-1.5">
              <Bar w={m.w} className={i === 0 ? "!bg-fg/40" : ""} />
              <Bar w="80%" className="!bg-fg/[0.07]" />
            </span>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[0.65rem] whitespace-nowrap"
              style={i === 0 ? { background: accent, color: "#0a0a0a" } : { border: "1px solid rgb(255 255 255 / 0.12)", color: "#a8a59d" }}
            >
              {m.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProjectVisual = ({ project }) => {
  const { visual, accent, links } = project;
  const host = links.live
    ? new URL(links.live).host
    : new URL(links.github).pathname.split("/").filter(Boolean).slice(0, 2).join("/");

  return (
    <div className="group/visual relative">
      {/* Accent glow that blooms on hover */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[3rem] opacity-0 blur-3xl md:-inset-6 transition-opacity duration-700 group-hover/visual:opacity-25"
        style={{ background: accent }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 md:rounded-3xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
          </span>
          <span className="mx-auto truncate rounded-md bg-fg/5 px-3 py-1 font-mono text-[0.68rem] text-dim">{host}</span>
          {visual.kind !== "image" && (
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-dim">sketch</span>
          )}
        </div>
        <div className={`overflow-hidden ${visual.kind === "image" ? "aspect-[16/10]" : "sm:aspect-[16/10]"}`}>
          {visual.kind === "image" ? (
            <img
              src={visual.src}
              alt={visual.alt}
              loading="lazy"
              decoding="async"
              width="1200"
              height="750"
              className="size-full object-cover object-top transition-transform duration-[1.2s] ease-(--ease-out-expo) group-hover/visual:scale-[1.03]"
            />
          ) : (
            <div role="img" aria-label={`Illustrative sketch of the ${project.title} interface`} className="size-full">
              {visual.kind === "queue" ? <QueueSketch accent={accent} /> : <InboxSketch accent={accent} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectVisual;
