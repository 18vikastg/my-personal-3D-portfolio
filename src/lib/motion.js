import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades + lifts every `[data-reveal]` inside `scope` once, as it scrolls into
 * view. Deliberately small: 12px and well under a second.
 * Chapter titles marked `[data-split]` also rise line by line from a mask —
 * the only typographic motion on the site.
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
      gsap.utils.toArray("[data-split]", scope.current).forEach((el) =>
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        })
      );
    },
    { scope }
  );
}

export { gsap, ScrollTrigger, useGSAP };
