import { principles } from "../../data/site";
import { A } from "../A";

/** The thinking room: each principle is printed on its own sheet on the desk. */
const Thinking = () => (
  <section className="contents" aria-labelledby="studio-think">
    <A k="thinking:title" className="sign text-center" width={[900, 520]}>
      <p className="kicker">How I think</p>
      <h2 id="studio-think" className="mt-3 text-[64px] font-medium leading-none tracking-[-0.03em]">
        Opinions I’d defend <span className="serif-accent">in code review.</span>
      </h2>
      <p className="mt-4 text-[22px] text-muted">Notes to self, mostly learned the slow way. They’re on the desk.</p>
    </A>
    <ol className="contents">
      {principles.map((p, i) => (
        <A key={p.title} k={`thinking:note-${i}`} as="li" className="sheet" width={420} style={{ minHeight: 594 }}>
          <p className="font-mono text-[14px] text-paper-muted">Note {i + 1}</p>
          <h3 className="mt-10 text-[34px] font-medium leading-[1.1] tracking-[-0.02em]">{p.title}</h3>
          <p className="mt-6 text-[19px] leading-relaxed text-paper-muted">{p.body}</p>
        </A>
      ))}
    </ol>
  </section>
);

export default Thinking;
