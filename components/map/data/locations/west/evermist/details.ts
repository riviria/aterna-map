import type { LocationDetail } from "../../../types";

export const evermistDetails: LocationDetail = {
  description: {
    en: "A feared mist-covered forest near Arcadia where silence, shifting paths, and uncertainty make the landscape itself dangerous.",
    id: "Hutan berkabut yang ditakuti di dekat Arcadia, tempat keheningan, jalan yang berubah, dan ketidakpastian membuat lanskapnya sendiri berbahaya.",
  },
  images: [
    {
      src: "/locations/west/evermist/evermist.png",
      caption: { en: "Evermist", id: "Evermist" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Evermist is one of the most feared forests in the Western Continent. It is defined by dense mist, deep silence, and routes that are difficult to trust.",
        ],
        id: [
          "Evermist adalah salah satu hutan paling ditakuti di Benua Barat. Wilayah ini ditandai oleh kabut tebal, keheningan, dan jalur yang sulit dipercaya.",
        ],
      },
    },
    {
      id: "character",
      label: { en: "Regional Character", id: "Karakter Wilayah" },
      content: {
        en: [
          "The danger of Evermist does not always come from an obvious enemy. Mist, silence, and paths that gradually seem to change can be enough to disorient travelers.",
        ],
        id: [
          "Bahaya Evermist tidak selalu datang dari musuh yang terlihat. Kabut, keheningan, dan jalan yang perlahan terasa berubah sudah cukup untuk membuat pelancong kehilangan arah.",
        ],
      },
    },
    {
      id: "arcadia",
      label: { en: "Relation to Arcadia", id: "Hubungan dengan Arcadia" },
      content: {
        en: [
          "Its closeness to Arcadia gives Evermist political and symbolic importance: it stands beside a kingdom built on control while reminding the region that not everything can be governed.",
        ],
        id: [
          "Kedekatannya dengan Arcadia memberi Evermist arti politik dan simbolik: ia berdiri di sisi kerajaan yang dibangun atas kontrol, sambil mengingatkan bahwa tidak semua hal dapat diatur.",
        ],
      },
    },
    {
      id: "distinctive-notes",
      label: { en: "Distinctive Notes", id: "Catatan Khas" },
      content: {
        en: [
          "Evermist does not need to move to consume those who enter; its mist, silence, and changing paths have made it one of the West's most feared landscapes.",
        ],
        id: [
          "Evermist tidak perlu bergerak untuk menelan orang; kabut, keheningan, dan jalannya yang berubah menjadikannya salah satu lanskap paling ditakuti di Barat.",
        ],
      },
    },
  ],
};
