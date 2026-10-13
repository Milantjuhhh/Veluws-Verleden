type Props = {
  showBack?: boolean;
  onBack?: () => void;
};

export default function SiteHeader({ showBack, onBack }: Props) {
  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{
        background: "var(--forest)",
        boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
      }}
    >

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
        </div>

        {/* Right side */}
        {showBack && onBack && (
          <button
            onClick={onBack}
            className="btn btn-secondary flex items-center gap-2 px-5 md:px-6 py-3 text-base flex-shrink-0"
            style={{ borderRadius: "var(--radius-full)", fontFamily: "Nunito, sans-serif" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Terug naar overzicht
          </button>
        )}
      </div>
    </header>
  );
}
