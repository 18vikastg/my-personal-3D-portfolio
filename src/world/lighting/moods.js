import { Color, DirectionalLight, Fog, HemisphereLight, MathUtils } from "three";
import { PALETTE } from "../materials";

/*
 * Lighting states of the studio. Every station names a mood; between
 * stations the moods blend with the camera's travel, so light, fog and floor
 * change *because you moved*, never on a timer.
 */
const MOODS = {
  entrance: { fog: "#0a0a0a", near: 12, far: 60, floor: 1, key: "#ffffff", keyI: 1.1, hemi: 0.75, red: 0 },
  gallery: { fog: "#0a0a0a", near: 10, far: 48, floor: 0.85, key: "#fff6ea", keyI: 1.2, hemi: 0.65, red: 0 },
  market: { fog: "#0b0a08", near: 10, far: 46, floor: 0.7, key: "#ffe2bd", keyI: 1.35, hemi: 0.7, red: 0 },
  chamber: { fog: "#08090b", near: 9, far: 42, floor: 0.6, key: "#dfe8f0", keyI: 1.0, hemi: 0.55, red: 0 },
  system: { fog: "#090a0b", near: 10, far: 50, floor: 0.6, key: "#e8eef2", keyI: 1.05, hemi: 0.6, red: 0 },
  quiet: { fog: "#0b0a09", near: 7, far: 34, floor: 0.25, key: "#fff0dc", keyI: 1.25, hemi: 0.75, red: 0 },
  lab: { fog: "#0a0a0a", near: 9, far: 42, floor: 0.7, key: "#ffffff", keyI: 1.0, hemi: 0.6, red: 0 },
  tools: { fog: "#0a0a0a", near: 10, far: 44, floor: 0.6, key: "#ffffff", keyI: 1.1, hemi: 0.65, red: 0 },
  archive: { fog: "#08090a", near: 8, far: 40, floor: 0.55, key: "#cfd9e0", keyI: 0.95, hemi: 0.5, red: 0 },
  threshold: { fog: "#030303", near: 5, far: 30, floor: 0.15, key: "#ffd9c0", keyI: 0.55, hemi: 0.3, red: 0.6 },
  cinema: { fog: "#000000", near: 6, far: 40, floor: 0.03, key: "#ffd9c0", keyI: 0.45, hemi: 0.22, red: 1.3 },
  signals: { fog: "#0a0a0a", near: 8, far: 42, floor: 0.5, key: "#ffffff", keyI: 0.85, hemi: 0.5, red: 0 },
  finale: { fog: "#0a0a0a", near: 5, far: 28, floor: 0.1, key: "#ffffff", keyI: 0.4, hemi: 0.3, red: 0 },
};

const resolved = Object.fromEntries(
  Object.entries(MOODS).map(([k, m]) => [k, { ...m, fog: new Color(m.fog), key: new Color(m.key) }])
);

export function createLighting(scene) {
  scene.fog = new Fog(PALETTE.ink.clone(), 12, 60);
  scene.background = scene.fog.color;

  const hemi = new HemisphereLight(0xf2efe8, 0x0a0a0a, 0.7);
  const key = new DirectionalLight(0xffffff, 1.1);
  key.position.set(-6, 10, 8);
  const red = new DirectionalLight(PALETTE.red, 0);
  red.position.set(0, 2, -12);
  scene.add(hemi, key, red);

  const current = { floor: 1, red: 0 };

  /** Blend mood `a` → `b` by `t`. Returns the blended values scenes need. */
  const apply = (a, b, t) => {
    const A = resolved[a] ?? resolved.entrance;
    const B = resolved[b] ?? A;
    scene.fog.color.lerpColors(A.fog, B.fog, t);
    scene.fog.near = MathUtils.lerp(A.near, B.near, t);
    scene.fog.far = MathUtils.lerp(A.far, B.far, t);
    key.color.lerpColors(A.key, B.key, t);
    key.intensity = MathUtils.lerp(A.keyI, B.keyI, t);
    hemi.intensity = MathUtils.lerp(A.hemi, B.hemi, t);
    red.intensity = MathUtils.lerp(A.red, B.red, t);
    current.floor = MathUtils.lerp(A.floor, B.floor, t);
    current.red = red.intensity;
    return current;
  };

  return { apply, lights: { hemi, key, red } };
}
