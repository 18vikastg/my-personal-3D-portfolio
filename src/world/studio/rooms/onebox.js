import { BoxGeometry, CatmullRomCurve3, Group, InstancedMesh, Matrix4, Mesh, TorusGeometry } from "three";
import { anchor, block, frameOf, station, v } from "../kit";
import { segments } from "../../materials";

const BINS = ["interested", "meeting", "notinterested", "spam", "ooo"];

/**
 * ONEBOX — many inboxes, one place. Two inbox trays (Gmail, Outlook) feed
 * rails into a classifier ring; envelopes drop into five category bins and
 * end on one unified desk. Aggregation and sorting, made physical.
 */
export function onebox(ctx) {
  const g = new Group();
  g.position.set(-4.6, 0, -96);
  g.rotation.y = Math.PI / 2 - 0.25;
  g.add(block(ctx, [8.4, 0.05, 4.2], [0, 0.025, 0], { mat: "charcoal", line: "lineFaint" }));

  // Two inbox trays
  [-0.9, 0.9].forEach((z) => {
    for (let k = 0; k < 3; k++) g.add(block(ctx, [1.0, 0.06, 0.7], [-3.2, 0.7 + k * 0.1, z], { mat: "solid", line: "lineFaint" }));
    g.add(block(ctx, [0.06, 0.7, 0.06], [-3.2, 0.35, z]));
  });

  // Classifier ring
  const ring = new Mesh(ctx.geo.get("torus:0.75", () => new TorusGeometry(0.75, 0.03, 8, 64)), ctx.mats.cream);
  ring.position.set(-0.6, 1.2, 0);
  ring.rotation.y = Math.PI / 2;
  g.add(ring);

  // Category bins in an arc, then one desk
  BINS.forEach((_, i) => {
    const z = -1.4 + i * 0.7;
    g.add(block(ctx, [0.45, 0.4, 0.45], [1.0, 0.2, z], { mat: "solid", line: i === 0 ? "lineLime" : "lineFaint" }));
  });
  g.add(block(ctx, [1.0, 0.8, 3.0], [3.0, 0.4, 0], { mat: "solid", line: "lineLime" }));

  // Rails and flowing envelopes
  const paths = [-0.9, 0.9].map(
    (z, k) =>
      new CatmullRomCurve3([v(-3.2, 0.95, z), v(-1.6, 1.2, z * 0.5), v(-0.6, 1.2, 0), v(0.5, 0.8, -1.4 + k * 1.4), v(3.0, 0.9, 0)])
  );
  const pts = [];
  paths.forEach((c) => {
    const s = c.getPoints(48);
    for (let i = 0; i < s.length - 1; i++) pts.push(...s[i].toArray(), ...s[i + 1].toArray());
  });
  g.add(segments(pts, ctx.mats.lineFaint));
  const per = ctx.quality === "low" ? 4 : 7;
  const env = new InstancedMesh(ctx.geo.get("box:0.24:0.02:0.16", () => new BoxGeometry(0.24, 0.02, 0.16)), ctx.mats.cream, per * 2);
  g.add(env);
  const m = new Matrix4();
  const p = v(0, 0, 0);
  let time = 0;
  const update = (dt) => {
    time += dt * 0.12;
    let n = 0;
    paths.forEach((c, k) => {
      for (let i = 0; i < per; i++) {
        c.getPoint((i / per + time + k * 0.07) % 1, p);
        m.makeTranslation(p.x, p.y, p.z);
        env.setMatrixAt(n++, m);
      }
    });
    env.instanceMatrix.needsUpdate = true;
    return true;
  };

  const at = (k) => [`onebox:${k}`];
  const both = [...at(0), ...at(1)];
  const anchors = [
    anchor("onebox:intro", { pos: v(-4.6, 1.9, 1.5), ry: 0.45, at: at(0), parent: g }),
    anchor("onebox:built", { pos: v(4.6, 1.95, 1.5), ry: -0.45, at: at(1), scale: 0.0034, parent: g }),
    anchor("onebox:label-gmail", { pos: v(-3.2, 1.25, -0.9), scale: 0.0042, at: both, parent: g }),
    anchor("onebox:label-outlook", { pos: v(-3.2, 1.25, 0.9), scale: 0.0042, at: both, parent: g }),
    anchor("onebox:label-ai", { pos: v(-0.6, 2.2, 0), scale: 0.0042, at: both, parent: g }),
    anchor("onebox:label-bins", { pos: v(1.0, 0.85, 0), scale: 0.0042, at: both, parent: g }),
    anchor("onebox:label-desk", { pos: v(3.0, 1.2, 0), scale: 0.0042, at: both, parent: g }),
  ];

  const f = frameOf(g);
  const stations = [
    station("onebox:0", "work", { focus: f.p(-3.4, 1.6, 1.0), dir: f.d(0.35, 0.18, 1), fit: 2.1, narrow: { anchor: "onebox:intro" }, mood: "gallery" }),
    station("onebox:1", "work", { focus: f.p(3.5, 1.6, 1.0), dir: f.d(-0.35, 0.18, 1), fit: 2.0, narrow: { anchor: "onebox:built" }, mood: "gallery" }),
  ];
  return { group: g, anchors, stations, update };
}
