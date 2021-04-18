import { initReactI18next } from "react-i18next";
import { en_US, ru_RU } from "./Translations";
import i18n, { Resource } from "i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources: Resource = {
	en: {
		translation: en_US
	},
	ru: {
		translation: ru_RU
	}
};

void i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "ru",

		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export { i18n as Localization };
