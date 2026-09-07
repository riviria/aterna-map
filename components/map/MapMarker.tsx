"use client";

import type { MapLocation } from "./data/locations";

type MapMarkerProps = {
  location: MapLocation;
  active: boolean;
  supportsHover: boolean;
  onOpen: () => void;
  onLeave: () => void;
  onToggle: () => void;
  onMarkerRef: (element: HTMLButtonElement | null) => void;
};

export default function MapMarker({
  location,
  active,
  supportsHover,
  onOpen,
  onLeave,
  onToggle,
  onMarkerRef,
}: MapMarkerProps) {
  const handleMouseEnter = () => {
    if (!supportsHover) return;
    onOpen();
  };

  const handleMouseLeave = () => {
    if (!supportsHover) return;
    onLeave();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggle();
  };

  return (
    <button
      ref={onMarkerRef}
      type="button"
      aria-label={`Open ${location.name}`}
      // Menggunakan koordinat asli map. Karena marker berada di dalam
      // TransformComponent, marker akan ikut zoom/pan/pinch bersama map.
      style={{
        position: "absolute",
        left: location.x,
        top: location.y,
        transform: "translate(-50%, -50%)",
      }}
      className={`absolute z-30 flex h-6 w-6 items-center justify-center rounded-full border-[5px] border-white bg-red-500 shadow-lg transition duration-200 hover:scale-110 focus:outline-none touch-manipulation ${
        active ? "scale-110" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      // Jangan sampai klik marker dianggap sebagai klik area kosong.
      onPointerDown={(event) => event.stopPropagation()}
    >
      <span className="h-2 w-2 rounded-full bg-white" />
    </button>
  );
}