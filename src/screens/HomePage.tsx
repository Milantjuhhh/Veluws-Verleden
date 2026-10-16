import SiteHeader from "../components/SiteHeader";
import { SCHOOL_PLATES, type SchoolPlate } from "../data/schoolPlates";
import { getAnsweredCount, type QuizProgress } from "../data/progress";

type Props = {
  onSelectPrint: (schoolPlate: SchoolPlate) => void;
  quizProgress: QuizProgress;
};

export default function HomePage({ onSelectPrint, quizProgress }: Props) {
  return (
    <div className="page-canvas flex h-full flex-col overflow-y-auto">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 py-8 md:px-8 md:py-10">
        <section className="mb-8 grid items-center gap-6 overflow-hidden rounded-[22px] bg-white/80 px-6 py-7 shadow-[0_14px_36px_rgba(23,63,56,0.08)] ring-1 ring-[#e5e9e7] md:grid-cols-[1.4fr_0.8fr] md:px-10 md:py-9">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--sky-dark)" }}>
              Historische schoolplaten
            </p>
            <h1 className="mb-3 text-4xl leading-[1.15] md:text-5xl" style={{ color: "var(--forest)" }}>
              Ontdek het Veluws Verleden
            </h1>
            <p className="max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "var(--charcoal-mid)" }}>
              Bekijk historische schoolplaten en ontdek de verhalen achter bijzondere gebeurtenissen, voorwerpen en personen.
            </p>
          </div>
          <LandscapeMark />
        </section>

        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="text-2xl md:text-3xl" style={{ color: "var(--forest)" }}>
            Kies een schoolplaat
          </h2>
          <p className="text-sm font-semibold" style={{ color: "var(--muted)" }}>
            {SCHOOL_PLATES.length} platen
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SCHOOL_PLATES.map((plate) => (
            <PrintCard
              key={plate.id}
              print={plate}
              answered={getAnsweredCount(quizProgress, plate.id)}
              featured={plate.id === 3}
              onOpen={() => onSelectPrint(plate)}
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
  featured: boolean;
  onOpen: () => void;
};

function PrintCard({ print, answered, featured, onOpen }: CardProps) {
  const { id, title, desc, image, thumbnail } = print;
  const total = 10;
  const progressPercentage = Math.min(100, Math.round((answered / total) * 100));
  const status = answered === total ? "Afgerond" : answered > 0 ? "Bezig" : featured ? "Beschikbaar" : "Te ontdekken";

  return (
    <article
      onClick={onOpen}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[22px] bg-white text-left shadow-[0_12px_30px_rgba(23,63,56,0.08)] ring-1 ring-[#e5e9e7] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,63,56,0.14)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
      style={{ outlineColor: "var(--sky)", boxShadow: featured ? "0 0 0 2px var(--sky), 0 16px 36px rgba(23,63,56,0.10)" : undefined }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
    >
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "var(--grey-light)" }}>
        <img
          src={thumbnail ?? image}
          alt=""
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#173F38]/55 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-[#173F38]/88 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          Schoolplaat {String(id).padStart(2, "0")}
        </span>
        <span
          className="absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-bold"
          style={{
            background: answered === total ? "var(--forest-light)" : "var(--sand-light)",
            color: answered === total ? "white" : "var(--forest)",
          }}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-xl leading-snug" style={{ color: "var(--forest)" }}>
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--charcoal-mid)" }}>
            {desc}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div aria-label={`${answered} van ${total} vragen ingevuld`}>
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
              <span style={{ color: "var(--muted)" }}>Quizvoortgang</span>
              <span style={{ color: "var(--forest)" }}>{answered}/{total}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--grey-light)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercentage}%`,
                  background: answered === total ? "var(--forest-mid)" : "var(--sky)",
                }}
              />
            </div>
          </div>
          <button
            className="btn btn-primary w-full py-3 text-sm"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
          >
            Open schoolplaat
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function LandscapeMark() {
  return (
    <svg viewBox="0 0 320 180" className="mx-auto h-36 w-full max-w-sm md:h-44" aria-hidden="true">
      <rect width="320" height="180" rx="18" fill="#E7F3F1" />
      <circle cx="248" cy="42" r="16" fill="#E8C56B" />
      <path d="M0 98c36 10 62-8 98-6 34 2 48 22 86 18 40-4 58-24 136-8v78H0V98z" fill="#C9A27A" />
      <path d="M0 118c42-20 74-8 112-22 36-14 58 4 96-2 34-6 58 2 112-16v102H0V118z" fill="#286B5F" />
      <path d="M0 146c50-14 84 2 126-10 36-10 62 8 104 0 24-4 52-2 90-12v56H0v-34z" fill="#173F38" />
      <path d="M38 132 54 78l16 54H38z" fill="#145248" />
      <path d="M52 134 72 62l20 72H52z" fill="#0F3F38" />
      <path d="M78 136 96 88l18 48H78z" fill="#1E5C4E" />
      <rect x="68" y="132" width="5" height="18" rx="1" fill="#6B4A2B" />
      <rect x="92" y="134" width="4" height="16" rx="1" fill="#6B4A2B" />
      <path d="M196 124h34l-4 8H200l-4-8z" fill="#8C5A32" />
      <path d="M200 132h26v16h-26z" fill="#F6F1E7" />
      <path d="M196 132h34l-17-14-17 14z" fill="#A66B18" />
      <rect x="210" y="138" width="6" height="10" fill="#173F38" />
    </svg>
  );
}
