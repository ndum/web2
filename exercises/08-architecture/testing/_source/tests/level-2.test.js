import { describe, it } from 'vitest'

import RequestForm from '@/components/RequestForm.vue'

// Mount the form with mount(RequestForm, { props: { today: '2026-11-02' } }), fill it in with
// setValue, send it with trigger('submit') and look at emitted('send') and the messages.
describe('[%Vertiefung, das Formular|Going further, the form%]', () => {
  it.todo('[%sendet eine gültige Anfrage als Event|sends a valid request as an event%]')
  it.todo('[%sendet eine Anfrage mit Fehlern nicht|does not send a request with mistakes%]')
  it.todo('[%zeigt Meldungen erst nach dem Senden|shows messages only after sending%]')
})
