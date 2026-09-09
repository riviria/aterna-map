"use client";

import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";

import type { Language } from "./data/language";
import { getTranslations } from "./data/language";
import { getLocalizedText, type MapLocation, type NationProfile } from "./data/locations";

interface MapLocationPopupProps {
  location: MapLocation;
  language: Language;
  x: number;
  y: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
  onViewDetails: () => void;
}

const NATION_PROFILE_KEYS: (keyof NationProfile)[] = [
  "form",
  "capital",
  "raceComposition",
];

function ShareIcon() {
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
      <path d="M12 16V4" />
      <path d="m8 8 4-4 4 4" />
      <path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}

const MapLocationPopup = forwardRef<HTMLDivElement, MapLocationPopupProps>(
  function MapLocationPopup(
    { location, language, x, y, onMouseEnter, onMouseLeave, onClose, onViewDetails },
    ref
  ) {
    const translations = getTranslations(language);
    const nationProfile = location.nationProfile;
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [shareFeedback, setShareFeedback] = useState<"copied" | "error" | null>(null);

    useEffect(() => {
      if (!shareFeedback) return;

      const timer = window.setTimeout(() => setShareFeedback(null), 1800);
      return () => window.clearTimeout(timer);
    }, [shareFeedback]);

    const handleShare = async () => {
      const url = new URL(window.location.href);
      url.searchParams.set("location", location.id);

      const shareData = {
        title: location.name,
        text: translations.shareText(location.name),
        url: url.toString(),
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
          return;
        }

        await navigator.clipboard.writeText(shareData.url);
        setShareFeedback("copied");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setShareFeedback("error");
      }
    };

    return (
      <div
        ref={ref}
        className="absolute z-[999] w-[340px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] overflow-x-hidden overflow-y-auto rounded-3xl border border-white/10 bg-[#252d33] shadow-2xl transition-opacity duration-200"
        style={{ left: x, top: y }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        {location.thumbnail && (
          <div className="relative h-36 w-full overflow-hidden bg-white/5 sm:h-[170px]">
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
            )}

            <Image
              src={location.thumbnail}
              alt={location.name}
              fill
              sizes="(max-width: 640px) calc(100vw - 32px), 340px"
              draggable={false}
              referrerPolicy="no-referrer"
              onLoad={() => setIsImageLoaded(true)}
              className={`select-none object-cover transition duration-500 ease-out ${
                isImageLoaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-sm"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252d33] via-transparent to-transparent" />
          </div>
        )}

        <div className="relative px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
          <button
            type="button"
            aria-label={translations.closePopup}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-lg text-white/70 transition hover:bg-black/50 hover:text-white sm:right-4 sm:top-4 sm:h-8 sm:w-8"
          >
            ×
          </button>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-white/50">
            {translations.locationTypes[location.type]}
          </p>

          <h2 className="pr-8 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {location.name}
          </h2>

          {location.type === "nation" && nationProfile ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 sm:mt-3">
              {NATION_PROFILE_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex flex-col gap-1.5 border-b border-white/10 px-2 py-1 last:border-b-0"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-white/40">
                    {translations.nationProfile[key]}
                  </span>
                  <span className="text-sm leading-6 text-white/80">
                    {getLocalizedText(nationProfile[key], language)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-white/70 sm:mt-5 sm:text-base sm:leading-8">
              {getLocalizedText(location.description, language)}
            </p>
          )}

          <div className="my-5 h-px w-full bg-white/10 sm:my-6" />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/65 transition hover:text-white"
            >
              <ShareIcon />
              {shareFeedback === "copied"
                ? translations.linkCopied
                : shareFeedback === "error"
                  ? translations.shareFailed
                  : translations.share}
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onViewDetails();
              }}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:text-red-400 sm:text-sm"
            >
              {translations.viewDetails}
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default MapLocationPopup;
