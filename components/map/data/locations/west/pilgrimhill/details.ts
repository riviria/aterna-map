import type { LocationDetail } from "../../../types";

export const pilgrimHillDetails: LocationDetail = {
  description: {
    en: "A named location in the Western Continent whose current supplied source does not provide a dedicated descriptive section.",
    id: "Lokasi bernama di Benua Barat yang pada sumber saat ini belum memiliki bagian deskripsi khusus.",
  },
  images: [
    {
      src: "/locations/west/pilgrimhill/pilgrimhill.jpeg",
      caption: { en: "Pilgrim Hill", id: "Pilgrim Hill" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Pilgrim Hill is registered as a distinct location on the Western Continent map.",
        ],
        id: [
          "Pilgrim Hill terdaftar sebagai lokasi tersendiri pada peta Benua Barat.",
        ],
      },
    },
    {
      id: "source-note",
      label: { en: "Source Note", id: "Catatan Sumber" },
      content: {
        en: [
          "No dedicated Pilgrim Hill chapter was found in the currently supplied West Continent document, so no additional world details are invented here.",
        ],
        id: [
          "Tidak ditemukan bab khusus Pilgrim Hill pada dokumen Benua Barat yang saat ini digunakan, sehingga tidak ada detail dunia tambahan yang dibuat-buat di sini.",
        ],
      },
    },
  ],
};
