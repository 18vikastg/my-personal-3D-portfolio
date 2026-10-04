// Tiny bridge between the HTML content and the 3D world. The content says
// what the reader is looking at; the world (if it exists) responds. If the
// world never loads, these events simply go nowhere.

const bus = new EventTarget();
const last = {};

export const emit = (type, detail) => {
  last[type] = detail;
  bus.dispatchEvent(new CustomEvent(type, { detail }));
};

export const on = (type, fn) => {
  const handler = (e) => fn(e.detail);
  bus.addEventListener(type, handler);
  if (type in last) fn(last[type]); // replay the latest state for late subscribers
  return () => bus.removeEventListener(type, handler);
};
