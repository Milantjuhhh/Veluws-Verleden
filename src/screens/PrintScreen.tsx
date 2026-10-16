import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import SiteHeader from "../components/SiteHeader";
import StoryPanel from "../components/StoryPanel";
import type { SchoolPlate } from "../data/schoolPlates";
import {
  getAnsweredCount,
  isQuestionAnswered,
  type QuizProgress,
} from "../data/progress";

type Props = {
  schoolPlate: SchoolPlate;
  onBack: () => void;
  onHotspot: (n: number) => void;
  panelOpen: boolean;
  activeHotspot: number;
  onClosePanel: () => void;
  onStartQuiz: () => void;
  quizProgress: QuizProgress;
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

export default function PrintScreen({ schoolPlate, onBack, onHotspot, panelOpen, activeHotspot, onClosePanel, onStartQuiz, quizProgress }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    pointerId: number;
    pointerX: number;
    pointerY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isRomanPlate = schoolPlate.id === 3;
  const hotspots = isRomanPlate ? ROMAN_HOTSPOTS : DEFAULT_HOTSPOTS;
  const activePoint = hotspots.find(({ n }) => n === activeHotspot) ?? hotspots[0];
  const answeredCount = getAnsweredCount(quizProgress, schoolPlate.id);

  useEffect(() => {
    setMapZoom(1);
    setMapOffset({ x: 0, y: 0 });
  }, [schoolPlate.id]);

  useEffect(() => {
    setMapOffset((current) => clampMapOffset(
      current.x,
      current.y,
      mapZoom,
      mapViewportRef.current,
    ));
  }, [mapZoom]);

  const startDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (mapZoom <= 1 || (event.target as HTMLElement).closest("button")) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: mapOffset.x,
      offsetY: mapOffset.y,
    };
    setIsDragging(true);
    event.preventDefault();
  };

  const dragMap = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    setMapOffset(clampMapOffset(
      start.offsetX + event.clientX - start.pointerX,
      start.offsetY + event.clientY - start.pointerY,
      mapZoom,
      mapViewportRef.current,
    ));
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current?.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragStartRef.current = null;
    setIsDragging(false);
  };

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
      {!isRomanPlate && <SiteHeader showBack onBack={onBack} />}

      {isRomanPlate && (
        <button
          type="button"
          onClick={onBack}
          className="btn btn-secondary fixed right-3 top-3 z-40 flex items-center gap-2 px-4 py-3 text-sm sm:right-5 sm:top-5 sm:px-6 sm:text-base"
          style={{ borderRadius: "var(--radius-full)", fontFamily: "Nunito, sans-serif" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Terug naar overzicht
        </button>
      )}

      <main className={`flex min-h-0 w-full flex-1 items-center justify-center ${isRomanPlate ? "p-0" : "p-2"}`}>
        {/* ── Image + panel ───────────────────────── */}
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          {/* Schoolplaat */}
          <div
            ref={mapViewportRef}
            className={`relative overflow-hidden ${isRomanPlate ? "rounded-none" : "rounded-[2rem]"}`}
            onPointerDown={startDragging}
            onPointerMove={dragMap}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            style={{
              width: isRomanPlate
                ? "min(2048px, 100vw, 141.44dvh)"
                : "min(1760px, calc(100vw - 16px), calc(200dvh - 192px))",
              aspectRatio: isRomanPlate ? "2048 / 1448" : "2 / 1",
              maxHeight: isRomanPlate ? "100dvh" : undefined,
              border: isRomanPlate ? "none" : "4px solid var(--forest)",
              boxShadow: isRomanPlate ? "none" : "0 8px 0 rgba(30,92,58,0.25), var(--shadow-pop)",
              background: isRomanPlate ? "#524848" : "var(--grey-light)",
              cursor: mapZoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              touchAction: mapZoom > 1 ? "none" : "auto",
            }}
          >
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${mapOffset.x}px, ${mapOffset.y}px, 0) scale(${mapZoom})`,
                transformOrigin: "center",
                transitionDuration: isDragging ? "0ms" : undefined,
              }}
            >
              <img
                src={schoolPlate.image}
                alt={`${schoolPlate.title} — historische schoolplaat`}
                className={`block h-full w-full object-center ${isRomanPlate ? "object-contain" : "object-cover"}`}
                draggable={false}
                style={{ pointerEvents: "none", userSelect: "none" }}
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
                  inverseZoom={1 / mapZoom}
                  onClick={() => onHotspot(n)}
                />
              ))}
            </div>

            <div
              className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full p-2"
              style={{ background: "rgba(255,255,255,0.94)", boxShadow: "0 5px 18px rgba(0,0,0,0.22)" }}
              aria-label="Zoomknoppen voor de schoolplaat"
            >
              <button
                type="button"
                onClick={() => setMapZoom((zoom) => Math.max(1, Number((zoom - 0.25).toFixed(2))))}
                disabled={mapZoom <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full text-2xl font-black disabled:cursor-not-allowed disabled:opacity-35"
                style={{ background: "var(--grey-light)", color: "var(--forest)" }}
                aria-label="Uitzoomen"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => {
                  setMapZoom(1);
                  setMapOffset({ x: 0, y: 0 });
                }}
                className="min-w-16 rounded-full px-3 py-2 text-sm font-black"
                style={{ color: "var(--forest)" }}
                aria-label="Zoom herstellen"
              >
                {Math.round(mapZoom * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setMapZoom((zoom) => Math.min(2.5, Number((zoom + 0.25).toFixed(2))))}
                disabled={mapZoom >= 2.5}
                className="flex h-10 w-10 items-center justify-center rounded-full text-2xl font-black disabled:cursor-not-allowed disabled:opacity-35"
                style={{ background: "var(--forest)", color: "white" }}
                aria-label="Inzoomen"
              >
                +
              </button>
            </div>

            {mapZoom > 1 && (
              <div
                className="pointer-events-none absolute left-3 top-3 z-30 rounded-full px-4 py-2 text-sm font-black text-white"
                style={{ background: "rgba(30,92,58,0.9)", boxShadow: "0 3px 12px rgba(0,0,0,0.22)" }}
              >
                ✋ Sleep om rond te kijken
              </div>
            )}

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
              answeredCount={answeredCount}
              currentQuestionAnswered={isQuestionAnswered(
                quizProgress,
                schoolPlate.id,
                activeHotspot,
              )}
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

function clampMapOffset(
  x: number,
  y: number,
  zoom: number,
  viewport: HTMLDivElement | null,
) {
  if (!viewport || zoom <= 1) return { x: 0, y: 0 };

  const maxX = (viewport.clientWidth * (zoom - 1)) / 2;
  const maxY = (viewport.clientHeight * (zoom - 1)) / 2;

  return {
    x: Math.min(maxX, Math.max(-maxX, x)),
    y: Math.min(maxY, Math.max(-maxY, y)),
  };
}

function HotspotBtn({
  n,
  x,
  y,
  selected,
  compact,
  inverseZoom,
  onClick,
}: {
  n: number;
  x: number;
  y: number;
  selected: boolean;
  compact: boolean;
  inverseZoom: number;
  onClick: () => void;
}) {
  return (
    <div
      className="absolute z-10 transition-transform duration-300 ease-out"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${inverseZoom})`,
      }}
    >
      <button
        onClick={onClick}
        className={["flex items-center justify-center font-black text-base focus:outline-none transition-all duration-200", !selected ? "hotspot-pulse hover:scale-110 active:scale-95" : ""].join(" ")}
        style={{
          transform: selected ? "scale(1.15)" : undefined,
          width: compact ? "clamp(36px, 3.4vw, 50px)" : "clamp(52px, 5vw, 68px)",
          height: compact ? "clamp(36px, 3.4vw, 50px)" : "clamp(52px, 5vw, 68px)",
          borderRadius: "50%",
          background: selected ? "var(--orange)" : "var(--sky)",
          color: "white",
          border: `4px solid white`,
          boxShadow: selected
            ? "0 4px 0 var(--orange-dark), 0 8px 20px rgba(232,112,42,0.55)"
            : "0 3px 0 var(--sky-dark), 0 6px 16px rgba(0,0,0,0.30)",
          fontFamily: "Nunito, sans-serif",
          fontSize: compact ? "clamp(14px, 1.3vw, 19px)" : "clamp(17px, 1.8vw, 23px)",
        }}
        aria-label={`Informatiepunt ${n}`}
        aria-pressed={selected}
      >
        {n}
      </button>
    </div>
  );
}
