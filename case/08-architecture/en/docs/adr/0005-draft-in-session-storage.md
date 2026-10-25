# 5. The draft of a request in sessionStorage

## Status

Accepted in part 7, written down in part 8. Supersedes [ADR 2](0002-warning-before-leaving.md).

## Context

The question of ADR 2 bothers whoever wants to look into the catalog for a moment, and it does not help on a reload. At the counter, several members work one after the other at the same device.

## Decision

The form writes every input as a draft into `sessionStorage`, one entry per thing, and fetches it back when it opens. After sending and with an empty form, the draft disappears. The question before leaving is dropped.

## Consequences

Whoever leaves the page or reloads it finds the input again. A draft stays in its tab and ends with it, another member at another device never sees it. The draft must hold nothing that does not belong in the storage of the browser.
