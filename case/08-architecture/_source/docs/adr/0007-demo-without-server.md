# 7. [%Eine Demo ohne Server|A demo without a server%]

## Status

[%Angenommen in Teil 8.|Accepted in part 8.%]

## [%Kontext|Context%]

[%Martina Hostettler will die App an der Mitgliederversammlung zeigen, bevor der Verein einen eigenen Server hat. Die Kurs-API läuft nur lokal. Die Demo soll öffentlich auf der Kursseite liegen, in einem Ordner einer Site, deren Seite für unbekannte Adressen dem Kurs gehört.|Martina Hostettler wants to show the app at the general meeting before the association has a server of its own. The course API only runs locally. The demo should live publicly on the course site, in a folder of a site whose page for unknown addresses belongs to the course.%]

## [%Entscheid|Decision%]

[%Die Stores bekommen die API von `main.js` und kennen nur deren Funktionen. Im Modus `demo` setzt `.env.demo` die Variable `VITE_API` auf `memory`, dann bekommt die App eine Attrappe, die im Browser antwortet. `VITE_HISTORY` steht dort auf `hash`, der Router hält den Pfad dann hinter `#`.|The stores get the API from `main.js` and only know its functions. In the mode `demo`, `.env.demo` sets the variable `VITE_API` to `memory`, and the app gets a stand-in that answers in the browser. `VITE_HISTORY` is set to `hash` there, so the router keeps the path behind `#`.%]

## [%Konsequenzen|Consequences%]

[%Die Demo läuft ohne Server und kostet nichts. Die Attrappe prüft weniger als die Kurs-API, die übrigen Regeln prüft das Formular. Die Adressen der Demo enthalten ein `#`, Links auf ein Ding funktionieren trotzdem. Was jemand in der Demo ändert, bleibt in seinem Tab.|The demo runs without a server and costs nothing. The stand-in checks less than the course API, the form checks the other rules. The addresses of the demo contain a `#`, but links to a thing still work. What someone changes in the demo stays in their tab.%]
