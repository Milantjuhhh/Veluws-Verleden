type Props = {
  showBack?: boolean;
  onBack?: () => void;
  kicker?: string;
  title?: string;
  subtitle?: string;
};

export default function SiteHeader({ showBack, onBack, kicker, title, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-30 w-full" style={{ background: "var(--forest)" }}>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <LogoMark />
          <div className="min-w-0">
            <p
              className="truncate text-lg leading-tight text-white md:text-xl"
              style={{ fontFamily: "Merriweather, Georgia, serif" }}
            >
              Veluws Verleden
            </p>
            <p className="truncate text-sm text-white/75">
              {title ? `${kicker ? `${kicker} · ` : ""}${title}` : "Ontdek de schoolplaten"}
            </p>
            {subtitle && (
              <p className="mt-0.5 hidden truncate text-xs text-white/60 sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {showBack && onBack && (
          <button
            onClick={onBack}
            className="btn btn-on-dark flex-shrink-0 px-4 py-2.5 text-sm md:px-5 md:text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="hidden sm:inline">Terug naar overzicht</span>
            <span className="sm:hidden">Overzicht</span>
          </button>
        )}
      </div>
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, var(--ochre), #e7c27a 55%, var(--sky))" }} />
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true" className="flex-shrink-0">
      <circle cx="23" cy="23" r="22" fill="#FFFDF8" />
      <circle cx="23" cy="23" r="19.5" fill="none" stroke="#D28A28" strokeWidth="1.4" />
      <path d="M23 12.5c2.2 3.4 3.2 5.2 3.2 7.1 0 1.8-1.4 3.2-3.2 3.2s-3.2-1.4-3.2-3.2c0-1.9 1-3.7 3.2-7.1z" fill="#1E9EAA" />
      <path d="M23 16.2 29.2 27.2h-3.1l1.5 6.3H18.4l1.5-6.3h-3.1L23 16.2z" fill="#173F38" />
      <path d="M14 33.2h18" stroke="#286B5F" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
