import type { LocationDetail } from "../../../types";

export const oldSanctumDetails: LocationDetail = {
  description: {
    en: "A dead sacred city and Old Civilization ruin in Northland, marked by broken walls, frozen courtyards, and a tower still rising over the remains.",
    id: "Kota suci mati dan reruntuhan Old Civilization di Northland, ditandai oleh dinding patah, pelataran beku, dan sebuah menara yang masih menjulang di atas puing-puing.",
  },
  images: [
    {
      src: "/locations/west/oldsanctum/oldsanctum.png",
      caption: { en: "Old Sanctum", id: "Old Sanctum" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Old Sanctum is believed to be one of the major surviving traces of the Old Civilization from before The Fractured.",
        ],
        id: [
          "Old Sanctum diyakini sebagai salah satu jejak besar Old Civilization yang masih tersisa dari masa sebelum The Fractured.",
        ],
      },
    },
    {
      id: "ruins",
      label: { en: "The Ruins", id: "Reruntuhan" },
      content: {
        en: [
          "Today the site consists of ruins, broken walls, frozen courtyards, and old structures consumed by northern wind. A prominent tower remains visible above the dead city.",
        ],
        id: [
          "Kini situs ini terdiri dari puing-puing, dinding patah, pelataran beku, dan bangunan tua yang ditelan angin utara. Sebuah menara utama masih terlihat di atas kota mati tersebut.",
        ],
      },
    },
    {
      id: "meaning",
      label: { en: "Historical Meaning", id: "Makna Historis" },
      content: {
        en: [
          "Its existence gives Northland an importance beyond frontier survival: the region also preserves fragments of a world whose institutions and sacred places predate the present order.",
        ],
        id: [
          "Keberadaannya memberi Northland arti lebih dari sekadar frontier untuk bertahan hidup: wilayah ini juga menyimpan pecahan dunia yang lembaga dan tempat sucinya mendahului tatanan sekarang.",
        ],
      },
    },
  ],
};
