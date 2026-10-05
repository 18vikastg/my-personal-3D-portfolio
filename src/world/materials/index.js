import {
  BufferGeometry,
  CanvasTexture,
  Color,
  EdgesGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  TextureLoader,
} from "three";

/*
 * The Model Studio's material language. One palette shared with the HTML:
 * ink, warm off-white, a restrained lime for "you are here", and the Silent
 * Stories cream + red, which only appear after the threshold.
 */
export const PALETTE = {
  ink: new Color("#0a0a0a"),
  black: new Color("#000000"),
  fg: new Color("#f2efe8"),
  lime: new Color("#d4ff3a"),
  cream: new Color("#efe3cf"),
  paper: new Color("#eeebe3"),
  red: new Color("#b3121a"),
};

/** Shared materials — created once per world and reused by every scene. */
export function createMaterials(quality) {
  return {
    line: new LineBasicMaterial({ color: PALETTE.fg, transparent: true, opacity: 0.42 }),
    lineFaint: new LineBasicMaterial({ color: PALETTE.fg, transparent: true, opacity: 0.18 }),
    lineLime: new LineBasicMaterial({ color: PALETTE.lime, transparent: true, opacity: 0.85 }),
    lineCream: new LineBasicMaterial({ color: PALETTE.cream, transparent: true, opacity: 0.55 }),
    lineRed: new LineBasicMaterial({ color: PALETTE.red, transparent: true, opacity: 0.8 }),
    solid: new MeshStandardMaterial({ color: "#161616", roughness: 0.92, metalness: 0 }),
    charcoal: new MeshStandardMaterial({ color: "#222120", roughness: 0.85, metalness: 0 }),
    machine: new MeshStandardMaterial({ color: "#5b5750", roughness: 0.55, metalness: 0.1 }),
    paper: new MeshStandardMaterial({ color: PALETTE.paper, roughness: 0.96, metalness: 0 }),
    lime: new MeshBasicMaterial({ color: PALETTE.lime }),
    red: new MeshBasicMaterial({ color: PALETTE.red }),
    cream: new MeshBasicMaterial({ color: PALETTE.cream }),
    // Glass only where the GPU can afford it — no transmission pass either way
    glass:
      quality === "high"
        ? new MeshPhysicalMaterial({ color: "#cfd6d2", roughness: 0.15, metalness: 0, transparent: true, opacity: 0.12, clearcoat: 1 })
        : new MeshBasicMaterial({ color: "#cfd6d2", transparent: true, opacity: 0.06 }),
  };
}

/** A tiny cache so scenes share geometries instead of re-creating them. */
export function createGeometryCache() {
  const map = new Map();
  return {
    get(key, make) {
      if (!map.has(key)) map.set(key, make());
      return map.get(key);
    },
    dispose() {
      map.forEach((g) => g.dispose());
      map.clear();
    },
  };
}

/** Lazily loaded image textures (screenshots, poster, portrait). */
export function createTextureLoader(maxAnisotropy = 4) {
  const loader = new TextureLoader();
  const loaded = [];
  return {
    load(url, onLoad) {
      const t = loader.load(url, onLoad);
      t.colorSpace = SRGBColorSpace;
      t.anisotropy = maxAnisotropy;
      loaded.push(t);
      return t;
    },
    dispose() {
      loaded.forEach((t) => t.dispose());
    },
  };
}

/**
 * A small text label drawn into a texture — used only where the same words
 * also exist in the HTML (workflow states, tool plaques).
 */
export function labelTexture(text, { size = 44, color = "#f2efe8", font = '500 {s}px "Geist Mono", ui-monospace, monospace', pad = 18 } = {}) {
  const c = document.createElement("canvas");
  const x = c.getContext("2d");
  const f = font.replace("{s}", size);
  x.font = f;
  const w = Math.ceil(x.measureText(text).width) + pad * 2;
  const h = size + pad * 2;
  c.width = w;
  c.height = h;
  x.font = f;
  x.fillStyle = color;
  x.textBaseline = "middle";
  x.fillText(text, pad, h / 2 + 2);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return { texture: t, aspect: w / h };
}

/** A solid with its edges drawn — the basic "model" object of the studio. */
export function edged(mesh, lineMaterial) {
  mesh.add(new LineSegments(new EdgesGeometry(mesh.geometry, 20), lineMaterial));
  return mesh;
}

/** LineSegments from a flat [x,y,z, x,y,z, ...] array. */
export function segments(points, material) {
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(points, 3));
  return new LineSegments(g, material);
}
