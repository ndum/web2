# 3. Favorites on the server

## Status

Accepted, supersedes [ADR 2](0002-favorites-in-local-storage.md)

## Context

Members want to see their favorites at the counter and on their phone, not only in the browser where they marked them. The API of the association knows signed-in members.

## Decision

The API stores the favorites of signed-in members. Without a login the favorites stay in localStorage, and after the login the app sends them to the API once.

## Consequences

Favorites follow a member to every device. The app needs two ways for favorites and a rule for when both hold different lists, and every mark becomes a request to the server.
