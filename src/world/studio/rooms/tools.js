import { BufferGeometry, CylinderGeometry, Float32BufferAttribute, Group, InstancedMesh, LineSegments, Matrix4, Vector3 } from "three";
import { anchor, block, partition, station, v } from "../kit";
import { on } from "../../bus";
import { placeOf, places as PLACES, shippedWith } from "../../../data/stack";


/**
 * TOOL WALL — a pegboard of tool tags (real buttons, grouped by kind) and,
 * on the side wall, the places they were used. Pick a tool and strings run
 * from that tag to every place it was used: a knowledge map with receipts.
 * String ends are measured from the HTML layout itself (offsetLeft/Top are
 * unaffected by 3D transforms), so they always land on the right tag.
 */
export function tools(ctx) {
  const g = new Group();
  partition(ctx, -208).forEach((b) => g.add(b));
  const boardZ = -207.85;

  // Pegboard with pegs, and the side wall for places
  g.add(block(ctx, [11.6, 3.6, 0.08], [0.6, 2.1, boardZ - 0.02], { mat: "charcoal", line: "lineFaint" }));
  const pegs = new InstancedMesh(ctx.geo.get("peg", () => new CylinderGeometry(0.018, 0.018, 0.08, 6)), ctx.mats.solid, 22 * 7);
  const m = new Matrix4();
  let n = 0;
  for (let i = 0; i < 22; i++) for (let j = 0; j < 7; j++) {
    m.makeRotationX(Math.PI / 2).setPosition(-4.9 + i * 0.52, 0.7 + j * 0.47, boardZ + 0.04);
    pegs.setMatrixAt(n++, m);
  }
  g.add(pegs);

  const board = anchor("tools:board", { pos: v(-1.3, 2.1, boardZ + 0.1), scale: 0.0031, at: ["tools:0", "tools:1"], parent: g });
  const places = anchor("tools:places", { pos: v(4.25, 2.15, boardZ + 0.1), scale: 0.0031, at: ["tools:0", "tools:1"], parent: g });
  const anchors = [
    board,
    places,
    anchor("tools:title", { pos: v(0.6, 4.25, boardZ + 0.1), scale: 0.0031, at: ["tools:0"], parent: g }),
    anchor("tools:used", { pos: v(6.05, 2.15, boardZ + 0.1), scale: 0.0031, at: ["tools:1"], parent: g }),
  ];

  // Strings
  const strings = new LineSegments(new BufferGeometry(), ctx.mats.lineLime);
  strings.geometry.setAttribute("position", new Float32BufferAttribute(new Float32Array(PLACES.length * 6), 3));
  strings.frustumCulled = false;
  g.add(strings);

  let els = null;
  let active = "TypeScript";
  let dirty = true;
  const local = new Vector3();
  // Element-local px → world: CSS3D maps 1px to 1 local unit, centred, y up.
  // A little in front of the surface so strings sit over the tags.
  const pointIn = (a, cx, cy) => {
    const host = els[a.key];
    local.set(cx - host.offsetWidth / 2, -(cy - host.offsetHeight / 2), 20);
    return a.object.localToWorld(local.clone());
  };
  const offsetIn = (el, host) => {
    let x = 0;
    let y = 0;
    for (let e = el; e && e !== host; e = e.offsetParent) {
      x += e.offsetLeft;
      y += e.offsetTop;
    }
    return [x, y];
  };
  const restring = () => {
    if (!els?.["tools:board"] || !els?.["tools:places"]) return;
    const btn = els["tools:board"].querySelector(`[data-tool="${CSS.escape(active)}"]`);
    const tool = shippedWith.find((t) => t.name === active);
    if (!btn || !tool) return;
    const [bx, by] = offsetIn(btn, els["tools:board"]);
    const from = pointIn(board, bx + btn.offsetWidth / 2, by + btn.offsetHeight / 2);
    const targets = [...new Set(tool.usedIn.map(placeOf))];
    const arr = strings.geometry.attributes.position.array;
    arr.fill(0);
    targets.forEach((p, k) => {
      const row = els["tools:places"].querySelector(`[data-place="${p}"]`);
      if (!row) return;
      const [rx, ry] = offsetIn(row, els["tools:places"]);
      const to = pointIn(places, rx + 6, ry + row.offsetHeight / 2);
      arr.set([from.x, from.y, from.z, to.x, to.y, to.z], k * 6);
    });
    strings.geometry.setDrawRange(0, targets.length * 2);
    strings.geometry.attributes.position.needsUpdate = true;
  };

  const off = on("tool", (name) => {
    active = name;
    dirty = true;
  });

  const update = () => {
    if (!dirty) return false;
    dirty = false;
    restring();
    return true;
  };

  const stations = [
    station("tools:0", "tools", { focus: v(-1.3, 2.2, boardZ), dir: v(0.03, 0.05, 1), fit: 1.7, narrow: { anchor: "tools:board" }, via: [v(0, 1.9, -200.5)], mood: "tools" }),
    station("tools:1", "tools", { focus: v(4.7, 2.2, boardZ), dir: v(-0.12, 0.05, 1), fit: 1.75, narrow: { anchor: "tools:used" }, mood: "tools" }),
  ];
  return {
    group: g,
    anchors,
    stations,
    update,
    dispose: off,
    bind(elements) {
      els = elements;
      dirty = true;
    },
    relayout() {
      dirty = true;
    },
  };
}
