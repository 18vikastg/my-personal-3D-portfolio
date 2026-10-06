import { useCallback, useEffect, useRef, useState } from "react";
import { createStudio } from "../world/studio/create";
import { NavContext, roomOf } from "./nav";
import StudioNav from "./StudioNav";
import Entrance from "./content/Entrance";
import Gallery from "./content/Gallery";
import Engineering from "./content/Engineering";
import Thinking from "./content/Thinking";
import Lab from "./content/Lab";
import Tools from "./content/Tools";
import Archive from "./content/Archive";
import Cinema from "./content/Cinema";
import Ending from "./content/Ending";

const isNarrow = () => window.innerWidth < 900 || window.innerWidth / window.innerHeight < 0.85;
// Landscape phones: narrow framing, but a wider text measure fits the short screen better
const isShort = () => isNarrow() && window.innerWidth / window.innerHeight > 1.25;

/**
 * THE STUDIO — the portfolio is a place. A single camera walks through one
 * architectural model as you scroll; all of the content is real HTML (in
 * reading order, for screen readers and search) that lives *inside* that
 * model — on walls, placards, paper and labels — positioned by the engine.
 * The page itself has no layout: it is just the length of the walk.
 */
const Studio = ({ quality, onFail }) => {
  const canvasRef = useRef(null);
  const viewRef = useRef(null);
  const stageRef = useRef(null);
  const apiRef = useRef(null);
  const [length, setLength] = useState(null);
  const [ready, setReady] = useState(false);
  const [room, setRoom] = useState("entrance");
  const [station, setStation] = useState("entrance:0");
  const [fade, setFade] = useState(false);
  const [narrow, setNarrow] = useState(isNarrow);
  const [short, setShort] = useState(isShort);

  useEffect(() => {
    let api = null;
    let cancelled = false;
    (async () => {
      try {
        api = await createStudio({
          canvas: canvasRef.current,
          view: viewRef.current,
          stage: stageRef.current,
          quality,
          onFail,
          onLength: setLength,
          onStation: (key, r) => {
            setStation(key);
            setRoom(r);
          },
        });
        if (cancelled) return api.dispose();
        apiRef.current = api;
        setReady(true);
      } catch {
        onFail();
      }
    })();
    const onResize = () => {
      setNarrow(isNarrow());
      setShort(isShort());
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      api?.dispose();
      apiRef.current = null;
    };
  }, [quality, onFail]);

  // Once the page has the walk's real length, let scrolling measure it
  useEffect(() => {
    if (!ready || !length) return;
    const id = requestAnimationFrame(() => apiRef.current?.rescroll());
    return () => cancelAnimationFrame(id);
  }, [ready, length]);

  /** Move the visitor to a station. Far jumps fade instead of racing through walls. */
  const go = useCallback((key) => {
    const api = apiRef.current;
    if (!api) return;
    const i = api.indexOf(key);
    if (i === undefined) return;
    const top = api.scrollOf(i) + 1;
    if (Math.abs(window.scrollY - top) < window.innerHeight * 3) {
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }
    setFade(true);
    setTimeout(() => {
      window.scrollTo({ top, behavior: "instant" });
      api.settle();
      setFade(false);
    }, 240);
  }, []);

  // Keyboard focus anywhere in the studio brings the camera to that block
  const onFocus = (e) => {
    const api = apiRef.current;
    const el = e.target.closest?.("[data-anchor]");
    if (!api || !el) return;
    const i = api.stationOfAnchor(el.dataset.anchor);
    if (i === undefined || api.stations[i].key === station) return;
    const top = api.scrollOf(i) + 1;
    window.scrollTo({ top, behavior: "instant" });
    api.settle();
  };

  const here = roomOf(room);

  return (
    <NavContext.Provider value={{ go, current: station, narrow, short }}>
      <a
        href="#studio-work"
        onClick={(e) => {
          e.preventDefault();
          go("gallery:0");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to the work
      </a>
      <StudioNav room={room} go={go} />
      <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 block size-full" />
      <div ref={viewRef} className="studio-view" data-narrow={narrow || undefined} onFocusCapture={onFocus}>
        <div ref={stageRef} className="studio-stage">
          <main className="contents">
            <Entrance />
            <Gallery />
            <Engineering />
            <Thinking />
            <Lab />
            <Tools narrow={narrow && !short} />
            <Archive />
            <Cinema />
            <Ending />
          </main>
        </div>
      </div>

      {/* Where you are, and how to move */}
      <p aria-hidden="true" className="pointer-events-none fixed bottom-4 left-4 z-40 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-dim md:left-8">
        {here?.label}
        {station === "entrance:0" && <span className="ml-3 text-muted">· scroll to walk in</span>}
      </p>

      {/* The walk's length — the only thing the page lays out */}
      <div aria-hidden="true" style={{ height: length ?? "100vh" }} />

      {/* Opening veil, and the fade used for long jumps */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-ink transition-opacity duration-500 ${ready && !fade ? "opacity-0" : "opacity-100"}`}
      >
        {!ready && (
          <p className="text-center">
            <span className="block text-lg font-medium tracking-tight">Vikas T G</span>
            <span className="mt-2 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-dim">Opening the studio…</span>
          </p>
        )}
      </div>
    </NavContext.Provider>
  );
};

export default Studio;
