import type { Language } from "./language";

export type LocationType =
  | "nation"
  | "city"
  | "landmark"
  | "geography";

export type LocalizedText = Record<Language, string>;

export type NationProfile = {
  form: LocalizedText;
  capital: LocalizedText;
  raceComposition: LocalizedText;
};

export type MapLocation = {
  id: string;
  name: string;
  type: LocationType;
  x: number;
  y: number;
  description: LocalizedText;
  nationProfile?: NationProfile;
  thumbnail: string;
  href: string;
};

export function getLocalizedText(text: LocalizedText, language: Language) {
  return text[language];
}

export const locations: MapLocation[] = [
  {
    id: "arcadia",
    name: "Arcadia",
    type: "nation",
    x: 317,
    y: 530,
    description: {
      en: "",
      id: "",
    },
    nationProfile: {
      form: {
        en: "Monarchy Kingdom",
        id: "Kerajaan Monarki",
      },
      capital: {
        en: "Arcadia & Westerna",
        id: "Arcadia & Westerna",
      },
      raceComposition: {
        en: "Levien (90%), Dhurin (5%), Human (4%), Mixed Races & Orkin (1%)",
        id: "Levien (90%), Dhurin (5%), Manusia (4%), Ras Campuran & Orkin (1%)",
      },
    },
    thumbnail: "/locations/west/Arcadia.png",
    href: "/locations/arcadia",
  },
  {
    id: "leichstburg",
    name: "Leichstburg",
    type: "landmark",
    x: 317,
    y: 631,
    description: {
      en: "A prosperous city surrounded by fertile lands and ancient mountain routes.",
      id: "Sebuah kota makmur yang dikelilingi tanah subur dan jalur pegunungan kuno.",
    },
    thumbnail: "/locations/west/Leichstburg.png",
    href: "/locations/west/Leichstburg",
  },
  {
    id: "viremont",
    name: "Viremont",
    type: "geography",
    x: 248,
    y: 700,
    description: {
      en: "A strategic settlement located near the western mountain ranges.",
      id: "Sebuah permukiman strategis yang terletak di dekat jajaran pegunungan barat.",
    },
    thumbnail: "/locations/west/Viremont.png",
    href: "/locations/west/Viremont",
  },
  {
    id: "largos",
    name: "Largos",
    type: "city",
    x: 568,
    y: 880,
    description: {
      en: "A quiet village surrounded by wilderness and ancient trade routes.",
      id: "Sebuah desa tenang yang dikelilingi alam liar dan jalur perdagangan kuno.",
    },
    thumbnail: "/locations/mid/Largos.png",
    href: "/locations/mid/Largos",
  },
];
