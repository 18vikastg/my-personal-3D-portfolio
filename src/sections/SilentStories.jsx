import { useRef } from "react";
import { FiArrowUpRight, FiInstagram, FiPlay } from "react-icons/fi";
import { gsap, useGSAP, useReveal, prefersReducedMotion } from "../lib/motion";
import { sides, silentStories as ss } from "../data/site";

const { film } = ss;
const filmName = film.title.join("");

/**
 * Chapter 07 — the creative side, discovered rather than announced:
 * Outside the IDE → Silent Stories → ANTARDRISHTI → watch → explore.
 * Palette follows the official artwork: black, warm cream, deep red.
 */
const SilentStories = () => {
  const scope = useRef(null);
  useReveal(scope);

  // The poster opens like a letterbox as it scrolls into view
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-poster]",
        { clipPath: "inset(40% 0% 40% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: "[data-poster]", start: "top 95%", end: "top 45%", scrub: 0.6 },
        }
      );
    },
    { scope }
  );

  return (
    <section id="silent-stories" ref={scope} aria-labelledby="ss-chapter" className="relative bg-black text-ss-cream">
      {/* Ink → black: the mood shift */}
      <div aria-hidden="true" className="h-32 bg-gradient-to-b from-ink to-black md:h-48" />

      <div className="shell">
        {/* Outside the IDE */}
        <p data-reveal="fade" className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span>07</span>
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          <span>Outside the IDE</span>
        </p>
        <h2 id="ss-chapter" data-reveal className="display mt-6 max-w-[17ch] text-[clamp(2.5rem,7vw,6rem)] text-fg">
          Code is one way I build things. <span className="serif-accent text-ss-cream">Stories are another.</span>
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-16 md:grid-cols-4">
          {sides.map((s) => {
            const here = s.href === "#silent-stories";
            return (
              <li key={s.role} data-reveal className="bg-black">
                <a
                  href={s.href}
                  aria-current={here ? "location" : undefined}
                  className={`block h-full p-5 transition-colors md:p-6 ${here ? "" : "hover:bg-fg/[0.03]"}`}
                >
                  <span className={`block text-lg font-medium tracking-tight md:text-xl ${here ? "text-ss-red" : "text-fg"}`}>
                    {s.role}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{s.does}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Silent Stories — the identity */}
        <div className="mt-24 grid items-center gap-10 md:mt-32 md:grid-cols-12">
          <div data-reveal className="md:col-span-4 lg:col-span-3">
            <img
              src={ss.logo}
              alt="Silent Stories logo — Exploring the unexplored"
              width="440"
              height="440"
              loading="lazy"
              className="mx-auto w-48 rounded-full md:w-full md:max-w-[15rem]"
            />
          </div>
          <div className="md:col-span-8 lg:col-start-5">
            <h3 data-reveal className="font-ss text-[clamp(2.1rem,5vw,4rem)] font-extralight uppercase leading-none tracking-[0.3em]">
              {ss.name}
            </h3>
            <p data-reveal className="mt-5 flex items-center gap-3 font-serif text-xl tracking-[0.06em] text-ss-cream/80 md:text-2xl">
              <span className="size-1.5 shrink-0 rounded-full bg-ss-red" aria-hidden="true" />
              {ss.tagline}
            </p>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              A creative space where I explore filmmaking, visual storytelling and ideas beyond software. Same instincts as
              engineering — framing, pacing, cutting whatever doesn’t serve the story — in a different medium.
            </p>
            <p data-reveal className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-dim">
              {ss.descriptor}
            </p>
          </div>
        </div>

        {/* The film */}
        <article aria-labelledby="film-title" className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-12 lg:gap-16">
          <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-ss-red-deep/40 blur-[90px]" />
            <a
              href={film.url}
              target="_blank"
              rel="noopener noreferrer"
              data-poster
              aria-label={`Watch ${filmName}: ${film.subtitle} on Instagram`}
              className="group relative block overflow-hidden rounded-sm ring-1 ring-ss-cream/10"
            >
              <img
                src={film.poster}
                alt={`Poster for ${filmName}: ${film.subtitle}. A profile lit in red beside the words “I was searching outside. The answer was within.” Written and directed by Vikas T G. A Silent Stories film.`}
                width="760"
                height="1076"
                loading="lazy"
                className="w-full transition-transform duration-[1.4s] ease-(--ease-out-expo) group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 grid place-items-center transition-colors duration-500 group-hover:bg-black/30">
                <span className="grid size-16 scale-90 place-items-center rounded-full bg-ss-red-deep text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <FiPlay className="ml-0.5 size-6" aria-hidden="true" />
                </span>
              </span>
            </a>
          </figure>

          <div className="flex min-w-0 flex-col justify-center lg:col-span-7">
            <p data-reveal className="font-ss text-xs font-light uppercase tracking-[0.45em] text-ss-red">
              A Silent Stories film
            </p>
            <h3
              id="film-title"
              data-reveal
              aria-label={`${filmName} — ${film.subtitle}`}
              className="mt-6 font-ss text-[clamp(2.1rem,6.4vw,5.25rem)] font-extralight leading-none tracking-[0.24em]"
            >
              {film.title[0]}
              <span className="text-ss-red">{film.title[1]}</span>
            </h3>
            <p
              data-reveal
              aria-hidden="true"
              className="mt-5 flex items-center gap-4 font-ss text-sm font-light uppercase tracking-[0.5em] text-ss-cream/80"
            >
              <span className="h-px w-10 shrink-0 bg-ss-red" />
              {film.subtitle}
            </p>

            <blockquote data-reveal className="mt-10 border-l border-ss-red/60 pl-6">
              {film.logline.map((l) => (
                <p key={l} className="font-serif text-2xl leading-snug md:text-3xl">
                  {l}
                </p>
              ))}
              <p className="mt-4 font-serif text-2xl italic text-ss-red md:text-3xl">{film.question}</p>
            </blockquote>
            <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-ss-cream/75">
              {film.about}
            </p>

            <div data-reveal className="mt-8 max-w-xl rounded-2xl border border-ss-cream/10 p-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-dim">
                Inspired by {film.inspiration.source}
              </p>
              <p className="mt-2 leading-relaxed text-ss-cream/85">{film.inspiration.idea}</p>
            </div>

            <dl data-reveal className="mt-8 grid gap-x-8 gap-y-4 font-mono text-xs sm:grid-cols-3">
              {film.credits.map((c) => (
                <div key={c.role}>
                  <dt className="uppercase tracking-[0.16em] text-dim">{c.role}</dt>
                  <dd className="mt-1.5 break-words text-ss-cream">{c.name}</dd>
                </div>
              ))}
            </dl>

            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <a
                href={film.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-ss-red-deep !px-6 !py-3.5 text-white hover:bg-ss-cream hover:text-black"
              >
                <FiPlay aria-hidden="true" /> Watch {filmName}
              </a>
              <a
                href={ss.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-ss-cream/30 !px-6 !py-3.5 text-ss-cream hover:border-ss-cream hover:bg-ss-cream hover:text-black"
              >
                <FiInstagram aria-hidden="true" /> Explore Silent Stories <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </div>

      {/* ...and back to ink */}
      <div aria-hidden="true" className="mt-24 h-24 bg-gradient-to-b from-black to-ink md:mt-32 md:h-32" />
    </section>
  );
};

export default SilentStories;
