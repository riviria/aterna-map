"use client";

import type { Language } from "./data/language";

type MapLanguageToggleProps = {
  language: Language;
  onChange: (language: Language) => void;
};

const NEXT_LANGUAGE: Record<Language, Language> = {
  id: "en",
  en: "id",
};

const LABEL: Record<Language, string> = {
  id: "Ganti ke Bahasa Inggris",
  en: "Switch to Indonesian",
};

export default function MapLanguageToggle({
  language,
  onChange,
}: MapLanguageToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(NEXT_LANGUAGE[language])}
      aria-label={LABEL[language]}
      title={LABEL[language]}
      className="absolute bottom-5 right-[124px] z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 shadow-lg backdrop-blur-md transition hover:bg-black/90 hover:text-white"
    >
      {language}
    </button>
  );
}
