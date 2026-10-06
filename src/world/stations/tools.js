import { BufferGeometry, Float32BufferAttribute, Group, LineSegments, Mesh, SphereGeometry, TorusGeometry } from "three";
import { on } from "../bus";
import { groups, shippedWith } from "../../data/stack";

// Where things were used, as places in the world. Each "used in" entry in the
// stack data is matched to one of these by keyword.
const PLACES = [
  ["Pivot Path", /pivot path/i],
  ["Arcolab", /arcolab/i],
  ["Swanand Spices", /swanand/i],
  ["PrepLink", /preplink/i],
  ["Smart Health Queue", /health queue/i],
  ["AI Mock Interview", /mock interview/i],
  ["OneBox", /onebox/i],
  ["Research", /research|churn/i],
  ["Lab & side projects", /.*/],
];
const placeOf = (label) => PLACES.findIndex(([, re]) => re.test(label));

/**
 * Toolbox: tools on an inner ring (grouped as in the content), the places
 * they were used on an outer ring. Picking a tool draws its receipts.
 */
export function buildTools({ origin, mats, offset }) {
  const g = new Group();
  g.position.set(origin.x + offset * 1.25, 1.2, origin.z - 1);
  g.rotation.set(-0.22, -0.35, 0); // a plan on an easel, turned toward the path

  const R1 = 1.4;
  const R2 = 2.5;
  const toolGeo = new SphereGeometry(0.06, 12, 8);
  const ordered = groups.flatMap((grp) => shippedWith.filter((t) => t.group === grp));
  const tools = ordered.map((t, i) => {
    const a = (i / ordered.length) * Math.PI * 2 + Math.floor(groups.indexOf(t.group)) * 0.08;
    const m = new Mesh(toolGeo, mats.cream);
    m.position.set(Math.cos(a) * R1, Math.sin(a) * R1, 0);
    g.add(m);
    return { ...t, mesh: m };
  });

  const placeGeo = new TorusGeometry(0.13, 0.012, 6, 28);
  const places = PLACES.map((_, i) => {
    const a = (i / PLACES.length) * Math.PI * 2 + 0.2;
    const m = new Mesh(placeGeo, mats.cream);
    m.position.set(Math.cos(a) * R2, Math.sin(a) * R2, 0);
    g.add(m);
    return m;
  });

  // Faint outer circle: the boundary of the plan
  const circle = [];
  for (let i = 0; i < 96; i++) {
    const a0 = (i / 96) * Math.PI * 2;
    const a1 = ((i + 1) / 96) * Math.PI * 2;
    circle.push(Math.cos(a0) * R2, Math.sin(a0) * R2, 0, Math.cos(a1) * R2, Math.sin(a1) * R2, 0);
  }
  const ring = new LineSegments(new BufferGeometry(), mats.lineFaint);
  ring.geometry.setAttribute("position", new Float32BufferAttribute(circle, 3));
  g.add(ring);

  const links = new LineSegments(new BufferGeometry(), mats.lineLime);
  links.geometry.setAttribute("position", new Float32BufferAttribute(new Float32Array(9 * 6), 3));
  g.add(links);

  const select = (name) => {
    const tool = tools.find((t) => t.name === name) ?? tools[0];
    tools.forEach((t) => t.mesh.scale.setScalar(t === tool ? 2.2 : 1));
    tools.forEach((t) => (t.mesh.material = t === tool ? mats.lime : mats.cream));
    const targets = [...new Set(tool.usedIn.map(placeOf))];
    const arr = links.geometry.attributes.position.array;
    arr.fill(0);
    targets.forEach((p, k) => {
      const a = tool.mesh.position;
      const b = places[p].position;
      arr.set([a.x, a.y, a.z, b.x, b.y, b.z], k * 6);
    });
    links.geometry.setDrawRange(0, targets.length * 2);
    links.geometry.attributes.position.needsUpdate = true;
    places.forEach((m, i) => (m.material = targets.includes(i) ? mats.lime : mats.cream));
  };
  select("TypeScript");
  const off = on("tool", select);

  return { group: g, dispose: off };
}
