import { createContext, useContext } from "react";

/** Lets any content move the visitor to a station: go("cinema:1"). */
export const NavContext = createContext({ go: () => {}, current: "", narrow: false });
export const useStudioNav = () => useContext(NavContext);

// Rooms of the studio, in walking order (station key each room starts at)
export const ROOMS = [
  { key: "entrance:0", label: "Entrance", rooms: ["entrance"] },
  { key: "gallery:0", label: "Gallery", rooms: ["gallery", "work"] },
  { key: "engineering:0", label: "Engineering floor", rooms: ["engineering"] },
  { key: "thinking:0", label: "Thinking room", rooms: ["thinking"] },
  { key: "lab:0", label: "Lab", rooms: ["lab"] },
  { key: "tools:0", label: "Tool wall", rooms: ["tools"] },
  { key: "archive:0", label: "Archive", rooms: ["archive"] },
  { key: "threshold:0", label: "Silent Stories", rooms: ["threshold", "cinema"] },
  { key: "signals:0", label: "Signals", rooms: ["signals"] },
  { key: "contact:0", label: "The end", rooms: ["contact"] },
];
export const roomOf = (room) => ROOMS.find((r) => r.rooms.includes(room));
