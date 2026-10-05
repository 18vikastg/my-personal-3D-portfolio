import { Group } from "three";
import { anchor, block, station, v } from "../kit";
import { createNorenCloth } from "../../../lib/noren";

const DOOR_Z = -246;

/**
 * THRESHOLD — the engineering studio gives way. A narrowing corridor, light
 * dropping, the wall text: "Code is one way I build things. Stories are
 * another." At the end, a doorway hung with the noren (CODE · ring + red dot
 * · STORIES). The camera walks *through* the cloth into the cinema; the cloth
 * parts around it. On the lightest tier it hangs still.
 */
export function threshold(ctx) {
  const g = new Group();
  [-2.5, 2.5].forEach((x) => g.add(block(ctx, [0.2, 4.0, 15.4], [x, 2.0, -238.3], { mat: "charcoal", line: "lineFaint" })));

  // Doorway wall with a wide opening for the noren
  const W = 26;
  const door = 4.8;
  const side = (W - door) / 2;
  g.add(block(ctx, [side, 4.6, 0.24], [-(door / 2 + side / 2), 2.3, DOOR_Z], { mat: "charcoal", line: "lineFaint" }));
  g.add(block(ctx, [side, 4.6, 0.24], [door / 2 + side / 2, 2.3, DOOR_Z], { mat: "charcoal", line: "lineFaint" }));
  g.add(block(ctx, [door, 0.9, 0.24], [0, 4.15, DOOR_Z], { mat: "charcoal", line: "lineFaint" }));

  const cloth = createNorenCloth({ lite: ctx.quality !== "high" });
  const CY = 2.05;
  cloth.group.position.set(0, CY, DOOR_Z + 0.05);
  g.add(cloth.group);
  const physics = ctx.quality !== "low";

  const update = (dt, s) => {
    const near = s.room === "threshold" || s.room === "cinema";
    if (!near || !physics) return false;
    const cam = s.camera.position;
    const dz = cam.z - DOOR_Z;
    if (Math.abs(dz) < 1.8 && Math.abs(cam.x) < 2.4) cloth.push(cam.x, cam.y - CY, 0.55 * (1 - Math.abs(dz) / 1.8), -1);
    cloth.tick();
    return true;
  };

  const anchors = [
    anchor("threshold:title", { pos: v(-2.38, 2.45, -235), ry: Math.PI / 2, at: ["threshold:0"], parent: g }),
    anchor("threshold:sides", { pos: v(2.38, 2.2, -240.5), ry: -Math.PI / 2, scale: 0.0032, at: ["threshold:1"], parent: g }),
    anchor("threshold:caption", { pos: v(3.7, 1.5, DOOR_Z + 0.14), scale: 0.0042, at: ["threshold:2"], parent: g }),
  ];
  const stations = [
    station("threshold:0", "threshold", { focus: v(-2.38, 2.4, -235), dir: v(1, 0.05, 0.3), fit: 1.75, narrow: { anchor: "threshold:title" }, via: [v(0, 1.9, -231.5)], mood: "threshold" }),
    station("threshold:1", "threshold", { focus: v(2.38, 2.2, -240.5), dir: v(-1, 0.05, 0.3), fit: 1.6, narrow: { anchor: "threshold:sides" }, mood: "threshold" }),
    station("threshold:2", "threshold", { focus: v(0, 2.0, DOOR_Z), dir: v(0, 0.03, 1), fit: 2.6, narrow: { fit: 2.45 }, mood: "threshold" }),
  ];
  return { group: g, anchors, stations, update, dispose: () => cloth.dispose() };
}
