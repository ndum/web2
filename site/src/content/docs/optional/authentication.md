---
title: Authentifizierung
description: Anmelden mit einer Sitzung im Cookie, was die SPA davon wissen muss, was der Server prüfen muss und wann sich ein Anbieter für Identitäten lohnt.
sidebar:
  order: 4
---

Authentifizierung beantwortet die Frage, wer eine Anfrage schickt. Die Kurs-API aus Teil 7 simuliert eine Anmeldung mit der Mitgliedernummer, ohne Passwort. Sie zeigt trotzdem den Ablauf, den auch eine echte Anmeldung hat. Der Server prüft die Angaben, startet eine Sitzung und gibt dem Browser ein Cookie mit. Bei jeder weiteren Anfrage schickt der Browser das Cookie mit, und der Server weiss, wer sie stellt.

## In deinem Projekt

Laut [Projektauftrag](../../project/assignment/) bringt eine Authentifizierung zwei Bonuspunkte. Sie lohnt sich, sobald bestimmte Daten nur angemeldeten Personen gehören, etwa eigene Einträge oder ein Bereich für ein Team. Die Anmeldung gehört ins Backend. Eine SPA allein kann niemanden sicher anmelden, denn alles, was im Browser läuft, kann die Person dort lesen und ändern. Passwörter speicherst du nie im Klartext, sondern nur als Hash mit einem Verfahren wie Argon2id, wie es OWASP empfiehlt. Für ein Projekt ist ein Anbieter für Identitäten oft der sicherere Weg.

## Ein kleines Beispiel

Die Kurs-API startet die Sitzung mit `POST /session` und setzt ein Cookie. `HttpOnly` hält das Cookie von JavaScript fern, also auch von Code, den jemand über eine Lücke in die Seite schmuggelt. `SameSite=Strict` verhindert, dass der Browser das Cookie bei Anfragen von anderen Websites mitschickt.

::code{file="api/src/app.js" lines="12-14"}

::code{file="api/src/app.js" lines="102-125"}

Die SPA kennt die Sitzung nicht, sie hält nur fest, wer angemeldet ist. Nach dem Neuladen fragt der Store der Fallbeispiel-App die API einmal mit `GET /session`, wer zum Cookie gehört.

::code{file="case/08-architecture/{lang}/src/features/auth/authStore.js" lines="6-37"}

Der Guard des Routers schickt Personen ohne Team-Konto zur Anmeldung und danach zurück. Er sorgt nur dafür, dass die Oberfläche passt.

::code{file="case/08-architecture/{lang}/src/router/index.js" lines="38-46"}

Schützen muss die Daten der Server. Das Authorization Cheat Sheet von OWASP verlangt, jede Anfrage auf dem Server zu prüfen und sich nie auf Prüfungen im Browser zu verlassen. Die Kurs-API sucht deshalb bei jeder Anfrage die Sitzung zum Cookie. Ohne Sitzung antwortet sie mit 401, und eine Rückgabe darf nur das Team erfassen, sonst kommt 403.

::code{file="api/src/app.js" lines="76-80"}

::code{file="api/src/app.js" lines="91-100"}

Echte Anmeldungen laufen oft über einen Anbieter für Identitäten mit OAuth 2.0 und OpenID Connect, einer Schicht über OAuth, die festhält, wer sich angemeldet hat. Für SPAs beschreibt RFC 10017 vom August 2026 drei Muster, geordnet nach ihrer Sicherheit. Am sichersten ist ein Backend for Frontend, ein eigener Server, der die Tokens hält, der SPA nur eine Sitzung im Cookie gibt und die Aufrufe der API weiterreicht. Holt die SPA die Tokens selbst, muss sie PKCE nach RFC 7636 verwenden. Ein Token oder eine Session-ID gehört laut OWASP nie in `localStorage` oder `sessionStorage`, denn dort kann jedes Skript der Seite sie lesen.

Liegen SPA und API auf verschiedenen Sites, etwa die SPA auf github.io und die API bei einem anderen Anbieter, schickt der Browser ein Cookie mit `SameSite=Strict` oder `Lax` nicht mit. Das Cookie braucht dann `SameSite=None` und `Secure`, und die API einen Schutz gegen Cross-Site Request Forgery, wie ihn OWASP beschreibt. Einfacher ist es, SPA und API unter derselben Domain zu betreiben.

## Offizielle Links

- [OWASP, Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP, Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [RFC 10017, OAuth 2.0 for Browser-Based Applications](https://datatracker.ietf.org/doc/rfc10017/)
- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)
- [MDN, Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)
