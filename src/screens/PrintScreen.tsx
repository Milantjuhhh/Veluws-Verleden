import { useEffect, useRef } from "react";
import SiteHeader from "../components/SiteHeader";
import StoryPanel from "../components/StoryPanel";
import type { SchoolPlate } from "../data/schoolPlates";

type Props = {
  schoolPlate: SchoolPlate;
  onBack: () => void;
  onHotspot: (n: number) => void;
  panelOpen: boolean;
  activeHotspot: number;
  onClosePanel: () => void;
  onStartQuiz: () => void;
};

type Hotspot = { n: number; x: number; y: number };

const DEFAULT_HOTSPOTS: Hotspot[] = [
  { n: 1,  x: 10, y: 20 },
  { n: 2,  x: 22, y: 58 },
  { n: 3,  x: 36, y: 16 },
  { n: 4,  x: 46, y: 42 },
  { n: 5,  x: 57, y: 68 },
  { n: 6,  x: 65, y: 25 },
  { n: 7,  x: 73, y: 52 },
  { n: 8,  x: 82, y: 17 },
  { n: 9,  x: 87, y: 74 },
  { n: 10, x: 30, y: 80 },
];

// Logische posities op de schoolplaat van het Romeinse marskamp.
// De nummers volgen de tien verhaallijnen uit de opdrachtomschrijving.
const ROMAN_HOTSPOTS: Hotspot[] = [
  { n: 1,  x: 58, y: 35 }, // Romeinse legerkampen op de Veluwe
  { n: 2,  x: 62, y: 71 }, // Verdediging: wal en gracht
  { n: 3,  x: 45, y: 53 }, // Inrichting van het legerkamp
  { n: 4,  x: 82, y: 31 }, // Kleding en uitrusting
  { n: 5,  x: 55, y: 46 }, // Samenstelling van het leger
  { n: 6,  x: 38, y: 45 }, // Lokale bevolking
  { n: 7,  x: 36, y: 71 }, // Meloenkraal en vondsten
  { n: 8,  x: 49, y: 40 }, // Contact tussen Romeinen en bewoners
  { n: 9,  x: 26, y: 78 }, // Het molenspel
  { n: 10, x: 68, y: 20 }, // Landschap en dieren
];

export default function PrintScreen({ schoolPlate, onBack, onHotspot, panelOpen, activeHotspot, onClosePanel, onStartQuiz }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const isRomanPlate = schoolPlate.id === 3;
  const hotspots = isRomanPlate ? ROMAN_HOTSPOTS : DEFAULT_HOTSPOTS;
  const activePoint = hotspots.find(({ n }) => n === activeHotspot) ?? hotspots[0];

  useEffect(() => {
    if (!panelOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClosePanel();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [panelOpen, onClosePanel]);

  return (
    <div
      className="h-full overflow-hidden flex flex-col"
      style={{ background: isRomanPlate ? "#524848" : "var(--sand-light)" }}
    >
      <SiteHeader showBack onBack={onBack} />

      <main className={`flex min-h-0 w-full flex-1 items-center justify-center ${isRomanPlate ? "p-0" : "p-2"}`}>
        {/* ── Image + panel ───────────────────────── */}
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          {/* Schoolplaat */}
          <div
            className={`relative overflow-hidden ${isRomanPlate ? "rounded-none" : "rounded-[2rem]"}`}
            style={{
              width: isRomanPlate
                ? "min(2048px, 100vw, calc(141.44dvh - 113px))"
                : "min(1760px, calc(100vw - 16px), calc(200dvh - 192px))",
              aspectRatio: isRomanPlate ? "2048 / 1448" : "2 / 1",
              maxHeight: isRomanPlate ? "calc(100dvh - 80px)" : undefined,
              border: isRomanPlate ? "none" : "4px solid var(--forest)",
              boxShadow: isRomanPlate ? "none" : "0 8px 0 rgba(30,92,58,0.25), var(--shadow-pop)",
              background: isRomanPlate ? "#524848" : "var(--grey-light)",
            }}
          >
            <img
              src={schoolPlate.image}
              alt={`${schoolPlate.title} — historische schoolplaat`}
              className={`block h-full w-full object-center ${isRomanPlate ? "object-contain" : "object-cover"}`}
            />
            {/* Vintage tint */}
            {!isRomanPlate && (
              <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(185,140,60,0.08)", mixBlendMode: "multiply" }} />
            )}

            {hotspots.map(({ n, x, y }) => (
              <HotspotBtn
                key={n}
                n={n}
                x={x}
                y={y}
                selected={panelOpen && activeHotspot === n}
                compact={isRomanPlate}
                onClick={() => onHotspot(n)}
              />
            ))}

            {/* Corner label */}
          </div>

        </div>
      </main>

      {/* ── Centred story dialog ─────────────────────── */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          style={{ background: "rgba(15,58,33,0.72)", backdropFilter: "blur(7px)" }}
          onMouseDown={onClosePanel}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-dialog-title"
            tabIndex={-1}
            className="w-full max-w-[1000px] max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[2rem] focus:outline-none"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <StoryPanel
              schoolPlate={schoolPlate}
              hotspot={activeHotspot}
              total={10}
              focusX={activePoint.x}
              focusY={activePoint.y}
              onClose={onClosePanel}
              onStartQuiz={onStartQuiz}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function HotspotBtn({ n, x, y, selected, compact, onClick }: { n: number; x: number; y: number; selected: boolean; compact: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={["absolute flex items-center justify-center font-black text-base focus:outline-none transition-all duration-200", !selected ? "hotspot-pulse hover:scale-110 active:scale-95" : ""].join(" ")}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) ${selected ? "scale(1.22)" : ""}`,
        width: compact ? "clamp(36px, 3.4vw, 50px)" : "clamp(52px, 5vw, 68px)",
        height: compact ? "clamp(36px, 3.4vw, 50px)" : "clamp(52px, 5vw, 68px)",
        borderRadius: "50%",
        background: selected ? "var(--orange)" : "var(--sky)",
        color: "white",
        border: `4px solid white`,
        boxShadow: selected
          ? "0 4px 0 var(--orange-dark), 0 8px 20px rgba(232,112,42,0.55)"
          : "0 3px 0 var(--sky-dark), 0 6px 16px rgba(0,0,0,0.30)",
        zIndex: 10,
        fontFamily: "Nunito, sans-serif",
        fontSize: compact ? "clamp(14px, 1.3vw, 19px)" : "clamp(17px, 1.8vw, 23px)",
      }}
      aria-label={`Informatiepunt ${n}`}
      aria-pressed={selected}
    >
      {n}
    </button>
  );
}
