type Props = {
  className?: string;
  height?: number;
  /** First word / prefix — shown in the current text color. */
  primary?: string;
  /** Second word / suffix — shown in the sky accent. */
  accent?: string;
};

export function Wordmark({ className, height = 32, primary = 'ANDREW', accent = 'LEACH' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 165 28"
      height={height}
      className={className}
      aria-label={`${primary} ${accent}`}
      role="img"
      preserveAspectRatio="xMinYMid meet"
    >
      <style>
        {`.wm{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:900;font-style:italic;letter-spacing:-0.07em;}`}
      </style>
      <text className="wm" x="0" y="22" fill="currentColor">
        <tspan>{primary}</tspan>
        <tspan fill="#10B981">{accent}</tspan>
      </text>
    </svg>
  );
}
