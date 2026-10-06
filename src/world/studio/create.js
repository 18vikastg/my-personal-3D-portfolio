import { MathUtils, PerspectiveCamera, Scene, Vector3 } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QUALITY } from "../quality";
import { on } from "../bus";
import { createGeometryCache, createMaterials, createTextureLoader, segments } from "../materials";
import { createLighting } from "../lighting/moods";
import { createRenderer } from "../engine/renderer";
import { createLoop } from "../engine/loop";
import { waitForNorenFont } from "../../lib/noren";
import { createCss3d } from "./css3d";
import { createPath } from "./path";
import { entrance } from "./rooms/entrance";
import { gallery } from "./rooms/gallery";
import { swanand } from "./rooms/swanand";
import { preplink } from "./rooms/preplink";
import { interview } from "./rooms/interview";
import { queue } from "./rooms/queue";
import { onebox } from "./rooms/onebox";
import { engineering } from "./rooms/engineering";
import { thinking } from "./rooms/thinking";
import { labRoom } from "./rooms/lab";
import { tools } from "./rooms/tools";
import { archive } from "./rooms/archive";
import { threshold } from "./rooms/threshold";
import { cinema } from "./rooms/cinema";
import { signals } from "./rooms/signals";
import { contact } from "./rooms/contact";

gsap.registerPlugin(ScrollTrigger);

// The walk, in order. Each module models one place and declares where its
// HTML lives (anchors) and where the camera stands (stations).
const ROOMS = [entrance, gallery, swanand, preplink, interview, queue, onebox, engineering, thinking, labRoom, tools, archive, threshold, cinema, signals, contact];

const narrowFor = (w, h) => w < 900 || w / h < 0.85;

// QA only: `?nowatchdog` keeps the studio running on software-rendered test
// browsers, which would otherwise (correctly) fall back to the 2D site.
const noWatchdog = typeof location !== "undefined" && new URLSearchParams(location.search).has("nowatchdog");

/** The drafted floor under the whole studio — one draw call. */
function floor(mats, quality) {
  const step = quality === "low" ? 2 : 1;
  const pts = [];
  for (let x = -14; x <= 14; x += step) pts.push(x, 0, -336, x, 0, 24);
  for (let z = -336; z <= 24; z += step) pts.push(-14, 0, z, 14, 0, z);
  const grid = segments(pts, mats.lineFaint.clone());
  return grid;
}

/**
 * Builds the studio into a canvas (WebGL) and a DOM stage (HTML in 3D).
 * Returns the API the React layer needs: scroll length, station lookups,
 * refresh and dispose.
 */
export async function createStudio({ canvas, view, stage, quality, onFail, onLength, onStation }) {
  const q = QUALITY[quality];
  await waitForNorenFont();

  const { renderer, fit, watch, resetWatch } = createRenderer(canvas, q);
  let narrow = narrowFor(window.innerWidth, window.innerHeight);
  const camera = new PerspectiveCamera(narrow ? 58 : 44, window.innerWidth / window.innerHeight, 0.05, 140);
  const scene = new Scene();
  const lighting = createLighting(scene);
  const mats = createMaterials(quality);
  const geo = createGeometryCache();
  let loop = null;
  const invalidate = () => loop?.invalidate();
  const tex = createTextureLoader(Math.min(4, renderer.capabilities.getMaxAnisotropy()));
  const texLoad = tex.load;
  tex.load = (url) => texLoad(url, invalidate);

  const grid = floor(mats, quality);
  scene.add(grid);

  const ctx = { mats, geo, tex, quality };
  const modules = ROOMS.map((build) => build(ctx));
  modules.forEach((m) => scene.add(m.group));
  scene.updateMatrixWorld(true);

  // Stations in walking order, and each module's station range
  const stations = [];
  modules.forEach((m) => {
    m.range = [stations.length, stations.length + m.stations.length - 1];
    stations.push(...m.stations);
  });
  const indexOf = Object.fromEntries(stations.map((s, i) => [s.key, i]));
  const roomStart = {};
  stations.forEach((s, i) => (roomStart[s.room] ??= i));

  // Anchors: HTML elements bound to places in the world
  const anchors = modules.flatMap((m) => m.anchors).map((a) => ({
    ...a,
    idx: a.at.map((k) => indexOf[k]).filter((i) => i !== undefined),
    el: null,
    shown: -1,
    normal: new Vector3(),
    up: new Vector3(),
    wp: new Vector3(),
  }));
  const byKey = Object.fromEntries(anchors.map((a) => [a.key, a]));
  const els = {};
  stage.querySelectorAll("[data-anchor]").forEach((el) => {
    const a = byKey[el.dataset.anchor];
    if (!a) return;
    a.el = el;
    a.tag = el.classList.contains("tag");
    els[a.key] = el;
  });
  anchors.forEach((a) => {
    a.object.updateMatrixWorld(true);
    a.object.getWorldPosition(a.wp);
    a.normal.set(0, 0, 1).transformDirection(a.object.matrixWorld);
    a.up.set(0, 1, 0).transformDirection(a.object.matrixWorld);
  });
  modules.forEach((m) => m.bind?.(els));

  const css = createCss3d(view, stage);
  const path = createPath(stations);

  // On narrow screens a station can simply "read" one placard: the camera
  // faces it and fits the placard's *rendered* width to ~93% of the screen,
  // so text lands near 1:1 whatever the placard contains.
  // Fits width AND height (leaving room for the top bar), for any aspect —
  // portrait phones, small phones and landscape phones alike.
  // The block is framed in the space between the top bar and the room
  // label, not the whole screen.
  const BAR = 68;
  const FOOT = 30;
  const fitToAnchors = (aspect, fov, screenH) => {
    const half = Math.tan(MathUtils.degToRad(fov) / 2);
    const tight = Math.min(half, half * aspect);
    const usable = 1 - (BAR + FOOT) / screenH;
    const lift = (BAR - FOOT) / 2 / (screenH / 2);
    stations.forEach((st) => {
      const key = st.narrow?.anchor;
      const a = key && byKey[key];
      if (!a?.el) return;
      const scale = a.object.scale.x;
      const w = a.el.offsetWidth * scale;
      const h = a.el.offsetHeight * scale;
      const dist = Math.max((w * 1.08) / (2 * half * aspect), (h * 1.05) / (2 * half * usable));
      st.narrow.dir = a.normal.clone().add(new Vector3(0, 0.04, 0));
      // aim a little above the block so it sits below the top bar
      st.narrow.focus = a.wp.clone().addScaledVector(a.up, lift * dist * half);
      st.narrow.fit = dist * tight;
    });
  };

  const layout = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    narrow = narrowFor(w, h);
    camera.fov = narrow ? 58 : 44;
    anchors.forEach((a) => {
      if (a.grow === 1) return;
      a.object.scale.setScalar(a.scale * (narrow ? a.grow : 1));
      a.object.updateMatrixWorld(true);
    });
    anchors.forEach((a) => a.el && ((a.w = a.el.offsetWidth), (a.h = a.el.offsetHeight)));
    fitToAnchors(w / h, camera.fov, h);
    fit(camera);
    path.rebuild({ fov: camera.fov, aspect: w / h, narrow, height: h });
    onLength?.(path.length(h));
    modules.forEach((m) => m.relayout?.());
  };
  layout();

  /* ---- scroll → smoothed proxy (GSAP) ---- */
  const proxy = { y: window.scrollY };
  const tween = gsap.fromTo(proxy, { y: 0 }, { y: () => ScrollTrigger.maxScroll(window), ease: "none", paused: true, onUpdate: invalidate });
  const trigger = ScrollTrigger.create({ start: 0, end: "max", scrub: 0.9, animation: tween, invalidateOnRefresh: true, onRefresh: invalidate });

  /* ---- input ---- */
  const pointer = { x: 0, y: 0, moved: false };
  const parallax = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    pointer.moved = true;
    invalidate();
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  const offBus = ["tool", "lab"].map((t) => on(t, invalidate));
  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      layout();
      ScrollTrigger.refresh();
      invalidate();
    }, 120);
  };
  window.addEventListener("resize", onResize);

  /* ---- frame ---- */
  const toCam = new Vector3();
  const local = new Vector3();
  const s = { at: 0, room: "", roomStart: 0, mood: null, pointer, camera };
  const frame = (dt, continuous, raw) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const p = path.sample(proxy.y);
    const cur = stations[p.index];
    const next = stations[Math.min(stations.length - 1, p.index + 1)];

    let settling = false;
    if (!narrow) {
      const k = 1 - Math.exp(-dt * 4);
      parallax.x += (pointer.x * 0.08 - parallax.x) * k;
      parallax.y += (pointer.y * 0.05 - parallax.y) * k;
      settling = Math.abs(pointer.x * 0.08 - parallax.x) > 0.001 || Math.abs(pointer.y * 0.05 - parallax.y) > 0.001;
    }
    camera.position.set(p.pos.x + parallax.x, p.pos.y + parallax.y, p.pos.z);
    camera.lookAt(p.look);
    camera.updateMatrixWorld();

    const mood = lighting.apply(cur.mood, next.mood, p.travel);
    grid.material.opacity = 0.07 * mood.floor;
    grid.visible = mood.floor > 0.02;

    s.at = p.at;
    s.room = p.travel > 0.5 ? next.room : cur.room;
    s.roomStart = roomStart[s.room];
    s.mood = mood;
    let animating = false;
    for (const m of modules) {
      const [a, b] = m.range;
      const near = p.at >= a - 3 && p.at <= b + 3;
      m.group.visible = near;
      if (near && m.update) animating = m.update(dt, s) || animating;
    }

    renderer.render(scene, camera);

    // HTML in the world: each block fades in at its own stations and only
    // when you're in front of it
    css.setCamera(camera, w, h);
    for (const a of anchors) {
      if (!a.el) continue;
      let wgt = 0;
      for (const i of a.idx) wgt = Math.max(wgt, 1 - Math.abs(p.at - i) * 1.35);
      if (wgt > 0) {
        toCam.subVectors(camera.position, a.wp);
        if (toCam.dot(a.normal) <= 0) wgt = 0;
      }
      // On phones a small label never shows half cut by the screen edge
      if (wgt > 0 && narrow && a.tag) {
        local.copy(a.wp).applyMatrix4(camera.matrixWorldInverse);
        const d = -local.z;
        const half = Math.tan(MathUtils.degToRad(camera.fov) / 2);
        const sx = d * half * camera.aspect;
        const sy = d * half;
        const s = a.object.scale.x / 2;
        const edge = d > 0 ? Math.max((Math.abs(local.x) + a.w * s) / sx, (Math.abs(local.y) + a.h * s) / sy) : 9;
        wgt = Math.min(wgt, (1.02 - edge) / 0.1);
      }
      const o = Math.round(MathUtils.clamp(wgt, 0, 1) * 100) / 100;
      if (o > 0) css.place(a.el, a.object);
      if (o !== a.shown) {
        a.shown = o;
        a.el.style.opacity = o;
        a.el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      }
    }

    pointer.moved = false;
    if (continuous && !noWatchdog) watch(raw, onFail);
    else resetWatch();
    debug.at = +p.at.toFixed(2);
    const here = p.travel > 0.5 ? next : cur;
    if (here.key !== debug.key) {
      debug.key = here.key;
      onStation?.(here.key, here.room);
    }
    return animating || settling;
  };

  // Every block stays in the accessibility tree (opacity, not visibility),
  // so screen readers read the whole studio; keyboard focus on a block
  // moves the camera to it (handled in the React layer).
  css.setCamera(camera, window.innerWidth, window.innerHeight);
  anchors.forEach((a) => a.el && css.place(a.el, a.object));
  loop = createLoop(frame);
  const debug = {
    scene,
    quality,
    get narrow() {
      return narrow;
    },
    at: 0,
    key: "",
    stations: stations.map((s) => s.key),
    get calls() {
      return renderer.info.render.calls;
    },
    get frames() {
      return loop.frames;
    },
  };
  window.__studio = debug;

  const onVisibility = () => (document.hidden ? loop.stop() : loop.start());
  document.addEventListener("visibilitychange", onVisibility);
  loop.start();

  return {
    stations,
    roomStart,
    indexOf: (key) => indexOf[key],
    stationOfAnchor: (key) => byKey[key]?.idx[0],
    scrollOf: (i) => path.scrollOf(i),
    /** The spacer changed height: re-measure scrolling (no relayout). */
    rescroll() {
      ScrollTrigger.refresh();
      invalidate();
    },
    /** After a programmatic jump: skip the scroll smoothing, arrive now. */
    settle() {
      ScrollTrigger.update();
      trigger.getTween?.()?.progress(1);
      proxy.y = window.scrollY;
      invalidate();
    },
    refresh: () => {
      layout();
      ScrollTrigger.refresh();
    },
    dispose() {
      loop.stop();
      trigger.kill();
      tween.kill();
      clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      offBus.forEach((off) => off());
      modules.forEach((m) => m.dispose?.());
      const shared = new Set(Object.values(mats));
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material && !shared.has(o.material)) {
          o.material.map?.dispose();
          o.material.dispose?.();
        }
      });
      shared.forEach((m) => m.dispose());
      geo.dispose();
      tex.dispose();
      renderer.dispose();
      if (window.__studio === debug) delete window.__studio;
    },
  };
}
