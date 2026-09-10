import type { LocationDetail } from "../../../types";

export const elinorDetails: LocationDetail = {
  description: {
    en: "A small aristocratic city built around the old Elinor family, where Levien heritage, quiet political influence, and family prestige remain deeply connected.",
    id: "Kota aristokratik kecil yang tumbuh di sekitar keluarga tua Elinor, tempat warisan Levien, pengaruh politik yang halus, dan prestise keluarga tetap terhubung erat.",
  },
  images: [
    {
      src: "/locations/west/elinor/elinor.jpeg",
      caption: { en: "Elinor", id: "Elinor" },
    },
  ],
  tabs: [
    {
      id: "profile",
      label: { en: "Profile", id: "Profil Singkat" },
      content: {
        en: [
          "Royal House of Elinor grew around an old aristocratic family whose historical reputation carries weight even beyond its own territory.",
        ],
        id: [
          "Royal House of Elinor tumbuh di sekitar keluarga aristokratik tua yang reputasi historisnya dihormati bahkan di luar wilayahnya sendiri.",
        ],
      },
    },
    {
      id: "character",
      label: { en: "Character of the City", id: "Karakter Kota" },
      content: {
        en: [
          "Residences, political family spaces, and supporting settlements form a refined Levien cityscape of pale stone, towers, terraced gardens, high halls, and formal streets.",
        ],
        id: [
          "Kediaman bangsawan, ruang politik keluarga, dan permukiman pendukung membentuk lanskap kota Levien yang anggun dengan batu terang, menara, taman bertingkat, aula tinggi, dan jalan formal.",
        ],
      },
    },
    {
      id: "social-political-role",
      label: { en: "Social & Political Role", id: "Peran Sosial & Politik" },
      content: {
        en: [
          "The city serves as a discreet meeting point for nobles, thinkers, and influential figures, allowing negotiation and aristocratic networks to operate outside formal palaces and public diplomacy.",
        ],
        id: [
          "Kota ini menjadi titik pertemuan yang lebih tertutup bagi bangsawan, pemikir, dan tokoh berpengaruh, memungkinkan negosiasi dan jaringan aristokratik berjalan di luar istana resmi serta diplomasi publik.",
        ],
      },
    },
    {
      id: "distinctive-notes",
      label: { en: "Distinctive Notes", id: "Catatan Khas" },
      content: {
        en: [
          "Elinor is a city built from a family name: a place where heritage, honor, and old Levien influence survive in a quieter form than a royal palace, but not a weaker one.",
        ],
        id: [
          "Elinor adalah kota yang dibangun dari sebuah nama keluarga: tempat warisan, kehormatan, dan pengaruh tua Levien bertahan dalam bentuk yang lebih sunyi daripada istana kerajaan, tetapi tidak lebih lemah.",
        ],
      },
    },
  ],
};
