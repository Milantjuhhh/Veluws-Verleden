export type SchoolPlate = {
  id: number;
  title: string;
  desc: string;
  emoji: string;
  image: string;
  thumbnail?: string;
};

export const SCHOOL_PLATES: SchoolPlate[] = [
  {
    id: 1,
    title: "Leven op de Veluwe",
    desc: "Hoe leefden mensen vroeger op de Veluwe?",
    emoji: "🏡",
    image: "/images/schoolplaat-1-leven-op-de-veluwe.png",
  },
  {
    id: 2,
    title: "Middeleeuwse dorpen",
    desc: "Bezoek een middeleeuws dorp en ontmoet de bewoners!",
    emoji: "🏰",
    image: "/images/schoolplaat-2-middeleeuwse-dorpen.png",
  },
  {
    id: 3,
    title: "Oog in oog met de Romeinen",
    desc: "Ontdek de sporen die de Romeinen nalieten op de Veluwe.",
    emoji: "⚔️",
    image: "/images/schoolplaat-3-romeinen.png",
    thumbnail: "/images/schoolplaat-3-romeinen-overzicht.png",
  },
  {
    id: 4,
    title: "Handel en nijverheid",
    desc: "Markten, ambachten en ruilhandel in vroeger tijden.",
    emoji: "⚙️",
    image: "/images/schoolplaat-4-handel-en-nijverheid.png",
  },
  {
    id: 5,
    title: "Kastelen en ridders",
    desc: "Avontuur op en rondom de Veluwse kastelen.",
    emoji: "🗡️",
    image: "/images/schoolplaat-5-kastelen-en-ridders.png",
  },
  {
    id: 6,
    title: "De reformatie",
    desc: "Geloofsveranderingen en hun invloed op het dagelijks leven.",
    emoji: "📖",
    image: "/images/schoolplaat-6-de-reformatie.png",
  },
  {
    id: 7,
    title: "Boerenbestaan 1800",
    desc: "Het harde en bijzondere leven van boerenfamilies.",
    emoji: "🌾",
    image: "/images/schoolplaat-7-boerenbestaan-1800.png",
  },
  {
    id: 8,
    title: "Natuur en landschap",
    desc: "Bossen, heidevelden en het unieke Veluwse landschap.",
    emoji: "🌲",
    image: "/images/schoolplaat-8-natuur-en-landschap.png",
  },
];
