---
title: Authentication
description: Signing in with a session in a cookie, what the SPA needs to know about it, what the server has to check and when an identity provider pays off.
sidebar:
  order: 4
---

Authentication answers the question of who sends a request. The course API of part 7 simulates a sign-in with the member number and no password. Even so, it shows the flow that a real sign-in has. The server checks the details, starts a session and hands the browser a cookie. The browser sends the cookie along with every further request, and the server knows who made it.

## In your project

According to the [project assignment](../../project/assignment/), authentication earns two bonus points. It pays off as soon as certain data belongs only to signed-in people, for example their own entries or an area for a team. The sign-in belongs in the backend. An SPA on its own cannot sign anyone in securely, because a person can read and change everything that runs in their browser. Never store passwords in plain text, only as a hash made with a method such as Argon2id, as OWASP recommends. For a project, an identity provider is often the safer way.

## A small example

The course API starts the session with `POST /session` and sets a cookie. `HttpOnly` keeps the cookie away from JavaScript, including code that someone smuggles into the page through a vulnerability. `SameSite=Strict` stops the browser from sending the cookie with requests that come from other websites.

::code{file="api/src/app.js" lines="12-14"}

::code{file="api/src/app.js" lines="102-125"}

The SPA does not know the session, it only keeps track of who is signed in. After a reload, the store of the case app asks the API once with `GET /session` who the cookie belongs to.

::code{file="case/08-architecture/{lang}/src/features/auth/authStore.js" lines="6-37"}

The router guard sends people without a team account to the sign-in and back afterwards. It only makes sure that the interface fits.

::code{file="case/08-architecture/{lang}/src/router/index.js" lines="38-46"}

Protecting the data is the server's job. The Authorization Cheat Sheet of OWASP asks to check every request on the server and never to rely on checks in the browser. That is why the course API looks up the session of the cookie on every request. Without a session it answers 401, and only the team may record a return, otherwise the answer is 403.

::code{file="api/src/app.js" lines="76-80"}

::code{file="api/src/app.js" lines="91-100"}

Real sign-ins often go through an identity provider with OAuth 2.0 and OpenID Connect, a layer on top of OAuth that records who signed in. For SPAs, RFC 10017 of August 2026 describes three patterns, ordered by how secure they are. The most secure one is a backend for frontend, a server of your own that holds the tokens, gives the SPA only a session in a cookie and passes on the calls to the API. If the SPA fetches the tokens itself, it must use PKCE as defined in RFC 7636. According to OWASP, a token or a session ID never belongs in `localStorage` or `sessionStorage`, because every script of the page can read it there.

If the SPA and the API live on different sites, for example the SPA on github.io and the API with another provider, the browser does not send a cookie with `SameSite=Strict` or `Lax`. The cookie then needs `SameSite=None` and `Secure`, and the API needs protection against cross-site request forgery as OWASP describes it. It is simpler to run the SPA and the API under the same domain.

## Official links

- [OWASP, Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP, Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [RFC 10017, OAuth 2.0 for Browser-Based Applications](https://datatracker.ietf.org/doc/rfc10017/)
- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)
- [MDN, Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)
