"use client";

import type { MapLocation } from "./data/locations";
import MapMarker from "./MapMarker";

type MapLocationsProps = {
  locations: MapLocation[];
  activeLocationId: string | null;
  supportsHover: boolean;
  onOpen: (locationId: string) => void;
  onScheduleClose: () => void;
  onToggle: (locationId: string) => void;
  onMarkerRef: (locationId: string, element: HTMLButtonElement | null) => void;
};

// Merender marker berdasarkan daftar `locations` yang diterima (sudah
// difilter oleh AternaMap.tsx sesuai chip tipe yang aktif). Tidak
// menyimpan state sendiri — semua state (active location, hover, dsb)
// dikontrol oleh AternaMap.tsx.
export default function MapLocations({
  locations,
  activeLocationId,
  supportsHover,
  onOpen,
  onScheduleClose,
  onToggle,
  onMarkerRef,
}: MapLocationsProps) {
  return (
    <>
      {locations.map((location) => (
        <MapMarker
          key={location.id}
          location={location}
          active={location.id === activeLocationId}
          supportsHover={supportsHover}
          onOpen={() => onOpen(location.id)}
          onLeave={onScheduleClose}
          onToggle={() => onToggle(location.id)}
          onMarkerRef={(element) => onMarkerRef(location.id, element)}
        />
      ))}
    </>
  );
}
