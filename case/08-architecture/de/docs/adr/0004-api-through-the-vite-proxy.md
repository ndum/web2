# 4. Die Kurs-API über den Proxy von Vite

## Status

Angenommen in Teil 7, nachträglich festgehalten in Teil 8.

## Kontext

Die App läuft in der Entwicklung auf Port 5173, die Kurs-API auf Port 3000. Für den Browser sind das zwei Origins. Anfragen über die Grenze brauchen CORS, und das Cookie der Anmeldung käme nur mit `credentials: 'include'` und der Erlaubnis des Servers mit.

## Entscheid

Die App ruft die API unter `/api` auf, und der Proxy von Vite leitet diese Adressen ohne das Präfix an Port 3000 weiter. Die Adresse steht in `VITE_API_URL`, `.env.example` beschreibt sie.

## Konsequenzen

Für den Browser liegen App und API auf derselben Origin, das Cookie kommt ohne weitere Einstellungen mit. Den Proxy gibt es nur in `vite` und `vite preview`. Wer die App veröffentlicht, braucht einen Server, der dasselbe tut, oder eine API, die die Origin der App erlaubt.
