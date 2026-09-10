import type { MapLocation } from "../../../types";

export const roehn: MapLocation = {
  id: "roehn",
  name: "Roehn",
  type: "nation",
  region: "west",
  x: 232,
  y: 310,
  description: {
    en: "A hard northern frontier nation shaped by Dhurin Dvergar communities, industry, cold climates, and the constant need to endure.",
    id: "Negara frontier utara yang keras, dibentuk oleh komunitas Dhurin Dvergar, industri, iklim dingin, dan kebutuhan terus-menerus untuk bertahan.",
  },
  nationProfile: {
    form: { en: "Constitutional monarchy", id: "Monarki konstitusional" },
    capital: { en: "Jomsvalir", id: "Jomsvalir" },
    raceComposition: { en: "Dhurin (75%), Orkin (10%), Mixed Races (10%), Human (5%), Levien (0%)", id: "Dhurin (75%), Orkin (10%), Ras Campuran (10%), Manusia (5%), Levien (0%)" },
  },
  thumbnail: "/locations/west/roehn/roehn.jpeg",
  href: "/locations/roehn",
};
