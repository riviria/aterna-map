"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { LocationType, MapLocation } from "./data/locations";

const TYPE_LABELS: Record<LocationType, string> = {
  nation: "Nation",
  city: "City",
  landmark: "Landmark",
  geography: "Geography"
};

const TYPE_ORDER: LocationType[] = ["nation", "city", "landmark","geography"];

type MapSearchPanelProps = {
  locations: MapLocation[];
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
    >
      <path d="M3 5h14M6 10h8M8.5 15h3" />
    </svg>
  );
}

export default function MapSearchPanel({
  locations,
  activeTypes,
  onToggleType,
  onSelectLocation,
}: MapSearchPanelProps) {
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  // Klik di luar popover filter -> tutup popover.
  useEffect(() => {
    if (!isFilterOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  // Search selalu mencari di SEMUA lokasi (tidak terikat filter tipe),
  // supaya user tetap bisa menemukan lokasi yang tipenya sedang
  // dimatikan lewat popover filter.
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return locations.filter((location) =>
      location.name.toLowerCase().includes(normalizedQuery)
    );
  }, [locations, query]);

  const showResults = isSearchFocused && query.trim().length > 0;
  const activeFilterCount = activeTypes.size;
  const hasInactiveFilter = activeFilterCount < TYPE_ORDER.length;

  return (
    <div className="absolute left-1/2 top-5 z-40 w-[calc(100vw-2rem)] max-w-[320px] -translate-x-1/2">
      <div className="flex items-center gap-2">
        {/* SEARCH INPUT */}
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            // Delay singkat supaya klik pada hasil dropdown sempat
            // ter-trigger sebelum dropdown ditutup oleh blur.
            onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 150)}
            placeholder="Search locations..."
            className="w-full rounded-full border border-white/10 bg-black/70 px-4 py-2.5 text-sm text-white placeholder-white/40 shadow-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-red-400/60"
          />

          {showResults && (
            <div className="absolute left-0 right-0 top-full mt-2 max-h-[45vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1c2226]/95 shadow-2xl backdrop-blur-md">
              {results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-white/50">No locations found.</p>
              ) : (
                results.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      onSelectLocation(location.id);
                      setQuery("");
                      setIsSearchFocused(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/5"
                  >
                    <span className="truncate">{location.name}</span>
                    <span className="ml-2 shrink-0 text-xs uppercase tracking-wide text-white/40">
                      {TYPE_LABELS[location.type]}
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
            aria-label="Filter location types"
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
            <div className="absolute right-0 top-full mt-2 w-44 max-h-[45vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1c2226]/95 shadow-2xl backdrop-blur-md">
              {TYPE_ORDER.map((type) => {
                const isActive = activeTypes.has(type);

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onToggleType(type)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/5"
                  >
                    <span>{TYPE_LABELS[type]}</span>
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
