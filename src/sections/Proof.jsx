import { useRef } from "react";
import { FiArrowUpRight, FiAward } from "react-icons/fi";
import { gsap, useGSAP, useReveal, prefersReducedMotion } from "../lib/motion";
import { education } from "../data/site";
import SectionHead from "../ui/SectionHead";

const CERTIFICATE = "https://drive.google.com/file/d/1rlWLTxc3xpaElEoMTDdmKypLdMR_CaRl/view?usp=sharing";
const recall = [
  { label: "Starting model", value: 0.495 },
  { label: "Final pipeline", value: 0.693, best: true },
];

const Proof = () => {
  const scope = useRef(null);
  useReveal(scope);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-bar]", {
        scaleX: 0,
        duration: 1.6,
        ease: "expo.out",
        stagger: 0.25,
        scrollTrigger: { trigger: "[data-bars]", start: "top 85%", once: true },
      });
    },
    { scope }
  );

  return (
    <section id="proof" ref={scope} aria-labelledby="proof-title" className="section border-t border-line">
      <div className="shell">
        <SectionHead
          id="proof-title"
          index="06"
          label="Proof"
          title={
            <>
              The paper <span className="serif-accent">trail.</span>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <article
            data-reveal
            aria-labelledby="award-title"
            className="relative overflow-hidden rounded-3xl border border-lime/30 bg-ink-2 p-6 md:p-10 lg:col-span-7"
          >
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-lime/10 blur-3xl" />
            <p className="relative inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 text-sm font-medium text-ink">
              <FiAward aria-hidden="true" /> Best Paper Award · IC-SIIT SYNERGY 2026
            </p>
            <h3 id="award-title" className="relative mt-8 text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-tight tracking-[-0.03em]">
              Predicting Customer Churn in Telecommunications: A Leakage-Free Ensemble Pipeline with SMOTE and SHAP
            </h3>
            <p className="relative mt-5 max-w-xl leading-relaxed text-muted">
              A classic churn-modelling mistake is letting resampling and tuning leak test data into training. I built the
              pipeline so it can’t — then used SHAP to explain which signals drive churn on the IBM Telco dataset.
            </p>

            <div data-bars className="relative mt-10 space-y-4" role="group" aria-label="Recall on churned customers">
              {recall.map((r) => (
                <div key={r.label}>
                  <div className="mb-1.5 flex justify-between font-mono text-xs">
                    <span className={r.best ? "text-fg" : "text-dim"}>{r.label}</span>
                    <span className={r.best ? "text-lime" : "text-dim"}>recall {r.value.toFixed(3)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-fg/5">
                    <div
                      data-bar
                      className={`h-full origin-left rounded-full ${r.best ? "bg-lime" : "bg-fg/25"}`}
                      style={{ width: `${r.value * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-1.5" aria-label="Methods">
                {["Python", "Random Forest", "SMOTE", "RandomizedSearchCV", "SHAP"].map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <a href={CERTIFICATE} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-sm">
                View certificate <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>

          <div className="grid gap-6 lg:col-span-5">
            <article data-reveal aria-labelledby="queue-paper" className="rounded-3xl border border-line p-6 md:p-8">
              <p className="eyebrow">Research project</p>
              <h3 id="queue-paper" className="mt-4 text-xl font-medium leading-snug tracking-tight">
                A Smart Health Queue Management System for Enhancing Patient Flow in Hospitals
              </h3>
              <p className="mt-3 text-muted">
                The research side of the open-source queue system in <a href="#work" className="link-underline text-fg">Selected work</a>:
                priority-based scheduling over first-come-first-served.
              </p>
            </article>

            <article data-reveal aria-labelledby="edu-title" className="rounded-3xl border border-line p-6 md:p-8">
              <p className="eyebrow">Education</p>
              <h3 id="edu-title" className="mt-4 text-xl font-medium leading-snug tracking-tight">
                {education.degree}
              </h3>
              <p className="mt-1 text-muted">{education.school}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4 font-mono text-xs">
                <div>
                  <dt className="text-dim">Years</dt>
                  <dd className="mt-1">{education.years}</dd>
                </div>
                <div>
                  <dt className="text-dim">CGPA</dt>
                  <dd className="mt-1">{education.cgpa}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
