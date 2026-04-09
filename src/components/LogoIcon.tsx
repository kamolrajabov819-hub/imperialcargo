import { cn } from "@/lib/utils";

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      {/* Dragon body - coiled serpent shape */}
      <path
        d="M46 14C42 10 36 8 30 11C24 14 20 20 21 28C22 36 28 40 34 38C40 36 42 28 38 24C34 20 28 22 28 26"
        stroke="hsl(0, 75%, 50%)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Dragon head - angular with open jaw */}
      <path
        d="M46 14L50 9L53 13L49 15Z"
        fill="hsl(0, 75%, 50%)"
      />
      {/* Upper jaw / snout */}
      <path
        d="M53 13L58 11L56 14L53 13Z"
        fill="hsl(0, 70%, 45%)"
      />
      {/* Lower jaw */}
      <path
        d="M49 15L55 16L53 13"
        fill="hsl(0, 65%, 40%)"
      />
      {/* Eye */}
      <circle cx="49" cy="12" r="1.2" fill="hsl(43, 90%, 55%)" />
      {/* Horn 1 */}
      <path
        d="M48 10L46 3L50 9"
        stroke="hsl(43, 80%, 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Horn 2 */}
      <path
        d="M50 9L50 4L52 10"
        stroke="hsl(43, 80%, 50%)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Mane / whiskers */}
      <path
        d="M56 14L62 12"
        stroke="hsl(0, 70%, 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M55 16L61 18"
        stroke="hsl(0, 70%, 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Fire breath */}
      <path
        d="M58 11C60 9 62 10 61 12C62 10 64 12 62 14"
        stroke="hsl(43, 90%, 55%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Dragon tail - flowing curve */}
      <path
        d="M28 26C24 30 18 36 16 42C14 48 17 54 22 52C27 50 26 44 20 44"
        stroke="hsl(0, 75%, 50%)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tail tip flame */}
      <path
        d="M20 44L16 46L18 42L14 44"
        stroke="hsl(43, 80%, 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Scales along body */}
      <circle cx="32" cy="15" r="1.2" fill="hsl(43, 80%, 50%)" opacity="0.5" />
      <circle cx="25" cy="22" r="1.2" fill="hsl(43, 80%, 50%)" opacity="0.5" />
      <circle cx="24" cy="30" r="1.2" fill="hsl(43, 80%, 50%)" opacity="0.5" />
      <circle cx="30" cy="35" r="1.2" fill="hsl(43, 80%, 50%)" opacity="0.5" />
      <circle cx="36" cy="32" r="1" fill="hsl(43, 80%, 50%)" opacity="0.4" />
      <circle cx="22" cy="38" r="1" fill="hsl(43, 80%, 50%)" opacity="0.4" />
    </svg>
  );
}
