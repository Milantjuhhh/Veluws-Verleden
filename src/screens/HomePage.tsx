import { SCHOOL_PLATES, type SchoolPlate } from "../data/schoolPlates";
import { getAnsweredCount, type QuizProgress } from "../data/progress";

type Props = {
  onSelectPrint: (schoolPlate: SchoolPlate) => void;
  quizProgress: QuizProgress;
  onResetQuestions: () => void;
};


export default function HomePage({ onSelectPrint, quizProgress, onResetQuestions }: Props) {
  return (
    <div className="flex h-full flex-col overflow-y-auto md:overflow-hidden" style={{ background: "linear-gradient(180deg, #fffdf8 0%, var(--sand-light) 100%)" }}>

      {/* ── Grid section ────────────────────────────────── */}
      <main className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-3 py-3 md:px-5 md:py-4">
        <div className="mb-3 flex-shrink-0 text-center">
          <h2
            className="mb-1 text-3xl md:text-4xl"
            style={{ color: "var(--forest)", fontFamily: "Fredoka One, cursive" }}
          >
            🗓️ Kies een schoolplaat
          </h2>
          <p className="text-base md:text-lg font-semibold" style={{ color: "var(--charcoal-mid)" }}>
            Veluws Verleden, klik op een schoolplaat om te bekijken en te ontdekken.
          </p>
          <button
            type="button"
            className="btn btn-secondary mt-2 px-5 py-2 text-sm"
            onClick={onResetQuestions}
          >
            Reset vragen
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {SCHOOL_PLATES.map((p) => (
            <PrintCard
              key={p.id}
              print={p}
              answered={getAnsweredCount(quizProgress, p.id)}
              onOpen={() => onSelectPrint(p)}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

type CardProps = {
  print: SchoolPlate;
  answered: number;
  onOpen: () => void;
};

function PrintCard({ print, answered, onOpen }: CardProps) {
  const { id, title, emoji, image, thumbnail } = print;
  const total = 10;
  const progressPercentage = Math.min(100, Math.round((answered / total) * 100));

  return (
    <article
      onClick={onOpen}
      className="group flex min-h-0 flex-col overflow-hidden rounded-[1.6rem] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(30,92,58,0.18)]"
      style={{
        cursor: "pointer",
        border: "2px solid var(--sky-light)",
        boxShadow: "0 5px 16px rgba(30,92,58,0.10)",
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
    >
      {/* Image */}
      <div
        className="relative h-[clamp(96px,13vh,140px)] flex-shrink-0 overflow-hidden"
        style={{ background: "var(--grey-light)" }}
      >
        <img
          src={thumbnail ?? image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-400 group-hover:scale-105"
          style={{ filter: "none" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,62,39,0.70) 0%, rgba(20,62,39,0.08) 58%, transparent 100%)" }} />

        <span
          className="absolute bottom-2 left-2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white md:text-sm"
          style={{ background: "rgba(30,92,58,0.90)", backdropFilter: "blur(4px)" }}
        >
          Schoolplaat {String(id).padStart(2, "0")}
        </span>

        {/* Emoji in corner */}
        <div
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-xl md:h-10 md:w-10 md:text-2xl"
          style={{ background: "rgba(255,255,255,0.94)", boxShadow: "0 3px 10px rgba(0,0,0,0.18)" }}
        >
          {emoji}
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col gap-1 px-3 pb-3 pt-2.5 md:px-4 md:pb-3.5 md:pt-3">
        <h3
          className="text-base font-black leading-snug md:text-lg"
          style={{
            color: "var(--charcoal)",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          {title}
        </h3>
        <div className="mt-1 flex flex-col gap-1" aria-label={`${answered} van ${total} vragen ingevuld`}>
          <div className="flex items-center justify-between text-xs font-black md:text-sm">
            <span style={{ color: "var(--charcoal-mid)" }}>Quizvoortgang</span>
            <span style={{ color: answered === total ? "var(--forest)" : "var(--sky-dark)" }}>
              {answered}/{total}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--grey-light)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                background: answered === total
                  ? "var(--forest-light)"
                  : "linear-gradient(90deg, var(--sky), var(--forest-light))",
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-primary mt-auto w-full py-2.5 text-sm md:text-base"
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
        >
          Open schoolplaat <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
