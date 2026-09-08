"use client";

import type { LocationType, MapLocation } from "./data/locations";

const LABEL_ZOOM_LEVELS: Record<LocationType, number> = {
  nation: 2,
  city: 2.75,
  landmark: 2,
  geography: 2,
};

type MapLabelProps = {
  location: MapLocation;
  zoomRatio: number;
};

export default function MapLabel({ location, zoomRatio }: MapLabelProps) {
  if (zoomRatio < LABEL_ZOOM_LEVELS[location.type]) return null;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute z-20 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]"
      style={{
        left: location.x,
        top: location.y + 15,
      }}
    >
      {location.name}
    </span>
  );
}
