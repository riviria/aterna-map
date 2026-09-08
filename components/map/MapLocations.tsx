"use client";

import type { MapLocation } from "./data/locations";
import MapMarker from "./MapMarker";

type MapLocationsProps = {
  locations: MapLocation[];
  activeLocationId: string | null;
  focusedLocationId: string | null;
  supportsHover: boolean;
  onOpen: (locationId: string) => void;
  onScheduleClose: () => void;
  onToggle: (locationId: string) => void;
  onMarkerRef: (locationId: string, element: HTMLButtonElement | null) => void;
};

export default function MapLocations({
  locations,
  activeLocationId,
  focusedLocationId,
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
          focused={location.id === focusedLocationId}
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
