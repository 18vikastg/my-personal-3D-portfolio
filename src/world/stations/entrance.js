import { BoxGeometry, Group, Mesh } from "three";
import { edged } from "../materials";

/** Intro: a tall doorframe ahead and a few low modules — the way in. */
export function buildEntrance({ origin, mats, offset }) {
  const g = new Group();
  g.position.set(origin.x + offset * 0.6, 0, origin.z - 8);

  const post = new BoxGeometry(0.14, 4.6, 0.14);
  const left = edged(new Mesh(post, mats.solid), mats.line);
  left.position.set(-1.3, 2.3, 0);
  const right = left.clone();
  right.position.x = 1.3;
  const lintel = edged(new Mesh(new BoxGeometry(2.88, 0.14, 0.14), mats.solid), mats.line);
  lintel.position.set(0, 4.6, 0);
  g.add(left, right, lintel);

  // Low modules either side: the things that get built
  [
    [-4.2, 0.6, 2.5, 1.2, 1.2, 1.2],
    [-3.0, 0.3, 4.2, 0.9, 0.6, 1.8],
    [3.6, 0.45, 1.5, 1.6, 0.9, 0.9],
    [4.8, 1.0, -1.5, 0.8, 2.0, 0.8],
  ].forEach(([x, y, z, w, h, d]) => {
    const b = edged(new Mesh(new BoxGeometry(w, h, d), mats.solid), mats.lineFaint);
    b.position.set(x, y, z);
    g.add(b);
  });
  return { group: g };
}
