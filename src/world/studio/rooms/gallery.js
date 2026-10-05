import { Group } from "three";
import { anchor, partition, station, v } from "../kit";

/**
 * GALLERY — the hall of work. One hanging sign at the start; installations
 * stand along both sides (built in their own modules); a partition with a
 * doorway closes the hall before the engineering floor.
 */
export function gallery(ctx) {
  const g = new Group();
  partition(ctx, -104, { width: 24 }).forEach((b) => g.add(b));
  const anchors = [
    anchor("gallery:title", { pos: v(0, 3.3, -17), at: ["gallery:0"], parent: g }),
    anchor("gallery:more", { pos: v(-3.2, 2.2, -103.8), at: ["onebox:1"], scale: 0.0032, parent: g }),
  ];
  const stations = [
    station("gallery:0", "gallery", {
      focus: v(0, 2.9, -17),
      dir: v(0, 0.08, 1),
      fit: 2.6,
      narrow: { fit: 1.95 },
      mood: "gallery",
    }),
  ];
  return { group: g, anchors, stations };
}
