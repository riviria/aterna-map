import type { LocationDetail } from "../../../types";

export const landOfDruidDetails: LocationDetail = {
  description: {
    en: "An ancient and wild northern tundra where forests, stone circles, mist, old spiritual traditions, and isolated clans shape a landscape older than modern civilization.",
    id: "Wilayah tundra utara yang kuno dan liar, tempat hutan, lingkaran batu, kabut, tradisi spiritual lama, dan klan terpencil membentuk lanskap yang terasa lebih tua daripada peradaban modern.",
  },
  images: [
    {
      src: "/locations/west/landofdruid/landofdruid.png",
      caption: { en: "Land of Druid", id: "Land of Druid" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Land of Druid lies north of Northland and is rarely entered by outsiders. It is a cold, secluded, and sacred landscape of forests, frozen plains, mist, and ancient stone circles.",
        ],
        id: [
          "Land of Druid terletak di utara Northland dan jarang dimasuki orang luar. Wilayah ini merupakan lanskap dingin, tertutup, dan sakral yang terdiri dari hutan, dataran beku, kabut, dan lingkaran batu purba.",
        ],
      },
    },
    {
      id: "belief",
      label: { en: "Belief & Way of Life", id: "Kepercayaan & Cara Hidup" },
      content: {
        en: [
          "Animism, respect for nature spirits, and a deep spiritual bond with the land shape the communities of Druid and Sami clans living here.",
        ],
        id: [
          "Animisme, penghormatan terhadap roh alam, dan ikatan spiritual yang mendalam dengan tanah membentuk komunitas klan Druid dan Sami yang hidup di sini.",
        ],
      },
    },
    {
      id: "arcana",
      label: { en: "Arcana & Transformation", id: "Arcana & Transformasi" },
      content: {
        en: [
          "Certain Druid traditions connect Arcana with sacred transformation, including rituals through which some clan members can manifest Arcs and take animal forms.",
        ],
        id: [
          "Tradisi tertentu Druid menghubungkan Arcana dengan transformasi sakral, termasuk ritual yang memungkinkan sebagian anggota klan memanifestasikan Arcs dan mengambil bentuk hewan.",
        ],
      },
    },
    {
      id: "cultural-meaning",
      label: { en: "Cultural Meaning", id: "Makna Budaya" },
      content: {
        en: [
          "The region represents an older path of Levien heritage—one rooted in nature, spirits, and ancient belief rather than kingdoms, law, and centralized control.",
        ],
        id: [
          "Wilayah ini mewakili jalan lain dari warisan Levien—jalan yang berakar pada alam, roh, dan keyakinan purba, bukan kerajaan, hukum, dan kontrol terpusat.",
        ],
      },
    },
  ],
};
