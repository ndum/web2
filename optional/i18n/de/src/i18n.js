import { createI18n } from 'vue-i18n'

// Texts and formats per language. A plural has its forms separated by |, from none to many.
export const messages = {
  'de-CH': {
    catalog: 'Katalog',
    language: 'Sprache',
    found: 'Keine Dinge gefunden | Ein Ding gefunden | {count} Dinge gefunden',
    deposit: 'Pfand {amount}',
    availableFrom: 'Wieder da am {date}',
    available: 'Da',
  },
  'en-US': {
    catalog: 'Catalog',
    language: 'Language',
    found: 'No things found | One thing found | {count} things found',
    deposit: 'Deposit {amount}',
    availableFrom: 'Back on {date}',
    available: 'In',
  },
}

const currency = { currency: { style: 'currency', currency: 'CHF' } }
// The API sends days without a time, read in UTC they stay the same day in every time zone
const day = { day: { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' } }

export function createAppI18n(locale = 'de-CH') {
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'de-CH',
    messages,
    numberFormats: { 'de-CH': currency, 'en-US': currency },
    datetimeFormats: { 'de-CH': day, 'en-US': day },
  })
}
