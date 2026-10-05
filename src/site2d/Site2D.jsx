import Nav from "../ui/Nav";
import Hero from "../sections/Hero";
import Work from "../sections/Work";
import Experience from "../sections/Experience";
import Principles from "../sections/Principles";
import Lab from "../sections/Lab";
import Toolbox from "../sections/Toolbox";
import Proof from "../sections/Proof";
import SilentStories from "../sections/SilentStories";
import Currently from "../sections/Currently";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

/**
 * The flat, editorial version of the portfolio. It is what people get when
 * the 3D studio shouldn't run: reduced motion, no WebGL, Save-Data, weak
 * devices, or when the studio steps aside because a device can't keep up.
 */
const Site2D = () => (
  <>
    <a
      href="#work"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink"
    >
      Skip to work
    </a>
    <Nav />
    <main>
      <Hero />
      <Work />
      <Experience />
      <Principles />
      <Lab />
      <Toolbox />
      <Proof />
      <SilentStories />
      <Currently />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Site2D;
