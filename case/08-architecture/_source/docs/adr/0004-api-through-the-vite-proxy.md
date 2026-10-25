# 4. [%Die Kurs-API über den Proxy von Vite|The course API through the proxy of Vite%]

## Status

[%Angenommen in Teil 7, nachträglich festgehalten in Teil 8.|Accepted in part 7, written down in part 8.%]

## [%Kontext|Context%]

[%Die App läuft in der Entwicklung auf Port 5173, die Kurs-API auf Port 3000. Für den Browser sind das zwei Origins. Anfragen über die Grenze brauchen CORS, und das Cookie der Anmeldung käme nur mit `credentials: 'include'` und der Erlaubnis des Servers mit.|During development the app runs on port 5173 and the course API on port 3000. For the browser these are two origins. Requests across that border need CORS, and the session cookie would only travel with `credentials: 'include'` and the permission of the server.%]

## [%Entscheid|Decision%]

[%Die App ruft die API unter `/api` auf, und der Proxy von Vite leitet diese Adressen ohne das Präfix an Port 3000 weiter. Die Adresse steht in `VITE_API_URL`, `.env.example` beschreibt sie.|The app calls the API below `/api`, and the proxy of Vite forwards these addresses to port 3000 without the prefix. The address is in `VITE_API_URL`, `.env.example` describes it.%]

## [%Konsequenzen|Consequences%]

[%Für den Browser liegen App und API auf derselben Origin, das Cookie kommt ohne weitere Einstellungen mit. Den Proxy gibt es nur in `vite` und `vite preview`. Wer die App veröffentlicht, braucht einen Server, der dasselbe tut, oder eine API, die die Origin der App erlaubt.|For the browser the app and the API share one origin, and the cookie travels without further settings. The proxy only exists in `vite` and `vite preview`. Whoever publishes the app needs a server that does the same or an API that allows the origin of the app.%]
