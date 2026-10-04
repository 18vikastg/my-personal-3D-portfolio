import { useRef } from "react";
import { FiArrowDown, FiArrowUpRight, FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion";
import { profile, socials } from "../data/site";

const links = [
  { href: socials.github, label: "GitHub", Icon: FiGithub },
  { href: socials.linkedin, label: "LinkedIn", Icon: FiLinkedin },
  { href: `mailto:${profile.email}`, label: "Email", Icon: FiMail },
  { href: socials.instagram, label: "Instagram (personal)", Icon: FiInstagram },
];

const facts = [
  ["Now", `${profile.role}, ${profile.company}`],
  ["Before", "Full-stack intern, Arcolab"],
  ["Studied", "B.E. CSE, JSSATE ’26"],
  ["Based in", `${profile.location} · ${profile.relocation.toLowerCase()}`],
];

const Hero = () => {
  const scope = useRef(null);

  // One quiet entrance, then the page stays still
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-hero]", { autoAlpha: 0, y: 12, duration: 0.8, ease: "power2.out", stagger: 0.06 });
    },
    { scope }
  );

  return (
    <section id="top" ref={scope} aria-labelledby="hero-title" className="pt-24 md:pt-32 lg:pt-40">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="md:col-span-8">
            <div data-hero className="flex items-center gap-4">
              <img
                src="/work/vikas.webp"
                alt=""
                width="56"
                height="70"
                className="size-14 rounded-full object-cover object-[50%_20%] md:hidden"
              />
              <p className="leading-snug">
                <span className="block text-lg font-medium">{profile.name}</span>
                <span className="block text-muted">Software Engineer · Product Builder · Creator</span>
              </p>
            </div>

            <h1 id="hero-title" data-hero className="display mt-8 text-[clamp(2.6rem,7vw,6.25rem)] md:mt-10">
              <span className="sr-only">Vikas T G, software engineer. </span>I build software people{" "}
              <span className="serif-accent text-lime">actually</span> use.
            </h1>

            <p data-hero className="mt-6 max-w-[38rem] text-lg leading-relaxed text-muted md:mt-8 md:text-xl">
              I’m a software engineer at Pivot Path in Bengaluru. I built a workflow automation product from an empty
              repo; it now runs in production for <span className="text-fg">3,000+ people</span> across pharmaceutical
              and medicine-manufacturing companies. Outside work: AI tools, a storefront for my family’s spice kitchen,
              and the occasional short film.
            </p>

            <div data-hero className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <a href="#work" className="btn btn-primary">
                See the work <FiArrowDown aria-hidden="true" />
              </a>
              <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost">
                Résumé <FiArrowUpRight aria-hidden="true" />
              </a>
              <ul className="flex items-center sm:ml-2" aria-label="Elsewhere">
                {links.map(({ href, label, Icon }) => {
                  const external = href.startsWith("http");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-fg"
                      >
                        <Icon className="size-[1.15rem]" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <figure data-hero className="hidden md:col-span-4 md:block lg:col-span-3 lg:col-start-10">
            <img
              src="/work/vikas.webp"
              alt="Portrait of Vikas T G"
              width="560"
              height="700"
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-md object-cover"
            />
            <figcaption className="mt-3 font-mono text-xs leading-relaxed text-dim">
              Usually turning filter coffee into TypeScript.
            </figcaption>
          </figure>
        </div>

        {/* Static facts — the calm hand-off into the work */}
        <dl data-hero className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line py-6 text-sm md:mt-24 lg:grid-cols-4">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1.5 text-fg/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
