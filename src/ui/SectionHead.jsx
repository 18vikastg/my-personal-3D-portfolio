/**
 * Numbered chapter heading used by every section: `02 — Experience`, then a
 * large title. `tone="paper"` flips colours for light sections.
 */
const SectionHead = ({ index, label, title, intro, tone = "ink", id }) => {
  const muted = tone === "paper" ? "text-paper-muted" : "text-muted";
  const rule = tone === "paper" ? "bg-paper-ink/15" : "bg-line";

  return (
    <header className="mb-12 md:mb-20">
      <div data-reveal="fade" className={`flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] ${muted}`}>
        <span>{index}</span>
        <span className={`h-px w-10 ${rule}`} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <h2 id={id} data-reveal className="display mt-6 max-w-[18ch] text-[clamp(2.5rem,7vw,6rem)]">
        {title}
      </h2>
      {intro && (
        <p data-reveal className={`mt-6 max-w-xl text-lg leading-relaxed ${muted}`}>
          {intro}
        </p>
      )}
    </header>
  );
};

export default SectionHead;
