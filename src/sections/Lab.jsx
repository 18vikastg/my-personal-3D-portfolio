import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap, useReveal, prefersReducedMotion } from "../lib/motion";
import { lab } from "../data/lab";
import SectionHead from "../ui/SectionHead";

const statusStyle = {
  Live: "border-lime/40 text-lime",
  "You are here": "border-fg/40 text-fg",
};

const Lab = () => {
  const scope = useRef(null);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const [preview, setPreview] = useState(null);
  useReveal(scope);

  // Floating screenshot that trails the cursor over rows that have one
  useEffect(() => {
    const list = listRef.current;
    const el = previewRef.current;
    if (!list || !el || !window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e) => {
      const r = list.getBoundingClientRect();
      xTo(e.clientX - r.left + 24);
      yTo(e.clientY - r.top - 90);
    };
    list.addEventListener("pointermove", move);
    return () => list.removeEventListener("pointermove", move);
  }, []);

  return (
    <section id="lab" ref={scope} aria-labelledby="lab-title" className="section">
      <div className="shell">
        <SectionHead
          id="lab-title"
          index="04"
          label="Lab"
          title={
            <>
              Things I build when <span className="serif-accent">nobody asked.</span>
            </>
          }
          intro="Experiments, prototypes and side quests. Some are polished, some are held together with hope — all of them taught me something."
        />

        <div ref={listRef} className="relative" onPointerLeave={() => setPreview(null)}>
          <div
            ref={previewRef}
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 z-20 hidden w-72 overflow-hidden rounded-2xl border border-line-strong shadow-2xl transition-[opacity,scale] duration-300 lg:block ${
              preview ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            {preview && <img src={preview} alt="" className="aspect-[16/10] w-full object-cover" />}
          </div>
          <ul className="border-b border-line">
          {lab.map((item) => (
            <li key={item.name} data-reveal onPointerEnter={() => setPreview(item.image ?? null)}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate grid gap-3 border-t border-line py-7 transition-colors md:grid-cols-12 md:items-baseline md:gap-8 md:py-8"
              >
                {/* Hover wash */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-fg/[0.04] transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-y-100"
                />
                <span className="flex items-center gap-3 md:col-span-4">
                  <span className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{item.name}</span>
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-dim transition-all duration-500 ease-(--ease-out-expo) group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime"
                  />
                </span>
                <span className="leading-relaxed text-muted md:col-span-5">{item.what}</span>
                <span className="flex flex-wrap items-center gap-1.5 md:col-span-3 md:justify-end">
                  <span className={`chip ${statusStyle[item.status] ?? ""}`}>{item.status}</span>
                  {item.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Lab;
