import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { chapters, nav, profile } from "../data/site";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const firstLinkRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    // Watch every chapter so the highlight clears outside the linked ones
    document.querySelectorAll("main section[id]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile sheet: lock scroll, close on Escape, move focus in and back out
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 font-medium tracking-tight" aria-label="Vikas T G — back to top">
          <span className="grid size-7 place-items-center rounded-full bg-lime font-mono text-xs font-semibold text-ink">
            v
          </span>
          <span>vikas t g</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center">
            {nav.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={`px-3 py-2 text-sm underline-offset-[6px] transition-colors lg:px-4 ${
                      isActive ? "text-fg underline decoration-lime decoration-2" : "text-muted hover:text-fg"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1 px-3 py-2 text-sm text-muted transition-colors hover:text-fg sm:inline-flex"
          >
            Résumé <FiArrowUpRight aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn-primary hidden !py-2 md:inline-flex">
            Let’s talk
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid size-11 place-items-center rounded-full border border-line-strong md:hidden"
          >
            <span
              aria-hidden="true"
              className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink md:hidden"
      >
        <nav aria-label="Mobile" className="shell py-6">
          <ul>
            {chapters.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={`#${id}`}
                  onClick={close}
                  aria-current={active === id ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-line py-3 text-lg font-medium ${
                    active === id ? "text-lime" : ""
                  }`}
                >
                  {label}
                  <span className="font-mono text-xs text-dim">{String(i).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost" onClick={close}>
              Résumé (PDF)
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-primary" onClick={close}>
              Email me
            </a>
          </div>
        </nav>
      </div>
    </header>

      {/* Chapter rail: where you are in the walk, and a way to jump */}
      <nav aria-label="Chapters" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <ol className="flex flex-col items-end gap-1">
          {chapters.map(({ id, label }) => {
            const on = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={on ? "true" : undefined}
                  className="group flex h-6 items-center gap-3"
                >
                  <span
                    className={`rounded bg-ink/85 px-1.5 py-0.5 font-mono text-[0.68rem] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
                      on ? "text-fg" : "text-muted"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`block h-px transition-[width,background-color] duration-300 ${
                      on ? "w-7 bg-lime" : "w-3.5 bg-fg/35 group-hover:w-5 group-hover:bg-fg"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Nav;
