// Decides how much world a device gets. "off" keeps the approved 2D site.

const webgl = () => {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

export function detectQuality() {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  if (!webgl()) return "off";
  if (navigator.connection?.saveData) return "off";
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) return "off";
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return "off";

  const w = window.innerWidth;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (w < 768) return "low";
  if (w < 1100 || coarse) return "medium";
  return "high";
}

export const QUALITY = {
  high: { dpr: 1.75, antialias: true, detail: 1, dust: 260 },
  medium: { dpr: 1.25, antialias: true, detail: 0.7, dust: 160 },
  low: { dpr: 1, antialias: false, detail: 0.45, dust: 90 },
};
