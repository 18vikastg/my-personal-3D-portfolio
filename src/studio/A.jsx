import { useStudioNav } from "./nav";

/**
 * A block of HTML that lives at a place in the world (see world/studio).
 * `width` may be a pair — [wide, narrow] — so wall signage re-sets its
 * measure on phones; the camera then frames the block by its real width.
 */
export const A = ({ k, as: Tag = "div", className = "", width, style, children, ...rest }) => {
  const { narrow } = useStudioNav();
  const w = Array.isArray(width) ? width[narrow ? 1 : 0] : width;
  return (
    <Tag data-anchor={k} className={`anchor ${className}`} style={{ width: w, ...style }} {...rest}>
      {children}
    </Tag>
  );
};
