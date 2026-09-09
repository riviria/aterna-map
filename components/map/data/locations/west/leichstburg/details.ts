import type { LocationDetail } from "../../../types";

export const leichstburgDetails: LocationDetail = {
  description: {
    en: "A prosperous city surrounded by fertile lands and ancient mountain routes.",
    id: "Sebuah kota makmur yang dikelilingi tanah subur dan jalur pegunungan kuno.",
  },
  images: [
    {
      src: "/locations/west/Leichstburg.png",
      caption: {
        en: "Leichstburg — City View",
        id: "Leichstburg — Pemandangan Kota",
      },
    },
  ],
  tabs: [
    {
      id: "history",
      label: { en: "History", id: "Sejarah" },
      content: {
        en: [
          "History for Leichstburg can be expanded here without changing the map location record.",
        ],
        id: [
          "Sejarah Leichstburg dapat dikembangkan di sini tanpa mengubah data lokasi pada peta.",
        ],
      },
    },
  ],
};
