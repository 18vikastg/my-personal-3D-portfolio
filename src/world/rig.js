import { MathUtils, Vector3 } from "three";

/**
 * Where each chapter lives in the world, and how the camera frames it.
 * `id` is the HTML section the station belongs to. The world is laid out
 * along -Z; objects sit to the right of the path so text on the left stays
 * readable on wide screens.
 */
export const STATIONS = [
  { id: "top", origin: [0, 0, 0], cam: { wide: [0, 1.8, 15], look: [2.2, 1.4, -6] } },
  { id: "work", origin: [0, 0, -32] },
  { id: "experience", origin: [-1.5, 0, -64] },
  { id: "thinking", origin: [0, 0, -88], cam: { wide: [0, 4, 9], look: [1, 0.5, -8] } },
  { id: "lab", origin: [1.5, 0, -112] },
  { id: "toolbox", origin: [0, 0, -142] },
  // Proof's model stands beside its heading, so the camera arrives as the heading does
  { id: "proof", origin: [0, 0, -170], lead: 0.8 },
  { id: "silent-stories", origin: [0, 0, -212], cam: { wide: [0, 1.6, 10], look: [0, 1.6, -12], narrow: [0, 1.6, 12] } },
  { id: "contact", origin: [0, 0, -250], cam: { wide: [0, 2.2, 12], look: [2.5, 1.4, -14] } },
];

export const OBJECT_OFFSET = { wide: 3.2, narrow: 0 };

const DEFAULT_CAM = { wide: [0, 2.4, 10], look: [2.4, 0.9, 0], narrow: [0, 3.4, 15], lookNarrow: [0, 1, 0] };

/** Camera position + target for a station, in world space. */
export function framing(station, layout) {
  const o = station.origin;
  const c = station.cam ?? {};
  const narrow = layout === "narrow";
  const p = narrow ? c.narrow ?? DEFAULT_CAM.narrow : c.wide ?? DEFAULT_CAM.wide;
  const l = narrow ? DEFAULT_CAM.lookNarrow : c.look ?? DEFAULT_CAM.look;
  return {
    pos: new Vector3(o[0] + p[0], o[1] + p[1], o[2] + p[2]),
    look: new Vector3(o[0] + (narrow ? 0 : l[0]), o[1] + l[1], o[2] + l[2]),
  };
}

const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);

/**
 * Maps page scroll to a camera pose. The camera holds at a station while
 * its chapter is being read and travels to the next one as that chapter's
 * heading approaches — so movement always means "new chapter".
 */
export function createRig(layout) {
  const frames = STATIONS.map((s) => framing(s, layout));
  let anchors = STATIONS.map(() => 0);

  const measure = () => {
    const vh = window.innerHeight;
    anchors = STATIONS.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return 0;
      return el.getBoundingClientRect().top + window.scrollY - vh * (s.lead ?? 0.45);
    });
    anchors[0] = 0;
  };

  const pos = new Vector3();
  const look = new Vector3();

  /** Returns { index, travel } and writes the target pose. */
  const sample = (scrollY) => {
    let i = 0;
    while (i < anchors.length - 1 && scrollY >= anchors[i + 1]) i++;
    if (i >= anchors.length - 1) {
      pos.copy(frames[i].pos);
      look.copy(frames[i].look);
      return { index: i, travel: 0, pos, look };
    }
    const span = Math.max(1, anchors[i + 1] - anchors[i]);
    const t = MathUtils.clamp((scrollY - anchors[i]) / span, 0, 1);
    const travel = smoother(MathUtils.clamp((t - 0.55) / 0.45, 0, 1));
    pos.lerpVectors(frames[i].pos, frames[i + 1].pos, travel);
    look.lerpVectors(frames[i].look, frames[i + 1].look, travel);
    return { index: i, travel, pos, look };
  };

  return { frames, measure, sample };
}
