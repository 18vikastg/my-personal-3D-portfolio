/**
 * Section heading: a small label, then the title. `tone="paper"` flips
 * colours for the light section.
 */
const SectionHead = ({ label, title, intro, tone = "ink", id }) => {
  const muted = tone === "paper" ? "text-paper-muted" : "text-muted";

  return (
    <header className="mb-12 md:mb-16">
      <p data-reveal className={`eyebrow ${tone === "paper" ? "!text-paper-muted" : ""}`}>
        {label}
      </p>
      <h2 id={id} data-reveal data-split className="display mt-4 max-w-[20ch] text-[clamp(2rem,4.6vw,3.75rem)]">
        {title}
      </h2>
      {intro && (
        <p data-reveal className={`mt-5 max-w-[36rem] text-lg leading-relaxed ${muted}`}>
          {intro}
        </p>
      )}
    </header>
  );
};

export default SectionHead;
