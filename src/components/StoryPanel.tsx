import { useEffect, useRef } from "react";
import type { SchoolPlate } from "../data/schoolPlates";
import { getHotspotContent } from "../data/hotspotContent";

type Props = {
  schoolPlate: SchoolPlate;
  hotspot: number;
  total: number;
  answeredCount: number;
  currentQuestionAnswered: boolean;
  focusX: number;
  focusY: number;
  onClose: () => void;
  onStartQuiz: () => void;
};

export default function StoryPanel({
  schoolPlate,
  hotspot,
  total,
  answeredCount,
  currentQuestionAnswered,
  focusX,
  focusY,
  onClose,
  onStartQuiz,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const content = getHotspotContent(schoolPlate.id, hotspot);
  const pct = Math.min(100, Math.round((answeredCount / total) * 100));

  const zoom = 2.25;
  const minimumOffset = 100 - zoom * 100;
  const zoomLeft = Math.min(
    0,
    Math.max(minimumOffset, 50 - zoom * focusX),
  );
  const zoomTop = Math.min(
    0,
    Math.max(minimumOffset, 50 - zoom * focusY),
  );

  const videoEmbedUrl = getVideoEmbedUrl(content.videoUrl);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [hotspot, schoolPlate.id]);

  return (
    <div
      className="anim-bounce-in flex h-[min(800px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-[2rem]"
      style={{
        background: "var(--sand-light)",
        boxShadow: "var(--shadow-pop)",
        border: "1px solid rgba(23,63,56,0.12)",
      }}
    >
      {/* Bovenkant */}
      <div
        className="flex flex-shrink-0 items-start justify-between gap-3 px-4 py-3 md:px-7 md:py-4"
        style={{
          background: "var(--forest)",
          borderBottom: "3px solid var(--ochre)",
        }}
      >
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-2xl md:h-14 md:w-14 md:text-3xl"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            {content.emoji}
          </div>

          <div className="min-w-0">
            <p
              className="mb-0.5 text-xs font-black uppercase tracking-[0.16em] md:text-sm"
              style={{ color: "var(--yellow)" }}
            >
              Informatiepunt {hotspot}
            </p>

            <h2
              id="story-dialog-title"
              className="text-xl leading-snug md:text-2xl"
              style={{ color: "var(--sand-light)" }}
            >
              {content.title}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all duration-150 hover:bg-white/25 active:scale-90"
          style={{
            color: "white",
            border: "2px solid rgba(255,255,255,0.35)",
          }}
          aria-label="Venster sluiten"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Scrollbare inhoud */}
      <div
        ref={scrollRef}
        className="story-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain"
        tabIndex={0}
        aria-label={`Informatie en video bij punt ${hotspot}`}
      >
        {/* Ingezoomde afbeelding */}
        <div
          className="relative aspect-[2/1] min-h-[220px] overflow-hidden sm:min-h-[270px] md:min-h-[330px]"
          style={{ background: schoolPlate.id === 3 ? "var(--sand-light)" : "var(--grey-light)" }}
        >
          <div
            className="absolute transition-[width,height,left,top] duration-500 ease-out"
            style={{
              width: `${zoom * 100}%`,
              height: `${zoom * 100}%`,
              left: `${zoomLeft}%`,
              top: `${zoomTop}%`,
            }}
          >
            <img
              src={schoolPlate.image}
              alt={`Ingezoomde uitsnede bij ${content.title}`}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[rgba(23,63,56,0.88)] px-4 py-2 text-sm font-semibold text-white">
            Ingezoomde plek
          </div>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-5 py-6 md:px-9 md:py-8">
          {/* Informatie */}
          <div>
            <p
              className="mb-2 text-sm font-black uppercase tracking-[0.12em]"
              style={{ color: "var(--sky-dark)" }}
            >
              Ontdek dit punt
            </p>

            <h3
              className="text-2xl md:text-3xl"
              style={{
                color: "var(--forest)",
              }}
            >
              {content.title}
            </h3>
          </div>

          <div className="space-y-4">
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed md:text-lg"
                style={{ color: "var(--charcoal)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Video */}
          <section
            aria-labelledby={`video-title-${schoolPlate.id}-${hotspot}`}
          >
            <h3
              id={`video-title-${schoolPlate.id}-${hotspot}`}
              className="mb-3 text-xl md:text-2xl"
              style={{
                color: "var(--forest)",
              }}
            >
              Bekijk de video
            </h3>

            {videoEmbedUrl ? (
              <div
                className="overflow-hidden rounded-3xl"
                style={{
                  border: "1px solid rgba(23,63,56,0.16)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <iframe
                  className="block aspect-video w-full"
                  src={videoEmbedUrl}
                  title={content.videoTitle ?? `Video bij ${content.title}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : content.videoUrl ? (
              <a
                href={content.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl px-6 text-center transition-transform hover:scale-[1.01]"
                style={{
                  background: "linear-gradient(145deg, var(--forest) 0%, #123d27 100%)",
                  border: "4px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 6px 0 rgba(20,65,40,0.25)",
                }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-2xl shadow-lg" aria-hidden="true">▶️</span>
                <span className="text-lg font-black text-white md:text-2xl">{content.videoTitle ?? `Bekijk de video bij ${content.title}`}</span>
                <span className="text-sm font-semibold text-white/80 md:text-base">Open de educatieve video in een nieuw venster</span>
              </a>
            ) : (
              <div
                className="flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl px-6 text-center"
                style={{
                  background:
                    "linear-gradient(145deg, var(--forest) 0%, #123d27 100%)",
                  border: "4px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 6px 0 rgba(20,65,40,0.25)",
                }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-2xl shadow-lg"
                  aria-hidden="true"
                >
                  ▶️
                </div>

                <p className="text-lg font-black text-white md:text-2xl">
                  Video bij informatiepunt {hotspot}
                </p>

                <p className="max-w-lg text-sm font-semibold text-white/80 md:text-base">
                  Hier kan later een passende video over{" "}
                  {content.title.toLowerCase()} worden toegevoegd.
                </p>
              </div>
            )}
          </section>

          {/* Knoppen */}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={onStartQuiz}
              className="btn btn-primary w-full py-3.5 text-base md:text-lg"
            >
              {currentQuestionAnswered ? "🔁 Doe de quiz opnieuw" : "🎯 Start de quiz"}
            </button>

            <button
              onClick={onClose}
              className="btn btn-secondary w-full py-3.5 text-base"
            >
              ← Terug naar de schoolplaat
            </button>
          </div>

          {/* Voortgang */}
          <div
            className="flex flex-col gap-2 rounded-2xl px-4 py-4"
            style={{ background: "var(--grey-light)" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-black md:text-base"
                style={{ color: "var(--charcoal-mid)" }}
              >
                📍 Voortgang
              </span>

              <span
                className="rounded-full px-3 py-1 text-sm font-black text-white md:text-base"
                style={{
                  background: "var(--orange)",
                  boxShadow: "0 2px 0 var(--orange-dark)",
                }}
              >
                {answeredCount} van {total}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background:
                    "linear-gradient(90deg, var(--sky), var(--forest-light))",
                }}
              />
            </div>

            <p
              className="text-center text-sm font-semibold"
              style={{ color: "var(--muted)" }}
            >
              {pct === 100
                ? "🏆 Alle vragen ingevuld!"
                : `Nog ${total - answeredCount} vraag${
                    total - answeredCount === 1 ? "" : "en"
                  } in te vullen`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getVideoEmbedUrl(videoUrl?: string) {
  if (!videoUrl) return null;

  const value = videoUrl.trim();
  let videoId = /^[a-zA-Z0-9_-]{11}$/.test(value) ? value : "";

  if (!videoId) {
    try {
      const url = new URL(value);
      const hostname = url.hostname.replace(/^www\./, "");

      if (hostname === "vimeo.com") {
        const vimeoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
        return /^\d+$/.test(vimeoId) ? `https://player.vimeo.com/video/${vimeoId}` : null;
      }

      if (hostname === "youtu.be") {
        videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
      } else if (hostname === "youtube.com" || hostname === "youtube-nocookie.com") {
        videoId = url.searchParams.get("v") ?? "";

        if (!videoId) {
          const parts = url.pathname.split("/").filter(Boolean);
          const markerIndex = parts.findIndex((part) =>
            ["embed", "shorts", "live"].includes(part),
          );
          videoId = markerIndex >= 0 ? parts[markerIndex + 1] ?? "" : "";
        }
      }
    } catch {
      return null;
    }
  }

  return /^[a-zA-Z0-9_-]{11}$/.test(videoId)
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : null;
}
