# 3. Shared state with Pinia

## Status

Accepted in part 7, written down in part 8.

## Context

The header, the catalog, the guard and the form need the login, the favorites and the requests. `App` provided them with `provide`, and every new page needed some of them again. A module with `ref` would have done, but it shows its changes in no developer tools and is harder to prepare in tests.

## Decision

The app keeps shared state in setup stores of Pinia, one each for the catalog, the login, the favorites and the requests. State that only one component needs stays in that component, and the filter stays in the address.

## Consequences

The Vue DevTools show the stores, and tests start with a fresh Pinia. The app depends on one more package. Whoever takes a store apart needs `storeToRefs`, otherwise the connections get lost.
