import { Group, Mesh, SphereGeometry } from "three";
import { segments } from "../materials";

/** Currently + Contact: the floor runs out at one small lit point — what's next. */
export function buildHorizon({ origin, mats, offset }) {
  const g = new Group();
  g.position.set(origin.x + offset * 0.8, 0, origin.z - 14);
  const point = new Mesh(new SphereGeometry(0.12, 16, 12), mats.lime);
  point.position.y = 1.4;
  g.add(point);
  g.add(segments([0, 0, 0, 0, 1.25, 0], mats.lineLime));

  let time = 0;
  const update = (dt, active) => {
    if (!active) return null;
    time += dt;
    point.scale.setScalar(1 + Math.sin(time * 1.6) * 0.08);
    return null;
  };
  return { group: g, update };
}
