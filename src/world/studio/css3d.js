/*
 * DOM-in-3D: positions real HTML elements in the 3D world with CSS matrix3d,
 * using the same maths as three.js's CSS3DRenderer (MIT, © three.js authors).
 * The difference: React owns the elements. This module never creates or moves
 * DOM nodes; it only writes `transform`, `opacity` and `pointer-events`.
 *
 *   view   — fixed, overflow-hidden container; receives `perspective`
 *   stage  — child with transform-style: preserve-3d; receives the camera matrix
 *   anchors — elements with [data-anchor] inside the stage
 */

const eps = (v) => (Math.abs(v) < 1e-10 ? 0 : v);

function cameraMatrix(m) {
  const e = m.elements;
  return `matrix3d(${eps(e[0])},${eps(-e[1])},${eps(e[2])},${eps(e[3])},${eps(e[4])},${eps(-e[5])},${eps(e[6])},${eps(e[7])},${eps(e[8])},${eps(-e[9])},${eps(e[10])},${eps(e[11])},${eps(e[12])},${eps(-e[13])},${eps(e[14])},${eps(e[15])})`;
}

function objectMatrix(m) {
  const e = m.elements;
  return `translate(-50%,-50%) matrix3d(${eps(e[0])},${eps(e[1])},${eps(e[2])},${eps(e[3])},${eps(-e[4])},${eps(-e[5])},${eps(-e[6])},${eps(-e[7])},${eps(e[8])},${eps(e[9])},${eps(e[10])},${eps(e[11])},${eps(e[12])},${eps(e[13])},${eps(e[14])},${eps(e[15])})`;
}

export function createCss3d(view, stage) {
  let perspective = -1;

  /** Update the camera transform. Call once per frame before placing anchors. */
  const setCamera = (camera, width, height) => {
    const fov = camera.projectionMatrix.elements[5] * (height / 2);
    if (fov !== perspective) {
      view.style.perspective = `${fov}px`;
      perspective = fov;
    }
    camera.updateMatrixWorld();
    stage.style.width = `${width}px`;
    stage.style.height = `${height}px`;
    stage.style.transform = `translateZ(${fov}px)${cameraMatrix(camera.matrixWorldInverse)}translate(${width / 2}px,${height / 2}px)`;
  };

  /** Place one element at an Object3D's world transform. */
  const place = (el, object) => {
    el.style.transform = objectMatrix(object.matrixWorld);
  };

  return { setCamera, place };
}
