import { FiArrowUpRight, FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { profile, socials } from "../../data/site";
import { A } from "../A";
import { useStudioNav } from "../nav";

const links = [
  { href: socials.github, label: "GitHub", Icon: FiGithub },
  { href: socials.linkedin, label: "LinkedIn", Icon: FiLinkedin },
  { href: `mailto:${profile.email}`, label: "Email", Icon: FiMail },
  { href: socials.instagram, label: "Instagram (personal)", Icon: FiInstagram },
];

/** The façade: name and headline are lettered on the wall; the way in is on a placard. */
const Entrance = () => {
  const { go } = useStudioNav();
  return (
    <section className="contents" aria-labelledby="studio-h1">
      <A k="entrance:name" className="sign" width={[1100, 860]}>
        <p className="text-[132px] font-medium leading-none tracking-[0.06em]">VIKAS T G</p>
        <p className="mt-6 text-[34px] tracking-[0.02em] text-muted">Software Engineer · Product Builder · Creator</p>
      </A>
      <A k="entrance:headline" className="sign" width={[1100, 600]}>
        <h1 id="studio-h1" className="text-[96px] font-medium leading-[1.0] tracking-[-0.035em]">
          <span className="sr-only">Vikas T G, software engineer. </span>I build software people{" "}
          <span className="serif-accent text-lime">actually</span> use.
        </h1>
      </A>
      <A k="entrance:intro" className="placard" width={460}>
        <p className="text-[18px] leading-relaxed text-fg/85">
          I’m a software engineer at Pivot Path in Bengaluru. I built a workflow automation product from an empty repo;
          it now runs in production for <span className="text-fg">3,000+ people</span> across pharmaceutical and
          medicine-manufacturing companies. Outside work: AI tools, a storefront for my family’s spice kitchen, and the
          occasional short film.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => go("gallery:0")} className="btn btn-primary">
            Walk through the work →
          </button>
          <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost">
            Résumé <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-4 flex gap-1" aria-label="Elsewhere">
          {links.map(({ href, label, Icon }) => {
            const ext = href.startsWith("http");
            return (
              <li key={label}>
                <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} aria-label={label} className="grid size-10 place-items-center rounded-full text-muted hover:text-fg">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </A>
      <A k="entrance:facts" className="placard" width={330}>
        <dl className="grid gap-4 text-[16px]">
          {[
            ["Now", `${profile.role}, ${profile.company}`],
            ["Before", "Full-stack intern, Arcolab"],
            ["Studied", "B.E. CSE, JSSATE ’26"],
            ["Based in", `${profile.location} · ${profile.relocation.toLowerCase()}`],
          ].map(([k, val]) => (
            <div key={k}>
              <dt className="kicker">{k}</dt>
              <dd className="mt-1">{val}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 font-mono text-[13px] text-dim">Usually turning filter coffee into TypeScript.</p>
      </A>
    </section>
  );
};

export default Entrance;
