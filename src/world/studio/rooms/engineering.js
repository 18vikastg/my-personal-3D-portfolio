import { BoxGeometry, CatmullRomCurve3, Group, InstancedMesh, Matrix4, Mesh, SphereGeometry, TorusGeometry } from "three";
import { anchor, block, partition, station, v } from "../kit";
import { segments } from "../../materials";

/*
 * ENGINEERING FLOOR — a working miniature of the kind of workflow engine I
 * build (illustrative; no real process, client or data). It runs alongside
 * the visitor's walk: intake scanner → STATE → TASK → ASSIGNMENT (fork to
 * people) → SCHEDULER → SLA timer (escalation ramp) → REVIEW (parallel
 * gates; reject loops back to draft) → AUDIT (ledger grows) → COMPLETION.
 * Tokens take different routes — approve, reject, escalate — so how the
 * system behaves is visible before a word is read.
 */
const X = 3; // machine runs along -Z at x = 3; the visitor walks at x ≈ -1
const Z = { scan: -111.5, state: -113.5, task: -118, assign: -122.5, sched: -127, sla: -131.5, review: -136, audit: -140.5, done: -145 };

export function engineering(ctx) {
  const g = new Group();
  const { mats } = ctx;

  // Floor of the room: a raised platform under the machine, the long wall opposite
  g.add(block(ctx, [4.4, 0.2, 38], [X + 0.6, 0.1, -128.5], { mat: "charcoal", line: "line" }));
  g.add(block(ctx, [0.2, 4.2, 46], [-4.7, 2.1, -131], { mat: "charcoal", line: "lineFaint" }));
  partition(ctx, -157).forEach((b) => g.add(b));
  const top = 0.2;

  // Intake scanner arch (barcode / QR)
  [-0.75, 0.75].forEach((dx) => g.add(block(ctx, [0.06, 1.3, 0.06], [X + dx, top + 0.65, Z.scan], { line: "lineCream" })));
  g.add(block(ctx, [1.56, 0.06, 0.06], [X, top + 1.3, Z.scan], { line: "lineCream" }));

  const unit = (z, w = 1.0, h = 0.6, line = "lineCream") => g.add(block(ctx, [w, h, 0.9], [X, top + h / 2, z], { mat: "machine", line }));
  unit(Z.state);
  unit(Z.task, 1.1, 0.75);
  unit(Z.assign);
  // Assignment fork → three people
  const fork = [];
  [-1.0, 0, 1.0].forEach((dz) => {
    const p = new Mesh(ctx.geo.get("box:0.24:0.5:0.24", () => new BoxGeometry(0.24, 0.5, 0.24)), mats.cream);
    p.position.set(X + 1.5, top + 0.25, Z.assign + dz);
    g.add(p);
    fork.push(X + 0.5, top + 0.45, Z.assign, X + 1.4, top + 0.45, Z.assign + dz);
  });
  g.add(segments(fork, mats.lineFaint));

  // Scheduler: a clock dial with a hand
  unit(Z.sched, 0.8, 0.5);
  const dial = new Mesh(ctx.geo.get("torus:0.5", () => new TorusGeometry(0.5, 0.025, 8, 64)), mats.cream);
  dial.position.set(X - 0.2, top + 1.35, Z.sched);
  dial.rotation.y = Math.PI / 2;
  g.add(dial);
  const hand = block(ctx, [0.04, 0.42, 0.04], [0, 0.21, 0], { mat: "lime", line: "lineLime" });
  const handPivot = new Group();
  handPivot.position.copy(dial.position);
  handPivot.add(hand);
  g.add(handPivot);

  // SLA timer + escalation ramp up to a supervisor node
  unit(Z.sla, 1.0, 0.6, "lineLime");
  const sla = new Mesh(ctx.geo.get("torus:0.62:arc", () => new TorusGeometry(0.62, 0.02, 6, 64, Math.PI * 1.4)), mats.cream);
  sla.position.set(X, top + 0.02, Z.sla);
  sla.rotation.x = -Math.PI / 2;
  g.add(sla);
  const ramp = block(ctx, [0.5, 0.05, 2.6], [X + 0.4, top + 1.2, Z.sla - 0.9], { mat: "solid", line: "lineFaint" });
  ramp.rotation.x = 0.75;
  g.add(ramp);
  g.add(block(ctx, [0.7, 0.5, 0.7], [X + 0.4, top + 2.55, Z.sla - 1.9], { mat: "solid", line: "lineLime" }));

  // Review: two parallel gates (QA, Prod)
  [-0.75, 0.75].forEach((dx) => {
    [-0.4, 0.4].forEach((dz) => g.add(block(ctx, [0.05, 1.0, 0.05], [X + dx, top + 0.5, Z.review + dz])));
    g.add(block(ctx, [0.05, 0.05, 0.85], [X + dx, top + 1.0, Z.review]));
  });

  // Audit ledger: tiles that pile up as work completes
  const ledgerGeo = ctx.geo.get("box:0.9:0.05:0.6", () => new BoxGeometry(0.9, 0.05, 0.6));
  const ledger = new InstancedMesh(ledgerGeo, mats.paper, 14);
  ledger.count = 0;
  g.add(ledger);

  // Completion gate
  [-0.6, 0.6].forEach((dx) => g.add(block(ctx, [0.06, 1.6, 0.06], [X + dx, top + 0.8, Z.done], { mat: "lime", line: "lineLime" })));
  g.add(block(ctx, [1.26, 0.06, 0.06], [X, top + 1.6, Z.done], { mat: "lime", line: "lineLime" }));

  // Overhead dashboard frame (the workflow dashboard watches the whole line)
  g.add(block(ctx, [0.06, 1.3, 2.4], [X + 1.9, top + 2.9, -128], { mat: "solid", line: "lineCream" }));

  // Routes
  const y = top + 0.75;
  const P = (x, z, yy = y) => v(x, yy, z);
  const approve = (side) =>
    new CatmullRomCurve3([P(X, -110), P(X, Z.state), P(X, Z.task), P(X, Z.assign), P(X, Z.sched), P(X, Z.sla), P(X + side, Z.review - 0.1), P(X, Z.audit), P(X, Z.done), P(X, -148)]);
  const reject = new CatmullRomCurve3([P(X, -110), P(X, Z.task), P(X, Z.sla), P(X + 0.75, Z.review), P(X + 1.9, Z.review + 1.5, top + 0.3), P(X + 1.9, Z.task, top + 0.3), P(X + 1.0, Z.state + 0.5, top + 0.4), P(X, Z.state)]);
  const escalate = new CatmullRomCurve3([P(X, -110), P(X, Z.task), P(X, Z.sched), P(X, Z.sla), P(X + 0.4, Z.sla - 1.9, top + 2.9), P(X, Z.review), P(X, Z.audit), P(X, Z.done), P(X, -148)]);
  const routes = [approve(-0.75), reject, approve(0.75), escalate, approve(-0.75)];

  // Rails drawn under the main route and the return/escalation tracks
  const rail = [];
  [approve(-0.75), approve(0.75), reject, escalate].forEach((c) => {
    const s = c.getPoints(120);
    for (let i = 0; i < s.length - 1; i++) rail.push(s[i].x, s[i].y - 0.3, s[i].z, s[i + 1].x, s[i + 1].y - 0.3, s[i + 1].z);
  });
  g.add(segments(rail, mats.lineFaint));

  const count = ctx.quality === "low" ? 3 : 5;
  const tokens = new InstancedMesh(ctx.geo.get("sph:0.11", () => new SphereGeometry(0.11, 16, 10)), mats.lime, count);
  g.add(tokens);
  const m = new Matrix4();
  const p = v(0, 0, 0);
  let time = 0;
  let completed = 0;
  let lastLap = 0;
  const update = (dt, s) => {
    if (s.room !== "engineering") return false;
    time += dt / 14; // one full journey every ~14 s
    for (let i = 0; i < count; i++) {
      const u = (time + i / count) % 1;
      routes[i % routes.length].getPoint(u, p);
      m.makeTranslation(p.x, p.y, p.z);
      tokens.setMatrixAt(i, m);
    }
    tokens.instanceMatrix.needsUpdate = true;
    handPivot.rotation.x = -time * Math.PI * 8;
    const lap = Math.floor(time * count);
    if (lap !== lastLap) {
      lastLap = lap;
      completed = (completed + 1) % 15;
      ledger.count = completed;
      for (let k = 0; k < completed; k++) {
        m.makeTranslation(X, top + 0.03 + k * 0.055, Z.audit);
        ledger.setMatrixAt(k, m);
      }
      ledger.instanceMatrix.needsUpdate = true;
    }
    return true;
  };

  // Text lives on the architecture: labels on parts, plaques on the long wall
  const wallX = -4.58;
  const side = Math.PI / 2; // facing the machine (+x)
  const towardPath = -Math.PI / 2; // labels on the machine face the visitor (-x)
  const label = (key, x, yy, z, at) => anchor(`eng:part-${key}`, { pos: v(x, yy, z), ry: towardPath, scale: 0.0042, at, parent: g });
  const A = (...k) => k.map((n) => `engineering:${n}`);
  const anchors = [
    anchor("eng:intro", { pos: v(wallX, 2.25, -114), ry: side, at: A(0), parent: g }),
    anchor("eng:stats", { pos: v(X + 1.95, 3.15, -116.5), ry: towardPath, scale: 0.0034, at: A(1), parent: g }),
    label("scan", X, top + 1.75, Z.scan, A(1)),
    label("state", X - 0.55, top + 1.05, Z.state, A(1)),
    label("task", X - 0.6, top + 1.2, Z.task, A(1)),
    label("assign", X - 0.55, top + 1.05, Z.assign, A(1, 2)),
    label("sched", X - 0.5, top + 2.1, Z.sched, A(2)),
    label("sla", X - 0.55, top + 1.05, Z.sla, A(2)),
    label("escalate", X + 0.4, top + 3.15, Z.sla - 1.9, A(2)),
    label("dashboard", X + 1.85, top + 2.9, -128, A(2)),
    label("review", X, top + 1.45, Z.review, A(3)),
    label("reject", X + 1.9, top + 0.8, Z.review + 2.4, A(3)),
    label("audit", X - 0.55, top + 1.1, Z.audit, A(4)),
    label("done", X, top + 2.0, Z.done, A(4)),
    anchor("eng:illustrative", { pos: v(X - 1.6, top + 0.02, -142.6), rx: -Math.PI / 2, ry: towardPath, scale: 0.0034, at: A(4), parent: g }),
    anchor("eng:how", { pos: v(wallX, 2.2, -146.5), ry: side, scale: 0.0034, at: A(5), parent: g }),
    anchor("eng:arcolab", { pos: v(-3.5, 2.1, -156.82), scale: 0.0034, at: A(6), parent: g }),
  ];

  // Arcolab alcove: a small security console before the next doorway
  [-4.1, -3.35, -2.6].forEach((x, i) => g.add(block(ctx, [0.8, 0.5 + i * 0.15, 0.6], [x, 0.25 + i * 0.075, -155.9], { mat: "solid", line: "lineFaint" })));

  const stations = [
    station("engineering:0", "engineering", { focus: v(-4.58, 2.25, -114), dir: v(1, 0.06, 0.42), fit: 1.75, narrow: { anchor: "eng:intro" }, mood: "system" }),
    station("engineering:1", "engineering", { focus: v(X, 1.7, -116.5), dir: v(-1, 0.3, 0.32), fit: 2.4, narrow: { focus: v(X - 0.4, 1.2, -118), fit: 1.15 }, mood: "system" }),
    station("engineering:2", "engineering", { focus: v(X + 0.3, 1.9, -129), dir: v(-1, 0.28, 0.25), fit: 2.5, narrow: { focus: v(X - 0.2, 1.5, -128.2), fit: 1.5 }, mood: "system" }),
    station("engineering:3", "engineering", { focus: v(X + 0.5, 1.1, -136.4), dir: v(-1, 0.45, 0.3), fit: 2.2, narrow: { focus: v(X, 1.3, -136.2), fit: 1.2 }, mood: "system" }),
    station("engineering:4", "engineering", { focus: v(X, 1.1, -142.6), dir: v(-1, 0.42, 0.3), fit: 2.2, narrow: { focus: v(X - 0.3, 1.2, -141.8), fit: 1.25 }, mood: "system" }),
    station("engineering:5", "engineering", { focus: v(wallX, 2.2, -146.5), dir: v(1, 0.05, 0.22), fit: 1.45, narrow: { anchor: "eng:how" }, mood: "system" }),
    station("engineering:6", "engineering", { focus: v(-3.3, 1.75, -156.6), dir: v(0.2, 0.12, 1), fit: 1.75, narrow: { anchor: "eng:arcolab" }, mood: "system" }),
  ];
  return { group: g, anchors, stations, update };
}
