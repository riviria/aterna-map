import type { MapLocation } from "../../../types";

export const canary: MapLocation = {
  id: "canary",
  name: "Canary City",
  type: "city",
  region: "west",
  x: 168,
  y: 833,
  description: {
    en: "A named city on the Western Continent map. The current supplied source does not provide a dedicated descriptive chapter.",
    id: "Kota bernama pada peta Benua Barat. Sumber yang saat ini digunakan belum menyediakan bab deskripsi khusus.",
  },
  cityProfile: {
    region: { en: "Western Continent", id: "Benua Barat" },
    category: { en: "City", id: "Kota" },
  },
  thumbnail: "/locations/west/canary/canary.jpeg",
  href: "/locations/canary",
};
