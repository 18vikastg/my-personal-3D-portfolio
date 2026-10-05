import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

const STILL = "/silent-stories/noren.webp";

const webglAvailable = () => {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

// Skip the live cloth where it would cost more than it gives
const shouldAnimate = () => {
  if (prefersReducedMotion() || !webglAvailable()) return false;
  const conn = navigator.connection;
  if (conn?.saveData) return false;
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return true;
};

/**
 * The doorway between the engineering chapters and Silent Stories: a noren
 * (the split cloth hung in a Japanese doorway) with CODE on one side and
 * STORIES on the other. A still image is always rendered first; the live
 * three.js cloth loads only near the viewport and only where it's welcome.
 */
const Noren = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas || !shouldAnimate()) return;

    let ctrl = null;
    let cancelled = false;
    let visible = false;

    const sync = () => {
      if (!ctrl) return;
      if (visible && !document.hidden) ctrl.start();
      else ctrl.stop();
    };

    const mount = async () => {
      try {
        const { createNoren } = await import("../lib/noren.js");
        if (cancelled) return;
        const lite = window.matchMedia("(max-width: 1099px)").matches;
        ctrl = await createNoren(canvas, { lite });
        if (cancelled) {
          ctrl.dispose();
          ctrl = null;
          return;
        }
        setLive(true);
        sync();
      } catch {
        // No WebGL context or a driver hiccup — the still image stays.
      }
    };

    // Load when it's about a screen away; run only while on screen
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          near.disconnect();
          mount();
        }
      },
      { rootMargin: "600px 0px" }
    );
    const onScreen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    const resize = new ResizeObserver(() => ctrl?.resize());
    near.observe(box);
    onScreen.observe(box);
    resize.observe(box);
    document.addEventListener("visibilitychange", sync);

    return () => {
      cancelled = true;
      near.disconnect();
      onScreen.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", sync);
      ctrl?.dispose();
    };
  }, []);

  return (
    <figure className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div ref={boxRef} className="relative aspect-[4/3] overflow-hidden rounded-md bg-black sm:aspect-[16/9] lg:col-span-8 lg:aspect-[2/1]">
        <img
          src={STILL}
          alt="A black cloth noren hanging in a doorway, its three panels printed with “Code”, a ring with a red dot, and “Stories”."
          width="1600"
          height="800"
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 size-full object-contain transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 size-full touch-pan-y transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <figcaption className="max-w-[40rem] text-sm leading-relaxed text-dim lg:col-span-4 lg:max-w-[18rem] lg:pb-2">
        A <span className="text-ss-cream/80">noren</span> is the split curtain hung in a Japanese doorway. You brush through
        it to get from one room to the next.
      </figcaption>
    </figure>
  );
};

export default Noren;
