---
title: README template
description: A template for the project sketch and the documentation in the README with the parts the project assignment asks for, the AI declaration and an example of an architecture decision.
sidebar:
  order: 3
---

The README is the documentation of your project, and the project sketch is its first version. This template contains the parts the [project assignment](../assignment/) asks for. Copy it into the file `README.md` of your repository and replace the hints in brackets.

## The sketch

For the approval, you fill in the parts that should be settled before the first line of code, the description with the target group, the user stories, the wireframes, the component tree, the routes, the concept for state, the data source and your choice of framework. The other parts grow while you build. Wireframes may be hand-drawn sketches that you photograph and put into a folder `docs`.

## The template

````md
# [Name of the project]

[Two or three sentences on what the app does and for whom.]

## Target group

[Who uses the app, in which situation and on which device.]

## User stories

| No. | User story | Acceptance criteria | Status |
|---|---|---|---|
| 1 | As a [role], I want [goal], so that [benefit]. | [testable criteria] | [met, partly met or open, with a reason for deviations] |

## Wireframes

[Pictures of the most important views, such as ![Start page](docs/wireframe-start.png)]

## Architecture

### Framework

[Which framework and why.]

### Component tree

[The components and how they nest, as a list or a picture.]

### Routes

| Path | Page | Guard |
|---|---|---|
| `/` | [page] | [none or which one] |

### State

[Which state is local, shared, global, in the address or on the server, and why.]

### Data

[Where the data come from, a public API, your own backend or a stand-in in the browser, and how they flow.]

## Decisions

[The important decisions as short architecture decisions, here or as files in `docs/adr` with an index.]

## Installation, start, tests and deployment

```bash
npm install
npm run dev
npm test
npm run build
```

[Where the app is published and how it gets there. Environment variables are in `.env.example`.]

## AI declaration

| Tool | Used for | Parts affected | Checked or changed |
|---|---|---|---|
| [name] | [such as explanations, code, tests or texts] | [files or functions] | [what you checked or adjusted] |

## Reflection

[What went well, what was hard and what you would do differently in your next project.]
````

## An example of a decision

The minimum scope asks for global state for a sensible area or a justified decision against it, recorded as an architecture decision. This is what such a decision could look like, in the structure of [chapter 8.3](../../architecture/architecture-decisions/).

```md
# 2. No global state for the training plans

## Status

Accepted

## Context

The training plans only appear on the page of a team. No other page needs them, and the data come fresh from the API on every visit.

## Decision

The page of a team loads the plans itself and keeps them in a `ref`. The login, which several pages need, lives in a Pinia store.

## Consequences

There is one store less, and the plans are always current when the page opens. If a second page needs the plans later, they belong in a store, and this decision gets superseded.
```

## The AI declaration

For every tool, the table states what you used it for, which parts of the project are affected and what you checked or changed in the result. An honest declaration costs no points. Write down the places where a suggestion was wrong, the screencast asks about one of them.
