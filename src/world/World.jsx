import { useEffect, useRef, useState } from "react";
import { detectQuality } from "./quality";

const layoutFor = (w) => (w < 900 ? "narrow" : "wide");

/**
 * The 3D world behind the page. The HTML is always the content; this only
 * adds a space for it to live in. Loads after first paint, never on devices
 * or settings where it would get in the way, and steps aside if it's slow.
 */
const World = () => {
  const canvasRef = useRef(null);
  const [quality] = useState(detectQuality);
  const [state, setState] = useState(quality === "off" ? "off" : "idle"); // idle | loading | ready | off

  useEffect(() => {
    if (quality === "off") return;

    let world = null;
    let cancelled = false;
    let layout = layoutFor(window.innerWidth);
    const root = document.documentElement;

    const teardown = () => {
      world?.dispose();
      world = null;
    };

    const mount = async () => {
      setState("loading");
      try {
        const { createWorld } = await import("./engine.js");
        if (cancelled) return;
        world = createWorld(canvasRef.current, {
          quality,
          layout,
          onDegrade: () => {
            teardown();
            root.classList.remove("world-on");
            setState("off");
          },
        });
        root.classList.add("world-on");
        root.dataset.world = quality;
        setState("ready");
        // Fonts and images shift the layout after load; re-measure the stations
        setTimeout(() => world?.measure(), 600);
      } catch {
        setState("off");
      }
    };

    // Wait for the page to be usable first
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 400));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const handle = idle(mount, { timeout: 1500 });

    const main = document.querySelector("main");
    const ro = new ResizeObserver(() => world?.measure());
    if (main) ro.observe(main);

    // Crossing the narrow/wide boundary rebuilds the world with the other framing
    const onResize = () => {
      const next = layoutFor(window.innerWidth);
      if (next !== layout && world) {
        layout = next;
        teardown();
        mount();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelIdle(handle);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      teardown();
      root.classList.remove("world-on");
      delete root.dataset.world;
    };
  }, [quality]);

  if (state === "off") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className={`block size-full transition-opacity duration-[1200ms] ${state === "ready" ? "opacity-100" : "opacity-0"}`}
      />
      {/* Keeps the text side calm and legible over the world */}
      <div className="world-scrim absolute inset-0" />
      {state === "loading" && (
        <p className="absolute bottom-4 left-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-dim">
          Building the space…
        </p>
      )}
    </div>
  );
};

export default World;
