import type { LocationDetail } from "../../../types";

export const ashenValeDetails: LocationDetail = {
  description: {
    en: "A dark valley where fertile land and the scars of an older catastrophe coexist, creating a hard landscape of work, extraction, and unfinished recovery.",
    id: "Lembah gelap tempat tanah subur dan bekas luka bencana lama hidup berdampingan, membentuk lanskap keras yang berkaitan dengan kerja, ekstraksi, dan pemulihan yang belum selesai.",
  },
  images: [
    {
      src: "/locations/west/ashenvale/ashenvale.png",
      caption: { en: "Ashen Vale", id: "Ashen Vale" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Ashen Vale is known for the contrast between dark land and the life that continues to grow across it.",
        ],
        id: [
          "Ashen Vale dikenal karena kontras antara tanah gelap dan kehidupan yang tetap tumbuh di atasnya.",
        ],
      },
    },
    {
      id: "use",
      label: { en: "Use & Life", id: "Kegunaan & Kehidupan" },
      content: {
        en: [
          "Stable areas support heavy agriculture, while rocky sections can be used for mining and extraction. Other parts remain too harsh or dangerous to develop.",
        ],
        id: [
          "Bagian yang stabil digunakan untuk pertanian berat, sementara bagian berbatu dapat dimanfaatkan untuk penambangan dan ekstraksi. Wilayah lain tetap terlalu keras atau berbahaya untuk dikembangkan.",
        ],
      },
    },
    {
      id: "neighbors",
      label: { en: "Between Viremont & Roehn", id: "Di antara Viremont & Roehn" },
      content: {
        en: [
          "Its position between Viremont and Roehn makes it a transition zone between agrarian order and northern pragmatism and resilience.",
        ],
        id: [
          "Posisinya di antara Viremont dan Roehn menjadikannya ruang peralihan antara keteraturan agraris dan pragmatisme serta ketahanan wilayah utara.",
        ],
      },
    },
    {
      id: "trauma",
      label: { en: "Trauma of the Past", id: "Trauma Masa Lalu" },
      content: {
        en: [
          "Stories of burned ruins, blackened stone, and soil that refuses to grow preserve the memory of a destructive past beneath the region's present usefulness.",
        ],
        id: [
          "Cerita tentang reruntuhan terbakar, batu hangus, dan tanah yang menolak tumbuh mempertahankan ingatan akan masa lalu yang merusak di balik kegunaan wilayah saat ini.",
        ],
      },
    },
  ],
};
