import {
  AdditiveBlending,
  BufferGeometry,
  ConeGeometry,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Points,
  PointsMaterial,
} from "three";
import { PALETTE } from "../../materials";
import { anchor, block, boxGeo, slab, station, tint, v } from "../kit";
import { silentStories as ss } from "../../../data/site";

const SCREEN_Z = -282;

/**
 * CINEMA — Silent Stories. Past the noren the studio becomes a screening
 * room: rows of seats in the dark, a projector beam through drifting dust,
 * deep-red curtains, and ANTARDRISHTI on the screen. The brand is on the
 * side wall, the film's words beside the screen. Two exits flank the screen.
 */
export function cinema(ctx) {
  const g = new Group();
  const red = tint(ctx, "#4a0b0e", 0.95);

  // Screen wall with two side exits
  const seg = (x0, x1) => block(ctx, [x1 - x0, 4.8, 0.24], [(x0 + x1) / 2, 2.4, SCREEN_Z], { mat: "charcoal", line: "lineFaint" });
  g.add(seg(-14, -6.9), seg(-5.5, 5.5), seg(6.9, 14));
  [-6.2, 6.2].forEach((x) => g.add(block(ctx, [1.4, 1.4, 0.24], [x, 4.1, SCREEN_Z], { mat: "charcoal", line: "lineFaint" })));
  [-7.2, 7.2].forEach((x) => g.add(block(ctx, [0.2, 4.6, 34], [x, 2.3, -265], { mat: "charcoal", line: "lineFaint" })));

  // Screen: the poster, framed by curtains
  const ph = 4.0;
  const pw = ph * (760 / 1076);
  const poster = new Mesh(new PlaneGeometry(pw, ph), new MeshBasicMaterial({ map: ctx.tex.load(ss.film.poster), toneMapped: false }));
  poster.position.set(0, 2.4, SCREEN_Z + 0.14);
  g.add(poster);
  [-1, 1].forEach((s) => g.add(slab(ctx, [0.7, 4.6, 0.12], [s * (pw / 2 + 0.45), 2.3, SCREEN_Z + 0.2], red)));

  // Seats
  const rows = ctx.quality === "low" ? 3 : 5;
  const seats = new InstancedMesh(boxGeo(ctx, 0.55, 0.5, 0.5), tint(ctx, "#151313", 0.9), rows * 8);
  const m = new Matrix4();
  let n = 0;
  for (let r = 0; r < rows; r++) for (let i = 0; i < 8; i++) {
    m.makeTranslation(-3.1 + i * 0.8 + (i > 3 ? 0.6 : 0) - 0.3, 0.25 + r * 0.12, -262 - r * 1.1);
    seats.setMatrixAt(n++, m);
  }
  g.add(seats);

  // Projector beam + dust (visible only in the cinema's mood)
  const beam = new Mesh(
    ctx.geo.get("beam", () => new ConeGeometry(2.6, 22, 32, 1, true)),
    new MeshBasicMaterial({ color: PALETTE.cream, transparent: true, opacity: 0.035, depthWrite: false, blending: AdditiveBlending, fog: false })
  );
  beam.rotation.x = -Math.PI / 2;
  beam.position.set(0, 3.2, SCREEN_Z + 11);
  g.add(beam);
  const count = ctx.quality === "low" ? 80 : ctx.quality === "medium" ? 140 : 220;
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    p[i * 3] = (Math.random() - 0.5) * 6;
    p[i * 3 + 1] = 1 + Math.random() * 4;
    p[i * 3 + 2] = SCREEN_Z + 2 + Math.random() * 18;
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute("position", new Float32BufferAttribute(p, 3));
  const dust = new Points(dustGeo, new PointsMaterial({ color: PALETTE.cream, size: 0.03, transparent: true, opacity: 0.5, depthWrite: false, blending: AdditiveBlending }));
  g.add(dust);

  const update = (dt, s) => {
    const on = s.room === "cinema";
    beam.visible = dust.visible = on || s.room === "threshold";
    if (!on) return false;
    const a = dustGeo.attributes.position.array;
    for (let i = 1; i < a.length; i += 3) {
      a[i] += dt * 0.05;
      if (a[i] > 5) a[i] = 1;
    }
    dustGeo.attributes.position.needsUpdate = true;
    return true;
  };

  const anchors = [
    anchor("cinema:brand", { pos: v(-7.08, 2.1, -254), ry: Math.PI / 2, scale: 0.0032, at: ["cinema:0"], parent: g }),
    anchor("cinema:title", { pos: v(-3.65, 3.0, SCREEN_Z + 0.14), scale: 0.0033, at: ["cinema:1"], parent: g }),
    anchor("cinema:film", { pos: v(3.75, 2.35, SCREEN_Z + 0.14), scale: 0.0026, at: ["cinema:1", "cinema:2"], parent: g }),
  ];
  const stations = [
    station("cinema:0", "cinema", { focus: v(-7.08, 2.1, -254), dir: v(1, 0.04, 0.35), fit: 1.55, narrow: { anchor: "cinema:brand" }, via: [v(0, 1.8, -248)], mood: "cinema" }),
    station("cinema:1", "cinema", { focus: v(0, 2.45, SCREEN_Z), dir: v(0, 0.05, 1), fit: 2.75, narrow: { focus: v(0, 2.45, SCREEN_Z), fit: 1.6 }, mood: "cinema" }),
    station("cinema:2", "cinema", { focus: v(3.75, 2.35, SCREEN_Z), dir: v(-0.3, 0.03, 1), fit: 1.45, narrow: { anchor: "cinema:film" }, mood: "cinema" }),
  ];
  return { group: g, anchors, stations, update };
}
