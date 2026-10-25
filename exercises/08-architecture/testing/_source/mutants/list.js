// Each mutant replaces one file of src with a copy that contains a small mistake.
// scripts/check.mjs runs the tests of a level once against each of its mutants.
export const MUTANTS = [
  { id: 'rules-1', level: 1, replaces: '@/rules.js', file: 'rules-1.js', description: '[%Eine Ausleihe von acht Tagen gilt als gültig.|A loan of eight days counts as valid.%]' },
  { id: 'rules-2', level: 1, replaces: '@/rules.js', file: 'rules-2.js', description: '[%Ein erster Tag in der Vergangenheit gilt als gültig.|A first day in the past counts as valid.%]' },
  { id: 'rules-3', level: 1, replaces: '@/rules.js', file: 'rules-3.js', description: '[%Ein letzter Tag vor dem ersten gilt als gültig.|A last day before the first counts as valid.%]' },
  { id: 'form-1', level: 2, replaces: '@/components/RequestForm.vue', file: 'RequestForm-1.vue', description: '[%Das Formular sendet auch eine Anfrage mit Fehlern.|The form also sends a request with mistakes.%]' },
  { id: 'form-2', level: 2, replaces: '@/components/RequestForm.vue', file: 'RequestForm-2.vue', description: '[%Das Formular zeigt keine Meldung.|The form shows no message.%]' },
  { id: 'form-3', level: 2, replaces: '@/components/RequestForm.vue', file: 'RequestForm-3.vue', description: '[%Das Formular zeigt Meldungen schon vor dem ersten Senden.|The form shows messages before it was sent for the first time.%]' },
  { id: 'store-1', level: 3, replaces: '@/stores/requests.js', file: 'requests-1.js', description: '[%Die Anfrage geht ohne den Kopf Content-Type an die API.|The request goes to the API without the header Content-Type.%]' },
  { id: 'store-2', level: 3, replaces: '@/stores/requests.js', file: 'requests-2.js', description: '[%Eine Ablehnung der API landet in der Liste.|A refusal of the API ends up in the list.%]' },
  { id: 'store-3', level: 3, replaces: '@/stores/requests.js', file: 'requests-3.js', description: '[%Die Anfrage geht an eine falsche Adresse.|The request goes to a wrong address.%]' },
]
