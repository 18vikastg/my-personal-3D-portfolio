import {
  BufferGeometry,
  Color,
  EdgesGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from "three";

// The same palette as the HTML: ink, warm off-white, one lime accent, and
// the Silent Stories cream + red.
export const PALETTE = {
  ink: new Color("#0a0a0a"),
  black: new Color("#000000"),
  fg: new Color("#f2efe8"),
  lime: new Color("#d4ff3a"),
  cream: new Color("#efe3cf"),
  red: new Color("#b3121a"),
};

/** Shared materials — created once per world, reused by every station. */
export function createMaterials() {
  const m = {
    line: new LineBasicMaterial({ color: PALETTE.fg, transparent: true, opacity: 0.42 }),
    lineFaint: new LineBasicMaterial({ color: PALETTE.fg, transparent: true, opacity: 0.18 }),
    lineLime: new LineBasicMaterial({ color: PALETTE.lime, transparent: true, opacity: 0.85 }),
    lineCream: new LineBasicMaterial({ color: PALETTE.cream, transparent: true, opacity: 0.55 }),
    solid: new MeshStandardMaterial({ color: "#161616", roughness: 0.92, metalness: 0 }),
    paper: new MeshStandardMaterial({ color: PALETTE.cream, roughness: 0.95, metalness: 0 }),
    lime: new MeshBasicMaterial({ color: PALETTE.lime }),
    red: new MeshBasicMaterial({ color: PALETTE.red, transparent: true, opacity: 0.9 }),
    cream: new MeshBasicMaterial({ color: PALETTE.cream }),
  };
  return m;
}

/** A solid with its edges drawn — the basic "model" object of the world. */
export function edged(mesh, lineMaterial) {
  const edges = new LineSegments(new EdgesGeometry(mesh.geometry, 20), lineMaterial);
  mesh.add(edges);
  return mesh;
}

/** Builds a LineSegments from a flat [x,y,z, x,y,z, ...] array. */
export function segments(points, material) {
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(points, 3));
  return new LineSegments(g, material);
}
