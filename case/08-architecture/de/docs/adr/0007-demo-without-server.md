# 7. Eine Demo ohne Server

## Status

Angenommen in Teil 8.

## Kontext

Martina Hostettler will die App an der Mitgliederversammlung zeigen, bevor der Verein einen eigenen Server hat. Die Kurs-API läuft nur lokal. Die Demo soll öffentlich auf der Kursseite liegen, in einem Ordner einer Site, deren Seite für unbekannte Adressen dem Kurs gehört.

## Entscheid

Die Stores bekommen die API von `main.js` und kennen nur deren Funktionen. Im Modus `demo` setzt `.env.demo` die Variable `VITE_API` auf `memory`, dann bekommt die App eine Attrappe, die im Browser antwortet. `VITE_HISTORY` steht dort auf `hash`, der Router hält den Pfad dann hinter `#`.

## Konsequenzen

Die Demo läuft ohne Server und kostet nichts. Die Attrappe prüft weniger als die Kurs-API, die übrigen Regeln prüft das Formular. Die Adressen der Demo enthalten ein `#`, Links auf ein Ding funktionieren trotzdem. Was jemand in der Demo ändert, bleibt in seinem Tab.
