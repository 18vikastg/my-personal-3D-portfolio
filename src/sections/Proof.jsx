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
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.15,
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
          label="Research & education"
          title={
            <>
              The paper <span className="serif-accent">trail.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <article data-reveal aria-labelledby="award-title" className="wf-plate rounded-md border border-line p-6 md:p-10 lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-sm text-lime">
              <FiAward aria-hidden="true" /> Best Paper Award · IC-SIIT SYNERGY 2026
            </p>
            <h3 id="award-title" className="mt-5 text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-snug tracking-[-0.02em]">
              Predicting Customer Churn in Telecommunications: A Leakage-Free Ensemble Pipeline with SMOTE and SHAP
            </h3>
            <p className="mt-4 max-w-[38rem] leading-relaxed text-muted">
              A classic churn-modelling mistake is letting resampling and tuning leak test data into training. I built the
              pipeline so it can’t — then used SHAP to explain which signals drive churn on the IBM Telco dataset.
            </p>

            <div data-bars className="mt-8 space-y-4" role="group" aria-label="Recall on churned customers">
              {recall.map((r) => (
                <div key={r.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className={r.best ? "text-fg" : "text-dim"}>{r.label}</span>
                    <span className={`font-mono ${r.best ? "text-lime" : "text-dim"}`}>recall {r.value.toFixed(3)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-sm bg-fg/[0.06]">
                    <div data-bar className={`h-full origin-left ${r.best ? "bg-lime" : "bg-fg/30"}`} style={{ width: `${r.value * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
              <p className="stack-line">Python · Random Forest · SMOTE · RandomizedSearchCV · SHAP</p>
              <a href={CERTIFICATE} target="_blank" rel="noopener noreferrer" className="link-underline tap-area inline-flex items-center gap-1 text-sm">
                View certificate <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>

          <div className="grid content-start gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <article data-reveal aria-labelledby="queue-paper" className="border-t border-line pt-5">
              <p className="eyebrow">Research project</p>
              <h3 id="queue-paper" className="mt-3 text-lg font-medium leading-snug">
                A Smart Health Queue Management System for Enhancing Patient Flow in Hospitals
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                The research side of the open-source queue system in{" "}
                <a href="#work" className="link-underline text-fg">
                  Selected work
                </a>
                : priority-based scheduling over first-come-first-served.
              </p>
            </article>

            <article data-reveal aria-labelledby="edu-title" className="border-t border-line pt-5">
              <p className="eyebrow">Education</p>
              <h3 id="edu-title" className="mt-3 text-lg font-medium leading-snug">
                {education.degree}
              </h3>
              <p className="mt-1 text-muted">{education.school}</p>
              <p className="mt-2 text-sm text-dim">
                {education.years} · CGPA {education.cgpa}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
