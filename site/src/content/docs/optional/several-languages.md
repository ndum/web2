---
title: Mehrere Sprachen
description: Texte und Formate mit vue-i18n übersetzen, die Sprache zur Laufzeit wechseln und dem Browser die Sprache der Seite mitteilen.
sidebar:
  order: 6
---

Den Kurs und die Fallbeispiel-App gibt es auf Deutsch und Englisch, jede Sprache als eigener Build. Viele Apps wechseln die Sprache dagegen zur Laufzeit, ohne die Seite neu zu laden. Dafür liegen alle Texte nach Sprachen getrennt in einem Objekt, und eine Funktion setzt sie über einen Schlüssel ein. Für Vue gibt es dafür die Bibliothek vue-i18n, die auch Zahlen und Daten nach den Regeln einer Sprache formatiert.

## In deinem Projekt

Der [Projektauftrag](../../project/assignment/) nennt mehrere Sprachen als Beispiel für eine erweiterte Anforderung. Sie lohnen sich, wenn Menschen mit verschiedenen Sprachen die App nutzen. Plane sie früh ein, denn danach muss jeder Text in Templates und Meldungen über einen Schlüssel laufen. Das Attribut `lang` an `<html>` muss zur gewählten Sprache passen. Screenreader wählen danach die Aussprache, und die WCAG verlangen es im Kriterium 3.1.1.

## Ein kleines Beispiel

Das Beispiel unter `optional/i18n/de` zeigt vier Dinge des Katalogs auf Deutsch oder Englisch. `createI18n` bekommt die Texte und Formate pro Sprache. `legacy: false` schaltet die Schnittstelle für die Composition API ein, ohne diese Option arbeitet Version 11 noch mit der alten. Ein Text im Plural trennt seine Formen mit `|`, von keinem über eins bis zu vielen, und `{count}` setzt vue-i18n selbst ein.

::code{file="optional/i18n/{lang}/src/i18n.js"}

In der Komponente liefert `useI18n` die Funktionen `t` für Texte, `n` für Zahlen und `d` für Daten. `locale` ist ein Ref. Das Auswahlfeld ändert es mit `v-model`, und ein `watchEffect` passt `lang` an `<html>` an. Die Namen der Sprachen im Auswahlfeld stehen in ihrer eigenen Sprache und tragen deshalb ein eigenes `lang`, wie es das Kriterium 3.1.2 verlangt.

::code{file="optional/i18n/{lang}/src/App.vue"}

Die Namen der Dinge kommen aus den Daten und bleiben beim Wechsel gleich. Eine API liefert sie wie die Kurs-API pro Sprache, im Fallbeispiel unter `/api/de/items` und `/api/en/items`. Formatierte Zahlen vergleichst du in Tests nie mit festen Texten. `Intl` setzt zwischen Währung und Betrag ein geschütztes Leerzeichen, und das Trennzeichen für Tausender sieht in `de-CH` je nach Stand der Sprachdaten des Browsers anders aus.

## Offizielle Links

- [vue-i18n, Composition API](https://vue-i18n.intlify.dev/guide/advanced/composition.html)
- [vue-i18n, Pluralisierung](https://vue-i18n.intlify.dev/guide/essentials/pluralization.html)
- [MDN, das Attribut lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang)
- [WCAG 2.2, Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html)
