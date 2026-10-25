# 1. Record decisions

## Status

Accepted

## Context

Several volunteers work on the app, often months apart. Whoever joins sees in the code what the app does, but not why it does it that way.

## Decision

We record every decision that shapes the structure, the dependencies or the behavior of the app as an architecture decision in `docs/adr`. Every decision gets the next free number and has the sections Status, Context, Decision and Consequences.

## Consequences

New volunteers look up the reasons instead of guessing them. Recording costs a few minutes for every decision, and a decision that no longer holds stays and points to the new one.
