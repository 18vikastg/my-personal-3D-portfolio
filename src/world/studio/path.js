import { CatmullRomCurve3, MathUtils, Vector3 } from "three";

/*
 * The walk. A station is a place the camera stands while something is read:
 *   { key, room, focus, dir, fit, narrow?: { focus?, dir?, fit? }, via?, mood }
 * Its pose is computed from the viewport: the camera backs off along `dir`
 * until a sphere of radius `fit` around `focus` fills the frame — so every
 * composition adapts to any aspect ratio without hand-tuned breakpoints.
 * `via` lists waypoints the camera passes on its way *into* this station
 * (through a doorway, round a corner) instead of cutting through walls.
 */

const STEP = 0.85; // viewport heights of scroll per station
const HOLD = 0.4; // first 40% of each step: the camera stands still

const smooth = (t) => t * t * (3 - 2 * t);

export function poseOf(station, { fov, aspect, narrow }) {
  const s = narrow && station.narrow ? { ...station, ...station.narrow } : station;
  const half = Math.tan(MathUtils.degToRad(fov) / 2);
  const tight = Math.min(half, half * aspect);
  const dist = s.fit / tight;
  const dir = s.dir.clone().normalize();
  return { pos: s.focus.clone().addScaledVector(dir, dist), look: s.focus.clone() };
}

export function createPath(stations) {
  let poses = [];
  let curves = [];
  let stepPx = 1;

  const rebuild = ({ fov, aspect, narrow, height }) => {
    stepPx = height * STEP;
    poses = stations.map((s) => poseOf(s, { fov, aspect, narrow }));
    curves = stations.map((s, i) => {
      if (!i || !s.via?.length) return null;
      return new CatmullRomCurve3([poses[i - 1].pos, ...s.via, poses[i].pos], false, "centripetal");
    });
  };

  /** Total scroll height for the walk. */
  const length = (height) => (stations.length - 1) * height * STEP + height;

  /** Scroll position at which a station is fully arrived at. */
  const scrollOf = (index) => index * stepPx;

  const pos = new Vector3();
  const look = new Vector3();
  const state = { pos, look, index: 0, travel: 0, at: 0 };

  /** Camera pose for a scroll position. */
  const sample = (y) => {
    const n = stations.length;
    const f = MathUtils.clamp(y / stepPx, 0, n - 1);
    const i = Math.min(n - 1, Math.floor(f));
    const t = f - i;
    const travel = i >= n - 1 ? 0 : smooth(MathUtils.clamp((t - HOLD) / (1 - HOLD), 0, 1));
    const a = poses[i];
    const b = poses[Math.min(n - 1, i + 1)];
    const curve = curves[i + 1];
    if (curve && travel > 0) curve.getPoint(travel, pos);
    else pos.lerpVectors(a.pos, b.pos, travel);
    look.lerpVectors(a.look, b.look, travel);
    state.index = i;
    state.travel = travel;
    state.at = i + travel; // continuous station coordinate
    return state;
  };

  return { rebuild, sample, length, scrollOf, get count() { return stations.length; } };
}
