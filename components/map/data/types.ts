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
  region: "west" | "mid" | "east";
  x: number;
  y: number;
  description: LocalizedText;
  nationProfile?: NationProfile;
  thumbnail: string;
  href: string;
};

export type LocationDetailImage = {
  src: string;
  caption: LocalizedText;
};

export type LocationDetailTab = {
  id: string;
  label: LocalizedText;
  content: Record<Language, string[]>;
};

export type LocationDetail = {
  description?: LocalizedText;
  images?: LocationDetailImage[];
  tabs?: LocationDetailTab[];
};

export function getLocalizedText(text: LocalizedText, language: Language) {
  return text[language];
}
