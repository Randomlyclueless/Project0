// useTranslation.ts
import { useState } from "react";
import { translations, Language } from "./lang";

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>("en");

  const t = translations[language];

  return {
    t,
    language,
    setLanguage,
  };
};
