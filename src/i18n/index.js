import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./langs/en";
import vi from "./langs/vi";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("locale") || "vi",
  fallbackLng: "vi",
  resources: {
    vi: {
      translation: vi,
    },
    en: {
      translation: en,
    },
  },
});

export default i18n;
