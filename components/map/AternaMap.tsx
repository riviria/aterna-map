"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

import MapCoordinateDebugger from "./MapCoordinateDebugger";
import MapCoordinatePanel from "./MapCoordinatePanel";
import MapLocationPopup from "./MapLocationPopup";
import MapLocations from "./MapLocations";
import MapResetButton from "./MapResetButton";
import MapSearchPanel from "./MapSearchPanel";
import { locations, type LocationType, type MapLocation } from "./data/locations";

// Ukuran asli map
const MAP_WIDTH = 1912;
const MAP_HEIGHT = 1434;

// Konfigurasi popup — dipakai HANYA sebagai estimasi di frame pertama
// sebelum popup ter-mount (lihat popupRef di komponen). Setelah itu,
// ukuran sebenarnya (offsetWidth/offsetHeight) yang dipakai.
const POPUP_WIDTH = 340;
const POPUP_HEIGHT = 420;
const POPUP_GAP = 20;
const SCREEN_PADDING = 16;

// Faktor zoom saat fokus ke satu lokasi (dari search / deep link URL),
// relatif terhadap initialScale (cover scale) map.
const FOCUS_ZOOM_MULTIPLIER = 2.5;

const ALL_LOCATION_TYPES: LocationType[] = ["nation", "city", "landmark", "geography"];

const LOCATION_QUERY_PARAM = "location";

type PopupPosition = {
  x: number;
  y: number;
};

// Dipakai sebagai lazy initializer useState/useRef (bukan dipanggil di
// dalam useEffect) supaya deep link (?location=id) diterapkan SEBELUM
// render pertama, tanpa perlu setState di dalam effect body — itu yang
// sebelumnya memicu eslint(react-hooks/set-state-in-effect).
function getDeepLinkLocationId(): string | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const locationId = params.get(LOCATION_QUERY_PARAM);
  if (!locationId) return null;

  const isValidLocation = locations.some((location) => location.id === locationId);
  return isValidLocation ? locationId : null;
}

export default function AternaMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ref ke TransformWrapper, dipakai untuk zoomToElement() dan
  // resetTransform() secara programatik (search, deep link, reset button).
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);

  // Semua marker menyimpan DOM element-nya, dipakai popup dan
  // zoomToElement untuk mengetahui posisi marker sebenarnya di layar.
  const markerRefs = useRef(new Map<string, HTMLButtonElement>());

  // Ref ke elemen popup yang sedang dirender, dipakai untuk membaca
  // lebar/tinggi SEBENARNYA lewat offsetWidth/offsetHeight — supaya
  // perhitungan clamp posisi (lihat effect popup-position di bawah)
  // akurat di semua ukuran layar, alih-alih menebak lewat konstanta
  // POPUP_WIDTH/POPUP_HEIGHT.
  const popupRef = useRef<HTMLDivElement>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Menyimpan id lokasi yang seharusnya di-zoom begitu marker-nya
  // tersedia di DOM (diisi oleh focusLocation ATAU deep link URL saat
  // mount, dibaca & dikonsumsi oleh effect popup-position di bawah).
  const pendingZoomLocationRef = useRef<string | null>(getDeepLinkLocationId());

  const [initialScale, setInitialScale] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width > 0 && height > 0) {
      const scaleX = width / MAP_WIDTH;
      const scaleY = height / MAP_HEIGHT;
      const coverScale = Math.max(scaleX, scaleY);
      return coverScale > 0 ? coverScale * 1.01 : null;
    }
    return null;
  });

  const [debugPosition, setDebugPosition] = useState({
    x: Math.round(MAP_WIDTH / 2),
    y: Math.round(MAP_HEIGHT / 2),
  });

  // Saat coordinate debugger di-drag, panning map dimatikan sementara.
  const [isDraggingDebugger, setIsDraggingDebugger] = useState(false);

  const [supportsHover, setSupportsHover] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(
    getDeepLinkLocationId
  );
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);

  // Sumber kebenaran untuk URL (?location=id). Dipisah dari
  // activeLocationId supaya hover TIDAK ikut menyentuh URL — hanya
  // klik/search/deep-link yang mengubah ini. Nilainya disinkronkan ke
  // URL lewat useEffect terpisah di bawah (bukan dipanggil langsung),
  // supaya window.history.replaceState() tidak pernah terjadi di
  // tengah render/commit komponen lain.
  const [urlLocationId, setUrlLocationId] = useState<string | null>(
    getDeepLinkLocationId
  );

  // Filter tipe lokasi (kingdom/city/village) — mengontrol marker mana
  // yang dirender di peta. Default: semua tipe aktif.
  const [activeTypes, setActiveTypes] = useState<Set<LocationType>>(
    () => new Set(ALL_LOCATION_TYPES)
  );

  // Deteksi hover support
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHoverSupport = () => {
      setSupportsHover(mediaQuery.matches);
    };

    updateHoverSupport();
    mediaQuery.addEventListener("change", updateHoverSupport);

    return () => {
      mediaQuery.removeEventListener("change", updateHoverSupport);
    };
  }, []);

  // Hitung initial scale (cover scale) berdasarkan ukuran viewport
  useEffect(() => {
    const updateScale = () => {
      const container = containerRef.current;
      const viewportWidth = container?.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 0);
      const viewportHeight = container?.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 0);

      if (viewportWidth <= 0 || viewportHeight <= 0) return;

      const scaleX = viewportWidth / MAP_WIDTH;
      const scaleY = viewportHeight / MAP_HEIGHT;

      // Map selalu memenuhi viewport
      const coverScale = Math.max(scaleX, scaleY);

      if (coverScale <= 0 || !Number.isFinite(coverScale)) return;

      // Tambahan kecil agar tidak muncul garis kosong 1px di pinggir
      const safeScale = coverScale * 1.01;

      setInitialScale((prev) => {
        if (prev !== null && Math.abs(prev - safeScale) < 0.005) return prev;
        return safeScale;
      });
    };

    updateScale();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const openLocation = useCallback(
    (locationId: string) => {
      clearCloseTimer();
      setActiveLocationId(locationId);
    },
    [clearCloseTimer]
  );

  // Dipakai untuk hover: memberi waktu ketika cursor bergerak
  // dari marker menuju popup sebelum benar-benar menutup.
  const scheduleClose = useCallback(() => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setActiveLocationId(null);
      setPopupPosition(null);
      setUrlLocationId(null);
      closeTimerRef.current = null;
    }, 220);
  }, [clearCloseTimer]);

  const closeLocation = useCallback(() => {
    clearCloseTimer();
    setActiveLocationId(null);
    setPopupPosition(null);
    setUrlLocationId(null);
  }, [clearCloseTimer]);

  // Untuk click/tap langsung ke marker: marker yang sama membuka lalu
  // menutup, marker lain langsung memindahkan popup. TIDAK memicu
  // auto-zoom — user sudah melihat markernya secara langsung.
  const toggleLocation = useCallback(
    (locationId: string) => {
      clearCloseTimer();

      setActiveLocationId((currentLocationId) => {
        if (currentLocationId === locationId) {
          setPopupPosition(null);
          setUrlLocationId(null);
          return null;
        }

        setUrlLocationId(locationId);
        return locationId;
      });
    },
    [clearCloseTimer]
  );

  // Untuk search & deep link URL: membuka lokasi, menyalakan filter
  // tipe-nya kalau kebetulan sedang dimatikan, dan menjadwalkan zoom
  // begitu marker-nya tersedia di DOM (lihat effect popup-position).
  const focusLocation = useCallback(
    (locationId: string) => {
      const target = locations.find((location) => location.id === locationId);
      if (!target) return;

      clearCloseTimer();

      setActiveTypes((current) => {
        if (current.has(target.type)) return current;

        const next = new Set(current);
        next.add(target.type);
        return next;
      });

      pendingZoomLocationRef.current = locationId;
      setActiveLocationId(locationId);
      setUrlLocationId(locationId);
    },
    [clearCloseTimer]
  );

  const toggleType = useCallback((type: LocationType) => {
    setActiveTypes((current) => {
      const next = new Set(current);

      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }

      return next;
    });
  }, []);

  const handleResetView = useCallback(() => {
    closeLocation();
    transformRef.current?.resetTransform();
  }, [closeLocation]);

  const registerMarkerRef = useCallback(
    (locationId: string, element: HTMLButtonElement | null) => {
      if (element) {
        markerRefs.current.set(locationId, element);
        return;
      }

      markerRefs.current.delete(locationId);
    },
    []
  );

  // Marker yang benar-benar dirender di peta, sesuai filter tipe aktif.
  const visibleLocations = useMemo(
    () => locations.filter((location) => activeTypes.has(location.type)),
    [activeTypes]
  );

  const activeLocation = locations.find(
    (location): location is MapLocation => location.id === activeLocationId
  );

  // Popup berada DI LUAR TransformComponent, jadi tidak ikut zoom/transform.
  // Posisi marker dibaca lewat getBoundingClientRect() agar popup tetap
  // mengikuti posisi marker di layar. Effect yang sama juga menjalankan
  // zoom-to-element yang dijadwalkan oleh focusLocation, begitu marker
  // targetnya tersedia di DOM (misal setelah filter tipe baru dinyalakan).
  useEffect(() => {
    if (!activeLocationId) return;

    let animationFrame = 0;
    let running = true;
    let hasZoomed = false;

    const updatePopupPosition = () => {
      if (!running) return;

      const container = containerRef.current;
      const marker = markerRefs.current.get(activeLocationId);

      if (!container || !marker) {
        animationFrame = window.requestAnimationFrame(updatePopupPosition);
        return;
      }

      if (
        !hasZoomed &&
        pendingZoomLocationRef.current === activeLocationId &&
        transformRef.current &&
        initialScale !== null
      ) {
        hasZoomed = true;
        pendingZoomLocationRef.current = null;

        transformRef.current.zoomToElement(marker, {
          scale: initialScale * FOCUS_ZOOM_MULTIPLIER,
          animationTime: 500,
        });
      }

      const containerRect = container.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();

      // Ukuran nyata popup (kalau sudah ter-mount), fallback ke
      // konstanta di frame pertama sebelum popup dirender.
      const popupWidth = popupRef.current?.offsetWidth ?? POPUP_WIDTH;
      const popupHeight = popupRef.current?.offsetHeight ?? POPUP_HEIGHT;

      // Titik tengah marker
      const markerX = markerRect.left - containerRect.left + markerRect.width / 2;
      const markerY = markerRect.top - containerRect.top + markerRect.height / 2;

      // Default: popup muncul di atas marker
      let popupX = markerX - popupWidth / 2;
      let popupY = markerY - popupHeight - POPUP_GAP;

      // Jika terlalu dekat bagian atas, popup muncul di bawah marker
      if (popupY < SCREEN_PADDING) {
        popupY = markerY + POPUP_GAP;
      }

      // Clamp horizontal
      const maxX = containerRect.width - popupWidth - SCREEN_PADDING;
      popupX = Math.max(SCREEN_PADDING, Math.min(popupX, Math.max(SCREEN_PADDING, maxX)));

      // Clamp vertikal
      const maxY = containerRect.height - popupHeight - SCREEN_PADDING;
      popupY = Math.max(SCREEN_PADDING, Math.min(popupY, Math.max(SCREEN_PADDING, maxY)));

      const nextPosition = {
        x: Math.round(popupX),
        y: Math.round(popupY),
      };

      setPopupPosition((currentPosition) => {
        if (
          currentPosition?.x === nextPosition.x &&
          currentPosition?.y === nextPosition.y
        ) {
          return currentPosition;
        }

        return nextPosition;
      });

      // Update terus selama popup aktif, agar popup tetap mengikuti
      // marker ketika map di-pan / wheel zoom / pinch zoom.
      animationFrame = window.requestAnimationFrame(updatePopupPosition);
    };

    animationFrame = window.requestAnimationFrame(updatePopupPosition);

    return () => {
      running = false;
      window.cancelAnimationFrame(animationFrame);
    };
  }, [activeLocationId, initialScale]);

  // Deep link URL (?location=id) sudah diterapkan lewat lazy
  // initializer activeLocationId / urlLocationId / pendingZoomLocationRef
  // di atas — tidak perlu useEffect terpisah untuk ini lagi.

  // Satu-satunya tempat yang memanggil window.history.replaceState().
  // Dilakukan di dalam useEffect (bukan langsung dalam event handler)
  // supaya selalu berjalan SETELAH commit render selesai — mencegah
  // warning "Cannot update a component (Router) while rendering a
  // different component" dari Next.js App Router, yang muncul kalau
  // history.replaceState() dipanggil di tick yang sama dengan
  // setState lain.
  useEffect(() => {
    const url = new URL(window.location.href);

    if (urlLocationId) {
      url.searchParams.set(LOCATION_QUERY_PARAM, urlLocationId);
    } else {
      url.searchParams.delete(LOCATION_QUERY_PARAM);
    }

    window.history.replaceState(null, "", url);
  }, [urlLocationId]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative h-screen w-screen overflow-hidden bg-[#151c20]"
    >
      {/* MAP */}
      {initialScale !== null && initialScale > 0 && (
        <TransformWrapper
          ref={transformRef}
          initialScale={initialScale}
          minScale={initialScale}
          maxScale={initialScale * 4}
          centerOnInit
          limitToBounds
          disablePadding
          panning={{ disabled: isDraggingDebugger }}
          velocityAnimation={{ disabled: true }}
          wheel={{ step: 0.0005 }}
          pinch={{ step: 5 }}
        >
          <TransformComponent
            wrapperStyle={{ width: "100vw", height: "100vh", overflow: "hidden" }}
            contentStyle={{ width: `${MAP_WIDTH}px`, height: `${MAP_HEIGHT}px` }}
          >
            {/* MAP LAYER: IMAGE + MARKERS + DEBUGGER — semua di layer transform yang sama */}
            <div
              className="relative select-none"
              style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
              onClick={() => closeLocation()}
            >
              <Image
                src="/maps/aterna-world-map.png"
                alt="Aterna World Map"
                fill
                priority
                draggable={false}
                sizes="100vw"
                referrerPolicy="no-referrer"
                className="pointer-events-none select-none object-fill"
              />

              <MapLocations
                locations={visibleLocations}
                activeLocationId={activeLocationId}
                supportsHover={supportsHover}
                onOpen={openLocation}
                onScheduleClose={scheduleClose}
                onToggle={toggleLocation}
                onMarkerRef={registerMarkerRef}
              />

              <MapCoordinateDebugger
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                position={debugPosition}
                onPositionChange={setDebugPosition}
                onDragStart={() => setIsDraggingDebugger(true)}
                onDragEnd={() => setIsDraggingDebugger(false)}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      )}

      {/* FIXED COORDINATE PANEL — tidak ikut zoom */}
      <MapCoordinatePanel position={debugPosition} />

      {/* FIXED SEARCH & FILTER — tidak ikut zoom */}
      <MapSearchPanel
        locations={locations}
        activeTypes={activeTypes}
        onToggleType={toggleType}
        onSelectLocation={focusLocation}
      />

      {/* FIXED RESET VIEW BUTTON — tidak ikut zoom */}
      <MapResetButton onReset={handleResetView} />

      {/* FIXED POPUP — di luar TransformWrapper agar tidak ikut membesar saat zoom */}
      {activeLocation && popupPosition && (
        <MapLocationPopup
          ref={popupRef}
          location={activeLocation}
          x={popupPosition.x}
          y={popupPosition.y}
          onMouseEnter={() => clearCloseTimer()}
          onMouseLeave={() => {
            if (supportsHover) scheduleClose();
          }}
          onClose={closeLocation}
        />
      )}
    </main>
  );
}
