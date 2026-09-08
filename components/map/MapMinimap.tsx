"use client";

import Image from "next/image";
import { useState } from "react";

type MapMinimapProps = {
  mapWidth: number;
  mapHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  scale: number;
  positionX: number;
  positionY: number;
};

export default function MapMinimap({
  mapWidth,
  mapHeight,
  viewportWidth,
  viewportHeight,
  scale,
  positionX,
  positionY,
}: MapMinimapProps) {
  const [isVisible, setIsVisible] = useState(true);

  const width = 176;
  const height = Math.round((width / mapWidth) * mapHeight);
  const viewportX = Math.max(0, Math.min(mapWidth, -positionX / scale));
  const viewportY = Math.max(0, Math.min(mapHeight, -positionY / scale));
  const visibleWidth = Math.min(mapWidth, viewportWidth / scale);
  const visibleHeight = Math.min(mapHeight, viewportHeight / scale);

  return (
    <div className="absolute bottom-5 left-5 z-40">
      {isVisible && (
        <div
          className="relative mb-2 overflow-hidden rounded-xl border border-white/10 bg-black/45 shadow-lg backdrop-blur-sm"
          style={{ width, height }}
        >
          <Image
            src="/maps/aterna-world-map.png"
            alt=""
            fill
            sizes="176px"
            className="pointer-events-none object-fill opacity-70"
          />

          <div
            className="pointer-events-none absolute border border-white/70 bg-white/5 shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
            style={{
              left: (viewportX / mapWidth) * width,
              top: (viewportY / mapHeight) * height,
              width: Math.max(2, (visibleWidth / mapWidth) * width),
              height: Math.max(2, (visibleHeight / mapHeight) * height),
            }}
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsVisible((current) => !current)}
        aria-label={isVisible ? "Hide minimap" : "Show minimap"}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/65 text-white/75 shadow-lg backdrop-blur-md transition hover:bg-black/80 hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M8 4v16M4 9h16" />
        </svg>
      </button>
    </div>
  );
}
