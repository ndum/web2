# 4. The course API through the proxy of Vite

## Status

Accepted in part 7, written down in part 8.

## Context

During development the app runs on port 5173 and the course API on port 3000. For the browser these are two origins. Requests across that border need CORS, and the session cookie would only travel with `credentials: 'include'` and the permission of the server.

## Decision

The app calls the API below `/api`, and the proxy of Vite forwards these addresses to port 3000 without the prefix. The address is in `VITE_API_URL`, `.env.example` describes it.

## Consequences

For the browser the app and the API share one origin, and the cookie travels without further settings. The proxy only exists in `vite` and `vite preview`. Whoever publishes the app needs a server that does the same or an API that allows the origin of the app.
