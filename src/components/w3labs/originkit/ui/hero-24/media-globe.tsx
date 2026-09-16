"use client";

import { useEffect, useState } from "react";
import Globe from "./globe";

const ACCENT = "#00A1DB";
const GLOBE_DOTS = { color: ACCENT, size: 5, density: 8, allDots: false };

export const MediaGlobe = ({ query }: { query: string }) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  if (!matches) return null;

  return (
    <Globe
      scale={9.7}
      stopOnHover
      initialLatitude={23}
      initialLongitude={-23}
      fill="dots"
      dots={GLOBE_DOTS}
      showOutline
      outlineColor={ACCENT}
      showGrid
      graticuleColor={ACCENT}
      oceanColor="#101216"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
