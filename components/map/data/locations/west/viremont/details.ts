import type { LocationDetail } from "../../../types";

export const viremontDetails: LocationDetail = {
  description: {
    en: "A strategic settlement located near the western mountain ranges.",
    id: "Sebuah permukiman strategis yang terletak di dekat jajaran pegunungan barat.",
  },
  images: [
    {
      src: "/locations/west/Viremont.png",
      caption: {
        en: "Viremont — Mountain Settlement",
        id: "Viremont — Permukiman Pegunungan",
      },
    },
  ],
  tabs: [
    {
      id: "history",
      label: { en: "History", id: "Sejarah" },
      content: {
        en: [
          "History for Viremont can be expanded here without changing the map location record.",
        ],
        id: [
          "Sejarah Viremont dapat dikembangkan di sini tanpa mengubah data lokasi pada peta.",
        ],
      },
    },
  ],
};
