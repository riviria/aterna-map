import type { LocationDetail } from "../../../types";

export const largosDetails: LocationDetail = {
  description: {
    en: "A quiet village surrounded by wilderness and ancient trade routes.",
    id: "Sebuah desa tenang yang dikelilingi alam liar dan jalur perdagangan kuno.",
  },
  images: [
    {
      src: "/locations/mid/Largos.png",
      caption: {
        en: "Largos — Village Outskirts",
        id: "Largos — Pinggiran Desa",
      },
    },
  ],
  tabs: [
    {
      id: "history",
      label: { en: "History", id: "Sejarah" },
      content: {
        en: [
          "History for Largos can be expanded here without changing the map location record.",
        ],
        id: [
          "Sejarah Largos dapat dikembangkan di sini tanpa mengubah data lokasi pada peta.",
        ],
      },
    },
  ],
};
