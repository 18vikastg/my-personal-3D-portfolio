import { tickerFacts } from "../data/site";

/** Rolling strip of verifiable facts. The duplicate copy exists only for the loop. */
const Ticker = () => {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {tickerFacts.map((fact) => (
        <li key={fact} className="flex items-center gap-8 pr-8 text-lg font-medium tracking-tight md:text-2xl">
          {fact}
          <span className="text-ink/40" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Quick facts" className="overflow-hidden py-3">
      <div className="ticker -mx-4 -rotate-1 overflow-hidden bg-lime py-4 text-ink md:py-5">
        <div className="ticker-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
};

export default Ticker;
