"use client";

import { useCallback, useSyncExternalStore } from "react";

type MapFullscreenButtonProps = {
  targetRef: React.RefObject<HTMLElement | null>;
};

function subscribeToFullscreen(onStoreChange: () => void) {
  document.addEventListener("fullscreenchange", onStoreChange);
  return () => document.removeEventListener("fullscreenchange", onStoreChange);
}

function getFullscreenSnapshot() {
  return document.fullscreenElement !== null;
}

function getServerFullscreenSnapshot() {
  return false;
}

function FullscreenEnterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
    </svg>
  );
}

function FullscreenExitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" />
    </svg>
  );
}

export default function MapFullscreenButton({ targetRef }: MapFullscreenButtonProps) {
  const isFullscreen = useSyncExternalStore(
    subscribeToFullscreen,
    getFullscreenSnapshot,
    getServerFullscreenSnapshot
  );

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await targetRef.current?.requestFullscreen();
    } catch {
      // Fullscreen may be blocked by the browser or embedding context.
    }
  }, [targetRef]);

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
      className="absolute bottom-5 right-[72px] z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/80 shadow-lg backdrop-blur-md transition hover:bg-black/90 hover:text-white"
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
    </button>
  );
}
