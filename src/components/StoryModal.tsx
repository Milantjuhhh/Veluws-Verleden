import { useEffect } from "react";

type Props = {
  hotspot: number;
  onClose: () => void;
};

const STORY_IMG =
  "https://images.unsplash.com/photo-1779820860270-381208ef9d75?w=700&h=380&fit=crop&auto=format";

const HOTSPOT_TITLES: Record<number, string> = {
  1: "Kleding en uitrusting",
  2: "Wapens en schild",
  3: "De Romeinse legerplaats",
  4: "Handel met lokale volkeren",
  5: "Voedsel en landbouw",
  6: "Godsdienst en rituelen",
  7: "De limes: grensverdediging",
  8: "Communicatie en wegen",
  9: "Soldatenleven in de kazerne",
  10: "Lokale bevolking: de Bataven",
};

const HOTSPOT_TEXTS: Record<number, string> = {
  1: "Ontdek welke kleding en uitrusting een Romeinse soldaat droeg en waarom deze belangrijk waren.",
  2: "Leer alles over de wapens die Romeinse soldaten gebruikten in gevechten en op wacht.",
  3: "Bekijk hoe een Romeinse legerplaats eruitzag en hoe soldaten er dag en nacht verbleven.",
  4: "Ontdek hoe de Romeinen handelden met de lokale bevolking op de Veluwe.",
  5: "Wat aten Romeinse soldaten en hoe verbouwden ze hun voedsel in bezet gebied?",
  6: "Welke goden vereerden de Romeinen en hoe maakten ze offers en rituelen?",
  7: "Hoe beschermden de Romeinen hun grens langs de Rijn en wat was de limes?",
  8: "Op welke manieren communiceerden de Romeinen en welke wegen bouwden zij?",
  9: "Hoe zag het dagelijkse leven van een Romeinse soldaat in de kazerne eruit?",
  10: "Wie waren de Bataven en hoe leefden zij samen met de Romeinse bezetters?",
};

export default function StoryModal({ hotspot, onClose }: Props) {
  const title = HOTSPOT_TITLES[hotspot] ?? `Informatiepunt ${hotspot}`;
  const text = HOTSPOT_TEXTS[hotspot] ?? "";

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(30,74,45,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-enter w-full max-w-lg rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: "var(--color-cream)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          maxHeight: "90vh",
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "var(--color-forest)" }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-0.5"
              style={{ color: "var(--color-ochre-light)" }}
            >
              Informatiepunt {hotspot}
            </p>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-cream)", fontFamily: "Lora, serif" }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-150 hover:opacity-75 active:scale-90 flex-shrink-0 ml-4"
            style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
            aria-label="Sluiten"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div
          className="w-full overflow-hidden"
          style={{ background: "var(--color-cream-dark)", height: "200px" }}
        >
          <img
            src={STORY_IMG}
            alt={`Afbeelding bij ${title}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto scrollbar-hide px-6 py-5 flex flex-col gap-4">
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-charcoal)" }}
          >
            {text}
          </p>

          {/* Primary CTA */}
          <button
            className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-150 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ background: "var(--color-turquoise)", color: "white", boxShadow: "0 4px 14px rgba(42,157,143,0.35)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start interactieve quiz
          </button>

          {/* Secondary close */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-150 hover:opacity-80 active:scale-[0.98]"
            style={{
              background: "transparent",
              color: "var(--color-charcoal-mid)",
              border: "1.5px solid var(--color-cream-dark)",
            }}
          >
            Terug naar de schoolplaat
          </button>
        </div>

        {/* Footer: progress */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--color-cream-dark)" }}
        >
          <ProgressIndicator current={hotspot} total={10} />
        </div>
      </div>
    </div>
  );
}

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: "var(--color-charcoal-mid)" }}>
          Voortgang
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: "var(--color-ochre)", color: "var(--color-charcoal)" }}
        >
          {current} van {total}
        </span>
      </div>
      <div
        className="h-2.5 rounded-full overflow-hidden w-full"
        style={{ background: "var(--color-cream-dark)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(current / total) * 100}%`,
            background: "var(--color-turquoise)",
          }}
        />
      </div>
    </div>
  );
}
