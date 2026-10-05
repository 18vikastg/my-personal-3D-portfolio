import { Group, Mesh, MeshBasicMaterial, PlaneGeometry, QuadraticBezierCurve3, SphereGeometry, TorusGeometry } from "three";
import { anchor, block, frameOf, station, v } from "../kit";
import { segments } from "../../materials";

/**
 * AI MOCK INTERVIEW — an interview chamber. Two plinths face each other
 * across a table: you, and the model. A signal arcs between them — a
 * question one way, an answer the other — and a feedback stand records how
 * it went. The real interface is on the chamber's back wall.
 */
export function interview(ctx) {
  const g = new Group();
  g.position.set(-4.6, 0, -64);
  g.rotation.y = Math.PI / 2 - 0.25;

  const ring = new Mesh(ctx.geo.get("torus:2.4", () => new TorusGeometry(2.4, 0.015, 6, 96)), ctx.mats.cream);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  g.add(ring);

  // Back wall with the product
  g.add(block(ctx, [4.8, 2.9, 0.14], [0, 1.45, -1.9], { mat: "charcoal", line: "lineFaint" }));
  const screen = new Mesh(
    new PlaneGeometry(2.4, 1.5),
    new MeshBasicMaterial({ map: ctx.tex.load("/work/mock-interview.webp"), toneMapped: false })
  );
  screen.position.set(0, 1.85, -1.82);
  g.add(screen);

  // Two plinths facing each other, a table between
  g.add(block(ctx, [0.8, 1.1, 0.8], [-1.7, 0.55, 0.1], { mat: "solid", line: "line" }));
  g.add(block(ctx, [0.8, 1.1, 0.8], [1.7, 0.55, 0.1], { mat: "solid", line: "line" }));
  const core = new Mesh(ctx.geo.get("sph:0.11", () => new SphereGeometry(0.11, 20, 14)), ctx.mats.lime);
  core.position.set(1.7, 1.32, 0.1);
  g.add(core);
  const you = new Mesh(ctx.geo.get("sph:0.11", () => new SphereGeometry(0.11, 20, 14)), ctx.mats.cream);
  you.position.set(-1.7, 1.32, 0.1);
  g.add(you);
  g.add(block(ctx, [1.6, 0.05, 0.7], [0, 0.78, 0.1], { mat: "charcoal", line: "lineFaint" }));

  // The exchange: an arc with a pulse travelling along it
  const arc = new QuadraticBezierCurve3(v(1.7, 1.35, 0.1), v(0, 2.3, 0.1), v(-1.7, 1.35, 0.1));
  const pts = arc.getPoints(40);
  const flat = [];
  for (let i = 0; i < pts.length - 1; i++) flat.push(...pts[i].toArray(), ...pts[i + 1].toArray());
  g.add(segments(flat, ctx.mats.lineFaint));
  const pulse = new Mesh(ctx.geo.get("sph:0.06", () => new SphereGeometry(0.06, 12, 8)), ctx.mats.cream);
  g.add(pulse);

  // Feedback stand (illustrative report)
  g.add(block(ctx, [0.06, 1.3, 0.06], [3.6, 0.65, -0.6]));
  [0.45, 0.7, 0.55, 0.8].forEach((h, i) => g.add(block(ctx, [0.14, h, 0.14], [3.25 + i * 0.24, 1.3 + h / 2, -0.6], { mat: i === 3 ? "lime" : "solid", line: "lineFaint" })));

  let time = 0;
  const update = (dt) => {
    time += dt;
    const u = (time % 4) / 4;
    const out = u < 0.5; // question out, answer back
    arc.getPoint(out ? u * 2 : 2 - u * 2, pulse.position);
    pulse.material = out ? ctx.mats.lime : ctx.mats.cream;
    return true;
  };

  const at = (k) => [`interview:${k}`];
  const anchors = [
    anchor("interview:title", { pos: v(0, 3.15, -1.82), at: at(0), parent: g }),
    anchor("interview:problem", { pos: v(-3.5, 1.75, 0.5), ry: 0.45, at: at(1), parent: g }),
    anchor("interview:built", { pos: v(0, 0.42, 0.47), at: at(2), scale: 0.0024, parent: g }),
    anchor("interview:eng", { pos: v(3.6, 2.6, -0.2), ry: -0.45, at: at(3), scale: 0.0034, parent: g }),
    anchor("interview:you", { pos: v(-1.7, 1.85, 0.1), scale: 0.004, at: [...at(0), ...at(2)], parent: g }),
    anchor("interview:ai", { pos: v(1.7, 1.85, 0.1), scale: 0.004, at: [...at(0), ...at(2)], parent: g }),
  ];

  const f = frameOf(g);
  const stations = [
    station("interview:0", "work", { focus: f.p(0, 1.75, -0.6), dir: f.d(0, 0.14, 1), fit: 3.3, narrow: { focus: f.p(0, 2.6, -1.0), fit: 1.9 }, mood: "chamber" }),
    station("interview:1", "work", { focus: f.p(-2.8, 1.5, 0.3), dir: f.d(0.42, 0.12, 1), fit: 1.8, narrow: { anchor: "interview:problem" }, mood: "chamber" }),
    station("interview:2", "work", { focus: f.p(0, 1.1, 0.4), dir: f.d(0, 0.22, 1), fit: 1.5, narrow: { focus: f.p(0, 0.9, 0.45), fit: 1.0 }, mood: "chamber" }),
    station("interview:3", "work", { focus: f.p(3.5, 2.3, -0.25), dir: f.d(-0.45, 0.06, 1), fit: 1.6, narrow: { anchor: "interview:eng" }, mood: "chamber" }),
  ];
  return { group: g, anchors, stations, update };
}
