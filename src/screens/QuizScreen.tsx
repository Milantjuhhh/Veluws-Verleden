import { useEffect, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import type { SchoolPlate } from "../data/schoolPlates";
import { getHotspotQuiz } from "../data/quizzes";

type Props = {
  schoolPlate: SchoolPlate;
  hotspot: number;
  onBack: () => void;
};

type State = "question" | "correct" | "wrong" | "done";

const CORRECT_MSGS = ["🎉 Geweldig goed!", "⭐ Helemaal juist!", "🏆 Uitstekend!", "🎯 Raak!"];
const WRONG_MSGS   = ["😅 Bijna! Probeer het volgende.", "💪 Niet erg, je leert ervan!", "🤔 Goed gedacht, maar..."];

export default function QuizScreen({ schoolPlate, hotspot, onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<State>("question");
  const [score, setScore] = useState(0);
  const [msgIdx] = useState(() => Math.floor(Math.random() * CORRECT_MSGS.length));
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hintVisible, setHintVisible] = useState(false);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);

  const questions = getHotspotQuiz(schoolPlate.id, hotspot);
  const q = questions[idx];
  const isLast = idx === questions.length - 1;
  const pct = Math.round(((idx + 1) / questions.length) * 100);

  useEffect(() => {
    const correctAudio = new Audio(`${import.meta.env.BASE_URL}audio/correct.mp3`);
    const wrongAudio = new Audio(`${import.meta.env.BASE_URL}audio/wrong.mp3`);
    correctAudio.preload = "auto";
    wrongAudio.preload = "auto";
    correctAudio.volume = 0.7;
    wrongAudio.volume = 0.7;
    correctAudioRef.current = correctAudio;
    wrongAudioRef.current = wrongAudio;

    return () => {
      correctAudio.pause();
      wrongAudio.pause();
      correctAudioRef.current = null;
      wrongAudioRef.current = null;
    };
  }, []);

  const choose = (i: number) => {
    if (quizState !== "question") return;
    setSelected(i);
    if (i === q.correct) {
      playFeedbackSound(correctAudioRef.current, soundEnabled);
      setQuizState("correct");
      setScore((s) => s + 1);
    } else {
      playFeedbackSound(wrongAudioRef.current, soundEnabled);
      setQuizState("wrong");
    }
  };

  const next = () => {
    if (isLast) {
      setQuizState("done");
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setQuizState("question");
    }
  };

  /* ── Done screen ─────────────────────────── */
  if (quizState === "done") {
    const perfect = score === questions.length;
    return (
      <div className="h-full overflow-hidden flex flex-col" style={{ background: "var(--sand-light)" }}>
        <SiteHeader showBack onBack={onBack} />
        <div className="flex-1 min-h-0 flex items-center justify-center px-4 py-4">
          <div className="card w-full max-w-xl text-center overflow-hidden anim-bounce-in">
            {/* Header */}
            <div
              className="py-7 md:py-9 px-8 relative overflow-hidden"
              style={{ background: perfect ? "var(--forest)" : "var(--sky-dark)" }}
            >
              <div className="text-5xl md:text-6xl mb-2 anim-float" style={{ display: "inline-block" }}>
                {perfect ? "🏆" : "🌟"}
              </div>
              <h2
                className="text-3xl md:text-4xl mb-2"
                style={{ color: "var(--sand-light)", fontFamily: "Fredoka One, cursive" }}
              >
                {perfect ? "Perfect gedaan!" : "Quiz klaar!"}
              </h2>
              <p className="text-lg font-semibold" style={{ color: "rgba(255,251,242,0.80)" }}>
                Schoolplaat {schoolPlate.id} — {schoolPlate.title}
              </p>
              {/* Decorative stars */}
              <div className="absolute top-3 right-4 text-2xl opacity-60 anim-wiggle">⭐</div>
              <div className="absolute top-8 left-5 text-lg opacity-40 anim-wiggle" style={{ animationDelay: "0.2s" }}>✨</div>
              <div className="absolute bottom-4 right-8 text-xl opacity-50 anim-wiggle" style={{ animationDelay: "0.4s" }}>🌟</div>
            </div>

            {/* Score */}
            <div className="px-7 py-5 flex flex-col gap-3">
              <div
                className="rounded-2xl py-5 flex flex-col items-center gap-1"
                style={{ background: "var(--sand)", border: "2px solid var(--sand-dark)" }}
              >
                <span
                  className="text-4xl md:text-5xl font-black"
                  style={{ color: "var(--forest)", fontFamily: "Fredoka One, cursive" }}
                >
                  {score}/{questions.length}
                </span>
                <span className="text-lg font-bold" style={{ color: "var(--charcoal-mid)" }}>antwoorden goed</span>

                {/* Stars row */}
                <div className="flex gap-1 mt-1">
                  {questions.map((_, i) => (
                    <span key={i} className="text-xl" style={{ opacity: i < score ? 1 : 0.25 }}>⭐</span>
                  ))}
                </div>
              </div>

              {perfect && (
                <div
                  className="rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ background: "var(--yellow-light)", border: "2px solid var(--yellow)" }}
                >
                  <span className="text-2xl">🎖️</span>
                  <p className="text-base font-black" style={{ color: "var(--charcoal)" }}>
                    Jij bent een echte expert in {schoolPlate.title.toLowerCase()}!
                  </p>
                </div>
              )}

              <button
                onClick={onBack}
                className="btn btn-primary w-full py-5 text-lg"
              >
                🗺️ Terug naar de schoolplaat
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Quiz screen ─────────────────────────── */
  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--sand-light)" }}>
      <SiteHeader showBack onBack={onBack} />

      <main className="flex-1 min-h-0 overflow-hidden flex flex-col items-center px-4 md:px-6 py-3 md:py-4 max-w-[960px] mx-auto w-full gap-2.5 md:gap-3">

        {/* Progress bar */}
        <div className="w-full flex flex-col gap-1.5 anim-slide-up flex-shrink-0">
          <div className="flex items-center justify-between">
            <span
              className="flex items-center gap-2 text-base font-black uppercase tracking-wide"
              style={{ color: "var(--charcoal-mid)" }}
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base font-black"
                style={{ background: "var(--sky)" }}
              >
                {idx + 1}
              </span>
              Vraag {idx + 1} van {questions.length}
            </span>
            <span
              className="text-base font-black px-4 py-2 rounded-full"
              style={{ background: "var(--yellow)", color: "var(--charcoal)", boxShadow: "0 2px 0 #C9A030" }}
            >
              ⭐ Score: {score}
            </span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--grey-light)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, var(--sky) 0%, var(--forest-light) 100%)",
              }}
            />
          </div>
        </div>

        {/* Topic */}
        <div className="w-full flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">{schoolPlate.emoji}</span>
          <span className="text-base font-black uppercase tracking-widest" style={{ color: "var(--sky-dark)" }}>
            {schoolPlate.title} — Informatiepunt {hotspot}
          </span>
          <button
            type="button"
            onClick={() => setSoundEnabled((enabled) => {
              if (enabled) {
                correctAudioRef.current?.pause();
                wrongAudioRef.current?.pause();
              }
              return !enabled;
            })}
            className="ml-auto flex h-10 items-center gap-2 rounded-full px-3 text-sm font-black transition-transform active:scale-95"
            style={{ background: "var(--grey-light)", color: "var(--charcoal-mid)", border: "2px solid white" }}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Quizgeluid uitschakelen" : "Quizgeluid inschakelen"}
          >
            <span aria-hidden="true">{soundEnabled ? "🔊" : "🔇"}</span>
            <span className="hidden sm:inline">Geluid {soundEnabled ? "aan" : "uit"}</span>
          </button>
        </div>

        {/* Question card */}
        <div
          className="card w-full p-4 md:p-5 anim-slide-up flex-shrink-0"
          style={{ border: "2px solid var(--grey-light)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base mb-2"
            style={{ background: "var(--forest)", color: "white", fontFamily: "Nunito" }}
          >
            ?
          </div>
          <h2
            className="text-xl md:text-2xl font-black leading-snug"
            style={{ color: "var(--charcoal)", fontFamily: "Nunito, sans-serif" }}
          >
            {q.q}
          </h2>
          <button
            type="button"
            onClick={() => setHintVisible((visible) => !visible)}
            className="mt-3 rounded-full px-4 py-2 text-sm font-black transition-transform active:scale-95"
            style={{ background: "var(--yellow-light)", color: "var(--charcoal)", border: "2px solid var(--yellow)" }}
            aria-expanded={hintVisible}
          >
            {hintVisible ? "Verberg hint" : "💡 Geef een hint"}
          </button>
          {hintVisible && (
            <p className="mt-3 rounded-2xl px-4 py-3 text-sm font-bold md:text-base" style={{ background: "var(--grey-light)", color: "var(--charcoal-mid)" }}>
              {q.hint}
            </p>
          )}
        </div>

        {/* Answer options */}
        <div className="w-full grid grid-cols-2 gap-2.5 md:gap-3 flex-shrink-0">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isPicked  = i === selected;
            const revealed  = quizState !== "question";

            let bg = "white";
            let border = "var(--grey-light)";
            let color = "var(--charcoal)";
            let shadow = "var(--shadow-soft)";

            if (revealed) {
              if (isCorrect) {
                bg = "#D4EDDA"; border = "#28A745"; color = "#145A1F";
                shadow = "0 4px 0 #1A7A32";
              } else if (isPicked) {
                bg = "#F8D7DA"; border = "#DC3545"; color = "#6B0B15";
                shadow = "0 4px 0 #A82030";
              }
            } else if (isPicked) {
              bg = "var(--sky-light)"; border = "var(--sky)"; shadow = "0 4px 0 var(--sky-dark)";
            }

            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={revealed}
                className="w-full px-3 md:px-5 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base text-left transition-all duration-150 disabled:cursor-default flex items-center gap-3"
                style={{
                  background: bg,
                  border: `2.5px solid ${border}`,
                  color,
                  boxShadow: shadow,
                  transform: revealed ? "none" : undefined,
                }}
                onMouseOver={(e) => { if (!revealed) e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={(e) => { if (!revealed) e.currentTarget.style.transform = "none"; }}
              >
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base flex-shrink-0"
                  style={{
                    background: revealed && isCorrect ? "#28A745" : revealed && isPicked ? "#DC3545" : "var(--forest)",
                    color: "white",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {revealed && isCorrect && (
                  <span className="text-xl anim-star-pop">✅</span>
                )}
                {revealed && isPicked && !isCorrect && (
                  <span className="text-xl">❌</span>
                )}
              </button>
            );
          })}
        </div>

      </main>

      {quizState !== "question" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,58,33,0.72)", backdropFilter: "blur(7px)" }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-feedback-title"
            className="anim-bounce-in w-full max-w-lg overflow-hidden rounded-[2rem] text-center"
            style={{
              background: "var(--sand-light)",
              border: `5px solid ${quizState === "correct" ? "#28A745" : "var(--orange)"}`,
              boxShadow: "0 24px 70px rgba(0,0,0,0.38)",
            }}
          >
            <div
              className="px-6 py-7 md:px-9 md:py-9"
              style={{ background: quizState === "correct" ? "#DDF4E2" : "#FFF0E6" }}
            >
              <div className="mb-2 text-6xl md:text-7xl anim-star-pop" aria-hidden="true">
                {quizState === "correct" ? "🎉" : "💡"}
              </div>
              <h2
                id="quiz-feedback-title"
                className="text-3xl md:text-4xl"
                style={{ color: quizState === "correct" ? "#145A1F" : "var(--orange-dark)" }}
              >
                {quizState === "correct"
                  ? CORRECT_MSGS[(msgIdx + idx) % CORRECT_MSGS.length]
                  : WRONG_MSGS[(msgIdx + idx) % WRONG_MSGS.length]}
              </h2>
            </div>

            <div className="flex flex-col gap-5 px-6 py-6 md:px-9">
              {quizState === "wrong" && (
                <p className="rounded-2xl px-4 py-3 text-base font-black md:text-lg" style={{ background: "var(--yellow-light)", color: "var(--charcoal)" }}>
                  Het goede antwoord is: {q.options[q.correct]}
                </p>
              )}
              <p className="text-base font-semibold leading-relaxed md:text-lg" style={{ color: "var(--charcoal-mid)" }}>
                {selected === null ? q.explanation : q.feedback[selected]}
              </p>
              <button
                autoFocus
                onClick={next}
                className="btn btn-forest w-full py-4 text-lg"
              >
                {isLast ? "🏆 Bekijk je resultaat" : "➡️ Volgende vraag"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function playFeedbackSound(audio: HTMLAudioElement | null, enabled: boolean) {
  if (!enabled || !audio) return;
  audio.currentTime = 0;
  void audio.play().catch(() => {
    // Some browsers may block sound until the first direct interaction.
  });
}
