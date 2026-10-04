import { BoxGeometry, CatmullRomCurve3, Group, Mesh, SphereGeometry, Vector3 } from "three";
import { edged, segments } from "../materials";

/**
 * Experience: the workflow engine as a model on the floor — states as
 * blocks, transitions as lines, and a token walking the process (splitting
 * at the parallel review). Illustrative, like the diagram in the content.
 */
const NODES = {
  draft: [-4, 0],
  submit: [-2, 0],
  qa: [0, -1.4],
  prod: [0, 1.4],
  approve: [2, 0],
  done: [4, 0],
};
const ROUTES = [
  ["draft", "submit", "qa", "approve", "done"],
  ["draft", "submit", "prod", "approve", "done"],
];

export function buildSystem({ origin, mats, offset }) {
  const g = new Group();
  g.position.set(origin.x + offset, 0, origin.z);
  g.rotation.y = -0.35;

  const box = new BoxGeometry(1.1, 0.4, 0.6);
  Object.values(NODES).forEach(([x, z]) => {
    const b = edged(new Mesh(box, mats.solid), mats.line);
    b.position.set(x, 0.2, z);
    g.add(b);
  });

  const pts = [];
  const curves = ROUTES.map((route) => {
    const c = new CatmullRomCurve3(
      route.map((k) => new Vector3(NODES[k][0], 0.45, NODES[k][1])),
      false,
      "centripetal"
    );
    const s = c.getPoints(60);
    for (let i = 0; i < s.length - 1; i++) pts.push(s[i].x, s[i].y, s[i].z, s[i + 1].x, s[i + 1].y, s[i + 1].z);
    return c;
  });
  g.add(segments(pts, mats.line));

  // The audit trail: a rail under every state
  g.add(segments([-4.6, 0.02, 2.4, 4.6, 0.02, 2.4], mats.lineFaint));

  const tokenGeo = new SphereGeometry(0.09, 16, 12);
  const tokens = curves.map((curve) => {
    const t = new Mesh(tokenGeo, mats.lime);
    g.add(t);
    return { mesh: t, curve };
  });

  let time = 0;
  const update = (dt, active) => {
    if (!active) return null;
    time += dt;
    const u = (time % 7) / 7; // one pass through the process every 7s
    tokens.forEach(({ mesh, curve }) => mesh.position.copy(curve.getPointAt(u)));
    return null;
  };

  return { group: g, update };
}
