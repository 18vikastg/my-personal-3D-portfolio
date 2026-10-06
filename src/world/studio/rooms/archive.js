import { BoxGeometry, Color, Group, InstancedMesh, Matrix4 } from "three";
import { anchor, block, partition, station, v } from "../kit";

const STAGES = 5;

/**
 * ARCHIVE — where the proof is kept. Shelves of binders along both walls; a
 * lectern in the middle holding the award-winning paper; the award itself
 * on the back wall; and the paper's pipeline as a stepped sculpture, next to
 * two bars that rise to the real recall values — 0.495, then 0.693.
 */
export function archive(ctx) {
  const g = new Group();
  partition(ctx, -230).forEach((b) => g.add(b));

  // Shelving with binders, instanced
  const perShelf = ctx.quality === "low" ? 14 : 24;
  const binders = new InstancedMesh(ctx.geo.get("box:0.09:0.42:0.36", () => new BoxGeometry(0.09, 0.42, 0.36)), ctx.mats.solid.clone(), perShelf * 6);
  const m = new Matrix4();
  const c = new Color();
  let n = 0;
  [-4.3, 4.3].forEach((x) => {
    g.add(block(ctx, [0.5, 2.6, 9], [x, 1.3, -219.5], { mat: "charcoal", line: "lineFaint" }));
    [0.5, 1.25, 2.0].forEach((y) => {
      for (let i = 0; i < perShelf; i++) {
        m.makeTranslation(x + (x < 0 ? 0.2 : -0.2), y + 0.21, -215.3 - i * (8.4 / perShelf));
        binders.setMatrixAt(n, m);
        binders.setColorAt(n, c.set(i % 7 === 3 ? "#efe3cf" : i % 3 ? "#1c1c1c" : "#262421"));
        n++;
      }
    });
  });
  g.add(binders);

  // Lectern with the paper
  g.add(block(ctx, [0.1, 1.05, 0.1], [0, 0.53, -218], { mat: "solid", line: "lineFaint" }));
  const desk = block(ctx, [1.15, 0.05, 0.85], [0, 1.1, -218], { mat: "solid", line: "lineFaint" });
  desk.rotation.x = 0.42;
  g.add(desk);

  // Pipeline sculpture + recall bars (real values, against a 1.0 reference)
  for (let i = 0; i < STAGES; i++) {
    const h = 0.2 + i * 0.16;
    g.add(block(ctx, [0.6, h, 0.6], [0.9 + i * 0.66, h / 2, -224], { mat: i === STAGES - 1 ? "paper" : "solid", line: "line" }));
  }
  const H = 3;
  [
    [0.495, "solid", "line", 1.6],
    [0.693, "lime", "lineLime", 2.3],
  ].forEach(([val, mat, line, x]) => g.add(block(ctx, [0.42, val * H, 0.42], [x, (val * H) / 2, -226.2], { mat, line })));
  g.add(block(ctx, [1.3, 0.004, 0.004], [1.95, H, -226.2], { mat: "solid", line: "lineFaint" }));

  const A = (...k) => k.map((x) => `archive:${x}`);
  const anchors = [
    anchor("archive:title", { pos: v(-3.9, 3.6, -229.86), at: A(0), parent: g }),
    anchor("archive:award", { pos: v(-3.9, 2.25, -229.86), scale: 0.0034, at: A(0), parent: g }),
    anchor("archive:paper", { pos: v(0, 1.135, -218), rx: -Math.PI / 2 + 0.42, scale: 0.0019, at: A(1), parent: g }),
    ...Array.from({ length: STAGES }, (_, i) =>
      anchor(`archive:stage-${i}`, { pos: v(0.9 + i * 0.66, 0.5 + i * 0.16 + (i % 2) * 0.35, -223.6), scale: 0.0034, at: A(2), parent: g })
    ),
    anchor("archive:recall", { pos: v(3.6, 1.7, -226.1), scale: 0.0032, grow: 1.7, at: A(2), parent: g }),
    anchor("archive:research", { pos: v(-4.03, 1.75, -219.5), ry: Math.PI / 2, scale: 0.003, at: A(3), parent: g }),
  ];

  const stations = [
    station("archive:0", "archive", { focus: v(-3.3, 2.5, -229.8), dir: v(0.2, 0.08, 1), fit: 1.85, narrow: { focus: v(-3.9, 2.85, -229.86), dir: v(0, 0.04, 1), fit: 1.02 }, via: [v(0, 1.9, -209)], mood: "archive" }),
    station("archive:1", "archive", { focus: v(0, 1.13, -218), dir: v(0, 1.0, 0.5), fit: 0.7, narrow: { anchor: "archive:paper" }, mood: "archive" }),
    station("archive:2", "archive", { focus: v(2.4, 1.3, -225), dir: v(-0.2, 0.3, 1), fit: 1.9, narrow: { focus: v(3.05, 1.5, -225.6), fit: 1.5 }, mood: "archive" }),
    station("archive:3", "archive", { focus: v(-4.03, 1.75, -219.5), dir: v(1, 0.05, 0.2), fit: 1.35, narrow: { anchor: "archive:research" }, mood: "archive" }),
  ];
  return { group: g, anchors, stations };
}
