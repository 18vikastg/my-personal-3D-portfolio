import { FiArrowUpRight } from "react-icons/fi";
import { projects } from "../../data/projects";
import { socials } from "../../data/site";
import { A } from "../A";

const P = Object.fromEntries(projects.map((p) => [p.slug, p]));

const Links = ({ p }) => (
  <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[16px]">
    {p.links.live && (
      <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="studio-link inline-flex items-center gap-1">
        Visit live <FiArrowUpRight aria-hidden="true" />
        <span className="sr-only"> — {p.title}</span>
      </a>
    )}
    {p.links.github && (
      <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">
        Source on GitHub <FiArrowUpRight aria-hidden="true" />
        <span className="sr-only"> — {p.title}</span>
      </a>
    )}
  </p>
);

const Notes = ({ p }) => (
  <>
    <p className="kicker">How it’s built</p>
    <ul className="mt-2 space-y-2 text-[15px] text-fg/85">
      {p.engineering.map((n) => (
        <li key={n} className="flex gap-2">
          <span aria-hidden="true" className="text-dim">–</span>
          {n}
        </li>
      ))}
    </ul>
    <p className="kicker mt-5">Why it matters</p>
    <p className="mt-1 text-[15px] text-fg/85">{p.shows}</p>
    <p className="mt-4 font-mono text-[12px] text-dim">{p.stack.join(" · ")}</p>
    <Links p={p} />
  </>
);

/** A title lettered onto the installation itself. */
const Title = ({ k, p, width = [900, 520], light }) => (
  <A k={k} className="sign text-center" width={width}>
    <p className="kicker">{p.kind}</p>
    <h3 className={`mt-2 text-[64px] font-medium leading-none tracking-[-0.03em] ${light ? "text-[#f6e7c8]" : ""}`}>{p.title}</h3>
    <p className="mt-3 text-[24px] text-muted">{p.tagline}</p>
  </A>
);

const Problem = ({ k, p, width = 380 }) => (
  <A k={k} className="placard" width={width}>
    <p className="kicker">The problem</p>
    <p className="mt-2">{p.problem}</p>
  </A>
);

/**
 * The gallery: every project is an installation in the hall. Its words are
 * placed on and around the installation — the title on it, the problem by
 * the thing that caused it, the build by the thing that solves it.
 */
const Gallery = () => {
  const sw = P["swanand-spices"];
  const pl = P.preplink;
  const iv = P["mock-interview"];
  const hq = P["health-queue"];
  const ob = P.onebox;
  return (
    <section className="contents" aria-labelledby="studio-work">
      <A k="gallery:title" className="sign text-center" width={[900, 520]}>
        <p className="kicker">Selected work</p>
        <h2 id="studio-work" className="mt-3 text-[72px] font-medium leading-none tracking-[-0.035em]">
          Things I’ve built, and <span className="serif-accent">why.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[640px] text-[22px] text-muted">
          Each one is an installation in this hall. Walk past them; the words are where the work is.
        </p>
      </A>

      {/* Swanand Spices — the stall */}
      <article className="contents" aria-label={sw.title}>
        <Title k="swanand:title" p={sw} light />
        <Problem k="swanand:problem" p={sw} />
        <A k="swanand:built" className="sign text-center" width={[1000, 620]}>
          <p className="kicker !text-[#f6e7c8]/70">What I built</p>
          <p className="mt-2 text-[28px] leading-snug text-[#f6e7c8]">{sw.built}</p>
        </A>
        <A k="swanand:eng" className="placard" width={420}>
          <Notes p={sw} />
        </A>
      </article>

      {/* PrepLink — the command centre */}
      <article className="contents" aria-label={pl.title}>
        <Title k="preplink:title" p={pl} />
        <Problem k="preplink:problem" p={pl} />
        {[
          ["students", "Students · CGPA & applications"],
          ["faculty", "Faculty"],
          ["recruiters", "Recruiters"],
          ["admins", "Admins"],
        ].map(([key, text]) => (
          <A key={key} k={`preplink:role-${key}`} className="tag">
            {text}
          </A>
        ))}
        <A k="preplink:built" className="placard" width={460}>
          <p className="kicker">What I built</p>
          <p className="mt-2">{pl.built}</p>
          <p className="mt-3 font-mono text-[12px] text-dim">Eligibility gate → jobs → one application, tracked</p>
        </A>
        <A k="preplink:eng" className="placard" width={420}>
          <Notes p={pl} />
        </A>
      </article>

      {/* AI Mock Interview — the chamber */}
      <article className="contents" aria-label={iv.title}>
        <Title k="interview:title" p={iv} />
        <Problem k="interview:problem" p={iv} />
        <A k="interview:you" className="tag">You · answer</A>
        <A k="interview:ai" className="tag">Gemini · question & evaluation</A>
        <A k="interview:built" className="sign text-center" width={[620, 460]}>
          <p className="kicker">What I built</p>
          <p className="mt-2 text-[22px] leading-snug">{iv.built}</p>
        </A>
        <A k="interview:eng" className="placard" width={400}>
          <Notes p={iv} />
          <p className="mt-3 font-mono text-[11px] text-dim">The bars beside this card are illustrative, not real scores.</p>
        </A>
      </article>

      {/* Smart Health Queue — the flow */}
      <article className="contents" aria-label={hq.title}>
        <A k="queue:intro" className="placard" width={400}>
          <p className="kicker">{hq.kind}</p>
          <h3 className="mt-2 text-[34px] font-medium leading-tight tracking-[-0.02em]">{hq.title}</h3>
          <p className="mt-1 text-muted">{hq.tagline}</p>
          <p className="kicker mt-5">The problem</p>
          <p className="mt-1">{hq.problem}</p>
        </A>
        {[
          ["arrival", "Patients arrive"],
          ["triage", "Triage · priority"],
          ["lanes", "Emergency · High · Normal"],
          ["desk", "Doctor · service"],
        ].map(([key, text]) => (
          <A key={key} k={`queue:label-${key}`} className="tag">
            {text}
          </A>
        ))}
        <A k="queue:built" className="placard" width={420}>
          <p className="kicker">What I built</p>
          <p className="mt-1">{hq.built}</p>
          <div className="mt-5">
            <Notes p={hq} />
          </div>
        </A>
      </article>

      {/* OneBox — the sorter */}
      <article className="contents" aria-label={ob.title}>
        <A k="onebox:intro" className="placard" width={400}>
          <p className="kicker">{ob.kind}</p>
          <h3 className="mt-2 text-[34px] font-medium leading-tight tracking-[-0.02em]">{ob.title}</h3>
          <p className="mt-1 text-muted">{ob.tagline}</p>
          <p className="kicker mt-5">The problem</p>
          <p className="mt-1">{ob.problem}</p>
        </A>
        {[
          ["gmail", "Gmail"],
          ["outlook", "Outlook"],
          ["ai", "AI classification"],
          ["bins", "Interested · Meeting booked · Out of office · Not interested · Spam"],
          ["desk", "One inbox"],
        ].map(([key, text]) => (
          <A key={key} k={`onebox:label-${key}`} className="tag">
            {text}
          </A>
        ))}
        <A k="onebox:built" className="placard" width={420}>
          <p className="kicker">What I built</p>
          <p className="mt-1">{ob.built}</p>
          <div className="mt-5">
            <Notes p={ob} />
          </div>
        </A>
      </article>

      <A k="gallery:more" className="placard" width={360}>
        <p>
          Everything else, including the half-finished ones, is on{" "}
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className="studio-link">
            GitHub
          </a>
          .
        </p>
      </A>
    </section>
  );
};

export default Gallery;
