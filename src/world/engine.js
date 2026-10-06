import {
  Color,
  DirectionalLight,
  Fog,
  HemisphereLight,
  MathUtils,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { PALETTE, createMaterials } from "./materials";
import { OBJECT_OFFSET, STATIONS, createRig } from "./rig";
import { QUALITY } from "./quality";
import { buildGround } from "./stations/ground";
import { buildEntrance } from "./stations/entrance";
import { buildWorkbench } from "./stations/workbench";
import { buildSystem } from "./stations/system";
import { buildField } from "./stations/field";
import { buildTools } from "./stations/tools";
import { buildArchive } from "./stations/archive";
import { buildThreshold } from "./stations/threshold";
import { buildHorizon } from "./stations/horizon";

const BUILDERS = {
  top: buildEntrance,
  work: buildWorkbench,
  experience: buildSystem,
  lab: buildField,
  toolbox: buildTools,
  proof: buildArchive,
  contact: buildHorizon,
};

/**
 * The world: one renderer, one scene, one camera driven by page scroll.
 * Returns { measure, dispose }. Calls `onDegrade` if the device can't keep up.
 */
export function createWorld(canvas, { quality, layout, onDegrade }) {
  const q = QUALITY[quality];
  let dpr = Math.min(window.devicePixelRatio, q.dpr);

  const renderer = new WebGLRenderer({ canvas, antialias: q.antialias, powerPreference: "low-power" });
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const fogInk = PALETTE.ink.clone();
  scene.fog = new Fog(fogInk.clone(), 8, 46);
  scene.background = scene.fog.color;

  const camera = new PerspectiveCamera(layout === "narrow" ? 55 : 42, 1, 0.1, 140);

  const hemi = new HemisphereLight(0xf2efe8, 0x0a0a0a, 0.7);
  const key = new DirectionalLight(0xffffff, 1.1);
  key.position.set(-4, 8, 6);
  scene.add(hemi, key);

  const mats = createMaterials();
  const offset = OBJECT_OFFSET[layout];
  const pointer = { x: 0, y: 0, moved: false };

  const ground = buildGround({ mats, quality });
  scene.add(ground);

  const rig = createRig(layout);
  rig.measure();

  // Stations, in path order
  const stations = STATIONS.map((s, i) => {
    const build = BUILDERS[s.id];
    if (!build) return null;
    const origin = new Vector3(...s.origin);
    const built = build({ origin, mats, offset, detail: q.detail, quality, camera, pointer });
    scene.add(built.group);
    return { index: i, ...built };
  }).filter(Boolean);

  // The ring sits on the camera's path between Proof and Silent Stories
  const iProof = STATIONS.findIndex((s) => s.id === "proof");
  const iSS = STATIONS.findIndex((s) => s.id === "silent-stories");
  const iEnd = STATIONS.length - 1;
  const ringAt = new Vector3().lerpVectors(rig.frames[iProof].pos, rig.frames[iSS].pos, 0.68);
  const threshold = buildThreshold({ mats, ringAt, origin: new Vector3(...STATIONS[iSS].origin), dust: q.dust });
  scene.add(threshold.group);
  stations.push({ index: iSS, ...threshold, span: [iProof, iEnd] });

  /* ---------- sizing ---------- */
  const fit = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  fit();

  /* ---------- input ---------- */
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    pointer.moved = true;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  /* ---------- mood: ink world → Silent Stories black/cream/red ---------- */
  const ringZ = ringAt.z;
  const ssZ = rig.frames[iSS].pos.z;
  const endZ = rig.frames[iEnd].pos.z;
  const warm = new Color(0xffd9c0);
  const white = new Color(0xffffff);
  // The ring waits until the Proof text has scrolled out of the way
  const proofEl = document.getElementById("proof");
  const proofClear = () => {
    if (!proofEl) return 1;
    const end = proofEl.getBoundingClientRect().bottom / window.innerHeight;
    return MathUtils.clamp((0.5 - end) / 0.35, 0, 1);
  };
  const applyMood = (camZ) => {
    const into = MathUtils.clamp((ringZ + 1 - camZ) / 8, 0, 1);
    const out = MathUtils.clamp((camZ - endZ) / (ssZ - endZ), 0, 1);
    const m = Math.min(into, out);
    threshold.setMood(m);
    threshold.setApproach(Math.abs(camZ - ringZ), proofClear());
    scene.fog.color.lerpColors(fogInk, PALETTE.black, m);
    scene.fog.near = 8 - m * 2;
    scene.fog.far = 46 - m * 4;
    ground.material.opacity = ground.userData.baseOpacity * (1 - m * 0.85);
    key.color.lerpColors(white, warm, m);
    hemi.intensity = 0.7 - m * 0.3;
    return m;
  };

  /* ---------- loop ---------- */
  const camPos = new Vector3();
  const camLook = new Vector3();
  const lookTarget = new Vector3();
  let first = true;
  let raf = 0;
  let last = performance.now();
  let frameSum = 0;
  let frameCount = 0;
  let skip = false;

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    // Low tier renders at ~30fps
    if (quality === "low") {
      skip = !skip;
      if (skip) return;
    }

    const { index, travel, pos, look } = rig.sample(window.scrollY);
    lookTarget.copy(look);

    let lean = null;
    for (const s of stations) {
      const [a, b] = s.span ?? [s.index - 1, s.index + 1];
      const near = index >= a && index <= b;
      s.group.visible = near || (s.span ? false : Math.abs(index - s.index) <= 1);
      const active = near && Math.abs(index + travel - s.index) < 1.2;
      const r = s.update?.(dt, active);
      if (r && s.index === index && travel < 0.3) lean = r;
    }
    if (lean) lookTarget.lerp(lean, 0.35);

    if (first) {
      camPos.copy(pos);
      camLook.copy(lookTarget);
      first = false;
    } else {
      const k = 1 - Math.exp(-dt * 3.2);
      camPos.lerp(pos, k);
      camLook.lerp(lookTarget, k);
    }
    // A hint of parallax from the pointer on wide screens
    if (layout === "wide") {
      camPos.x += pointer.x * 0.15 * dt;
      camPos.y += pointer.y * 0.1 * dt;
    }
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    applyMood(camPos.z);
    pointer.moved = false;

    renderer.render(scene, camera);

    // Watchdog: if frames are slow, lower resolution; if still slow, bow out
    frameSum += dt;
    frameCount++;
    if (frameCount === 90) {
      const avg = frameSum / frameCount;
      frameSum = 0;
      frameCount = 0;
      if (avg > 0.034 && dpr > 1) {
        dpr = Math.max(1, dpr - 0.25);
        renderer.setPixelRatio(dpr);
        fit();
      } else if (avg > 0.05 && dpr <= 1) {
        onDegrade?.();
      }
    }
  };

  const start = () => {
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };
  const stop = () => cancelAnimationFrame(raf);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("resize", fit);
  start();

  return {
    measure: () => rig.measure(),
    dispose() {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", onPointer);
      stations.forEach((s) => s.dispose?.());
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material && !Object.values(mats).includes(o.material)) o.material.dispose?.();
      });
      Object.values(mats).forEach((m) => m.dispose());
      renderer.dispose();
    },
  };
}
