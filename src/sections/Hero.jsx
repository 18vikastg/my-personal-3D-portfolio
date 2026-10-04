import { useRef } from "react";
import { FiArrowDown, FiArrowUpRight, FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion";
import { profile, socials } from "../data/site";
import MagneticLink from "../ui/MagneticLink";

const ring = "BUILDS THINGS • SOFTWARE ENGINEER • ";

const SpinBadge = () => (
  <a
    href="#work"
    aria-label="Scroll to selected work"
    className="group absolute -bottom-8 -left-8 grid size-28 place-items-center rounded-full bg-lime text-ink shadow-[0_10px_40px_-10px_rgb(212_255_58/0.6)] md:-left-10 md:size-32"
  >
    <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-ink font-mono text-[8.4px] font-medium tracking-[0.12em]">
        <textPath href="#ring">{ring}</textPath>
      </text>
    </svg>
    <FiArrowDown className="size-6 transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
  </a>
);

const Hero = () => {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
      tl.from("[data-line] > span", { yPercent: 110, stagger: 0.09 })
        .from("[data-hero-fade]", { autoAlpha: 0, y: 16, stagger: 0.07, duration: 0.9 }, "-=0.9")
        .from("[data-portrait]", { autoAlpha: 0, scale: 0.94, duration: 1.4 }, "<")
        .from("[data-wordmark] > span", { yPercent: 100, stagger: 0.04, duration: 1.4 }, "-=1.1");
    },
    { scope }
  );

  return (
    <section id="top" ref={scope} aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Soft lime glow behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 size-[38rem] rounded-full bg-lime/10 blur-[120px]"
      />

      <div className="shell relative">
        <p data-hero-fade className="inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-muted">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="ping-soft absolute inline-flex size-full rounded-full bg-lime" />
            <span className="relative inline-flex size-2 rounded-full bg-lime" />
          </span>
          {profile.role} at {profile.company} · {profile.location}
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h1 id="hero-title" className="display text-[clamp(3rem,9.2vw,8.75rem)]">
              <span className="sr-only">Vikas T G, software engineer. </span>
              <span data-line className="block overflow-hidden pb-[0.06em]">
                <span className="block">I build software</span>
              </span>
              <span data-line className="block overflow-hidden pb-[0.08em]">
                <span className="block">
                  people <span className="serif-accent text-lime">actually</span> use.
                </span>
              </span>
            </h1>

            <p data-hero-fade className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              I’m Vikas — a software engineer at Pivot Path. I built a workflow automation product from scratch that
              now runs in production for <span className="text-fg">3,000+ people</span> across pharmaceutical
              and medicine-manufacturing companies. Off the clock: AI tools, a storefront for my family’s spice
              kitchen, and experiments I can’t stop thinking about.
            </p>

            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticLink href="#work" className="btn btn-primary !px-6 !py-3.5">
                See the work <FiArrowDown aria-hidden="true" />
              </MagneticLink>
              <MagneticLink href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost !px-6 !py-3.5">
                Résumé <FiArrowUpRight aria-hidden="true" />
              </MagneticLink>
              <div className="ml-1 flex items-center gap-1">
                {[
                  { href: socials.github, label: "GitHub", Icon: FiGithub },
                  { href: socials.linkedin, label: "LinkedIn", Icon: FiLinkedin },
                  { href: `mailto:${profile.email}`, label: "Email", Icon: FiMail },
                  { href: socials.instagram, label: "Instagram (personal)", Icon: FiInstagram },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-xs lg:col-span-4 lg:mx-0 lg:ml-auto lg:mt-4">
            <figure data-portrait className="group relative">
              <div className="overflow-hidden rounded-[2rem] border border-line bg-ink-2">
                <img
                  src="/work/vikas.webp"
                  alt="Portrait of Vikas T G"
                  width="560"
                  height="700"
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </div>
              <figcaption className="absolute -right-3 top-6 rotate-3 rounded-xl border border-line bg-ink/90 px-3 py-2 font-mono text-[0.7rem] leading-snug text-muted backdrop-blur md:-right-6">
                <span className="text-lime">now:</span> turning filter
                <br />
                coffee into TypeScript
              </figcaption>
              <SpinBadge />
            </figure>
          </div>
        </div>

        <dl data-hero-fade className="mt-24 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 font-mono text-xs md:mt-28 md:grid-cols-4">
          {[
            ["Role", `${profile.role}, ${profile.company}`],
            ["Before", "Full-stack intern, Arcolab"],
            ["Degree", "B.E. CSE, JSSATE ’26"],
            ["Based in", `${profile.location} — ${profile.relocation.toLowerCase()}`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="uppercase tracking-[0.18em] text-dim">{k}</dt>
              <dd className="mt-1.5 text-fg/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Full-bleed wordmark */}
      <p
        data-wordmark
        aria-hidden="true"
        className="mb-8 mt-10 flex select-none md:mb-12 justify-center overflow-hidden whitespace-nowrap text-[clamp(4.5rem,21vw,22rem)] font-semibold leading-[0.78] tracking-[-0.07em] text-fg"
      >
        {"Vikas T G".split("").map((c, i) => (
          <span key={i} className="inline-block">
            {c === " " ? " " : c}
          </span>
        ))}
      </p>
    </section>
  );
};

export default Hero;
