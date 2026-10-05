import { Group, Mesh } from "three";
import { anchor, block, boxGeo, station, v } from "../kit";
import { on } from "../../bus";
import { currently } from "../../../data/site";

/**
 * SIGNALS — what's next. Through the exit beside the screen, the light comes
 * back a little: a line of slim posts, each carrying one thing I'm thinking
 * about, rising as they lead toward the end of the studio.
 */
export function signals(ctx) {
  const g = new Group();
  const spot = (i) => ({ x: -2.4 + i * 1.3, z: -287 - i * 2.4, h: 1.0 + i * 0.32 });
  const caps = currently.map((_, i) => {
    const s = spot(i);
    g.add(block(ctx, [0.07, s.h, 0.07], [s.x, s.h / 2, s.z], { mat: "solid", line: "lineFaint" }));
    const cap = new Mesh(boxGeo(ctx, 0.16, 0.16, 0.16), ctx.mats.cream);
    cap.position.set(s.x, s.h + 0.1, s.z);
    g.add(cap);
    return cap;
  });

  let lit = -1;
  let dirty = true;
  const off = on("signal", (i) => {
    lit = i;
    dirty = true;
  });
  const update = (dt, s) => {
    const want = s.room === "signals" ? Math.round((s.at - s.roomStart) * 2.5) : -1;
    if (want !== lit) {
      lit = want;
      dirty = true;
    }
    if (!dirty) return false;
    caps.forEach((c, i) => (c.material = i <= lit ? ctx.mats.lime : ctx.mats.cream));
    dirty = false;
    return true;
  };

  const anchors = [
    anchor("signals:title", { pos: v(-3.2, 2.7, -285.5), ry: 0.35, scale: 0.0032, at: ["signals:0"], parent: g }),
    ...currently.map((_, i) => {
      const s = spot(i);
      return anchor(`signals:item-${i}`, { pos: v(s.x + 0.15, s.h + 0.5, s.z), scale: 0.0042, at: [i < 3 ? "signals:0" : "signals:1"], parent: g });
    }),
  ];
  const stations = [
    station("signals:0", "signals", { focus: v(-1.3, 2.0, -288.5), dir: v(0.12, 0.2, 1), fit: 2.0, narrow: { focus: v(-1.6, 1.9, -288.4), fit: 1.15 }, via: [v(6.2, 1.8, -282.6)], mood: "signals" }),
    station("signals:1", "signals", { focus: v(2.0, 2.5, -295), dir: v(-0.1, 0.2, 1), fit: 1.9, narrow: { focus: v(1.6, 2.4, -295.2), fit: 1.15 }, mood: "signals" }),
  ];
  return { group: g, anchors, stations, update, dispose: off };
}
