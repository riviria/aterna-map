import type { LocationDetail } from "../../../types";

export const willowindDetails: LocationDetail = {
  description: {
    en: "The Willowind Academy of Arcs, a notable Arc-related academic landmark in the Western Continent.",
    id: "Willowind Academy of Arcs, sebuah landmark akademik penting yang berkaitan dengan Arcs di Benua Barat.",
  },
  images: [
    {
      src: "/locations/west/willowind/willowind.jpeg",
      caption: { en: "Willowind", id: "Willowind" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Willowind represents the Willowind Academy of Arcs, an important named institution within the Western Continent source material.",
        ],
        id: [
          "Willowind mewakili Willowind Academy of Arcs, sebuah institusi bernama yang penting dalam sumber materi Benua Barat.",
        ],
      },
    },
    {
      id: "context",
      label: { en: "Context", id: "Konteks" },
      content: {
        en: [
          "The current source identifies Willowind primarily through the academy itself; detailed additional sections should follow the fuller academy source when available.",
        ],
        id: [
          "Sumber saat ini terutama mengidentifikasi Willowind melalui akademinya; detail tambahan sebaiknya mengikuti sumber khusus akademi yang lebih lengkap ketika tersedia.",
        ],
      },
    },
  ],
};
