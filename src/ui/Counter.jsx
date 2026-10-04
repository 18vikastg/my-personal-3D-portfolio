import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion";

const format = (n) => Math.round(n).toLocaleString("en-US");

/**
 * Counts up to `value` once when scrolled into view. The final number is
 * rendered in the markup, so crawlers, screen readers and reduced-motion
 * users always get the real value.
 */
const Counter = ({ value, suffix = "", className = "" }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onStart: () => (el.textContent = "0"),
        onUpdate: () => (el.textContent = format(state.n)),
      });
    },
    { dependencies: [value] }
  );

  return (
    <span className={className}>
      <span ref={ref}>{format(value)}</span>
      {suffix}
    </span>
  );
};

export default Counter;
