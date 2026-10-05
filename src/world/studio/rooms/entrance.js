import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { anchor, block, partition, station, v } from "../kit";
import { segments } from "../../materials";

/**
 * ENTRANCE — the doorway *is* the hero. A long wall with one opening.
 * The name and the headline are lettered on the wall; the intro and the
 * ways in (work, résumé, socials) are on a placard beside the door. Through
 * the doorway, just inside, the portrait hangs as a print with the facts.
 */
export function entrance(ctx) {
  const g = new Group();
  partition(ctx, -6, { width: 22, height: 5.4, door: 2.6, doorH: 3.4 }).forEach((b) => g.add(b));

  // Door frame drawn in cream — the one bright line on the façade
  g.add(segments([-1.3, 0, -5.86, -1.3, 3.4, -5.86, -1.3, 3.4, -5.86, 1.3, 3.4, -5.86, 1.3, 3.4, -5.86, 1.3, 0, -5.86], ctx.mats.lineCream));

  // Inside: a free-standing wall with the portrait print
  g.add(block(ctx, [2.8, 3.1, 0.14], [0.6, 1.55, -12.2], { mat: "charcoal", line: "lineFaint" }));
  const print = new Mesh(
    new PlaneGeometry(1.36, 1.7),
    new MeshBasicMaterial({ map: ctx.tex.load("/work/vikas.webp"), toneMapped: false })
  );
  print.position.set(0.05, 1.75, -12.12);
  g.add(print);
  g.add(block(ctx, [1.46, 1.8, 0.02], [0.05, 1.75, -12.13], { mat: "solid", line: "lineCream" }));

  const z = -5.85;
  const anchors = [
    anchor("entrance:name", { pos: v(-5.6, 4.15, z), at: ["entrance:0", "entrance:1"], parent: g }),
    anchor("entrance:headline", { pos: v(-5.6, 2.45, z), at: ["entrance:0", "entrance:1"], parent: g }),
    anchor("entrance:intro", { pos: v(5.2, 2.2, z), at: ["entrance:0", "entrance:1"], parent: g }),
    anchor("entrance:facts", { pos: v(2.45, 1.55, -12.1), at: ["entrance:2"], scale: 0.0032, parent: g }),
  ];

  const stations = [
    station("entrance:0", "entrance", {
      focus: v(-1.6, 2.9, -6),
      dir: v(0.05, 0.04, 1),
      fit: 3.9,
      narrow: { focus: v(-5.6, 3.25, -6), fit: 2.45 },
      mood: "entrance",
    }),
    station("entrance:1", "entrance", {
      focus: v(3.9, 2.3, -6),
      dir: v(-0.1, 0.04, 1),
      fit: 1.95,
      narrow: { anchor: "entrance:intro" },
      mood: "entrance",
    }),
    station("entrance:2", "entrance", {
      focus: v(1.3, 1.65, -12.2),
      dir: v(0, 0.06, 1),
      fit: 1.65,
      narrow: { anchor: "entrance:facts" },
      via: [v(0, 1.9, -3.5), v(0, 1.8, -7.5)],
      mood: "entrance",
    }),
  ];
  return { group: g, anchors, stations };
}
