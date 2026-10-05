/**
 * Render on demand. A frame is drawn only when something asked for one
 * (scroll, pointer, a content event, a texture arriving) or while a scene
 * in view is genuinely animating. When nothing changes, nothing renders.
 */
export function createLoop(frame) {
  let raf = 0;
  let last = 0;
  let wanted = true;
  let running = false;
  let continuous = false;
  let frames = 0;

  const tick = (now) => {
    raf = 0;
    const raw = last ? (now - last) / 1000 : 1 / 60; // true frame time (for the watchdog)
    const dt = Math.min(0.05, raw); // clamped for stable animation
    last = now;
    wanted = false;
    frames++;
    const keepGoing = frame(dt, continuous, raw);
    continuous = keepGoing;
    if (running && (keepGoing || wanted)) raf = requestAnimationFrame(tick);
    else last = 0;
  };

  const invalidate = () => {
    wanted = true;
    if (running && !raf) raf = requestAnimationFrame(tick);
  };

  return {
    invalidate,
    start() {
      running = true;
      invalidate();
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    },
    get frames() {
      return frames;
    },
  };
}
