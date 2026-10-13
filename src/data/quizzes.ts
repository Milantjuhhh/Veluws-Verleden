import { getHotspotContent } from "./hotspotContent";

export type Question = {
  q: string;
  options: [string, string, string, string];
  correct: number;
  hint: string;
  explanation: string;
  feedback: [string, string, string, string];
};

/**
 * Bouwt voor ieder informatiepunt een eigen begripsvraag uit de inhoud van dat
 * punt. De drie afleiders komen uit andere punten van dezelfde schoolplaat.
 * Daardoor zijn er 8 x 10 unieke, inhoudelijk gekoppelde vragen.
 */
export function getHotspotQuiz(schoolPlateId: number, hotspot: number): Question[] {
  const point = Math.min(10, Math.max(1, hotspot));
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
      : `Niet helemaal. Deze uitleg gaat over een ander informatiepunt. Bij ${current.title.toLowerCase()} hoort: ${current.paragraphs[0]}`,
  ) as [string, string, string, string];

  return [{
    q: `Welke uitleg hoort bij informatiepunt ${point}: “${current.title}”?`,
    options: options as [string, string, string, string],
    correct,
    hint: `Kijk nog eens naar het beeld en denk aan: ${current.emoji} ${current.title}.`,
    explanation: `${current.paragraphs[0]} ${current.paragraphs[2]}`,
    feedback,
  }];
}
