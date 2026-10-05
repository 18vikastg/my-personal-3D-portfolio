/*
 * Noren — a hanging cloth doorway, rendered with three.js.
 *
 * Adapted from "Woven Cloth · Washi Noren" in ThreeUI Community
 * (https://threeui.com/three-js/woven-cloth). Changes: Silent Stories palette
 * and lettering, no translucency pass or drifting camera, a gentler draft,
 * pointer interaction, adaptive mesh density, on-demand rendering.
 *
 * Original work: MIT License, Copyright (c) 2026 Meng To
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {
  ACESFilmicToneMapping,
  Group,
  AmbientLight,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Plane,
  Raycaster,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

const CREAM = "#efe3cf";
const RED = "#b3121a";
const TW = 1500;
const TH = 980;
const PANELS = 3;
const BAND = 0.15; // the uncut sleeve the rod runs through
const SLIT_U = [1 / 3, 2 / 3];
const BW = 4.4;
const BH = 2.9;

// Deterministic noise, so the torn edge and fibres match on every load.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

function surface(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext("2d") };
}

const deckle = (() => {
  const r = rng(20260826);
  const control = Array.from({ length: 25 }, r);
  const low = new Float32Array(TW);
  for (let x = 0; x < TW; x++) {
    const f = (x / TW) * 24;
    const i = Math.floor(f);
    const t = f - i;
    const smooth = t * t * (3 - 2 * t);
    const base = control[i] + (control[Math.min(24, i + 1)] - control[i]) * smooth;
    const fine = Math.sin(x * 0.19) * 0.16 + Math.sin(x * 0.061 + 1.7) * 0.24;
    low[x] = TH - 14 - (base * 26 + fine * 12);
  }
  return low;
})();

function alphaMask() {
  const { canvas, ctx: x } = surface(TW, TH);
  x.fillStyle = "#fff";
  x.fillRect(0, 0, TW, TH);
  x.fillStyle = "#000";
  const bandPx = TH * BAND;
  SLIT_U.forEach((u) => x.fillRect(u * TW - 11, bandPx, 22, TH - bandPx));
  x.beginPath();
  x.moveTo(0, TH);
  for (let px = 0; px < TW; px++) x.lineTo(px, deckle[px]);
  x.lineTo(TW, TH);
  x.closePath();
  x.fill();
  const side = rng(771);
  for (let e = 0; e < 2; e++) {
    x.beginPath();
    x.moveTo(e ? TW : 0, 0);
    for (let py = 0; py <= TH; py += 6) {
      const w = 6 + side() * 9;
      x.lineTo(e ? TW - w : w, py);
    }
    x.lineTo(e ? TW : 0, TH);
    x.closePath();
    x.fill();
  }
  return canvas;
}

function verticalWord(x, word, cx, top, size, step) {
  x.font = `300 ${size}px Oswald, "Arial Narrow", sans-serif`;
  x.textAlign = "center";
  x.textBaseline = "middle";
  for (let i = 0; i < word.length; i++) x.fillText(word[i], cx, top + i * step);
}

/** Sumi-dyed cloth: uneven black, long fibres, cream katazome frames and type. */
function clothTexture() {
  const { canvas, ctx: x } = surface(TW, TH);
  const g = x.createLinearGradient(0, 0, 0, TH);
  g.addColorStop(0, "#121110");
  g.addColorStop(0.5, "#0d0c0b");
  g.addColorStop(1, "#090807");
  x.fillStyle = g;
  x.fillRect(0, 0, TW, TH);

  const cloud = rng(4471);
  for (let i = 0; i < 22; i++) {
    const cx = cloud() * TW;
    const cy = cloud() * TH;
    const r = 120 + cloud() * 320;
    const rg = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, cloud() > 0.5 ? "rgba(90,78,64,0.10)" : "rgba(0,0,0,0.20)");
    rg.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = rg;
    x.fillRect(cx - r, cy - r, r * 2, r * 2);
  }

  x.strokeStyle = "rgba(239,227,207,0.03)";
  x.lineWidth = 1;
  for (let px = 0; px < TW; px += 4) {
    x.beginPath();
    x.moveTo(px + 0.5, 0);
    x.lineTo(px + 0.5, TH);
    x.stroke();
  }

  const fib = rng(90210);
  for (let i = 0; i < 1600; i++) {
    const fx = fib() * TW;
    const fy = fib() * TH;
    const len = 30 + fib() * 150;
    const ang = (fib() - 0.5) * 0.9 + (fib() > 0.82 ? Math.PI / 2 : 0);
    const bow = (fib() - 0.5) * 26;
    x.strokeStyle = fib() > 0.35 ? `rgba(239,227,207,${0.015 + fib() * 0.035})` : `rgba(0,0,0,${0.05 + fib() * 0.08})`;
    x.lineWidth = 0.7 + fib() * 1.6;
    x.beginPath();
    x.moveTo(fx, fy);
    x.quadraticCurveTo(
      fx + Math.cos(ang) * len * 0.5 + bow,
      fy + Math.sin(ang) * len * 0.5 - bow,
      fx + Math.cos(ang) * len,
      fy + Math.sin(ang) * len
    );
    x.stroke();
  }

  const panelW = TW / PANELS;
  x.strokeStyle = "rgba(239,227,207,0.55)";
  for (let k = 0; k < PANELS; k++) {
    const x0 = k * panelW + 34;
    const w = panelW - 68;
    x.lineWidth = 3;
    x.strokeRect(x0, TH * BAND + 34, w, TH - TH * BAND - 118);
    x.lineWidth = 1.5;
    x.strokeRect(x0 + 12, TH * BAND + 46, w - 24, TH - TH * BAND - 142);
  }

  // Sleeve and its shadow
  x.fillStyle = "rgba(0,0,0,0.35)";
  x.fillRect(0, 0, TW, TH * BAND);
  const sh = x.createLinearGradient(0, TH * BAND, 0, TH * BAND + 54);
  sh.addColorStop(0, "rgba(0,0,0,0.45)");
  sh.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = sh;
  x.fillRect(0, TH * BAND, TW, 54);

  x.fillStyle = CREAM;
  verticalWord(x, "CODE", panelW * 0.5, TH * 0.33, 92, 132);
  verticalWord(x, "STORIES", panelW * 2.5, TH * 0.27, 70, 86);

  // Centre: a ring with the red dot from the Silent Stories mark
  const cx = panelW * 1.5;
  const cy = TH * 0.52;
  x.strokeStyle = CREAM;
  x.lineWidth = 5;
  x.beginPath();
  x.arc(cx, cy, 120, 0, Math.PI * 2);
  x.stroke();
  x.fillStyle = RED;
  x.beginPath();
  x.arc(cx, cy, 20, 0, Math.PI * 2);
  x.fill();
  return canvas;
}

function lacquerTexture() {
  const { canvas, ctx: x } = surface(512, 96);
  const g = x.createLinearGradient(0, 0, 0, 96);
  g.addColorStop(0, "#3a2a1e");
  g.addColorStop(0.45, "#24180f");
  g.addColorStop(1, "#140d08");
  x.fillStyle = g;
  x.fillRect(0, 0, 512, 96);
  const grain = rng(3312);
  for (let i = 0; i < 120; i++) {
    const y = grain() * 96;
    x.strokeStyle = `rgba(0,0,0,${0.05 + grain() * 0.15})`;
    x.lineWidth = 0.6 + grain() * 1.6;
    x.beginPath();
    x.moveTo(0, y);
    for (let px = 0; px <= 512; px += 32) x.lineTo(px, y + Math.sin(px * 0.02 + i) * 2.4);
    x.stroke();
  }
  return canvas;
}

/** A barely-there warm light behind the cloth, so the black reads as fabric. */
function backlightTexture() {
  const { canvas, ctx: x } = surface(512, 340);
  const g = x.createRadialGradient(256, 150, 0, 256, 150, 270);
  g.addColorStop(0, "#2a1d14");
  g.addColorStop(0.55, "#120c08");
  g.addColorStop(1, "#000000");
  x.fillStyle = g;
  x.fillRect(0, 0, 512, 340);
  return canvas;
}

/** The lettering is drawn into a texture, so its font must be ready first. */
export async function waitForNorenFont() {
  try {
    await Promise.race([
      Promise.all([document.fonts.load('300 92px "Oswald"'), document.fonts.ready]),
      new Promise((r) => setTimeout(r, 1500)),
    ]);
  } catch {
    /* fall back to the system face */
  }
}

const canvasTexture = (c) => {
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
};

/**
 * The cloth itself — rod, three panels, physics — with no renderer or
 * camera, so it can hang in its own little scene or inside the 3D world.
 * Local space: rod at y = BH/2, cloth in the z = 0 plane.
 */
export function createNorenCloth({ lite = false, anisotropy = 8 } = {}) {
  const group = new Group();

  const GX = lite ? 36 : 56;
  const GY = lite ? 24 : 38;
  const geo = new PlaneGeometry(BW, BH, GX, GY);
  const albedo = canvasTexture(clothTexture());
  const alpha = new CanvasTexture(alphaMask());
  albedo.anisotropy = alpha.anisotropy = anisotropy;

  const cloth = new Mesh(
    geo,
    new MeshPhysicalMaterial({
      map: albedo,
      alphaMap: alpha,
      alphaTest: 0.5,
      side: DoubleSide,
      roughness: 0.9,
      metalness: 0,
      sheen: 0.35,
      sheenColor: new Color("#8a7a66"),
      sheenRoughness: 0.75,
    })
  );
  group.add(cloth);

  const wood = new MeshStandardMaterial({ map: canvasTexture(lacquerTexture()), roughness: 0.5, metalness: 0 });
  const rod = new Mesh(new CylinderGeometry(0.055, 0.055, BW + 0.8, 16), wood);
  rod.rotation.z = Math.PI / 2;
  rod.position.set(0, BH / 2 + 0.045, 0.02);
  group.add(rod);
  const capGeo = new SphereGeometry(0.075, 16, 10);
  [-1, 1].forEach((side) => {
    const cap = new Mesh(capGeo, wood);
    cap.position.set((side * (BW + 0.8)) / 2, BH / 2 + 0.045, 0.02);
    group.add(cap);
  });

  /* ---- cloth physics: one sheet, cut into three panels below the sleeve ---- */
  const pos = geo.attributes.position;
  const N = (GX + 1) * (GY + 1);
  const cur = new Float32Array(N * 3);
  const prev = new Float32Array(N * 3);
  const rest = new Float32Array(N * 3);
  const pinned = new Uint8Array(N);
  const idx = (ix, iy) => ix + iy * (GX + 1);
  for (let i = 0; i < N; i++) {
    cur[i * 3] = prev[i * 3] = rest[i * 3] = pos.getX(i);
    cur[i * 3 + 1] = prev[i * 3 + 1] = rest[i * 3 + 1] = pos.getY(i);
  }
  for (let ix = 0; ix <= GX; ix++) pinned[ix] = 1;
  const BAND_ROWS = Math.round(GY * BAND);
  const SLIT_IX = SLIT_U.map((u) => Math.round(u * GX));
  const panelOf = (ix) => (ix < SLIT_IX[0] ? 0 : ix < SLIT_IX[1] ? 1 : 2);
  const linked = (ix, iy) => !(iy > BAND_ROWS && SLIT_IX.includes(ix + 1));
  const restH = BW / GX;
  const restV = BH / GY;
  const restD = Math.hypot(restH, restV);
  const GRAV = -1.65;
  const DAMP = 0.984;
  const DT = 0.016;

  // A quiet indoor draft — each panel catches it on its own beat.
  const wind = (ix, iy, t, out) => {
    const cx = ix / GX;
    const cy = iy / GY;
    const ph = panelOf(ix) * 2.1;
    const gust = 0.3 + 0.18 * Math.sin(t * 0.37 + ph * 0.6) + 0.1 * Math.sin(t * 0.93 + ph);
    const travel = t * 1.0 - cy * 2.2 + ph;
    out[0] = Math.sin(t * 0.44 + ph) * 0.12 * cy;
    out[1] = -0.18 * cy;
    out[2] = (Math.sin(travel) + 0.35 * Math.sin(travel * 1.8 + cx * 3.4)) * 1.1 * cy * gust;
  };

  // Something brushing through the cloth: a hand, or a camera walking through
  const hand = { x: 0, y: 0, strength: 0, dir: -1 };

  const solve = (a, b, rl) => {
    let dx = cur[b * 3] - cur[a * 3];
    let dy = cur[b * 3 + 1] - cur[a * 3 + 1];
    let dz = cur[b * 3 + 2] - cur[a * 3 + 2];
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
    const diff = ((d - rl) / d) * 0.5;
    dx *= diff;
    dy *= diff;
    dz *= diff;
    const pa = pinned[a];
    const pb = pinned[b];
    if (!pa && !pb) {
      cur[a * 3] += dx;
      cur[a * 3 + 1] += dy;
      cur[a * 3 + 2] += dz;
      cur[b * 3] -= dx;
      cur[b * 3 + 1] -= dy;
      cur[b * 3 + 2] -= dz;
    } else if (pa && !pb) {
      cur[b * 3] -= dx * 2;
      cur[b * 3 + 1] -= dy * 2;
      cur[b * 3 + 2] -= dz * 2;
    } else if (!pa && pb) {
      cur[a * 3] += dx * 2;
      cur[a * 3 + 1] += dy * 2;
      cur[a * 3 + 2] += dz * 2;
    }
  };

  const f = [0, 0, 0];
  let t = 0;
  const step = () => {
    t += DT;
    hand.strength *= 0.92;
    for (let iy = 0; iy <= GY; iy++) {
      for (let ix = 0; ix <= GX; ix++) {
        const i = idx(ix, iy);
        if (pinned[i]) continue;
        wind(ix, iy, t, f);
        if (hand.strength > 0.01) {
          const dx = cur[i * 3] - hand.x;
          const dy = cur[i * 3 + 1] - hand.y;
          const fall = Math.exp(-(dx * dx + dy * dy) / 0.18);
          f[2] += 9 * hand.dir * hand.strength * fall;
          f[0] += dx * 4 * hand.strength * fall;
        }
        for (let k = 0; k < 3; k++) {
          const j = i * 3 + k;
          const v = (cur[j] - prev[j]) * DAMP;
          prev[j] = cur[j];
          cur[j] += v + (k === 1 ? f[1] + GRAV : f[k]) * DT * DT;
        }
      }
    }
    for (let it = 0; it < 3; it++) {
      for (let iy = 0; iy <= GY; iy++) for (let ix = 0; ix < GX; ix++) if (linked(ix, iy)) solve(idx(ix, iy), idx(ix + 1, iy), restH);
      for (let iy = 0; iy < GY; iy++) for (let ix = 0; ix <= GX; ix++) solve(idx(ix, iy), idx(ix, iy + 1), restV);
      for (let iy = 0; iy < GY; iy++) {
        for (let ix = 0; ix < GX; ix++) {
          if (!linked(ix, iy) || !linked(ix, iy + 1)) continue;
          solve(idx(ix, iy), idx(ix + 1, iy + 1), restD);
          solve(idx(ix + 1, iy), idx(ix, iy + 1), restD);
        }
      }
    }
    for (let ix = 0; ix <= GX; ix++) for (let k = 0; k < 3; k++) cur[ix * 3 + k] = prev[ix * 3 + k] = rest[ix * 3 + k];
  };

  const commit = () => {
    for (let i = 0; i < N; i++) pos.setXYZ(i, cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2]);
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  };

  // Settle before the first frame so it never "drops in"
  for (let s = 0; s < 190; s++) step();
  commit();

  return {
    group,
    /** Advance one physics step and update the mesh. */
    tick() {
      step();
      commit();
    },
    /** Push the cloth at local (x, y); dir -1 pushes away from the viewer. */
    push(x, y, strength = 0.35, dir = -1) {
      hand.x = x;
      hand.y = y;
      hand.dir = dir;
      hand.strength = Math.min(1, hand.strength + strength);
    },
    dispose() {
      group.traverse((o) => {
        o.geometry?.dispose();
        const m = o.material;
        if (m) {
          m.map?.dispose();
          m.alphaMap?.dispose();
          m.dispose();
        }
      });
    },
  };
}

/**
 * The standalone noren: its own small canvas, used only when the 3D world
 * is not running. Throws if WebGL is unavailable (the still image stays).
 */
export async function createNoren(canvas, { lite = false, still = false } = {}) {
  await waitForNorenFont();

  const renderer = new WebGLRenderer({ canvas, antialias: !lite, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1.25 : 1.75));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  scene.background = new Color(0x000000);
  const back = new Mesh(new PlaneGeometry(13, 8.4), new MeshBasicMaterial({ map: canvasTexture(backlightTexture()) }));
  back.position.set(0, 0, -2.4);
  scene.add(back);

  const cloth = createNorenCloth({ lite, anisotropy: Math.min(8, renderer.capabilities.getMaxAnisotropy()) });
  scene.add(cloth.group);

  scene.add(new AmbientLight(0x2a221a, 0.7));
  const key = new DirectionalLight(0xfff0dc, 1.7);
  key.position.set(-2.6, 2.4, 2.6);
  scene.add(key);
  const rim = new DirectionalLight(0xffc896, 1.4);
  rim.position.set(0.5, 1.2, -3);
  scene.add(rim);

  const camera = new PerspectiveCamera(38, 1, 0.1, 100);
  const fit = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const half = Math.tan((38 * Math.PI) / 360);
    const vFit = (BH * 1.14) / 2 / half;
    const hFit = (BW + 1.0) / 2 / half / camera.aspect;
    camera.position.set(0, 0.04, Math.max(vFit, hFit) + 0.25);
    camera.lookAt(0, -0.04, 0);
    camera.updateProjectionMatrix();
  };
  fit();
  renderer.render(scene, camera);

  const ray = new Raycaster();
  const ndc = new Vector2();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  const onPointer = (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    if (ray.ray.intersectPlane(plane, hit)) cloth.push(hit.x, hit.y);
  };

  let raf = 0;
  let running = false;
  const loop = () => {
    if (!running) return;
    cloth.tick();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };

  if (!still) canvas.addEventListener("pointermove", onPointer, { passive: true });

  return {
    start() {
      if (still || running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    resize() {
      fit();
      renderer.render(scene, camera);
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onPointer);
      cloth.dispose();
      back.geometry.dispose();
      back.material.map.dispose();
      back.material.dispose();
      renderer.dispose();
    },
  };
}
