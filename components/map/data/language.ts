export type Language = "id" | "en";

const STORAGE_KEY = "aterna-language";
const listeners = new Set<() => void>();

export type LanguageTranslations = {
  searchLocations: string;
  clearSearch: string;
  noLocationsFound: string;
  filterLocationTypes: string;
  closePopup: string;
  viewDetails: string;
  share: string;
  linkCopied: string;
  shareFailed: string;
  shareText: (locationName: string) => string;
  backToMap: string;
  closeDetails: string;
  noArtworkAvailable: string;
  previousGalleryImages: string;
  nextGalleryImages: string;
  showArtwork: (index: number) => string;
  artworkAlt: (locationName: string, index: number) => string;
  thumbnailAlt: (locationName: string, index: number) => string;
  detailsAriaLabel: (locationName: string) => string;
  locationTypes: Record<"nation" | "city" | "landmark" | "geography", string>;
  nationProfile: {
    form: string;
    capital: string;
    raceComposition: string;
  };
  cityProfile: {
    region: string;
    category: string;
  };
};

const translations: Record<Language, LanguageTranslations> = {
  en: {
    searchLocations: "Search locations...",
    clearSearch: "Clear search",
    noLocationsFound: "No locations found.",
    filterLocationTypes: "Filter location types",
    closePopup: "Close popup",
    viewDetails: "View details",
    share: "Share",
    linkCopied: "Link copied",
    shareFailed: "Share failed",
    shareText: (locationName) => `Explore ${locationName} in the Aterna Interactive World Atlas.`,
    backToMap: "Back to map",
    closeDetails: "Close details",
    noArtworkAvailable: "No artwork available",
    previousGalleryImages: "Previous gallery images",
    nextGalleryImages: "Next gallery images",
    showArtwork: (index) => `Show artwork ${index}`,
    artworkAlt: (locationName, index) => `${locationName} artwork ${index}`,
    thumbnailAlt: (locationName, index) => `${locationName} thumbnail ${index}`,
    detailsAriaLabel: (locationName) => `${locationName} details`,
    locationTypes: {
      nation: "Nation",
      city: "City",
      landmark: "Landmark",
      geography: "Geography",
    },
    nationProfile: {
      form: "Form:",
      capital: "Capital:",
      raceComposition: "Race Composition:",
    },
    cityProfile: {
      region: "Region:",
      category: "Category:",
    },
  },
  id: {
    searchLocations: "Cari lokasi...",
    clearSearch: "Hapus pencarian",
    noLocationsFound: "Lokasi tidak ditemukan.",
    filterLocationTypes: "Filter jenis lokasi",
    closePopup: "Tutup popup",
    viewDetails: "Lihat detail",
    share: "Bagikan",
    linkCopied: "Tautan disalin",
    shareFailed: "Gagal membagikan",
    shareText: (locationName) => `Jelajahi ${locationName} di Aterna Interactive World Atlas.`,
    backToMap: "Kembali ke peta",
    closeDetails: "Tutup detail",
    noArtworkAvailable: "Belum ada karya visual",
    previousGalleryImages: "Gambar galeri sebelumnya",
    nextGalleryImages: "Gambar galeri berikutnya",
    showArtwork: (index) => `Tampilkan karya visual ${index}`,
    artworkAlt: (locationName, index) => `Karya visual ${locationName} ${index}`,
    thumbnailAlt: (locationName, index) => `Thumbnail ${locationName} ${index}`,
    detailsAriaLabel: (locationName) => `Detail ${locationName}`,
    locationTypes: {
      nation: "Negara",
      city: "Kota",
      landmark: "Landmark",
      geography: "Geografi",
    },
    nationProfile: {
      form: "Bentuk:",
      capital: "Ibu Kota:",
      raceComposition: "Komposisi Ras:",
    },
    cityProfile: {
      region: "Wilayah:",
      category: "Kategori:",
    },
  },
};

export function getTranslations(language: Language) {
  return translations[language];
}

export function subscribeLanguage(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function readSavedLanguage(): Language {
  if (typeof window === "undefined") return "en";

  try {
    const language = window.localStorage.getItem(STORAGE_KEY);
    return language === "id" || language === "en" ? language : "en";
  } catch {
    return "en";
  }
}

export function saveLanguage(language: Language) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, language);
    listeners.forEach((listener) => listener());
  } catch {
    // Local storage can be unavailable in privacy-restricted browsers.
  }
}
