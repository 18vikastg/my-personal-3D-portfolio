import { SRGBColorSpace, WebGLRenderer } from "three";

/** Renderer with a capped pixel ratio that the watchdog can lower later. */
export function createRenderer(canvas, q) {
  const renderer = new WebGLRenderer({ canvas, antialias: q.antialias, powerPreference: "low-power" });
  renderer.outputColorSpace = SRGBColorSpace;
  let dpr = Math.min(window.devicePixelRatio, q.dpr);
  renderer.setPixelRatio(dpr);

  const fit = (camera) => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  /**
   * Watchdog over *continuous* frames only: if they are slow, lower the pixel
   * ratio; if that is not enough, report so the world can step aside.
   */
  let sum = 0;
  let count = 0;
  const watch = (dt, onTooSlow) => {
    sum += dt;
    count++;
    if (count < 90) return false;
    const avg = sum / count;
    sum = 0;
    count = 0;
    if (avg > 0.034 && dpr > 1) {
      dpr = Math.max(1, dpr - 0.25);
      renderer.setPixelRatio(dpr);
      return true;
    }
    if (avg > 0.05 && dpr <= 1) onTooSlow?.();
    return false;
  };
  const resetWatch = () => {
    sum = 0;
    count = 0;
  };

  return { renderer, fit, watch, resetWatch, get dpr() { return dpr; } };
}
