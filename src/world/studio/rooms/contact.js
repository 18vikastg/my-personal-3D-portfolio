import { Group, Mesh, PointLight, SphereGeometry } from "three";
import { PALETTE } from "../../materials";
import { anchor, block, station, v } from "../kit";

/**
 * THE END OF THE STUDIO — almost nothing left. The floor fades out; one
 * monolith stands with one light on it. "Let's build." is cut into the floor
 * in front of it, and the last placard holds the ways to reach me.
 */
export function contact(ctx) {
  const g = new Group();
  const z = -324;
  g.add(block(ctx, [0.7, 4.0, 0.36], [0, 2.0, z], { mat: "charcoal", line: "lineFaint" }));
  const light = new Mesh(new SphereGeometry(0.11, 18, 12), ctx.mats.lime);
  light.position.set(0, 4.25, z);
  g.add(light);
  const glow = new PointLight(PALETTE.lime, 1.4, 7, 2);
  glow.position.set(0, 4.25, z + 0.3);
  g.add(glow);

  const anchors = [
    anchor("contact:sign", { pos: v(0, 0.02, z + 2.4), rx: -Math.PI / 2, scale: 0.0045, at: ["contact:0"], parent: g }),
    anchor("contact:main", { pos: v(-1.85, 2.05, z + 0.6), ry: 0.18, scale: 0.0029, at: ["contact:1", "contact:2"], parent: g }),
    anchor("contact:form", { pos: v(1.85, 2.05, z + 0.6), ry: -0.18, scale: 0.0029, at: ["contact:1", "contact:2"], parent: g }),
  ];
  const stations = [
    station("contact:0", "contact", { focus: v(0, 1.6, z + 1.2), dir: v(0, 0.36, 1), fit: 2.9, narrow: { fit: 1.9 }, mood: "finale" }),
    station("contact:1", "contact", { focus: v(0, 2.0, z + 0.6), dir: v(0, 0.04, 1), fit: 1.95, narrow: { anchor: "contact:main" }, mood: "finale" }),
    station("contact:2", "contact", { focus: v(1.2, 2.0, z + 0.6), dir: v(-0.1, 0.04, 1), fit: 1.6, narrow: { anchor: "contact:form" }, mood: "finale" }),
  ];
  return { group: g, anchors, stations };
}
