import { FiArrowUpRight, FiInstagram, FiPlay } from "react-icons/fi";
import { sides, silentStories as ss } from "../../data/site";
import { A } from "../A";
import { useStudioNav } from "../nav";

const { film } = ss;
const filmName = film.title.join("");

/**
 * Outside the IDE → Silent Stories. The corridor's walls carry the turn;
 * past the noren, the screening room: brand on the side wall, the film's
 * title and words either side of the screen.
 */
const Cinema = () => {
  const { go } = useStudioNav();
  const sideKey = { "#experience": "engineering:0", "#work": "gallery:0", "#proof": "archive:0", "#silent-stories": "cinema:0" };
  return (
    <section className="contents" aria-labelledby="studio-outside">
      <A k="threshold:title" className="sign" width={[760, 480]}>
        <p className="kicker">Outside the IDE</p>
        <h2 id="studio-outside" className="mt-3 text-[64px] font-medium leading-[1.02] tracking-[-0.03em]">
          Code is one way I build things. <span className="serif-accent text-ss-cream">Stories are another.</span>
        </h2>
      </A>
      <A k="threshold:sides" className="sign" width={[560, 440]}>
        <ul className="space-y-5">
          {sides.map((s) => {
            const here = s.href === "#silent-stories";
            return (
              <li key={s.role}>
                <button type="button" onClick={() => go(sideKey[s.href])} className="text-left">
                  <span className={`block text-[30px] font-medium ${here ? "text-ss-red" : ""}`}>{s.role}</span>
                  <span className="block text-[18px] text-muted">{s.does}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </A>
      <A k="threshold:caption" className="sign" width={380}>
        <p className="text-[17px] leading-relaxed text-dim">
          A <span className="text-ss-cream/80">noren</span> is the split curtain hung in a Japanese doorway. Walk through it.
        </p>
      </A>

      <article className="contents" aria-labelledby="studio-ss">
        <A k="cinema:brand" className="placard !border-ss-cream/15 !bg-black/90" width={460}>
          <img src={ss.logo} alt="Silent Stories logo — Exploring the unexplored" width="140" height="140" className="rounded-full" />
          <h2 id="studio-ss" className="mt-5 font-ss text-[40px] font-extralight uppercase leading-none tracking-[0.3em] text-ss-cream">
            {ss.name}
          </h2>
          <p className="mt-3 font-serif text-[22px] text-ss-cream/80">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-ss-red align-middle" aria-hidden="true" />
            {ss.tagline}
          </p>
          <p className="mt-4 text-[16px] text-muted">
            A creative space where I explore filmmaking, visual storytelling and ideas beyond software. Same instincts as
            engineering — framing, pacing, cutting whatever doesn’t serve the story — in a different medium.
          </p>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-dim">{ss.descriptor}</p>
        </A>
        <A k="cinema:title" className="sign text-right" width={[520, 440]}>
          <p className="font-ss text-[13px] font-light uppercase tracking-[0.45em] text-ss-red">A Silent Stories film</p>
          <h3 aria-label={`${filmName} — ${film.subtitle}`} className="mt-3 font-ss text-[54px] font-extralight leading-none tracking-[0.2em] text-ss-cream">
            {film.title[0]}
            <span className="text-ss-red">{film.title[1]}</span>
          </h3>
          <p aria-hidden="true" className="mt-3 font-ss text-[14px] font-light uppercase tracking-[0.45em] text-ss-cream/80">
            {film.subtitle}
          </p>
        </A>
        <A k="cinema:film" className="placard !border-ss-cream/15 !bg-black/90 text-ss-cream" width={400}>
          <blockquote className="border-l border-ss-red/60 pl-4">
            {film.logline.map((l) => (
              <p key={l} className="font-serif text-[22px] leading-snug">
                {l}
              </p>
            ))}
            <p className="mt-2 font-serif text-[22px] italic text-ss-red">{film.question}</p>
          </blockquote>
          <p className="mt-4 text-[15px] text-ss-cream/75">{film.about}</p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">Inspired by {film.inspiration.source}</p>
          <p className="mt-1 text-[14px] text-ss-cream/80">{film.inspiration.idea}</p>
          {film.credits.map((c) => (
            <p key={c.role} className="mt-4 font-mono text-[12px]">
              <span className="uppercase tracking-[0.14em] text-dim">{c.role}</span> <span className="ml-1">{c.name}</span>
            </p>
          ))}
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={film.url} target="_blank" rel="noopener noreferrer" className="btn bg-ss-red-deep text-white hover:bg-ss-cream hover:text-black">
              <FiPlay aria-hidden="true" /> Watch {filmName}
            </a>
            <a href={ss.url} target="_blank" rel="noopener noreferrer" className="btn border border-ss-cream/30 text-ss-cream hover:bg-ss-cream hover:text-black">
              <FiInstagram aria-hidden="true" /> Explore Silent Stories <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </A>
      </article>
    </section>
  );
};

export default Cinema;
