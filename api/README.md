# Course API

The course API serves the data of Lorraine Commons, the library of things of the running case, from part 7 of the course on. It is a small Node server without dependencies. The German data live below `/de`, the English data below `/en`.

```bash
npm start
```

The API then runs on `http://localhost:3000`, for example `http://localhost:3000/de/items`. `PORT=4000 npm start` chooses another port. `npm test` runs its tests.

## Routes

| Method and path | Who | Answer |
|---|---|---|
| `GET /items` | everyone | all things |
| `GET /items/:id` | everyone | one thing, 404 for an unknown id |
| `POST /session` | everyone | signs in with `{ "number": "M-117" }`, 401 for an unknown number |
| `GET /session` | everyone | the signed-in member, 401 without login |
| `DELETE /session` | everyone | signs out |
| `GET /reservations` | members | the own requests |
| `POST /reservations` | members | a request `{ "itemId": 6, "from": "2026-11-04", "to": "2026-11-07", "note": "" }`, 201, 422 with a message per field, 409 when the thing is already requested for some of the days |
| `DELETE /reservations/:id` | members | withdraws an own request |
| `POST /items/:id/return` | team | records that a thing is back, 403 for members without an account of the team |

Every path starts with `/de` or `/en`. Errors come as `{ "error": "..." }` in the language of the path. Requests with a body need `Content-Type: application/json`, otherwise the API answers 415.

For trying out loading and error states, `?delay=2000` makes any route wait two seconds and `?status=503` makes it answer with that status.

## Login

The login is simulated. It knows the members `M-117`, Martina Hostettler with an account of the team, and `M-204` without one, and it signs in with the member number alone. The API keeps the session in a cookie with `HttpOnly` and `SameSite=Strict`, which ends when the browser closes, and forgets all sessions when it restarts. A real login needs a secret such as a password, and its cookie also gets `Secure`.

## CORS

Pages from `http://localhost:5173` and `http://localhost:4173`, the addresses of `vite` and `vite preview`, may call the API directly, also on `127.0.0.1`. `CORS_ORIGINS` adds further origins, separated by commas, for example the forwarded address of a codespace. The projects of the course reach the API through the proxy of Vite and need no CORS.

## Storage

Returns and requests survive a restart in `storage/state.json`, which git ignores. `npm run reset` deletes it, and the API starts from its data again.
