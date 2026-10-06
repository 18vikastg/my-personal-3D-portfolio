import {
  AdditiveBlending,
  BufferGeometry,
  CircleGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  SphereGeometry,
  TorusGeometry,
} from "three";
import { PALETTE } from "../materials";

/**
 * Silent Stories: the camera passes through a large cream ring — the ring and
 * red dot from the Silent Stories mark — into a black room with a low red
 * sun and a little dust in the air. The engine fades fog and floor around it.
 */
export function buildThreshold({ mats, ringAt, origin, dust }) {
  const g = new Group();

  const ring = new Mesh(new TorusGeometry(2.6, 0.022, 8, 160), mats.cream.clone());
  ring.material.transparent = true;
  ring.position.copy(ringAt);
  g.add(ring);
  const dot = new Mesh(new SphereGeometry(0.07, 16, 12), mats.red);
  dot.position.set(ringAt.x, ringAt.y - 2.6, ringAt.z);
  g.add(dot);

  // Low red sun on the far horizon
  const sun = new Mesh(
    new CircleGeometry(6, 64),
    new MeshBasicMaterial({ color: PALETTE.red, transparent: true, opacity: 0, fog: false, depthWrite: false })
  );
  sun.position.set(origin.x, 1.2, origin.z - 34);
  g.add(sun);

  // Dust motes, drifting slowly
  const n = dust;
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    p[i * 3] = origin.x + (Math.random() - 0.5) * 16;
    p[i * 3 + 1] = Math.random() * 6;
    p[i * 3 + 2] = origin.z + (Math.random() - 0.5) * 30;
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(p, 3));
  const motes = new Points(
    geo,
    new PointsMaterial({
      color: PALETTE.cream,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: AdditiveBlending,
    })
  );
  g.add(motes);

  // Sun and dust only exist inside the Silent Stories mood
  // The ring materialises as the camera approaches it, instead of looming early
  const setApproach = (distance, clear = 1) => {
    const o = Math.min(1, Math.max(0, 1 - (distance - 3) / 12)) * clear;
    ring.material.opacity = o;
    dot.visible = ring.visible = o > 0.01;
  };

  const setMood = (m) => {
    sun.material.opacity = 0.32 * m;
    sun.visible = m > 0.01;
    motes.material.opacity = 0.5 * m;
    motes.visible = m > 0.01;
  };

  const update = (dt, active) => {
    if (!active) return null;
    const a = geo.attributes.position.array;
    for (let i = 1; i < a.length; i += 3) {
      a[i] += dt * 0.06;
      if (a[i] > 6) a[i] = 0;
    }
    geo.attributes.position.needsUpdate = true;
    return null;
  };

  return { group: g, update, setMood, setApproach };
}
