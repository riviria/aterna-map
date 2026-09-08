export type LocationDetailImage = {
  src: string;
  caption: string;
};

export type LocationDetailTab = {
  id: string;
  label: string;
  content: string[];
};

export type LocationDetail = {
  description?: string;
  images?: LocationDetailImage[];
  tabs?: LocationDetailTab[];
};

export const locationDetails: Record<string, LocationDetail> = {
  arcadia: {
    description:
      "A kingdom defined by its monumental capital, royal institutions, and long-established traditions. This section is intentionally kept separate from the map data so the lore can grow without making the map dataset heavier.",
    images: [
      { src: "/locations/west/Arcadia.png", caption: "Arcadia — Capital City" },
      { src: "/locations/west/Arcadia.png", caption: "Royal District" },
      { src: "/locations/west/Arcadia.png", caption: "Central Palace Grounds" },
      { src: "/locations/west/Arcadia.png", caption: "Western Quarter" },
      { src: "/locations/west/Arcadia.png", caption: "Northern Approach" },
      { src: "/locations/west/Arcadia.png", caption: "Arcadia from Above" },
    ],
    tabs: [
      {
        id: "history",
        label: "History",
        content: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ],
      },
      {
        id: "social",
        label: "Social",
        content: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere, neque at fermentum sollicitudin, velit mauris posuere nibh, vitae feugiat ipsum sem non est.",
          "Integer dignissim, sapien at posuere tincidunt, arcu lectus posuere magna, non aliquet massa arcu vitae lectus.",
        ],
      },
      {
        id: "economy",
        label: "Economy",
        content: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus, neque sed condimentum pulvinar, ipsum sem volutpat nisl, a bibendum justo turpis sed risus.",
          "Suspendisse potenti. Donec sed lorem vitae justo luctus consequat. Nulla facilisi, and the complete economic profile can be added here as the lore develops.",
        ],
      },
    ],
  },
  leichstburg: {
    description:
      "A prosperous city surrounded by fertile lands and ancient mountain routes.",
    images: [{ src: "/locations/west/Leichstburg.png", caption: "Leichstburg — City View" }],
    tabs: [
      {
        id: "history",
        label: "History",
        content: [
          "History for Leichstburg can be expanded here without changing the map location record.",
        ],
      },
    ],
  },
  viremont: {
    description:
      "A strategic settlement located near the western mountain ranges.",
    images: [{ src: "/locations/west/Viremont.png", caption: "Viremont — Mountain Settlement" }],
    tabs: [
      {
        id: "history",
        label: "History",
        content: [
          "History for Viremont can be expanded here without changing the map location record.",
        ],
      },
    ],
  },
  largos: {
    description:
      "A quiet village surrounded by wilderness and ancient trade routes.",
    images: [{ src: "/locations/mid/Largos.png", caption: "Largos — Village Outskirts" }],
    tabs: [
      {
        id: "history",
        label: "History",
        content: [
          "History for Largos can be expanded here without changing the map location record.",
        ],
      },
    ],
  },
};
