import { cn } from "@/lib/utils";

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Globe */}
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
      <ellipse cx="32" cy="32" rx="12" ry="22" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <line x1="32" y1="10" x2="32" y2="54" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      {/* Airplane */}
      <g transform="translate(32, 28) rotate(-30)">
        <path
          d="M-4 0L-14 -6L-4 -2L6 -6L16 0L6 2L-4 6L-14 2Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M-14 -6L-4 0L-14 2Z"
          fill="currentColor"
          opacity="0.6"
        />
      </g>
      {/* Arc trail */}
      <path
        d="M14 46 Q 32 10, 52 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
