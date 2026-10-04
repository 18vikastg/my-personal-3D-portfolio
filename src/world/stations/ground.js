import { segments } from "../materials";

/**
 * The drafted floor the whole world stands on: a long, fine grid that fades
 * into fog. One draw call for the entire path.
 */
export function buildGround({ mats, quality }) {
  const step = quality === "low" ? 2 : 1;
  const pts = [];
  const xMin = -24;
  const xMax = 24;
  const zMin = -290;
  const zMax = 30;
  for (let x = xMin; x <= xMax; x += step) pts.push(x, 0, zMin, x, 0, zMax);
  for (let z = zMin; z <= zMax; z += step) pts.push(xMin, 0, z, xMax, 0, z);
  const grid = segments(pts, mats.lineFaint.clone());
  grid.material.opacity = 0.07;
  grid.userData.baseOpacity = 0.07;
  return grid;
}
