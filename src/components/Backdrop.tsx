/**
 * Fixed page atmosphere: floodlight gradients (CSS), faint football-pitch
 * line art tying the page to Picadito, and a film-grain overlay.
 */
const Backdrop = () => (
  <>
    <div className="fl-backdrop" aria-hidden="true">
      <svg
        className="fl-pitch-lines"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.05"
      >
        {/* Halfway line */}
        <line x1="0" y1="450" x2="1440" y2="450" />
        {/* Center circle + spot */}
        <circle cx="720" cy="450" r="160" />
        <circle cx="720" cy="450" r="4" fill="currentColor" stroke="none" />
        {/* Penalty boxes peeking from top and bottom edges */}
        <rect x="430" y="-80" width="580" height="220" />
        <rect x="560" y="-80" width="320" height="110" />
        <path d="M 600 140 A 120 120 0 0 0 840 140" />
        <rect x="430" y="760" width="580" height="220" />
        <rect x="560" y="870" width="320" height="110" />
        <path d="M 600 760 A 120 120 0 0 1 840 760" />
      </svg>
    </div>
    <div className="fl-grain" aria-hidden="true" />
  </>
);

export default Backdrop;
