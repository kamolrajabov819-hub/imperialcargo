import { useState } from "react";
import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  { code: "+996", flag: "🇰🇬", name: "Kyrgyzstan", format: "XXX XXX XXX" },
  { code: "+7", flag: "🇷🇺", name: "Russia", format: "XXX XXX XX XX" },
  { code: "+86", flag: "🇨🇳", name: "China", format: "XXX XXXX XXXX" },
  { code: "+7", flag: "🇰🇿", name: "Kazakhstan", format: "XXX XXX XX XX" },
  { code: "+998", flag: "🇺🇿", name: "Uzbekistan", format: "XX XXX XX XX" },
  { code: "+992", flag: "🇹🇯", name: "Tajikistan", format: "XX XXX XX XX" },
] as const;

interface PhoneInputProps {
  value: string;
  onChange: (fullPhone: string) => void;
  className?: string;
}

function formatDigits(digits: string, format: string): string {
  let result = "";
  let di = 0;
  for (const ch of format) {
    if (di >= digits.length) break;
    if (ch === "X") {
      result += digits[di++];
    } else {
      result += ch;
    }
  }
  return result;
}

export function PhoneInput({ value, onChange, className }: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [countryIdx, setCountryIdx] = useState(0);
  const country = COUNTRIES[countryIdx];

  const localDigits = value.replace(/\D/g, "").slice(country.code.replace("+", "").length);

  const handleDigitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const maxLen = country.format.replace(/[^X]/g, "").length;
    const digits = raw.slice(0, maxLen);
    onChange(country.code + digits);
  };

  const selectCountry = (idx: number) => {
    setCountryIdx(idx);
    setOpen(false);
    onChange(COUNTRIES[idx].code);
  };

  const displayValue = localDigits ? formatDigits(localDigits, country.format) : "";

  return (
    <div className={`relative ${className || ""}`}>
      <div className="flex overflow-hidden rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 px-3 py-2 border-r border-input bg-secondary text-foreground text-sm shrink-0"
        >
          <span className="text-lg">{country.flag}</span>
          <span className="text-xs text-muted-foreground">{country.code}</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
        <input
          type="tel"
          value={displayValue}
          onChange={handleDigitChange}
          placeholder={country.format.replace(/X/g, "0")}
          className="flex-1 h-10 bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none md:text-sm"
        />
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {COUNTRIES.map((c, i) => (
            <button
              key={`${c.code}-${c.name}`}
              type="button"
              onClick={() => selectCountry(i)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors ${
                i === countryIdx ? "bg-primary/10 text-primary" : "text-foreground"
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span className="flex-1 text-left">{c.name}</span>
              <span className="text-muted-foreground">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
