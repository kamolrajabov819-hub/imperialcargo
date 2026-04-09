import { cn } from "@/lib/utils";

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Dragon body coil */}
      <path
        d="M48 12C44 8 36 6 30 10C24 14 20 22 22 30C24 38 30 40 34 38C38 36 40 30 36 26C32 22 26 24 26 28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Dragon head */}
      <path
        d="M48 12L52 8L54 12L50 14L48 12Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Dragon horn */}
      <path
        d="M50 10L52 4L54 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Dragon whisker */}
      <path
        d="M54 12L60 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M54 14L59 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Dragon tail */}
      <path
        d="M26 28C22 32 18 38 16 44C14 50 18 54 22 52C26 50 24 46 20 46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Flame */}
      <path
        d="M56 8C58 6 60 8 58 10C60 8 62 10 60 12"
        stroke="hsl(43,80%,55%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Small scales */}
      <circle cx="30" cy="16" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="24" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="34" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
