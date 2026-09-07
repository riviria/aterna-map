"use client";

import Image from "next/image";
import { forwardRef } from "react";

import type { MapLocation, NationProfile } from "./data/locations";

interface MapLocationPopupProps {
  location: MapLocation;
  x: number;
  y: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

// Urutan & label baris tabel khusus nation, sesuai referensi profil dunia.
const NATION_PROFILE_ROWS: { label: string; key: keyof NationProfile }[] = [
  { label: "Form:", key: "form" },
  { label: "Capital:", key: "capital" },
  { label: "Race Composition:", key: "raceComposition" },
];

// forwardRef: AternaMap perlu ref ke elemen ini untuk mengukur lebar/
// tinggi SEBENARNYA (offsetWidth/offsetHeight), supaya perhitungan
// posisi & clamp popup akurat di berbagai ukuran layar — tidak lagi
// bergantung pada konstanta lebar/tinggi yang ditebak di awal.
const MapLocationPopup = forwardRef<HTMLDivElement, MapLocationPopupProps>(
  function MapLocationPopup(
    { location, x, y, onMouseEnter, onMouseLeave, onClose },
    ref
  ) {
    // Disimpan ke variabel lokal (bukan langsung location.nationProfile)
    // supaya TypeScript tetap bisa narrow tipe-nya di dalam .map() di bawah.
    const nationProfile = location.nationProfile;

    return (
      <div
        ref={ref}
        className="absolute z-[999] w-[340px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] overflow-x-hidden overflow-y-auto rounded-3xl border border-white/10 bg-[#252d33] shadow-2xl"
        style={{ left: x, top: y }}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        {/* THUMBNAIL */}
        {location.thumbnail && (
          <div className="relative h-36 w-full overflow-hidden sm:h-[170px]">
            <Image
              src={location.thumbnail}
              alt={location.name}
              fill
              sizes="(max-width: 640px) calc(100vw - 32px), 340px"
              draggable={false}
              className="select-none object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252d33] via-transparent to-transparent" />
          </div>
        )}

        {/* CONTENT */}
        <div className="relative px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
          {/* CLOSE BUTTON */}
          <button
            type="button"
            aria-label="Close popup"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-lg text-white/70 transition hover:bg-black/50 hover:text-white sm:right-4 sm:top-4 sm:h-8 sm:w-8"
          >
            ×
          </button>

          {/* LOCATION TYPE */}
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-white/50">
            {location.type}
          </p>

          {/* LOCATION NAME */}
          <h2 className="pr-8 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {location.name}
          </h2>

          {/* DESCRIPTION — nation pakai tabel profil, tipe lain tetap paragraf biasa */}
          {location.type === "nation" && nationProfile ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 sm:mt-3">
              {NATION_PROFILE_ROWS.map(({ label, key }) => (
                <div
                  key={key}
                  className="flex flex-col gap-1.5 border-b border-white/10 px-2 py-1 last:border-b-0"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-white/40">
                    {label}
                  </span>
                  <span className="text-sm leading-6 text-white/80">
                    {nationProfile[key]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-7 text-white/70 sm:mt-5 sm:text-base sm:leading-8">
              {location.description}
            </p>
          )}

          <div className="my-5 h-px w-full bg-white/10 sm:my-6" />

          {/* VIEW DETAILS */}
          <a
            href={location.href}
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:text-red-400 sm:text-sm"
          >
            VIEW DETAILS
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    );
  }
);

export default MapLocationPopup;
