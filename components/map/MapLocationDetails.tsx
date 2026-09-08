"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import type { MapLocation } from "./data/locations";
import { locationDetails } from "./data/locationDetails";
import { readSavedDetailState, saveDetailState } from "./data/mapPersistence";

interface MapLocationDetailsProps {
  location: MapLocation;
  onClose: () => void;
}

function BackIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M15 10H5" />
      <path d="m9 14-4-4 4-4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {direction === "left" ? <path d="m12 5-5 5 5 5" /> : <path d="m8 5 5 5-5 5" />}
    </svg>
  );
}

export default function MapLocationDetails({
  location,
  onClose,
}: MapLocationDetailsProps) {
  const detail = locationDetails[location.id];
  const gallery = useMemo(
    () =>
      detail?.images?.length
        ? detail.images
        : location.thumbnail
          ? [{ src: location.thumbnail, caption: "" }]
          : [],
    [detail?.images, location.thumbnail]
  );

  const tabs = detail?.tabs ?? [];
  const savedDetailState = readSavedDetailState();
  const savedTabId = savedDetailState?.locationId === location.id ? savedDetailState.tabId : undefined;
  const savedImageIndex = savedDetailState?.locationId === location.id ? savedDetailState.imageIndex : undefined;
  const initialTabId = savedTabId && tabs.some((tab) => tab.id === savedTabId)
    ? savedTabId
    : tabs[0]?.id ?? "";
  const initialImageIndex =
    typeof savedImageIndex === "number" && savedImageIndex >= 0 && savedImageIndex < gallery.length
      ? savedImageIndex
      : 0;

  const [activeTabId, setActiveTabId] = useState(initialTabId);
  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);
  const [galleryStartIndex, setGalleryStartIndex] = useState(Math.min(initialImageIndex, Math.max(0, gallery.length - 4)));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const activeImage = gallery[activeImageIndex];
  const visibleGallery = gallery.slice(galleryStartIndex, galleryStartIndex + 4);
  const hasPreviousGalleryPage = galleryStartIndex > 0;
  const hasNextGalleryPage = galleryStartIndex + 4 < gallery.length;

  const selectImage = (index: number) => {
    setActiveImageIndex(index);
    setIsImageLoaded(false);
    saveDetailState({
      locationId: location.id,
      tabId: activeTab?.id,
      imageIndex: index,
    });

    if (index < galleryStartIndex) {
      setGalleryStartIndex(index);
    } else if (index >= galleryStartIndex + 4) {
      setGalleryStartIndex(Math.min(index - 3, Math.max(0, gallery.length - 4)));
    }
  };

  const shiftGallery = (direction: "left" | "right") => {
    const nextIndex =
      direction === "left"
        ? Math.max(0, galleryStartIndex - 1)
        : Math.min(Math.max(0, gallery.length - 4), galleryStartIndex + 1);

    setGalleryStartIndex(nextIndex);
  };

  return (
    <AnimatePresence>
      <motion.section
        key={location.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="fixed inset-0 z-[2000] overflow-y-auto bg-[#f4f4f1] text-black"
        aria-label={`${location.name} details`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col px-5 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 transition hover:text-black sm:text-sm"
            >
              <BackIcon />
              Back to map
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/60 transition hover:border-black/20 hover:bg-black/[0.06] hover:text-black"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-7 grid flex-1 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
            {/* GALLERY */}
            <div className="flex flex-col lg:sticky lg:top-8 lg:self-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-black/[0.04] sm:rounded-[34px]">
                {activeImage ? (
                  <>
                    {!isImageLoaded && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-black/[0.06] via-black/[0.02] to-transparent" />
                    )}

                    <Image
                      key={`${activeImage.src}-${activeImageIndex}`}
                      src={activeImage.src}
                      alt={`${location.name} artwork ${activeImageIndex + 1}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      draggable={false}
                      referrerPolicy="no-referrer"
                      onLoad={() => setIsImageLoaded(true)}
                      className={`select-none object-cover transition duration-500 ease-out ${
                        isImageLoaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-sm"
                      }`}
                    />
                    {isImageLoaded && activeImage.caption && (
                      <div className="absolute bottom-3 right-3 max-w-[75%] rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-3.5 sm:py-2 sm:text-[11px]">
                        {activeImage.caption}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-black/30">
                    No artwork available
                  </div>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="mt-4 flex items-center gap-2 sm:gap-3">
                  {gallery.length > 4 && (
                    <button
                      type="button"
                      onClick={() => shiftGallery("left")}
                      disabled={!hasPreviousGalleryPage}
                      aria-label="Previous gallery images"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/60 transition hover:border-black/20 hover:bg-black/[0.06] hover:text-black disabled:pointer-events-none disabled:opacity-20"
                    >
                      <ChevronIcon direction="left" />
                    </button>
                  )}

                  <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 sm:gap-3">
                    {visibleGallery.map((image, visibleIndex) => {
                      const index = galleryStartIndex + visibleIndex;

                      return (
                        <button
                          key={`${image.src}-${index}`}
                          type="button"
                          onClick={() => selectImage(index)}
                          aria-label={`Show artwork ${index + 1}`}
                          aria-pressed={activeImageIndex === index}
                          className={`relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border transition sm:rounded-2xl ${
                            activeImageIndex === index
                              ? "border-black"
                              : "border-black/10 opacity-65 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={`${location.name} thumbnail ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 22vw, 180px"
                            draggable={false}
                            className="select-none object-cover"
                          />
                          {gallery.length > 4 && (
                            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {gallery.length > 4 && (
                    <button
                      type="button"
                      onClick={() => shiftGallery("right")}
                      disabled={!hasNextGalleryPage}
                      aria-label="Next gallery images"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/60 transition hover:border-black/20 hover:bg-black/[0.06] hover:text-black disabled:pointer-events-none disabled:opacity-20"
                    >
                      <ChevronIcon direction="right" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="flex min-w-0 flex-col lg:pt-1">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/40 sm:text-xs">
                  {location.type}
                </p>
                <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  {location.name}
                </h1>

                {location.type === "nation" && location.nationProfile && (
                  <div className="mt-8 border-t border-black/70">
                    <div className="divide-y divide-black/20">
                      <div className="grid gap-2 py-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                        <span className="text-sm text-black/50">Form:</span>
                        <span className="text-sm sm:text-base">{location.nationProfile.form}</span>
                      </div>
                      <div className="grid gap-2 py-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                        <span className="text-sm text-black/50">Capital:</span>
                        <span className="text-sm sm:text-base">{location.nationProfile.capital}</span>
                      </div>
                      <div className="grid gap-2 py-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                        <span className="text-sm text-black/50">Race Composition:</span>
                        <span className="text-sm leading-6 sm:text-base">
                          {location.nationProfile.raceComposition}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {detail?.description && (
                <p className="mt-8 max-w-3xl text-base leading-7 text-black/70 sm:mt-10 sm:text-lg sm:leading-8">
                  {detail.description}
                </p>
              )}

              {tabs.length > 0 && (
                <div className="mt-8 sm:mt-10">
                  <div className="flex gap-8 overflow-x-auto border-b border-black/10">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTabId(tab.id);
                          saveDetailState({
                            locationId: location.id,
                            tabId: tab.id,
                            imageIndex: activeImageIndex,
                          });
                        }}
                        className={`relative shrink-0 pb-3 text-sm transition sm:text-base ${
                          activeTab?.id === tab.id ? "text-black" : "text-black/40 hover:text-black/70"
                        }`}
                      >
                        {tab.label}
                        {activeTab?.id === tab.id && (
                          <span className="absolute inset-x-0 bottom-[-1px] h-px bg-black" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 min-h-[260px] sm:min-h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab?.id ?? "empty"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {activeTab?.content.map((paragraph, index) => (
                          <p
                            key={`${activeTab.id}-${index}`}
                            className="max-w-3xl whitespace-pre-line text-base leading-8 text-black/75 sm:text-lg sm:leading-9"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
