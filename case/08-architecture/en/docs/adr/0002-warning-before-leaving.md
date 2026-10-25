# 2. A warning before leaving a form

## Status

Superseded by [ADR 5](0005-draft-in-session-storage.md).

## Context

A member lost a half-filled request by clicking a link. The input only lived in the component of the form.

## Decision

The page of a thing asks with `onBeforeRouteLeave` and `window.confirm` before someone leaves a form with input.

## Consequences

No click on a link deletes input any longer. The question also bothers whoever only wants to look into the catalog for a moment, and it does not help on a reload.
