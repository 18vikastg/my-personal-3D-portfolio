import { FiArrowUpRight, FiAward } from "react-icons/fi";
import { education } from "../../data/site";
import { A } from "../A";

const CERTIFICATE = "https://drive.google.com/file/d/1rlWLTxc3xpaElEoMTDdmKypLdMR_CaRl/view?usp=sharing";
const STAGES = ["IBM Telco data", "Leakage-free split", "SMOTE (training only)", "Random Forest + tuning", "SHAP explanations"];

/** The archive: the award on the wall, the paper on the lectern, the pipeline as a sculpture. */
const Archive = () => (
  <section className="contents" aria-labelledby="studio-proof">
    <A k="archive:title" className="sign" width={[600, 420]}>
      <p className="kicker">Research &amp; education</p>
      <h2 id="studio-proof" className="mt-2 text-[60px] font-medium leading-none tracking-[-0.03em]">
        The paper <span className="serif-accent">trail.</span>
      </h2>
    </A>
    <A k="archive:award" className="placard" width={520}>
      <p className="inline-flex items-center gap-2 text-[16px] text-lime">
        <FiAward aria-hidden="true" /> Best Paper Award · IC-SIIT SYNERGY 2026
      </p>
      <p className="mt-3 text-[22px] font-medium leading-snug">
        Predicting Customer Churn in Telecommunications: A Leakage-Free Ensemble Pipeline with SMOTE and SHAP
      </p>
      <a href={CERTIFICATE} target="_blank" rel="noopener noreferrer" className="studio-link mt-4 inline-flex items-center gap-1 text-[16px]">
        View certificate <FiArrowUpRight aria-hidden="true" />
      </a>
    </A>
    <A k="archive:paper" className="sheet" width={560}>
      <p className="font-mono text-[13px] text-paper-muted">On the lectern</p>
      <p className="mt-4 text-[26px] font-medium leading-tight">The paper</p>
      <p className="mt-4 text-[18px] leading-relaxed text-paper-muted">
        A classic churn-modelling mistake is letting resampling and tuning leak test data into training. I built the
        pipeline so it can’t — then used SHAP to explain which signals drive churn on the IBM Telco dataset.
      </p>
      <p className="mt-4 font-mono text-[13px] text-paper-muted">Python · Random Forest · SMOTE · RandomizedSearchCV · SHAP</p>
    </A>
    <ol className="contents">
      {STAGES.map((s, i) => (
        <A key={s} k={`archive:stage-${i}`} as="li" className="tag">
          {s}
        </A>
      ))}
    </ol>
    <A k="archive:recall" className="placard" width={330}>
      <p className="kicker">Recall on churned customers</p>
      <p className="mt-3 font-mono text-[16px]">
        <span className="text-dim">Starting model</span> 0.495
      </p>
      <p className="mt-1 font-mono text-[16px] text-lime">Final pipeline 0.693</p>
      <p className="mt-3 text-[13px] text-muted">The two bars beside this card stand at those heights, against 1.0.</p>
    </A>
    <A k="archive:research" className="placard" width={440}>
      <p className="kicker">Research project</p>
      <p className="mt-2 text-[19px] font-medium leading-snug">A Smart Health Queue Management System for Enhancing Patient Flow in Hospitals</p>
      <p className="mt-2 text-[15px] text-fg/85">The research side of the queue installation back in the gallery: priority-based scheduling over first-come-first-served.</p>
      <p className="kicker mt-5">Education</p>
      <p className="mt-1 font-medium">{education.degree}</p>
      <p className="text-[15px] text-muted">{education.school}</p>
      <p className="mt-1 font-mono text-[13px] text-dim">
        {education.years} · CGPA {education.cgpa}
      </p>
    </A>
  </section>
);

export default Archive;
