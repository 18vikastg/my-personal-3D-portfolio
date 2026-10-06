import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades + lifts every `[data-reveal]` inside `scope` once, as it scrolls into
 * view. Deliberately small: 12px and well under a second.
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
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.05, overwrite: true }
          ),
      });
    },
    { scope }
  );
}

export { gsap, ScrollTrigger, useGSAP };
