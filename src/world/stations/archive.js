import { BoxGeometry, Group, Mesh, Vector3 } from "three";
import { edged } from "../materials";

// The model's extent in its own units: paper stack on the left, the bars and
// the reference line at full recall on the right
const BOX = { x0: -2.4, x1: 1.85, y0: 0, y1: 4.05 };
const PAD = 16;

/**
 * Proof: a short stack of paper (the paper trail) and the two recall values
 * from the award-winning paper as physical bars — 0.495 and 0.693.
 *
 * The model stands in the open space beside "The paper trail." heading and
 * scrolls away with it, so it never sits behind the award or research text
 * at any screen width.
 */
export function buildArchive({ origin, mats, offset, camera }) {
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

  /* ---- keep the model in the free space of the heading row ---- */
  const section = document.getElementById("proof");
  const heading = document.getElementById("proof-title");
  const grid = section?.querySelector(".grid");
  const shell = section?.querySelector(".shell");
  const range = document.createRange();
  const a = new Vector3();
  const b = new Vector3();

  // Screen point → world point on the plane the model stands on
  const toWorld = (x, y, out) => {
    out.set((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5).unproject(camera);
    out.sub(camera.position);
    return out.multiplyScalar((origin.z - camera.position.z) / out.z).add(camera.position);
  };

  const place = () => {
    if (!heading || !grid || !shell || !camera) return;
    // Right of the eyebrow and heading text, above the cards, inside the page's column
    range.selectNodeContents(heading);
    let textRight = range.getBoundingClientRect().right;
    const eyebrow = heading.previousElementSibling;
    if (eyebrow) {
      range.selectNodeContents(eyebrow);
      textRight = Math.max(textRight, range.getBoundingClientRect().right);
    }
    const left = textRight + PAD * 2;
    const right = shell.getBoundingClientRect().right - PAD;
    const top = section.getBoundingClientRect().top + PAD;
    const bottom = grid.getBoundingClientRect().top - PAD * 2;
    if (right - left < 40 || bottom - top < 40) return;

    toWorld(left, bottom, a);
    toWorld(right, top, b);
    const w = b.x - a.x;
    const h = b.y - a.y;
    // Never larger than the model was designed, and centred in the space
    const s = Math.min(1, w / (BOX.x1 - BOX.x0), h / (BOX.y1 - BOX.y0));
    g.scale.setScalar(s);
    g.position.set((a.x + b.x) / 2 - ((BOX.x0 + BOX.x1) / 2) * s, a.y + (h - (BOX.y1 - BOX.y0) * s) / 2, origin.z);
  };

  let grown = 0;
  const update = (dt, active) => {
    if (g.visible) place();
    if (!active && grown === 0) return null;
    grown = Math.min(1, grown + dt * 0.6);
    const e = 1 - Math.pow(1 - grown, 3);
    bars.forEach((bar) => {
      bar.scale.y = Math.max(0.001, bar.userData.height * e);
      bar.position.y = (bar.userData.height * e) / 2;
    });
    return null;
  };
  return { group: g, update };
}
