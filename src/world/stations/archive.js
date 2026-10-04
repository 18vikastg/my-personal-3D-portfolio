import { BoxGeometry, Group, Mesh } from "three";
import { edged } from "../materials";

/**
 * Proof: a short stack of paper (the paper trail) and the two recall values
 * from the award-winning paper as physical bars — 0.495 and 0.693.
 */
export function buildArchive({ origin, mats, offset }) {
  const g = new Group();
  g.position.set(origin.x + offset, 0, origin.z);

  const sheet = new BoxGeometry(1.5, 0.012, 2.1);
  for (let i = 0; i < 6; i++) {
    const s = new Mesh(sheet, mats.paper);
    s.position.set(-1.6, 0.02 + i * 0.03, 0);
    s.rotation.y = (i % 2 ? 1 : -1) * 0.05 * i;
    g.add(s);
  }

  const H = 4;
  const bars = [
    { value: 0.495, mat: mats.solid, line: mats.line, x: 0.6 },
    { value: 0.693, mat: mats.lime, line: mats.lineLime, x: 1.5 },
  ].map(({ value, mat, line, x }) => {
    const b = edged(new Mesh(new BoxGeometry(0.5, 1, 0.5), mat), line);
    b.position.set(x, 0, 0);
    b.userData.height = value * H;
    b.scale.y = 0.001;
    g.add(b);
    return b;
  });
  // A faint reference line at full recall (1.0)
  const ref = edged(new Mesh(new BoxGeometry(1.6, 0.001, 0.001), mats.solid), mats.lineFaint);
  ref.position.set(1.05, H, 0);
  g.add(ref);

  let grown = 0;
  const update = (dt, active) => {
    if (!active && grown === 0) return null;
    grown = Math.min(1, grown + dt * 0.6);
    const e = 1 - Math.pow(1 - grown, 3);
    bars.forEach((b) => {
      b.scale.y = Math.max(0.001, b.userData.height * e);
      b.position.y = (b.userData.height * e) / 2;
    });
    return null;
  };
  return { group: g, update };
}
