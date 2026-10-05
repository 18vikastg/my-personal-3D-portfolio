import { BoxGeometry, Euler, Group, InstancedMesh, Matrix4, Plane, Quaternion, Raycaster, Vector2, Vector3 } from "three";
import { anchor, block, partition, station, v } from "../kit";
import { on } from "../../bus";
import { lab as items } from "../../../data/lab";

/**
 * LAB — the room *is* the experiment. A generative lattice of rods stands in
 * the middle; three controls on a bench (HTML sliders) change its density,
 * twist and noise, and the pointer (or a finger) bends it locally. Around
 * the walls, the side projects stand as specimens on plinths with their
 * labels — things built because the idea wouldn't leave.
 */
const C = v(0, 1.7, -184);

export function labRoom(ctx) {
  const g = new Group();
  partition(ctx, -194).forEach((b) => g.add(b));
  g.add(block(ctx, [2.4, 0.1, 2.4], [C.x, 0.05, C.z], { mat: "charcoal", line: "lineFaint" }));

  // The experiment: a generative tower — rings of short rods stacked upward.
  // Density sets how many rings and rods, twist turns each ring further than
  // the last, noise makes it breathe; the pointer bulges the rings near it.
  const maxRings = ctx.quality === "low" ? 10 : 16;
  const maxPer = ctx.quality === "low" ? 12 : 18;
  const rodGeo = ctx.geo.get("box:0.46:0.035:0.035", () => new BoxGeometry(0.46, 0.035, 0.035));
  const rods = new InstancedMesh(rodGeo, ctx.mats.cream, maxRings * maxPer);
  g.add(rods);
  const params = { density: 0.7, twist: 0.35, noise: 0.25 };
  const press = { y: -99, s: 0 };
  const m = new Matrix4();
  const q = new Quaternion();
  const e = new Euler();
  const pos = new Vector3();
  const one = new Vector3(1, 1, 1);
  let time = 0;
  const layout = () => {
    const rings = Math.max(4, Math.round(maxRings * (0.35 + params.density * 0.65)));
    const per = Math.max(6, Math.round(maxPer * (0.4 + params.density * 0.6)));
    let k = 0;
    for (let r = 0; r < rings; r++) {
      const y = 0.35 + (r / (rings - 1)) * 2.9;
      const bulge = press.s * Math.exp(-Math.abs(y - press.y) * 2.2) * 0.45;
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2 + r * params.twist * 0.9 + time * 0.15;
        const wobble = Math.sin(a * 3 + time + r * 0.7) * params.noise * 0.25;
        const rad = 0.75 + wobble + bulge + Math.sin(r * 0.5) * 0.12;
        pos.set(C.x + Math.cos(a) * rad, y + Math.sin(time + i) * params.noise * 0.05, C.z + Math.sin(a) * rad);
        e.set(0, -a + Math.PI / 2, params.twist * 0.6);
        q.setFromEuler(e);
        m.compose(pos, q, one);
        rods.setMatrixAt(k++, m);
      }
    }
    rods.count = k;
    rods.instanceMatrix.needsUpdate = true;
  };
  layout();

  let changed = true;
  const off = on("lab", (p) => {
    Object.assign(params, p);
    changed = true;
  });

  // Pointer / touch: the height you point at bulges outward
  const ray = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), -C.z);
  const hit = new Vector3();
  const ndc = new Vector2();
  const update = (dt, s) => {
    if (s.room !== "lab") return false;
    time += dt * 0.5;
    if (s.pointer.moved) {
      ndc.set(s.pointer.x, s.pointer.y);
      ray.setFromCamera(ndc, s.camera);
      if (ray.ray.intersectPlane(plane, hit) && Math.abs(hit.x - C.x) < 1.8 && hit.y > 0 && hit.y < 3.6) {
        press.y = hit.y;
        press.s = Math.min(1, press.s + 0.25);
      }
    }
    press.s *= 0.95;
    layout();
    changed = false;
    return true;
  };

  // Specimens: plinths along both walls
  const spots = items.map((_, i) => {
    const left = i < 4;
    const k = left ? i : i - 4;
    return { x: left ? -4.3 : 4.3, z: -180 - k * 2.6, ry: left ? Math.PI / 2 - 0.5 : -Math.PI / 2 + 0.5 };
  });
  spots.forEach(({ x, z }) => g.add(block(ctx, [0.7, 1.0, 0.7], [x, 0.5, z], { mat: "solid", line: "lineFaint" })));
  [-4.9, 4.9].forEach((x) => g.add(block(ctx, [0.2, 4.0, 13], [x, 2.0, -184.5], { mat: "charcoal", line: "lineFaint" })));

  const anchors = [
    anchor("lab:title", { pos: v(0, 4.0, -187.2), at: ["lab:0"], scale: 0.0034, parent: g }),
    anchor("lab:controls", { pos: v(-2.7, 1.25, -181.4), rx: -0.45, ry: 0.4, scale: 0.0032, at: ["lab:1"], parent: g }),
    ...items.map((_, i) =>
      anchor(`lab:item-${i}`, {
        pos: v(spots[i].x + (spots[i].x < 0 ? 0.4 : -0.4), 1.75, spots[i].z),
        ry: spots[i].ry,
        scale: 0.0026,
        at: [`lab:${i + 2}`],
        parent: g,
      })
    ),
  ];

  const stations = [
    station("lab:0", "lab", { focus: v(0, 2.3, -185), dir: v(0, 0.16, 1), fit: 2.65, narrow: { focus: v(0, 3.3, -187.2), fit: 1.9 }, via: [v(0, 1.9, -176.8)], mood: "lab" }),
    station("lab:1", "lab", { focus: v(-1.8, 1.4, -182.2), dir: v(0.45, 0.45, 1), fit: 1.5, narrow: { anchor: "lab:controls" }, mood: "lab" }),
    ...items.map((_, i) => {
      const sp = spots[i];
      const inward = sp.x < 0 ? 1 : -1;
      return station(`lab:${i + 2}`, "lab", {
        focus: v(sp.x + inward * 0.4, 1.6, sp.z),
        dir: v(inward * 0.7, 0.1, 1),
        fit: 1.15,
        narrow: { anchor: `lab:item-${i}` },
        mood: "lab",
      });
    }),
  ];
  return { group: g, anchors, stations, update, dispose: off, wants: () => changed };
}
