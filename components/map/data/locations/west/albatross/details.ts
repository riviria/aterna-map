import type { LocationDetail } from "../../../types";

export const albatrossDetails: LocationDetail = {
  description: {
    en: "A named city on the Western Continent map. The current supplied source does not provide a dedicated descriptive chapter.",
    id: "Kota bernama pada peta Benua Barat. Sumber yang saat ini digunakan belum menyediakan bab deskripsi khusus.",
  },
  images: [
    {
      src: "/locations/west/albatross/albatross.jpeg",
      caption: { en: "Albatross", id: "Albatross" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Albatross is registered as a distinct city location on the Western Continent map.",
        ],
        id: [
          "Albatross terdaftar sebagai lokasi kota tersendiri pada peta Benua Barat.",
        ],
      },
    },
    {
      id: "source-note",
      label: { en: "Source Note", id: "Catatan Sumber" },
      content: {
        en: [
          "No dedicated Albatross chapter was found in the currently supplied West Continent document, so no additional world details are invented here.",
        ],
        id: [
          "Tidak ditemukan bab khusus Albatross pada dokumen Benua Barat yang saat ini digunakan, sehingga tidak ada detail dunia tambahan yang dibuat-buat di sini.",
        ],
      },
    },
  ],
};
