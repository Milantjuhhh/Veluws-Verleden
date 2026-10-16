import { getHotspotContent } from "./hotspotContent";
 
export type Question = {
  q: string;
  options: [string, string, string, string];
  correct: number;
  hint: string;
  explanation: string;
  feedback: [string, string, string, string];
};
 
const SCHOOL_PLATE_3_QUESTIONS: Record<number, Question> = {
  1: {
    q: "Waarom maakten Romeinse soldaten een kamp?",
    options: [
      "Om veilig te slapen",
      "Om een markt te maken",
      "Om groenten te planten",
      "Om een kasteel te bouwenja",
    ],
    correct: 0,
    hint: "Denk aan een veilige plek om te slapen.",
    explanation: "Romeinse soldaten maakten kampen om veilig te slapen en hun spullen te bewaren.",
    feedback: [
      "Goed gedaan! In het kamp waren de soldaten veilig.",
      "Helaas! Het kamp was geen markt.",
      "Helaas! Het kamp was niet bedoeld om groenten te planten.",
      "Helaas! Het kamp was geen kasteel.",
    ],
  },

  2: {
    q: "Hoe beschermden de Romeinen hun kamp?",
    options: [
      "Met alleen tenten",
      "Met een diepe sloot en houten palen",
      "Met een stenen kasteel",
      "Met water rond alle tenten",
    ],
    correct: 1,
    hint: "Kijk naar de buitenkant van het kamp.",
    explanation: "De Romeinen maakten een diepe sloot, een wal van aarde en een hek van houten palen.",
    feedback: [
      "Helaas! Alleen tenten waren niet veilig genoeg.",
      "Goed gedaan! De sloot en palen hielden vijanden tegen.",
      "Helaas! Het kamp was geen stenen kasteel.",
      "Helaas! Niet alle tenten stonden in het water.",
    ],
  },

  3: {
    q: "Waarom stonden de tenten netjes op een rij?",
    options: [
      "Zodat soldaten alles snel konden vinden",
      "Zodat mensen huizen konden kopen",
      "Zodat dieren overal konden lopen",
      "Zodat vijanden makkelijk binnenkwamen",
    ],
    correct: 0,
    hint: "Denk aan hoe je snel je eigen tent vindt.",
    explanation: "Door de nette indeling konden soldaten snel hun tent en spullen vinden.",
    feedback: [
      "Goed gedaan! Iedereen wist waar hij moest zijn.",
      "Helaas! Het kamp was geen woonwijk.",
      "Helaas! Dieren hadden hun eigen plek.",
      "Helaas! Vijanden moesten juist buiten blijven.",
    ],
  },

  4: {
    q: "Wat gebruikte een Romeinse soldaat?",
    options: [
      "Een kroon en een mantel",
      "Een hamer en een zaag",
      "Een helm, schild en speer",
      "Een boek en een pen",
    ],
    correct: 2,
    hint: "Denk aan spullen om mee te vechten.",
    explanation: "Romeinse soldaten gebruikten een helm, schild en speer om te vechten en zichzelf te beschermen.",
    feedback: [
      "Helaas! Een kroon hoort bij een koning.",
      "Helaas! Dit zijn gereedschappen.",
      "Goed gedaan! Dit waren spullen van een Romeinse soldaat.",
      "Helaas! Een boek en pen zijn geen wapens.",
    ],
  },

  5: {
    q: "Welke twee groepen soldaten had het Romeinse leger?",
    options: [
      "Alleen mensen uit Rome",
      "Legionairs en hulptroepen",
      "Boeren en verkopers",
      "Ridders en helpers",
    ],
    correct: 1,
    hint: "Er waren Romeinse soldaten en soldaten die hielpen.",
    explanation: "Het Romeinse leger bestond uit legionairs en hulptroepen. Ze werkten samen.",
    feedback: [
      "Helaas! Soldaten kwamen ook uit andere gebieden.",
      "Goed gedaan! Legionairs en hulptroepen vormden samen het leger.",
      "Helaas! Boeren en verkopers waren geen groepen soldaten.",
      "Helaas! Ridders horen bij de middeleeuwen.",
    ],
  },

  6: {
    q: "Waarvan maakten mensen vroeger hun huizen?",
    options: [
      "Glas en staal",
      "Goud en marmer",
      "Hout, klei en riet",
      "Alleen grote stenen",
    ],
    correct: 2,
    hint: "Denk aan materialen uit de natuur.",
    explanation: "Mensen maakten hun huizen van hout, takken, klei en riet.",
    feedback: [
      "Helaas! Deze huizen waren niet van glas en staal.",
      "Helaas! Goud en marmer werden hiervoor niet gebruikt.",
      "Goed gedaan! Mensen gebruikten materialen uit de natuur.",
      "Helaas! De huizen waren niet alleen van steen.",
    ],
  },

  7: {
    q: "Wat is een meloenkraal?",
    options: [
      "Een Romeinse helm",
      "Een kraal die je als sieraad kunt dragen",
      "Een stuk van een tent",
      "Een Romeinse munt",
    ],
    correct: 1,
    hint: "Het is iets kleins dat mensen als versiering gebruikten.",
    explanation: "Een meloenkraal is een kleine kraal met ribbeltjes. Hij kon bij een sieraad horen.",
    feedback: [
      "Helaas! Een meloenkraal is geen helm.",
      "Goed gedaan! De kraal kon bij een sieraad horen.",
      "Helaas! Het is geen stukje van een tent.",
      "Helaas! Een meloenkraal is geen munt.",
    ],
  },

  8: {
    q: "Hoe leerden Romeinen en bewoners elkaar kennen?",
    options: [
      "Door spullen te kopen, verkopen en samen te werken",
      "Alleen door sportwedstrijden",
      "Ze praatten nooit met elkaar",
      "Alleen door brieven te schrijven",
    ],
    correct: 0,
    hint: "Denk aan mensen die samen werken en spullen ruilen.",
    explanation: "Romeinen en bewoners ontmoetten elkaar door handel en werk. Ze leerden van elkaar.",
    feedback: [
      "Goed gedaan! Ze handelden en werkten samen.",
      "Helaas! Ze ontmoetten elkaar niet alleen tijdens sport.",
      "Helaas! Ze hadden juist wel contact.",
      "Helaas! Ze spraken ook met elkaar.",
    ],
  },

  9: {
    q: "Wat moet je doen bij het molenspel?",
    options: [
      "Alle stenen weggooien",
      "Een hoge toren bouwen",
      "Drie stenen op een rij krijgen",
      "Alle stenen in een cirkel leggen",
    ],
    correct: 2,
    hint: "Probeer drie stenen naast elkaar te krijgen.",
    explanation: "Bij het molenspel probeer je drie speelstenen op één lijn te krijgen.",
    feedback: [
      "Helaas! Je gooit de stenen niet weg.",
      "Helaas! Je bouwt geen toren.",
      "Goed gedaan! Drie stenen op een rij vormen een molen.",
      "Helaas! Een cirkel maken is niet het doel.",
    ],
  },

  10: {
    q: "Waarom was de plek van een Romeins kamp belangrijk?",
    options: [
      "Er moest water, hout en een veilige plek zijn",
      "Voor de kleur van de kleren",
      "Voor de spelletjes van soldaten",
      "De plek maakte helemaal niets uit",
    ],
    correct: 0,
    hint: "Denk aan wat soldaten nodig hebben om te leven.",
    explanation: "Romeinse soldaten kozen een plek met water, hout en genoeg bescherming tegen vijanden.",
    feedback: [
      "Goed gedaan! Water, hout en veiligheid waren belangrijk.",
      "Helaas! De plek bepaalde niet de kleur van de kleren.",
      "Helaas! Spelletjes waren niet de reden.",
      "Helaas! Een goede plek was juist heel belangrijk.",
    ],
  },
};
 
export function getHotspotQuiz(
  schoolPlateId: number,
  hotspot: number,
): Question[] {
  const point = Math.min(10, Math.max(1, hotspot));
 
  // Gebruik de handmatig geschreven vragen voor schoolplaat 3.
  if (schoolPlateId === 3) {
    return [SCHOOL_PLATE_3_QUESTIONS[point]];
  }
 
  // Voor de andere schoolplaten blijven de vragen automatisch opgebouwd.
  const current = getHotspotContent(schoolPlateId, point);
 
  const otherPoints = [1, 3, 6]
    .map((step) => ((point - 1 + step) % 10) + 1)
    .map((number) => getHotspotContent(schoolPlateId, number));
 
  const correct = (schoolPlateId + point) % 4;
  const wrongAnswers = otherPoints.map((item) => item.paragraphs[0]);
  const options = [...wrongAnswers] as string[];
 
  options.splice(correct, 0, current.paragraphs[0]);
 
  const feedback = options.map((option, index) =>
    index === correct
      ? `Goed! Dit hoort bij ${current.title.toLowerCase()}. ${current.paragraphs[2]}`
      : `Niet helemaal. Bij ${current.title.toLowerCase()} hoort: ${current.paragraphs[0]}`,
  ) as [string, string, string, string];
 
  return [
    {
      q: `Welke uitleg hoort bij informatiepunt ${point}: “${current.title}”?`,
      options: options as [string, string, string, string],
      correct,
      hint: `Denk aan: ${current.emoji} ${current.title}.`,
      explanation: `${current.paragraphs[0]} ${current.paragraphs[2]}`,
      feedback,
    },
  ];
}