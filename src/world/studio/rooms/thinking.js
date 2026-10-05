import { Group, PointLight } from "three";
import { anchor, block, partition, station, tint, v } from "../kit";
import { principles } from "../../../data/site";

/**
 * THINKING ROOM — the world slows down. A quiet room with one long desk
 * and a warm lamp. Each principle is printed on a real sheet of paper lying
 * on the desk; the camera leans over the desk and moves from sheet to sheet.
 * The HTML *is* the sheet: it lies flat in the world, on the desk.
 */
const DESK_Z = -168;
const SHEET_X = (i) => -3.4 + i * 1.7;

export function thinking(ctx) {
  const g = new Group();
  partition(ctx, -176).forEach((b) => g.add(b));

  // Room: back wall + desk on legs
  g.add(block(ctx, [10, 4.2, 0.2], [0, 2.1, -173.5], { mat: "charcoal", line: "lineFaint" }));
  const top = 0.9;
  g.add(block(ctx, [9.4, 0.08, 1.9], [0, top, DESK_Z], { mat: "solid", line: "lineFaint" }));
  [-4.5, 4.5].forEach((x) => [-0.8, 0.8].forEach((dz) => g.add(block(ctx, [0.06, top, 0.06], [x, top / 2, DESK_Z + dz]))));

  // Paper underlays give each sheet thickness and a shadowed edge
  principles.forEach((_, i) => {
    const under = block(ctx, [1.0, 0.012, 1.38], [SHEET_X(i), top + 0.05, DESK_Z], { mat: "paper", line: "lineFaint" });
    under.rotation.y = (i % 2 ? 1 : -1) * 0.04;
    under.material = tint(ctx, "#d9d4c8", 0.95);
    g.add(under);
  });

  // A desk lamp — the room's own light
  g.add(block(ctx, [0.05, 1.1, 0.05], [4.3, top + 0.55, DESK_Z - 0.6]));
  g.add(block(ctx, [0.5, 0.18, 0.3], [4.1, top + 1.15, DESK_Z - 0.6], { mat: "cream", line: "lineCream" }));
  const lamp = new PointLight(0xffe1b8, 1.6, 9, 1.6);
  lamp.position.set(3.6, top + 1.3, DESK_Z - 0.2);
  g.add(lamp);

  const anchors = [
    anchor("thinking:title", { pos: v(0, 2.85, -173.38), at: ["thinking:0"], parent: g }),
    ...principles.map((_, i) =>
      anchor(`thinking:note-${i}`, {
        pos: v(SHEET_X(i), top + 0.062, DESK_Z),
        rx: -Math.PI / 2,
        ry: (i % 2 ? 1 : -1) * 0.04,
        scale: 0.0022,
        at: [`thinking:${i + 1}`, ...(i === 0 ? ["thinking:0"] : [])],
        parent: g,
      })
    ),
  ];

  const stations = [
    station("thinking:0", "thinking", {
      focus: v(0, 2.0, -171),
      dir: v(0, 0.16, 1),
      fit: 3.3,
      narrow: { focus: v(0, 2.85, -173.4), fit: 1.95 },
      via: [v(-0.6, 2.0, -158.5)],
      mood: "quiet",
    }),
    ...principles.map((_, i) =>
      station(`thinking:${i + 1}`, "thinking", {
        focus: v(SHEET_X(i), top + 0.06, DESK_Z),
        dir: v(0, 1, 0.42),
        fit: 0.82,
        narrow: { fit: 0.56 },
        mood: "quiet",
      })
    ),
  ];
  return { group: g, anchors, stations };
}
