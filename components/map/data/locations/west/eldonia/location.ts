import type { MapLocation } from "../../../types";

export const eldonia: MapLocation = {
  id: "eldonia",
  name: "Eldonia",
  type: "city",
  region: "west",
  x: 87,
  y: 636,
  description: {
    en: "A named city on the Western Continent map. The current supplied source does not provide a dedicated descriptive chapter.",
    id: "Kota bernama pada peta Benua Barat. Sumber yang saat ini digunakan belum menyediakan bab deskripsi khusus.",
  },
  cityProfile: {
    region: { en: "Western Continent", id: "Benua Barat" },
    category: { en: "City", id: "Kota" },
  },
  thumbnail: "/locations/west/eldonia/eldonia.jpeg",
  href: "/locations/eldonia",
};
