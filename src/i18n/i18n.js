import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { langEn } from "./locales/export";
import { langRu } from "./locales/export";
import { langUz } from "./locales/export";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: langEn,
    },
    ru: {
      translation: langRu,
    },
    uz: {
      translation: langUz,
    },
  },
  lng: "en",
  fallbackLng: "en",
  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});
