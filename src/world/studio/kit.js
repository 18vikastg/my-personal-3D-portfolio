import { BoxGeometry, CylinderGeometry, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { edged } from "../materials";

/*
 * Small vocabulary shared by every room, so the studio reads as one
 * architecture: walls, plinths and posts with drawn edges, and the two
 * declarations rooms make — anchors (where HTML lives) and stations (where
 * the camera stands).
 */

export const v = (x, y, z) => new Vector3(x, y, z);

/** World units per CSS pixel for HTML placed in the world. */
export const PX = 0.004;

/**
 * An anchor is a position + orientation in the world where one HTML block
 * lives. `at` lists the stations from which it is meant to be read; `grow`
 * enlarges it on narrow screens, where the camera stands further back.
 */
export function anchor(key, { pos, ry = 0, rx = 0, rz = 0, scale = PX, grow = 1, at, parent }) {
  const o = new Object3D();
  o.position.copy(pos);
  o.rotation.set(rx, ry, rz, "YXZ");
  o.scale.setScalar(scale);
  parent?.add(o);
  return { key, object: o, at: at ?? [], scale, grow };
}

/** A camera station. `dir` points from the subject towards the camera. */
export function station(key, room, { focus, dir = v(0, 0.12, 1), fit, narrow, via, mood }) {
  return { key, room, focus, dir, fit, narrow, via, mood };
}

/** Cached box geometry. */
export const boxGeo = (ctx, w, h, d) => ctx.geo.get(`box:${w}:${h}:${d}`, () => new BoxGeometry(w, h, d));

/** Plain box (no drawn edges) with any material. */
export function slab(ctx, [w, h, d], [x, y, z], material) {
  const m = new Mesh(boxGeo(ctx, w, h, d), material);
  m.position.set(x, y, z);
  return m;
}

/** Box with drawn edges, positioned by its centre. */
export function block(ctx, [w, h, d], [x, y, z], { mat = "solid", line = "line", ry = 0 } = {}) {
  const geo = boxGeo(ctx, w, h, d);
  const m = edged(new Mesh(geo, ctx.mats[mat]), ctx.mats[line]);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  return m;
}

/** A wall standing on the floor, `w` wide along its local X. */
export function wall(ctx, w, h, [x, z], ry = 0, { d = 0.2, mat = "charcoal", line = "lineFaint" } = {}) {
  return block(ctx, [w, h, d], [x, h / 2, z], { mat, line, ry });
}

/** Cylinder (pedestals, posts, jars). */
export function cylinder(ctx, r, h, [x, y, z], { mat = "solid", seg = 24 } = {}) {
  const geo = ctx.geo.get(`cyl:${r}:${h}:${seg}`, () => new CylinderGeometry(r, r, h, seg));
  const m = new Mesh(geo, typeof mat === "string" ? ctx.mats[mat] : mat);
  m.position.set(x, y, z);
  return m;
}

/** Plain coloured material, cached by colour (disposed with the cache). */
export function tint(ctx, color, rough = 0.8) {
  return ctx.geo.get(`mat:${color}:${rough}`, () => new MeshStandardMaterial({ color, roughness: rough, metalness: 0 }));
}

/**
 * A partition between rooms: one wall across the studio with a doorway the
 * camera walks through. Returns a Group-ready list of blocks.
 */
export function partition(ctx, z, { width = 24, height = 4.6, door = 3.2, doorH = 3.4 } = {}) {
  const side = (width - door) / 2;
  const parts = [
    block(ctx, [side, height, 0.24], [-(door / 2 + side / 2), height / 2, z], { mat: "charcoal", line: "lineFaint" }),
    block(ctx, [side, height, 0.24], [door / 2 + side / 2, height / 2, z], { mat: "charcoal", line: "lineFaint" }),
    block(ctx, [door, height - doorH, 0.24], [0, doorH + (height - doorH) / 2, z], { mat: "charcoal", line: "lineFaint" }),
  ];
  return parts;
}

/**
 * A room's local frame. Rooms are modelled facing +Z in local space and
 * placed/rotated as a whole; these helpers convert to world space for
 * stations, which the camera path needs in world coordinates.
 */
export function frameOf(group) {
  group.updateMatrixWorld(true);
  return {
    p: (x, y, z) => group.localToWorld(new Vector3(x, y, z)),
    d: (x, y, z) => new Vector3(x, y, z).transformDirection(group.matrixWorld),
  };
}
