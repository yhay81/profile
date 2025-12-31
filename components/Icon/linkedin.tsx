const IconLinkedin: React.FC<{ readonly ariaId?: string }> = ({ ariaId }) => (
  <svg
    aria-labelledby={ariaId}
    className="feather feather-linkedin"
    fill="none"
    role="img"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id={ariaId}>LinkedIn</title>

    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />

    <rect height="12" width="4" x="2" y="9" />

    <circle cx="4" cy="4" r="2" />
  </svg>
);

export { IconLinkedin };
