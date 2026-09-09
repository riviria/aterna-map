import type { Language } from "./language";
import type { LocalizedText } from "./locations";

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

export const locationDetails: Record<string, LocationDetail> = {
  arcadia: {
    images: [
      {
        src: "/locations/west/Arcadia.png",
        caption: {
          en: "Arcadia — Capital City",
          id: "Arcadia — Kota Ibu Kota",
        },
      },
      {
        src: "/locations/west/Arcadia.png",
        caption: {
          en: "Royal District",
          id: "Distrik Kerajaan",
        },
      },
      {
        src: "/locations/west/Arcadia.png",
        caption: {
          en: "Central Palace Grounds",
          id: "Kawasan Istana Pusat",
        },
      },
      {
        src: "/locations/west/Arcadia.png",
        caption: {
          en: "Western Quarter",
          id: "Kawasan Barat",
        },
      },
      {
        src: "/locations/west/Arcadia.png",
        caption: {
          en: "Northern Approach",
          id: "Jalur Pendekatan Utara",
        },
      },
      {
        src: "/locations/west/Arcadia.png",
        caption: {
          en: "Arcadia from Above",
          id: "Arcadia dari Atas",
        },
      },
    ],
    tabs: [
      {
        id: "history",
        label: {
          en: "History",
          id: "Sejarah",
        },
        content: {
          en: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ],
          id: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ],
        },
      },
      {
        id: "social",
        label: {
          en: "Social",
          id: "Sosial",
        },
        content: {
          en: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere, neque at fermentum sollicitudin, velit mauris posuere nibh, vitae feugiat ipsum sem non est.",
            "Integer dignissim, sapien at posuere tincidunt, arcu lectus posuere magna, non aliquet massa arcu vitae lectus.",
          ],
          id: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere, neque at fermentum sollicitudin, velit mauris posuere nibh, vitae feugiat ipsum sem non est.",
            "Integer dignissim, sapien at posuere tincidunt, arcu lectus posuere magna, non aliquet massa arcu vitae lectus.",
          ],
        },
      },
      {
        id: "economy",
        label: {
          en: "Economy",
          id: "Ekonomi",
        },
        content: {
          en: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus, neque sed condimentum pulvinar, ipsum sem volutpat nisl, a bibendum justo turpis sed risus.",
            "Suspendisse potenti. Donec sed lorem vitae justo luctus consequat. Nulla facilisi, and the complete economic profile can be added here as the lore develops.",
          ],
          id: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus, neque sed condimentum pulvinar, ipsum sem volutpat nisl, a bibendum justo turpis sed risus.",
            "Suspendisse potenti. Donec sed lorem vitae justo luctus consequat. Nulla facilisi, dan profil ekonomi lengkap dapat ditambahkan di sini seiring perkembangan lore.",
          ],
        },
      },
    ],
  },
  leichstburg: {
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
        label: {
          en: "History",
          id: "Sejarah",
        },
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
  },
  viremont: {
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
        label: {
          en: "History",
          id: "Sejarah",
        },
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
  },
  largos: {
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
        label: {
          en: "History",
          id: "Sejarah",
        },
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
  },
};
