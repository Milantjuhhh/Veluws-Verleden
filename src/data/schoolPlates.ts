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
    desc: "Hoe woonden en leefden mensen vroeger op de Veluwe?",
    emoji: "🏡",
    image: "/images/schoolplaat-1-leven-op-de-veluwe.png",
  },
  {
    id: 2,
    title: "Middeleeuwse dorpen",
    desc: "Ontdek hoe mensen vroeger in een dorp leefden!",
    emoji: "🏰",
    image: "/images/schoolplaat-2-middeleeuwse-dorpen.png",
  },
  {
    id: 3,
    title: "Oog in oog met de Romeinen",
    desc: "Wie waren de Romeinen en wat deden ze op de Veluwe?",
    emoji: "⚔️",
    image: "/images/schoolplaat-3-romeinen.png",
    thumbnail: "/images/schoolplaat-3-romeinen-overzicht.png",
  },
  {
    id: 4,
    title: "Handel en nijverheid",
    desc: "Ontdek hoe mensen vroeger spullen maakten en verkochten!",
    emoji: "⚙️",
    image: "/images/schoolplaat-4-handel-en-nijverheid.png",
  },
  {
    id: 5,
    title: "Kastelen en ridders",
    desc: "Hoe leefden ridders en wat gebeurde er in kastelen?",
    emoji: "🗡️",
    image: "/images/schoolplaat-5-kastelen-en-ridders.png",
  },
  {
    id: 6,
    title: "De reformatie",
    desc: "Ontdek waarom mensen vroeger anders gingen geloven.",
    emoji: "📖",
    image: "/images/schoolplaat-6-de-reformatie.png",
  },
  {
    id: 7,
    title: "Boerenbestaan 1800",
    desc: "Hoe was het om vroeger op een boerderij te wonen?",
    emoji: "🌾",
    image: "/images/schoolplaat-7-boerenbestaan-1800.png",
  },
  {
    id: 8,
    title: "Natuur en landschap",
    desc: "Ontdek de bossen, dieren en heide van de Veluwe!",
    emoji: "🌲",
    image: "/images/schoolplaat-8-natuur-en-landschap.png",
  },
];