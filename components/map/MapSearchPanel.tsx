"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Language } from "./data/language";
import { getTranslations } from "./data/language";
import type { LocationType, MapLocation } from "./data/locations";

const TYPE_ORDER: LocationType[] = ["nation", "city", "landmark", "geography"];

type MapSearchPanelProps = {
  locations: MapLocation[];
  language: Language;
  activeTypes: Set<LocationType>;
  onToggleType: (type: LocationType) => void;
  onSelectLocation: (locationId: string) => void;
};

function FilterIcon() {
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
      <path d="M3 5h14M6 10h8M8.5 15h3" />
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

export default function MapSearchPanel({
  locations,
  language,
  activeTypes,
  onToggleType,
  onSelectLocation,
}: MapSearchPanelProps) {
  const translations = getTranslations(language);

  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchFocused(false);
      }

      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return locations.filter((location) =>
      location.name.toLowerCase().includes(normalizedQuery)
    );
  }, [locations, query]);

  const showResults = isSearchFocused && query.trim().length > 0;
  const hasInactiveFilter = activeTypes.size < TYPE_ORDER.length;

  const clearSearch = () => {
    setQuery("");
    setIsSearchFocused(true);
  };

  const handleSelectLocation = (locationId: string) => {
    onSelectLocation(locationId);
    setQuery("");
    setIsSearchFocused(false);
  };

  return (
    <div className="absolute left-1/2 top-5 z-40 w-[calc(100vw-2rem)] max-w-[320px] -translate-x-1/2">
      <div className="flex items-center gap-2">
        {/* SEARCH INPUT */}
        <div ref={searchRef} className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsSearchFocused(true);
            }}
            onFocus={() => setIsSearchFocused(true)}
            placeholder={translations.searchLocations}
            autoComplete="off"
            className="w-full rounded-full border border-white/10 bg-black/70 px-4 py-2.5 pr-10 text-sm text-white placeholder-white/40 shadow-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-red-400/60"
          />

          {query.length > 0 && (
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={clearSearch}
              aria-label={translations.clearSearch}
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-white/35 transition hover:text-white/80"
            >
              <CloseIcon />
            </button>
          )}

          {showResults && (
            <div className="absolute left-0 right-0 top-full mt-2 max-h-[45vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1c2226]/95 shadow-2xl backdrop-blur-md">
              {results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-white/50">{translations.noLocationsFound}</p>
              ) : (
                results.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelectLocation(location.id)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/5"
                  >
                    <span className="truncate">{location.name}</span>
                    <span className="ml-2 shrink-0 text-xs uppercase tracking-wide text-white/40">
                      {translations.locationTypes[location.type]}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* FILTER ICON + POPOVER */}
        <div ref={filterRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsFilterOpen((current) => !current)}
            aria-label={translations.filterLocationTypes}
            aria-expanded={isFilterOpen}
            className={`relative flex h-[42px] w-[42px] items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition ${
              isFilterOpen
                ? "border-red-400/60 bg-red-500/20 text-white"
                : "border-white/10 bg-black/70 text-white/80 hover:text-white"
            }`}
          >
            <FilterIcon />
            {hasInactiveFilter && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 max-h-[45vh] w-44 overflow-y-auto rounded-2xl border border-white/10 bg-[#1c2226]/95 shadow-2xl backdrop-blur-md">
              {TYPE_ORDER.map((type) => {
                const isActive = activeTypes.has(type);

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onToggleType(type)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/5"
                  >
                    <span>{translations.locationTypes[type]}</span>
                    <span
                      className={`h-4 w-4 rounded border ${
                        isActive
                          ? "border-red-400 bg-red-500"
                          : "border-white/30 bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
