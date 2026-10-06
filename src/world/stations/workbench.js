import { BoxGeometry, Group, MathUtils, Mesh, PlaneGeometry, Vector3 } from "three";
import { edged } from "../materials";
import { on } from "../bus";
import { projects } from "../../data/projects";

/**
 * Work: one standing panel per project, in a shallow arc. The panel for the
 * project being read lifts and picks up the accent; the camera leans to it.
 */
export function buildWorkbench({ origin, mats, offset }) {
  const g = new Group();
  g.position.set(origin.x + offset, 0, origin.z);

  const panelGeo = new PlaneGeometry(1.6, 1.0);
  const standGeo = new BoxGeometry(0.04, 0.9, 0.04);
  const panels = projects.map((p, i) => {
    const n = projects.length;
    const a = MathUtils.mapLinear(i, 0, n - 1, -0.55, 0.55);
    const holder = new Group();
    holder.position.set(Math.sin(a) * 4.2, 0, -Math.cos(a) * 4.2 + 4.2);
    holder.rotation.y = -a;

    const face = new Mesh(panelGeo, mats.solid);
    face.position.y = 1.45;
    const edge = edged(face, mats.line.clone());
    const stand = new Mesh(standGeo, mats.solid);
    stand.position.y = 0.45;
    holder.add(edge, stand);
    g.add(holder);
    return { slug: p.slug, holder, face, line: face.children[0].material, lift: 0 };
  });

  let focus = -1;
  const off = on("project", (slug) => {
    focus = panels.findIndex((p) => p.slug === slug);
  });

  const lean = new Vector3();
  const update = (dt) => {
    panels.forEach((p, i) => {
      const target = i === focus ? 1 : 0;
      p.lift += (target - p.lift) * Math.min(1, dt * 4);
      p.face.position.y = 1.45 + p.lift * 0.35;
      p.line.color.lerpColors(mats.line.color, mats.lineLime.color, p.lift);
      p.line.opacity = 0.42 + p.lift * 0.45;
    });
    if (focus >= 0) {
      lean.setFromMatrixPosition(panels[focus].holder.matrixWorld);
      lean.y = 1.6;
      return lean;
    }
    return null;
  };

  return { group: g, update, dispose: off };
}
