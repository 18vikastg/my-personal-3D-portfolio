import { Group, Mesh, MeshBasicMaterial, PlaneGeometry, SphereGeometry } from "three";
import { anchor, block, cylinder, frameOf, station, v } from "../kit";
import { segments } from "../../materials";

const ROLES = [
  ["students", -2.9, 0.9],
  ["faculty", -2.1, -1.7],
  ["recruiters", 2.1, -1.7],
  ["admins", 2.9, 0.9],
];

/**
 * PREPLINK — a placement command centre. A round command table with the
 * real interface as its main display; four role stations (students,
 * faculty, recruiters, admins) wired to it; an eligibility gate in front
 * leading to a rack of jobs (one applied for); and the AI career roadmap as
 * a flight of rising steps.
 */
export function preplink(ctx) {
  const g = new Group();
  g.position.set(4.6, 0, -46);
  g.rotation.y = -Math.PI / 2 + 0.25;
  g.add(block(ctx, [7.2, 0.05, 5.6], [0, 0.025, 0], { mat: "charcoal", line: "lineFaint" }));

  // Command table + main display
  g.add(cylinder(ctx, 1.4, 0.9, [0, 0.45, -0.2], { mat: "solid", seg: 48 }));
  const display = new Mesh(
    new PlaneGeometry(2.4, 1.5),
    new MeshBasicMaterial({ map: ctx.tex.load("/work/preplink.webp"), toneMapped: false })
  );
  display.position.set(0, 1.95, -0.6);
  g.add(display);
  g.add(block(ctx, [2.52, 1.62, 0.05], [0, 1.95, -0.63], { mat: "solid", line: "lineCream" }));

  // Role stations, each wired to the table
  const wires = [];
  ROLES.forEach(([, x, z]) => {
    g.add(cylinder(ctx, 0.32, 1.0, [x, 0.5, z], { mat: "charcoal", seg: 24 }));
    const token = new Mesh(ctx.geo.get("sph:0.1", () => new SphereGeometry(0.1, 14, 10)), ctx.mats.cream);
    token.position.set(x, 1.1, z);
    g.add(token);
    wires.push(x, 0.9, z, 0, 0.9, -0.2);
  });
  g.add(segments(wires, ctx.mats.lineFaint));

  // Eligibility gate → jobs rack
  [-1.9, -0.9].forEach((x) => g.add(block(ctx, [0.07, 1.7, 0.07], [x, 0.85, 2.0])));
  g.add(block(ctx, [1.07, 0.07, 0.07], [-1.4, 1.7, 2.0]));
  for (let i = 0; i < 6; i++) {
    const card = block(ctx, [0.04, 0.62, 0.46], [0.4 + i * 0.22, 0.55, 2.1], { mat: "solid", line: i === 3 ? "lineLime" : "lineFaint" });
    card.position.y = i === 3 ? 0.85 : 0.55; // one application, lifted
    g.add(card);
  }

  // AI career roadmap: rising steps, the last one lit
  for (let i = 0; i < 5; i++) {
    const h = 0.18 + i * 0.22;
    g.add(block(ctx, [0.55, h, 0.55], [2.7 + i * 0.5, h / 2, 1.9 - i * 0.18], { mat: "solid", line: i === 4 ? "lineLime" : "line" }));
  }

  const at = (k) => [`preplink:${k}`];
  const anchors = [
    anchor("preplink:title", { pos: v(0, 3.2, -0.62), at: at(0), parent: g }),
    anchor("preplink:problem", { pos: v(-3.9, 1.85, 0.2), ry: 0.5, at: at(1), parent: g }),
    anchor("preplink:built", { pos: v(-1.1, 2.55, 2.1), at: at(2), scale: 0.0034, parent: g }),
    anchor("preplink:eng", { pos: v(4.6, 2.05, 1.0), ry: -0.5, at: at(3), scale: 0.0034, parent: g }),
    ...ROLES.map(([k, x, z]) => anchor(`preplink:role-${k}`, { pos: v(x, 1.5, z), scale: 0.004, at: [...at(0), ...at(1)], parent: g })),
  ];

  const f = frameOf(g);
  const stations = [
    station("preplink:0", "work", { focus: f.p(0, 1.7, -0.2), dir: f.d(0, 0.2, 1), fit: 3.7, narrow: { focus: f.p(0, 2.6, -0.4), fit: 1.9 }, mood: "gallery" }),
    station("preplink:1", "work", { focus: f.p(-3.0, 1.5, 0.1), dir: f.d(0.45, 0.16, 1), fit: 2.0, narrow: { anchor: "preplink:problem" }, mood: "gallery" }),
    station("preplink:2", "work", { focus: f.p(-0.8, 1.6, 2.0), dir: f.d(0, 0.2, 1), fit: 1.7, narrow: { anchor: "preplink:built" }, mood: "gallery" }),
    station("preplink:3", "work", { focus: f.p(4.1, 1.7, 1.2), dir: f.d(-0.45, 0.1, 1), fit: 1.6, narrow: { anchor: "preplink:eng" }, mood: "gallery" }),
  ];
  return { group: g, anchors, stations };
}
