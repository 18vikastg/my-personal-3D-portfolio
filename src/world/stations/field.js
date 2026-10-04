import { BufferGeometry, Float32BufferAttribute, Group, LineSegments, Plane, Raycaster, Vector2, Vector3 } from "three";

/**
 * Lab: a topographic sheet of lines that keeps shifting — unfinished ground.
 * The pointer presses a ripple into it. Line density follows device quality.
 */
export function buildField({ origin, mats, offset, detail, camera, pointer }) {
  const g = new Group();
  g.position.set(origin.x + offset, 0.6, origin.z);

  const n = Math.round(56 * detail) + 16; // samples per row
  const rows = Math.round(26 * detail) + 10;
  const W = 9;
  const D = 6;
  const base = [];
  for (let r = 0; r < rows; r++) {
    const z = -D / 2 + (r / (rows - 1)) * D;
    for (let i = 0; i < n - 1; i++) {
      const x0 = -W / 2 + (i / (n - 1)) * W;
      const x1 = -W / 2 + ((i + 1) / (n - 1)) * W;
      base.push(x0, 0, z, x1, 0, z);
    }
  }
  const pos = new Float32Array(base);
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  const mat = mats.lineCream.clone();
  mat.opacity = 0.4;
  g.add(new LineSegments(geo, mat));

  const ray = new Raycaster();
  const plane = new Plane(new Vector3(0, 1, 0), -0.6);
  const hit = new Vector3();
  const ndc = new Vector2();
  const press = { x: 999, z: 999, s: 0 };

  let time = 0;
  const update = (dt, active) => {
    if (!active) return null;
    time += dt * 0.6;
    if (pointer.moved) {
      ndc.set(pointer.x, pointer.y);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) {
        press.x = hit.x - g.position.x;
        press.z = hit.z - g.position.z;
        press.s = Math.min(1, press.s + 0.2);
      }
    }
    press.s *= 0.96;
    const a = geo.attributes.position.array;
    for (let k = 0; k < a.length; k += 3) {
      const x = base[k];
      const z = base[k + 2];
      let y =
        Math.sin(x * 0.9 + time) * 0.18 +
        Math.sin(z * 1.3 - time * 0.7 + x * 0.3) * 0.14 +
        Math.sin((x + z) * 0.5 + time * 0.4) * 0.1;
      if (press.s > 0.01) {
        const d = Math.hypot(x - press.x, z - press.z);
        y += Math.sin(d * 4 - time * 6) * Math.exp(-d * 0.9) * 0.35 * press.s;
      }
      a[k + 1] = y;
    }
    geo.attributes.position.needsUpdate = true;
    return null;
  };

  return { group: g, update };
}
