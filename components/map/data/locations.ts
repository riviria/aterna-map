export type LocationType =
  | "nation"
  | "city"
  | "landmark"
  | "geography";

export type NationProfile = {
  form: string;
  capital: string;
  raceComposition: string; 
};

export type MapLocation = {
  id: string;
  name: string;
  type: LocationType;
  x: number;
  y: number;
  description: string;
  nationProfile?: NationProfile;
  thumbnail: string;
  href: string;
};


export const locations:
  MapLocation[] = [

    {
      id: "arcadia",
      name: "Arcadia",
      type: "nation",
      x: 317,
      y: 530,
      description: "",
      nationProfile: {
        form: "Monarchy Kingdom",
        capital: "Arcadia & Westerna",
        raceComposition: "Levien (90%), Dhurin (5%), Human (4%), Mixed Races & Orkin (1%)",
      },
      thumbnail: "/locations/west/Arcadia.png",
      href: "/locations/arcadia",
    },


    {
      id:
        "leichstburg",

      name:
        "Leichstburg",

      type:
        "landmark",

      x:
        317,

      y:
        631,

      description:
        "A prosperous city surrounded by fertile lands and ancient mountain routes.",

      thumbnail:
        "/locations/west/Leichstburg.png",

      href:
        "/locations/west/Leichstburg",
    },


    {
      id:
        "viremont",

      name:
        "Viremont",

      type:
        "geography",

      x:
        248,

      y:
        700,

      description:
        "A strategic settlement located near the western mountain ranges.",

      thumbnail:
        "/locations/west/Viremont.png",

      href:
        "/locations/west/Viremont",
    },


    {
      id:
        "largos",

      name:
        "Largos",

      type:
        "city",

      x:
        568,

      y:
        880,

      description:
        "A quiet village surrounded by wilderness and ancient trade routes.",

      thumbnail:
        "/locations/mid/Largos.png",

      href:
        "/locations/mid/Largos",
    },

  ];