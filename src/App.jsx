import { Component, lazy, Suspense, useState } from "react";
import Site2D from "./site2d/Site2D";
import { detectQuality } from "./world/quality";

// The studio (and three.js with it) is only downloaded where it will run.
const Studio = lazy(() => import("./studio/Studio"));

/** A brief veil while the studio's code arrives — never a flash of the 2D site. */
const Veil = () => (
  <div className="fixed inset-0 grid place-items-center bg-ink" role="status">
    <p className="text-center">
      <span className="block text-lg font-medium tracking-tight">Vikas T G</span>
      <span className="mt-2 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-dim">Opening the studio…</span>
    </p>
  </div>
);

/** If the studio's code can't load at all, serve the 2D site instead. */
class Guard extends Component {
  state = { broken: false };
  static getDerivedStateFromError() {
    return { broken: true };
  }
  render() {
    return this.state.broken ? <Site2D /> : this.props.children;
  }
}

/**
 * The portfolio is a 3D studio you walk through. Where that isn't a good
 * idea — reduced motion, no WebGL, weak devices — or if the studio steps
 * aside at runtime, the same content is served as the flat 2D site.
 */
const App = () => {
  const [quality] = useState(detectQuality);
  const [failed, setFailed] = useState(false);

  if (quality === "off" || failed) return <Site2D />;

  return (
    <Guard>
      <Suspense fallback={<Veil />}>
        <Studio quality={quality} onFail={() => setFailed(true)} />
      </Suspense>
    </Guard>
  );
};

export default App;
