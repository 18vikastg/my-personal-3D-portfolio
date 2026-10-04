import { FiArrowUp } from "react-icons/fi";
import { profile, socials, silentStories } from "../data/site";

const links = [
  { label: "GitHub", href: socials.github },
  { label: "LinkedIn", href: socials.linkedin },
  { label: "X", href: socials.x },
  { label: "Instagram", href: socials.instagram },
  { label: "Silent Stories", href: silentStories.url },
];

const Footer = () => (
  <footer className="border-t border-line">
    <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-lg font-medium tracking-tight">{profile.name}</p>
        <p className="mt-1 max-w-sm text-sm text-muted">
          Designed and built by me with React, GSAP, Tailwind and an unreasonable amount of filter coffee.
        </p>
      </div>
      <nav aria-label="Social">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline text-muted hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
        <a href="#top" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          Back to top <FiArrowUp aria-hidden="true" />
        </a>
        <p className="font-mono text-xs text-dim">© {new Date().getFullYear()} · Bengaluru</p>
      </div>
    </div>
  </footer>
);

export default Footer;
