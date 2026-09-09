import type { LocationType, LocalizedText } from "./types";

export type LocationTabDefinition = {
  id: string;
  label: LocalizedText;
};

export const locationTabs: Record<LocationType, LocationTabDefinition[]> = {
  nation: [
    { id: "history", label: { en: "History", id: "Sejarah" } },
    { id: "government", label: { en: "Government", id: "Pemerintahan" } },
    { id: "society-culture", label: { en: "Society & Culture", id: "Masyarakat & Budaya" } },
    { id: "economy", label: { en: "Economy", id: "Ekonomi" } },
    { id: "international-role", label: { en: "International Role", id: "Peran Internasional" } },
    { id: "current-issues", label: { en: "Current Issues", id: "Isu Terkini" } },
  ],
  city: [
    { id: "history", label: { en: "History", id: "Sejarah" } },
    { id: "city-character", label: { en: "City Character", id: "Karakter Kota" } },
    { id: "districts-landmarks", label: { en: "Districts & Landmarks", id: "Distrik & Landmark" } },
    { id: "society-culture", label: { en: "Society & Culture", id: "Masyarakat & Budaya" } },
    { id: "economy-role", label: { en: "Economy & Role", id: "Ekonomi & Peran" } },
  ],
  geography: [
    { id: "history", label: { en: "History", id: "Sejarah" } },
    { id: "environment", label: { en: "Environment", id: "Lingkungan" } },
    { id: "distinctive-features", label: { en: "Distinctive Features", id: "Ciri Khas" } },
    { id: "significance", label: { en: "Significance", id: "Signifikansi" } },
    { id: "impact-reputation", label: { en: "Impact & Reputation", id: "Dampak & Reputasi" } },
  ],
  landmark: [
    { id: "history", label: { en: "History", id: "Sejarah" } },
    { id: "character", label: { en: "Character", id: "Karakter" } },
    { id: "architecture-features", label: { en: "Architecture & Features", id: "Arsitektur & Fitur" } },
    { id: "significance", label: { en: "Significance", id: "Signifikansi" } },
    { id: "current-condition", label: { en: "Current Condition", id: "Kondisi Saat Ini" } },
  ],
};
