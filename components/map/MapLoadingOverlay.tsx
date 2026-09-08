"use client";

type MapLoadingOverlayProps = {
  isVisible: boolean;
};

export default function MapLoadingOverlay({ isVisible }: MapLoadingOverlayProps) {
  return (
    <div
      aria-hidden={!isVisible}
      className={`pointer-events-none absolute inset-0 z-[1000] flex items-center justify-center bg-[#151c20] transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-px w-16 bg-white/40" />

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/90 sm:text-sm">
            Aterna
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40 sm:text-xs">
            Interactive World Atlas
          </p>
        </div>

        <div className="h-px w-32 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-pulse bg-white/70" />
        </div>

        <p className="text-xs text-white/40">Loading world map...</p>
      </div>
    </div>
  );
}
