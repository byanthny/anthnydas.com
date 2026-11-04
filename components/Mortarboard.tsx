// a mortarboard drawn for this site, after "jhu" on the degree line. it tosses on hover
// (globals.css, .jhu .cap). no school marks: jhu's own logos need its written approval
const Mortarboard = () => (
  <svg className="cap" viewBox="0 0 20 16" aria-hidden="true" focusable="false">
    <path d="M10 1 1 5.5 10 10l9-4.5z" fill="currentColor" />
    <path
      d="M4.5 7.6v3.6c1.4 1.3 3.4 2 5.5 2s4.1-.7 5.5-2V7.6L10 10.4z"
      fill="currentColor"
      opacity=".7"
    />
    <path d="M17.5 6.4v5.1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    <circle cx="17.5" cy="12.6" r="1.1" fill="currentColor" />
  </svg>
)

export default Mortarboard
