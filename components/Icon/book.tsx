const IconBook: React.FC<{ readonly ariaId?: string }> = ({ ariaId }) => (
  <svg
    aria-labelledby={ariaId}
    className="feather feather-book-open"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id={ariaId}>Zenn</title>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export { IconBook };
