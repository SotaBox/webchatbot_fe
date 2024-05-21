import i18next, { use } from "i18next";
import { initReactI18next } from "react-i18next";
import enNs1 from "./locales/en/ns1.json";
import { IsDevelopment } from "./constants/environment";

export const defaultNS = "ns1";

use(initReactI18next).init({
  debug: IsDevelopment,
  fallbackLng: "en",
  defaultNS,
  resources: {
    en: {
      ns1: enNs1,
    },
  },
});

export default i18next;
