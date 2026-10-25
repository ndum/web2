# 7. A demo without a server

## Status

Accepted in part 8.

## Context

Martina Hostettler wants to show the app at the general meeting before the association has a server of its own. The course API only runs locally. The demo should live publicly on the course site, in a folder of a site whose page for unknown addresses belongs to the course.

## Decision

The stores get the API from `main.js` and only know its functions. In the mode `demo`, `.env.demo` sets the variable `VITE_API` to `memory`, and the app gets a stand-in that answers in the browser. `VITE_HISTORY` is set to `hash` there, so the router keeps the path behind `#`.

## Consequences

The demo runs without a server and costs nothing. The stand-in checks less than the course API, the form checks the other rules. The addresses of the demo contain a `#`, but links to a thing still work. What someone changes in the demo stays in their tab.
