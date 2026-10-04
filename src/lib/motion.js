import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finePointer = () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/**
 * Fades + lifts every `[data-reveal]` inside `scope` as it scrolls into view.
 * Elements in the same row are staggered. `data-reveal="fade"` skips the lift.
 * With reduced motion, `index.html` never adds `.js-motion`, so nothing is hidden.
 */
export function useReveal(scope) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      ScrollTrigger.batch(gsap.utils.toArray("[data-reveal]", scope.current), {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: (_, el) => (el.dataset.reveal === "fade" ? 0 : 28) },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true }
          ),
      });
    },
    { scope }
  );
}

/** Pulls an element slightly toward the cursor. Desktop pointers only. */
export function useMagnetic(ref, strength = 0.25) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [ref, strength]);
}

export { gsap, ScrollTrigger, useGSAP };
