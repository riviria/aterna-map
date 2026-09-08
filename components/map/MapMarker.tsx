"use client";

import type { LocationType, MapLocation } from "./data/locations";

type MapMarkerProps = {
  location: MapLocation;
  active: boolean;
  focused: boolean;
  supportsHover: boolean;
  onOpen: () => void;
  onLeave: () => void;
  onToggle: () => void;
  onMarkerRef: (element: HTMLButtonElement | null) => void;
};

type MarkerStyle = {
  label: string;
  className: string;
};

const MARKER_STYLES: Record<LocationType, MarkerStyle> = {
  nation: {
    label: "Nation",
    className:
      "border-white bg-black text-white shadow-black/30",
  },
  city: {
    label: "City",
    className:
      "border-white bg-black text-white shadow-black/30",
  },
  landmark: {
    label: "Landmark",
    className:
      "border-white bg-black text-white shadow-black/30",
  },
  geography: {
    label: "Geography",
    className:
      "border-white bg-black text-white shadow-black/30",
  },
};

function MarkerIcon({ type }: { type: LocationType }) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "nation":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" {...commonProps}>
          <path d="M6 20V5" />
          <path d="M6 6c3-2 5 2 8 0 1.5-1 2.5-1 4-1v9c-1.5 0-2.5 0-4 1-3 2-5-2-8 0" />
        </svg>
      );

    case "city":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" {...commonProps}>
          <path d="M5 20V8h8v12" />
          <path d="M13 20V4h6v16" />
          <path d="M8 11h2M8 14h2M16 8h1M16 11h1M16 14h1" />
        </svg>
      );

    case "landmark":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" {...commonProps}>
          <path d="m12 4 2.1 4.4L19 9l-3.5 3.4.8 4.8-4.3-2.3-4.3 2.3.8-4.8L5 9l4.9-.6L12 4Z" />
        </svg>
      );

    case "geography":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" {...commonProps}>
          <path d="m3 19 6-10 4 6 2-3 6 7" />
          <path d="M8.5 19h11" />
        </svg>
      );
  }
}

export default function MapMarker({
  location,
  active,
  focused,
  supportsHover,
  onOpen,
  onLeave,
  onToggle,
  onMarkerRef,
}: MapMarkerProps) {
  const markerStyle = MARKER_STYLES[location.type];

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
      title={`${location.name} — ${markerStyle.label}`}
      style={{
        position: "absolute",
        left: location.x,
        top: location.y,
        transform: "translate(-50%, -50%)",
      }}
      className={`absolute z-30 flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-lg transition duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 touch-manipulation ${markerStyle.className} ${
        active ? "scale-110 ring-4 ring-white/25" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {focused && <span className="pointer-events-none absolute inset-[-9px] rounded-full border border-white/70 animate-ping" />}
      <MarkerIcon type={location.type} />
    </button>
  );
}
