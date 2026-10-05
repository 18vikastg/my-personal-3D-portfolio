import { BoxGeometry, Group, InstancedMesh, Matrix4, Mesh } from "three";
import { anchor, block, frameOf, station, v } from "../kit";
import { segments } from "../../materials";

const LANES = [-0.9, 0, 0.9]; // emergency, high, normal

/**
 * SMART HEALTH QUEUE — patient flow as a working model: arrival → triage
 * gate → three priority lanes → the doctor's desk → done. Patients move;
 * the emergency patient overtakes the line. The structure *is* the
 * explanation: priority over arrival order.
 */
export function queue(ctx) {
  const g = new Group();
  g.position.set(4.6, 0, -80);
  g.rotation.y = -Math.PI / 2 + 0.25;
  g.add(block(ctx, [8.4, 0.05, 4.2], [0, 0.025, 0], { mat: "charcoal", line: "lineFaint" }));

  // Arrival door, triage gate, desk, exit
  [-0.7, 0.7].forEach((z) => g.add(block(ctx, [0.07, 2.0, 0.07], [-3.6, 1.0, z])));
  g.add(block(ctx, [0.07, 0.07, 1.47], [-3.6, 2.0, 0]));
  [-1.35, 1.35].forEach((z) => g.add(block(ctx, [0.07, 1.4, 0.07], [-2.2, 0.7, z], { line: "lineCream" })));
  g.add(block(ctx, [0.07, 0.07, 2.77], [-2.2, 1.4, 0], { line: "lineCream" }));
  g.add(block(ctx, [0.7, 0.9, 2.6], [2.5, 0.45, 0], { mat: "solid", line: "line" }));
  g.add(block(ctx, [0.72, 0.04, 2.62], [2.5, 0.92, 0], { mat: "solid", line: "lineLime" }));
  [-0.6, 0.6].forEach((z) => g.add(block(ctx, [0.07, 2.0, 0.07], [3.6, 1.0, z])));

  // Lanes
  const rails = [];
  LANES.forEach((z) => rails.push(-2.2, 0.06, z, 2.1, 0.06, z));
  g.add(segments(rails, ctx.mats.lineFaint));

  // Patients
  const per = ctx.quality === "low" ? 4 : 6;
  const geo = ctx.geo.get("box:0.2:0.34:0.2", () => new BoxGeometry(0.2, 0.34, 0.2));
  const crowd = new InstancedMesh(geo, ctx.mats.cream, per * 2);
  g.add(crowd);
  const urgent = new Mesh(geo, ctx.mats.lime);
  g.add(urgent);
  const m = new Matrix4();
  let time = 0;
  const update = (dt) => {
    time += dt * 0.35;
    let n = 0;
    [1, 2].forEach((lane) => {
      for (let i = 0; i < per; i++) {
        const u = (i / per + time * (lane === 1 ? 0.55 : 0.4)) % 1;
        m.makeTranslation(-2.1 + u * 4.1, 0.23, LANES[lane]);
        crowd.setMatrixAt(n++, m);
      }
    });
    crowd.instanceMatrix.needsUpdate = true;
    const u = (time * 1.1) % 1; // the emergency lane moves fastest
    urgent.position.set(-3.4 + u * 5.6, 0.23, LANES[0]);
    return true;
  };

  const at = (k) => [`queue:${k}`];
  const label = (key, x, z, stations, y = 2.35) => anchor(`queue:label-${key}`, { pos: v(x, y, z), scale: 0.0042, at: stations, parent: g });
  const anchors = [
    anchor("queue:intro", { pos: v(-4.6, 1.9, 1.5), ry: 0.45, at: at(0), parent: g }),
    anchor("queue:built", { pos: v(4.6, 1.9, 1.5), ry: -0.45, at: at(1), scale: 0.0034, parent: g }),
    label("arrival", -3.6, 0, [...at(0), ...at(1)]),
    label("triage", -2.2, 0, [...at(0), ...at(1)], 1.75),
    label("lanes", 0, 0, [...at(0), ...at(1)]),
    label("desk", 2.5, 0, [...at(0), ...at(1)]),
  ];

  const f = frameOf(g);
  const stations = [
    station("queue:0", "work", { focus: f.p(-3.4, 1.6, 1.0), dir: f.d(0.35, 0.18, 1), fit: 2.1, narrow: { anchor: "queue:intro" }, mood: "gallery" }),
    station("queue:1", "work", { focus: f.p(3.5, 1.6, 1.0), dir: f.d(-0.35, 0.18, 1), fit: 2.0, narrow: { anchor: "queue:built" }, mood: "gallery" }),
  ];
  return { group: g, anchors, stations, update };
}
