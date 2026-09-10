import type { LocationDetail } from "../../../types";

export const weidenMarshDetails: LocationDetail = {
  description: {
    en: "A vast wet grassland and marsh around Leichtsburg, defined by shallow water, natural canals, fog, soft ground, and half-submerged ruins.",
    id: "Hamparan rawa rumput luas di sekitar Leichtsburg yang ditandai oleh air dangkal, kanal alami, kabut, tanah lunak, dan reruntuhan yang tenggelam sebagian.",
  },
  images: [
    {
      src: "/locations/west/weidenmarsh/weidenmarsh.png",
      caption: { en: "Weiden Marsh", id: "Weiden Marsh" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Weiden Marsh is a broad wetland in the southwest of the Western Continent, especially around Leichtsburg.",
        ],
        id: [
          "Weiden Marsh adalah bentang rawa luas di barat daya Benua Barat, terutama di sekitar Leichtsburg.",
        ],
      },
    },
    {
      id: "character",
      label: { en: "Regional Character", id: "Karakter Wilayah" },
      content: {
        en: [
          "Wet grasslands, shallow marshes, calm pools, natural canals, shifting soft ground, and heavy morning and evening fog make movement difficult without local knowledge.",
        ],
        id: [
          "Padang rumput basah, rawa dangkal, kolam tenang, kanal alami, tanah lunak yang berubah, serta kabut tebal pagi dan petang membuat perjalanan sulit tanpa pengetahuan lokal.",
        ],
      },
    },
    {
      id: "sunken-ruins",
      label: { en: "Sunken Ruins", id: "Reruntuhan Tenggelam" },
      content: {
        en: [
          "Ancient pillars, foundations, broken roads, old bridges, and fragments of buildings appear in different conditions, suggesting that older settlements and routes were gradually claimed by land and water.",
        ],
        id: [
          "Pilar kuno, fondasi, jalan patah, jembatan lama, dan sisa bangunan muncul dalam kondisi berbeda, menunjukkan bahwa permukiman serta jalur lama perlahan ditelan oleh perubahan tanah dan air.",
        ],
      },
    },
    {
      id: "leichtsburg",
      label: { en: "Relation to Leichtsburg", id: "Hubungan dengan Leichtsburg" },
      content: {
        en: [
          "The marsh forms part of the natural setting that shaped Leichtsburg's identity, routes, elevated roads, bridges, fortified ground, and characteristic atmosphere.",
        ],
        id: [
          "Rawa ini menjadi bagian dari lingkungan alam yang membentuk identitas Leichtsburg, termasuk jalur, jalan yang ditinggikan, jembatan, tanah pertahanan, dan atmosfer khasnya.",
        ],
      },
    },
  ],
};
