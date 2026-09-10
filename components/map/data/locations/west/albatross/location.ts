import type { MapLocation } from "../../../types";

export const albatross: MapLocation = {
  id: "albatross",
  name: "Albatross",
  type: "city",
  region: "west",
  x: 231,
  y: 907,
  description: {
    en: "A named city on the Western Continent map. The current supplied source does not provide a dedicated descriptive chapter.",
    id: "Kota bernama pada peta Benua Barat. Sumber yang saat ini digunakan belum menyediakan bab deskripsi khusus.",
  },
  cityProfile: {
    region: { en: "Western Continent", id: "Benua Barat" },
    category: { en: "City", id: "Kota" },
  },
  thumbnail: "/locations/west/albatross/albatross.jpeg",
  href: "/locations/albatross",
};
