import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { currently, profile, silentStories, socials } from "../../data/site";
import { ContactForm } from "../../sections/Contact";
import { A } from "../A";

/** Signals (what I'm thinking about next) and the end of the studio. */
const Ending = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <>
      <section className="contents" aria-labelledby="studio-now">
        <A k="signals:title" className="sign" width={[560, 420]}>
          <p className="kicker">Currently</p>
          <h2 id="studio-now" className="mt-2 text-[52px] font-medium leading-none tracking-[-0.03em]">
            Thinking about
          </h2>
        </A>
        <ul className="contents">
          {currently.map((c, i) => (
            <A key={c} k={`signals:item-${i}`} as="li" className="tag !text-[18px] !whitespace-normal" width={320}>
              {c}
            </A>
          ))}
        </ul>
      </section>

      <section className="contents" aria-labelledby="studio-contact">
        <A k="contact:sign" className="sign text-center" width={[1000, 640]}>
          <p aria-hidden="true" className="text-[120px] font-medium leading-none tracking-[-0.03em]">
            Let’s <span className="serif-accent text-lime">build.</span>
          </p>
        </A>
        <A k="contact:main" className="placard" width={520}>
          <p className="kicker">Contact</p>
          <h2 id="studio-contact" className="mt-2 text-[38px] font-medium leading-[1.05] tracking-[-0.03em]">
            Building something <span className="serif-accent text-lime">interesting?</span>
          </h2>
          <p className="mt-3 text-fg/85">
            I’m open to software engineering roles — in Bengaluru or abroad — and always up for talking about products,
            workflow systems or a weird idea you can’t stop thinking about.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a href={`mailto:${profile.email}`} className="text-[22px] font-medium underline-offset-4 hover:underline">
              {profile.email}
            </a>
            <button type="button" onClick={copy} aria-label={copied ? "Email address copied" : "Copy email address"} className="grid size-9 place-items-center rounded-full border border-line-strong text-muted hover:text-fg">
              {copied ? <FiCheck className="text-lime" aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2">
              <FiLinkedin aria-hidden="true" /> LinkedIn
            </a>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2">
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost !py-2">
              Résumé <FiArrowUpRight aria-hidden="true" />
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (personal)" className="grid size-10 place-items-center rounded-full text-muted hover:text-fg">
              <FiInstagram aria-hidden="true" />
            </a>
          </div>
          <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-[13px] text-muted">
            <span>© {new Date().getFullYear()} {profile.name} · designed and built by me</span>
            <span className="flex gap-3">
              <a href={socials.x} target="_blank" rel="noopener noreferrer" className="hover:text-fg">X</a>
              <a href={silentStories.url} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Silent Stories</a>
              <a href="https://github.com/18vikastg/my-personal-3D-portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-fg">Source</a>
            </span>
          </footer>
        </A>
        <A k="contact:form" className="placard" width={460}>
          <p className="kicker">Or write here</p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </A>
      </section>
    </>
  );
};

export default Ending;
