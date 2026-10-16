export type QuizProgress = Record<number, string[]>;

const STORAGE_KEY = "veluws-verleden-quiz-progress-v1";

export function loadQuizProgress(): QuizProgress {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};

    const parsed = JSON.parse(stored) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).map(([plateId, answered]) => [
        Number(plateId),
        Array.isArray(answered)
          ? answered.filter((key): key is string => typeof key === "string")
          : [],
      ]),
    );
  } catch {
    return {};
  }
}

export function saveQuizProgress(progress: QuizProgress) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // De website blijft bruikbaar wanneer opslag in de browser is geblokkeerd.
  }
}

export function questionProgressKey(hotspot: number, questionIndex: number) {
  return `${hotspot}:${questionIndex}`;
}

export function addAnsweredQuestion(
  progress: QuizProgress,
  schoolPlateId: number,
  hotspot: number,
  questionIndex: number,
): QuizProgress {
  const key = questionProgressKey(hotspot, questionIndex);
  const answered = progress[schoolPlateId] ?? [];

  if (answered.includes(key)) return progress;

  return {
    ...progress,
    [schoolPlateId]: [...answered, key],
  };
}

export function getAnsweredCount(progress: QuizProgress, schoolPlateId: number) {
  return progress[schoolPlateId]?.length ?? 0;
}

export function isQuestionAnswered(
  progress: QuizProgress,
  schoolPlateId: number,
  hotspot: number,
  questionIndex = 0,
) {
  return (progress[schoolPlateId] ?? []).includes(
    questionProgressKey(hotspot, questionIndex),
  );
}
