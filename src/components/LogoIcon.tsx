import logoSvg from "@/assets/imperial-logo.svg";

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src={logoSvg}
      alt="Imperial Cargo"
      className={className}
    />
  );
}
