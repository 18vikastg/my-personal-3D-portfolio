import { useRef } from "react";
import { useMagnetic } from "../lib/motion";

/** An anchor styled as a button that leans toward the cursor. */
const MagneticLink = ({ className = "", strength, children, ...props }) => {
  const ref = useRef(null);
  useMagnetic(ref, strength);
  return (
    <a ref={ref} className={className} {...props}>
      {children}
    </a>
  );
};

export default MagneticLink;
