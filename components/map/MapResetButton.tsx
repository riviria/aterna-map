"use client";

type MapResetButtonProps = {
  onReset: () => void;
};

export default function MapResetButton({ onReset }: MapResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      aria-label="Reset map view"
      className="absolute bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-lg text-white/80 shadow-lg backdrop-blur-md transition hover:bg-black/90 hover:text-white"
    >
      ⟲
    </button>
  );
}
