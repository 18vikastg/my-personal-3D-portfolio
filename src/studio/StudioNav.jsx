import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "../data/site";
import { ROOMS, roomOf } from "./nav";


/**
 * Navigation for the studio: a quiet top bar, a rooms menu (every device),
 * and on wide screens a rail of ticks — one per room — on the right edge.
 * Every link moves the camera; nothing here is a page section.
 */
const StudioNav = ({ room, go }) => {
  const [open, setOpen] = useState(false);
  const first = useRef(null);
  const toggle = useRef(null);
  const current = roomOf(room);

  useEffect(() => {
    if (!open) return;
    const t = toggle.current;
    first.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      t?.focus();
    };
  }, [open]);

  const pick = (key) => {
    setOpen(false);
    go(key);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <button type="button" onClick={() => go("entrance:0")} className="flex min-h-11 items-center gap-2.5 font-medium tracking-tight" aria-label="Vikas T G — back to the entrance">
            <span className="grid size-7 place-items-center rounded-full bg-lime font-mono text-xs font-semibold text-ink">v</span>
            <span className="hidden sm:inline">vikas t g</span>
          </button>
          <div className="flex items-center gap-2">
            <a href={profile.resume} target="_blank" rel="noopener" className="hidden items-center gap-1 px-3 py-2 text-sm text-muted hover:text-fg sm:inline-flex">
              Résumé <FiArrowUpRight aria-hidden="true" />
            </a>
            <button type="button" onClick={() => go("contact:1")} className="btn btn-primary !py-2">
              Let’s talk
            </button>
            <button
              ref={toggle}
              type="button"
              aria-expanded={open}
              aria-controls="rooms-menu"
              onClick={() => setOpen((o) => !o)}
              className="btn btn-ghost !py-2"
            >
              {open ? "Close" : "Rooms"}
            </button>
          </div>
        </div>
        <nav id="rooms-menu" aria-label="Rooms" hidden={!open} className="mx-4 ml-auto w-[min(22rem,calc(100%-2rem))] rounded-md border border-line bg-ink/95 p-2 backdrop-blur md:mr-8">
          <ol>
            {ROOMS.map((r, i) => (
              <li key={r.key}>
                <button
                  ref={i === 0 ? first : undefined}
                  type="button"
                  onClick={() => pick(r.key)}
                  aria-current={current?.key === r.key ? "true" : undefined}
                  className={`flex w-full items-center justify-between rounded px-3 py-2.5 text-left hover:bg-fg/5 ${current?.key === r.key ? "text-lime" : ""}`}
                >
                  {r.label}
                  <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <nav aria-label="Rooms (rail)" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <ol className="flex flex-col items-end gap-1">
          {ROOMS.map((r) => {
            const on = current?.key === r.key;
            return (
              <li key={r.key}>
                <button type="button" onClick={() => go(r.key)} aria-current={on ? "true" : undefined} className="group flex h-6 items-center gap-3">
                  <span className={`rounded bg-ink/85 px-1.5 py-0.5 font-mono text-[0.68rem] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${on ? "text-fg" : "text-muted"}`}>
                    {r.label}
                  </span>
                  <span aria-hidden="true" className={`block h-px transition-[width,background-color] duration-300 ${on ? "w-7 bg-lime" : "w-3.5 bg-fg/35 group-hover:w-5 group-hover:bg-fg"}`} />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default StudioNav;
