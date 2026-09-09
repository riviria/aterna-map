"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Language } from "./data/language";
import { getTranslations } from "./data/language";
import { locationDetails } from "./data/locationDetails";
import { getLocalizedText, type MapLocation } from "./data/locations";
import {
  readSavedDetailState,
  saveDetailState,
} from "./data/mapPersistence";

interface MapLocationDetailsProps {
  location: MapLocation;
  language: Language;
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
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 6h12M4 10h12M4 14h12" />
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
      {direction === "left" ? (
        <path d="m12 5-5 5 5 5" />
      ) : (
        <path d="m8 5 5 5-5 5" />
      )}
    </svg>
  );
}

export default function MapLocationDetails({
  location,
  language,
  onClose,
}: MapLocationDetailsProps) {
  const translations = getTranslations(language);
  const detail = locationDetails[location.id];
  const nationProfile = location.nationProfile;

  const gallery = useMemo(
    () =>
      detail?.images?.length
        ? detail.images
        : location.thumbnail
          ? [{ src: location.thumbnail, caption: { en: "", id: "" } }]
          : [],
    [detail, location.thumbnail]
  );

  const tabs = detail?.tabs ?? [];

  const savedDetailState = readSavedDetailState();
  const savedTabId =
    savedDetailState?.locationId === location.id
      ? savedDetailState.tabId
      : undefined;

  const savedImageIndex =
    savedDetailState?.locationId === location.id
      ? savedDetailState.imageIndex
      : undefined;

  const initialTabId =
    savedTabId && tabs.some((tab) => tab.id === savedTabId)
      ? savedTabId
      : tabs[0]?.id ?? "";

  const initialImageIndex =
    typeof savedImageIndex === "number" &&
    savedImageIndex >= 0 &&
    savedImageIndex < gallery.length
      ? savedImageIndex
      : 0;

  const [activeTabId, setActiveTabId] = useState(initialTabId);
  const [activeImageIndex, setActiveImageIndex] =
    useState(initialImageIndex);

  const [galleryStartIndex, setGalleryStartIndex] = useState(
    Math.min(initialImageIndex, Math.max(0, gallery.length - 4))
  );

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const contentStartRef = useRef<HTMLDivElement>(null);
  const hasMountedTabRef = useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isMenuOpen) {
          setIsMenuOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, onClose]);

  // When the active section changes, return the detail view to the
  // beginning of the description. Skip this on the initial render so
  // restored detail state keeps its normal opening position.
  useEffect(() => {
    if (!hasMountedTabRef.current) {
      hasMountedTabRef.current = true;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      contentStartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeTabId]);

  const activeTab =
    tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  const activeTabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeTab?.id)
  );

  const previousTab =
    activeTabIndex > 0 ? tabs[activeTabIndex - 1] : undefined;

  const nextTab =
    activeTabIndex < tabs.length - 1
      ? tabs[activeTabIndex + 1]
      : undefined;

  const activeImage = gallery[activeImageIndex];

  const visibleGallery = gallery.slice(
    galleryStartIndex,
    galleryStartIndex + 4
  );

  const hasPreviousGalleryPage = galleryStartIndex > 0;

  const hasNextGalleryPage =
    galleryStartIndex + 4 < gallery.length;

  const isNationProfileTab =
    location.type === "nation" &&
    nationProfile !== undefined &&
    activeTab?.id === "profile";

  const changeTab = (tabId: string) => {
    setActiveTabId(tabId);
    setIsMenuOpen(false);

    saveDetailState({
      locationId: location.id,
      tabId,
      imageIndex: activeImageIndex,
    });
  };

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
      setGalleryStartIndex(
        Math.min(index - 3, Math.max(0, gallery.length - 4))
      );
    }
  };

  const shiftGallery = (direction: "left" | "right") => {
    const nextIndex =
      direction === "left"
        ? Math.max(0, galleryStartIndex - 1)
        : Math.min(
            Math.max(0, gallery.length - 4),
            galleryStartIndex + 1
          );

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
        className="fixed inset-0 z-2000 overflow-y-auto bg-[#f4f4f1] text-black"
        aria-label={translations.detailsAriaLabel(location.name)}
      >
        <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col px-5 py-5 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 transition hover:text-black sm:text-sm"
            >
              <BackIcon />
              {translations.backToMap}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label={translations.closeDetails}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black/60 transition hover:border-black/20 hover:bg-black/5 hover:text-black"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-2 grid flex-1 gap-8 lg:mt-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
            {/* GALLERY */}
            <div className="flex flex-col lg:sticky lg:top-8 lg:self-start">
              <div className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-black/4 sm:rounded-[34px]">
                {activeImage ? (
                  <>
                    {!isImageLoaded && (
                      <div className="absolute inset-0 animate-pulse bg-linear-to-br from-black/6 via-black/2 to-transparent" />
                    )}

                    <Image
                      key={`${activeImage.src}-${activeImageIndex}`}
                      src={activeImage.src}
                      alt={translations.artworkAlt(
                        location.name,
                        activeImageIndex + 1
                      )}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      draggable={false}
                      referrerPolicy="no-referrer"
                      onLoad={() => setIsImageLoaded(true)}
                      className={`select-none object-cover transition duration-500 ease-out ${
                        isImageLoaded
                          ? "scale-100 opacity-100 blur-0"
                          : "scale-105 opacity-0 blur-sm"
                      }`}
                    />

                    {isImageLoaded && activeImage.caption && (
                      <div className="absolute bottom-3 right-3 max-w-[75%] rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-3.5 sm:py-2 sm:text-[11px]">
                        {getLocalizedText(
                          activeImage.caption,
                          language
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-black/30">
                    {translations.noArtworkAvailable}
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
                      aria-label={translations.previousGalleryImages}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/3 text-black/60 transition hover:border-black/20 hover:bg-black/6 hover:text-black disabled:pointer-events-none disabled:opacity-20"
                    >
                      <ChevronIcon direction="left" />
                    </button>
                  )}

                  <div className="grid min-w-0 flex-1 grid-cols-4 gap-2 sm:gap-3">
                    {visibleGallery.map((image, visibleIndex) => {
                      const index =
                        galleryStartIndex + visibleIndex;

                      return (
                        <button
                          key={`${image.src}-${index}`}
                          type="button"
                          onClick={() => selectImage(index)}
                          aria-label={translations.showArtwork(
                            index + 1
                          )}
                          aria-pressed={activeImageIndex === index}
                          className={`relative aspect-4/3 min-w-0 overflow-hidden rounded-2xl border transition ${
                            activeImageIndex === index
                              ? "border-black"
                              : "border-black/10 opacity-65 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={translations.thumbnailAlt(
                              location.name,
                              index + 1
                            )}
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
                      aria-label={translations.nextGalleryImages}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/3 text-black/60 transition hover:border-black/20 hover:bg-black/6 hover:text-black disabled:pointer-events-none disabled:opacity-20"
                    >
                      <ChevronIcon direction="right" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="min-w-0">
              {/* STICKY TITLE + MENU */}
              <div className="sticky top-0 z-40 -mx-5 border-b border-black/10 bg-[#f4f4f1]/95 px-5 py-5 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-0 lg:px-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/40 sm:text-xs">
                  {translations.locationTypes[location.type]}
                </p>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-5xl">
                    {location.name}
                  </h1>

                  {tabs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(true)}
                      aria-label="Open sections"
                      aria-expanded={isMenuOpen}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/65 transition hover:border-black/25 hover:bg-black/5 hover:text-black"
                    >
                      <MenuIcon />
                    </button>
                  )}
                </div>
              </div>

              {/* CONTENT AREA */}
              <div
                ref={contentStartRef}
                className="scroll-mt-28 pt-8 sm:scroll-mt-32 sm:pt-10"
              >
                {activeTab && (
                  <p className="mb-6 text-sm font-medium text-black/50 sm:mb-8 sm:text-base">
                    {getLocalizedText(activeTab.label, language)}
                  </p>
                )}

                {isNationProfileTab && nationProfile && (
                  <div className="border-y border-black/10">
                    <div className="divide-y divide-black/10">
                      <div className="grid gap-2 py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                        <span className="text-sm font-medium text-black/45">
                          {translations.nationProfile.form}
                        </span>
                        <span className="text-sm sm:text-base">
                          {getLocalizedText(
                            nationProfile.form,
                            language
                          )}
                        </span>
                      </div>

                      <div className="grid gap-2 py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                        <span className="text-sm font-medium text-black/45">
                          {translations.nationProfile.capital}
                        </span>
                        <span className="text-sm sm:text-base">
                          {getLocalizedText(
                            nationProfile.capital,
                            language
                          )}
                        </span>
                      </div>

                      <div className="grid gap-2 py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                        <span className="text-sm font-medium text-black/45">
                          {translations.nationProfile.raceComposition}
                        </span>
                        <span className="text-sm leading-6 sm:text-base">
                          {getLocalizedText(
                            nationProfile.raceComposition,
                            language
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className={
                        isNationProfileTab
                          ? "pt-8 sm:pt-10"
                          : ""
                      }
                    >
                      {activeTab.content[language].map(
                        (paragraph, index) => (
                          <p
                            key={`${activeTab.id}-${index}`}
                            className={`max-w-3xl whitespace-pre-line text-base leading-8 text-black/75 sm:text-lg sm:leading-9 ${
                              index > 0 ? "mt-7 sm:mt-9" : ""
                            }`}
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* PREVIOUS / NEXT PAGE */}
                {tabs.length > 1 && (
                  <div className="mt-14 flex items-center justify-between gap-4 border-t border-black/10 pt-6 sm:mt-16 sm:pt-8">
                    <div className="min-w-0 flex-1">
                      {previousTab && (
                        <button
                          type="button"
                          onClick={() =>
                            changeTab(previousTab.id)
                          }
                          className="group inline-flex max-w-full items-center gap-2 text-left text-sm font-medium text-black/45 transition hover:text-black sm:text-base"
                        >
                          <ChevronIcon direction="left" />
                          <span className="truncate">
                            {getLocalizedText(
                              previousTab.label,
                              language
                            )}
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 text-right">
                      {nextTab && (
                        <button
                          type="button"
                          onClick={() => changeTab(nextTab.id)}
                          className="group inline-flex max-w-full items-center gap-2 text-right text-sm font-medium text-black/65 transition hover:text-black sm:text-base"
                        >
                          <span className="truncate">
                            {getLocalizedText(
                              nextTab.label,
                              language
                            )}
                          </span>
                          <ChevronIcon direction="right" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE DRAWER */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close sections"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-2001 cursor-default bg-black/20 backdrop-blur-[2px]"
              />

              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "tween",
                  duration: 0.28,
                  ease: "easeOut",
                }}
                className="fixed inset-y-0 right-0 z-2002 flex w-full max-w-[460px] flex-col border-l border-black/10 bg-[#f4f4f1] shadow-[-18px_0_60px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center justify-between border-b border-black/10 px-6 py-6 sm:px-8">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">
                      Sections
                    </p>
                    <p className="mt-2 text-lg font-medium">
                      {location.name}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close sections"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/60 transition hover:border-black/25 hover:bg-black/5 hover:text-black"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                  {tabs.map((tab, index) => {
                    const isActive =
                      activeTab?.id === tab.id;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => changeTab(tab.id)}
                        className={`flex w-full items-center gap-5 border-b border-black/8 px-4 py-5 text-left transition ${
                          isActive
                            ? "bg-black text-white"
                            : "text-black/70 hover:bg-black/[0.04] hover:text-black"
                        }`}
                      >
                        <span
                          className={`w-8 shrink-0 text-xs font-medium tracking-[0.16em] ${
                            isActive
                              ? "text-white/60"
                              : "text-black/35"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1 text-base font-medium sm:text-lg">
                          {getLocalizedText(
                            tab.label,
                            language
                          )}
                        </span>

                        {isActive && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.section>
    </AnimatePresence>
  );
}
