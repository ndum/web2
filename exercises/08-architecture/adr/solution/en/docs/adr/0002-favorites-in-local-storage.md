# 2. Favorites in localStorage

## Status

Superseded by [ADR 3](0003-favorites-on-the-server.md)

## Context

Members mark things as favorites and lose them as soon as they reload the page. The association has no server that could store the favorites.

## Decision

The app stores the numbers of the favorites as JSON in localStorage under the key `lorraine-commons-favorites` and reads them again on start.

## Consequences

The favorites survive a reload and hold in every tab. They are missing on another device, and whoever clears the data of the browser loses them.
