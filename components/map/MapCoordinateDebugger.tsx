"use client";

import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

type MapCoordinateDebuggerProps = {
  width: number;
  height: number;
  position: Position;
  onPositionChange: (position: Position) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

export default function MapCoordinateDebugger({
  width,
  height,
  position,
  onPositionChange,
  onDragStart,
  onDragEnd,
}: MapCoordinateDebuggerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
    onDragStart?.();

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    event.preventDefault();
    event.stopPropagation();

    const parent = event.currentTarget.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();

    // Posisi pointer relatif terhadap map yang sedang di-transform
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    // Convert kembali ke original map coordinate
    let x = (relativeX / rect.width) * width;
    let y = (relativeY / rect.height) * height;

    // Map bounds
    x = Math.max(0, Math.min(width, x));
    y = Math.max(0, Math.min(height, y));

    onPositionChange({
      x: Math.round(x),
      y: Math.round(y),
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
    onDragEnd?.();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none",
      }}
      className="z-50 flex items-center justify-center"
    >
      {/* DEBUG MARKER */}
      <div className="flex h-11 w-11 items-center justify-center rounded-full border-[5px] border-white bg-red-500 shadow-xl">
        <span className="h-4 w-4 rounded-full bg-white" />
      </div>
    </div>
  );
}