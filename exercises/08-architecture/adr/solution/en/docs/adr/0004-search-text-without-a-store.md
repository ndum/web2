# 4. The search text without a store

## Status

Proposed

## Context

A new volunteer suggests putting the search text into a store, like the login and the favorites. Only the catalog needs the search text, but members send each other links to searches.

## Options

- A store with Pinia, as for the favorites
- A `ref` in the page of the catalog
- The query in the address, such as `?q=saw`

## Decision

The search text lives in the query of the address. A store gains nothing, because only one page needs the text, and a `ref` would get lost when someone shares a link.

## Consequences

A link shows the same search, and the back button restores it. The page has to read the text from the address and write changes into it after a pause.
