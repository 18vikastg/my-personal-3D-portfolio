import { Color, Group, InstancedMesh, Matrix4, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { anchor, block, cylinder, frameOf, slab, station, tint, v } from "../kit";

const SPICES = ["#2a1d17", "#d6a21e", "#c27a1c", "#efe0b0", "#8a5a44", "#5c7a3a", "#a8341f"];

/**
 * SWANAND SPICES — not a software dashboard: a small family market stall.
 * Wooden counter, shelves of jars in spice colours, an awning, the real
 * storefront as the shop sign, and a phone on the counter sending the order
 * over WhatsApp — the thing the site actually does.
 */
export function swanand(ctx) {
  const g = new Group();
  g.position.set(-4.6, 0, -28);
  g.rotation.y = Math.PI / 2 - 0.25; // faces the hall, angled toward the visitor
  const wood = tint(ctx, "#5e3f26", 0.7);
  const woodLight = tint(ctx, "#8a6440", 0.6);
  const green = tint(ctx, "#1f3b2a", 0.9);

  g.add(block(ctx, [6.4, 0.05, 4.4], [0, 0.025, 0], { mat: "charcoal", line: "lineFaint" }));

  // Shelf unit: posts + three boards
  [-2.4, 2.4].forEach((x) => g.add(block(ctx, [0.08, 2.7, 0.5], [x, 1.35, -1.2], { mat: "solid", line: "lineFaint" })));
  [0.75, 1.45, 2.15].forEach((y) => g.add(slab(ctx, [4.8, 0.05, 0.5], [0, y, -1.2], wood)));

  // Jars, instanced, coloured per spice
  const perRow = ctx.quality === "low" ? 9 : 14;
  const jarGeo = cylinder(ctx, 0.11, 0.28, [0, 0, 0]).geometry;
  const jars = new InstancedMesh(jarGeo, tint(ctx, "#ffffff", 0.5), perRow * 3);
  const m = new Matrix4();
  const c = new Color();
  let n = 0;
  [0.92, 1.62, 2.32].forEach((y, row) => {
    for (let i = 0; i < perRow; i++) {
      m.makeTranslation(-2.15 + (i * 4.3) / (perRow - 1), y, -1.2);
      jars.setMatrixAt(n, m);
      jars.setColorAt(n, c.set(SPICES[(i + row * 2) % SPICES.length]));
      n++;
    }
  });
  g.add(jars);

  // Counter
  g.add(block(ctx, [4.6, 1.0, 0.9], [0, 0.5, 0.75], { mat: "solid", line: "lineFaint" }));
  g.add(slab(ctx, [4.8, 0.06, 1.05], [0, 1.03, 0.75], woodLight));
  g.add(slab(ctx, [4.6, 0.96, 0.02], [0, 0.5, 1.21], wood));

  // Awning
  const awning = slab(ctx, [5.4, 0.06, 1.6], [0, 3.05, 0.1], green);
  awning.rotation.x = 0.32;
  g.add(awning);
  [-2.55, 2.55].forEach((x) => g.add(block(ctx, [0.06, 3.0, 0.06], [x, 1.5, 0.85], { mat: "solid", line: "lineFaint" })));

  // The shop sign is the real storefront
  const sign = new Mesh(
    new PlaneGeometry(2.24, 1.4),
    new MeshBasicMaterial({ map: ctx.tex.load("/work/swanand-spices.webp"), toneMapped: false })
  );
  sign.position.set(3.75, 1.75, 0.2);
  sign.rotation.y = -0.45;
  g.add(sign);
  g.add(block(ctx, [2.34, 1.5, 0.04], [3.76, 1.75, 0.18], { mat: "solid", line: "lineCream", ry: -0.45 }));
  g.add(block(ctx, [0.05, 1.0, 0.05], [3.76, 0.5, 0.18], { mat: "solid", line: "lineFaint" }));

  // Phone on the counter, an order going out
  const phone = block(ctx, [0.34, 0.66, 0.035], [-1.25, 1.42, 0.8], { mat: "solid", line: "lineCream" });
  phone.rotation.x = -0.35;
  g.add(phone);
  [
    [0.16, 0.06, "#2f6b45"],
    [0.12, -0.06, "#efe3cf"],
    [0.18, -0.18, "#2f6b45"],
  ].forEach(([w, y, col]) => {
    const bubble = new Mesh(ctx.geo.get(`plane:${w}:0.07`, () => new PlaneGeometry(w, 0.07)), tint(ctx, col, 0.6));
    bubble.position.set(0, y + 0.08, 0.02);
    phone.add(bubble);
  });

  const at = (k) => [`swanand:${k}`];
  const anchors = [
    anchor("swanand:title", { pos: v(0, 3.55, 1.0), rx: 0.32, at: [...at(0)], parent: g }),
    anchor("swanand:problem", { pos: v(-3.55, 1.75, 0.2), ry: 0.42, at: at(1), parent: g }),
    anchor("swanand:built", { pos: v(0, 0.52, 1.23), at: at(2), scale: 0.0034, parent: g }),
    anchor("swanand:eng", { pos: v(3.75, 1.8, 0.24), ry: -0.45, at: at(3), scale: 0.0034, parent: g }),
  ];

  const f = frameOf(g);
  const stations = [
    station("swanand:0", "work", { focus: f.p(0, 2.0, 0), dir: f.d(0, 0.12, 1), fit: 3.5, narrow: { focus: f.p(0, 3.4, 1), fit: 1.95 }, mood: "market" }),
    station("swanand:1", "work", { focus: f.p(-2.8, 1.6, -0.1), dir: f.d(0.42, 0.08, 1), fit: 1.9, narrow: { anchor: "swanand:problem" }, mood: "market" }),
    station("swanand:2", "work", { focus: f.p(-0.3, 1.0, 0.9), dir: f.d(0, 0.3, 1), fit: 1.9, narrow: { focus: f.p(0, 0.6, 1.2), fit: 1.5 }, mood: "market" }),
    station("swanand:3", "work", { focus: f.p(3.4, 1.75, 0.25), dir: f.d(-0.45, 0.06, 1), fit: 1.6, narrow: { anchor: "swanand:eng" }, mood: "market" }),
  ];
  return { group: g, anchors, stations };
}
