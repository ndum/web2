---
title: Recording architecture decisions
description: Architecture decision records after Nygard with status, context, decision and consequences, numbers and statuses, a decision that supersedes another, weighing options and the decisions of a project in its repository.
sidebar:
  order: 3
---

:::assignment
The new volunteer asks why the app uses Pinia, why the course API goes through a proxy and why the form no longer asks before leaving. The volunteer no longer remembers all the reasons, and Martina Hostettler never knew any of them.

> As a board member, I want every important decision about the app to be recorded with its reasons, so that new volunteers understand it and we can change it on purpose later.

The acceptance criteria are:

1. Every important decision is in the repository as a short text with context, decision and consequences.
2. A decision that no longer holds stays and points to the new one.
3. An index lists all decisions with their status.
:::

:::goals
After this chapter you can

- explain what architecture decision records are for,
- record a decision with status, context, decision and consequences,
- supersede a decision with a new one without deleting it,
- weigh options and record them,
- recognize which decisions deserve a record of their own.
:::

## Decisions and their reasons

Code shows what an app does, but not why it does it that way. For this, Michael Nygard proposed [architecture decision records](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) in 2011, ADRs for short. An ADR records a single decision that shapes the structure of a piece of software, qualities like performance or security, its dependencies, its interfaces or how it's built. It runs one or two pages and is written for someone who works on the software later and doesn't know the reasons.

## The structure

Nygard proposes a few parts. The title is a short noun phrase. The context describes the forces at play in neutral terms. The decision is written in full sentences and in the active voice. The status says whether the decision holds, and the consequences list everything that follows, good, bad and neutral. The running case app records its decisions in this structure.

::code{file="case/08-architecture/{lang}/docs/adr/0003-shared-state-with-pinia.md"}

The context also names what spoke against Pinia, and the consequences name the extra dependency. Those are exactly the sentences that help later, when someone reconsiders the decision.

## Numbers and statuses

Every ADR gets the next number, and a number is never used twice. A new decision starts out as proposed and is accepted or rejected. An accepted decision can later become deprecated or be superseded by a new one.

![A state diagram. A decision starts as proposed and is accepted or rejected. An accepted decision can later become deprecated or be superseded by a new decision that points to it. No decision is deleted, it keeps its number and stays in the index.](../../../../assets/figures/en/p8c3-adr-status.svg)

## A decision supersedes another

In part 6, the app asked before someone left a half-filled form. In part 7, a draft in `sessionStorage` replaced that question. The old decision stays and points to the new one.

::code{file="case/08-architecture/{lang}/docs/adr/0002-warning-before-leaving.md" lines="1-5"}

The new decision names the old one in its status.

::code{file="case/08-architecture/{lang}/docs/adr/0005-draft-in-session-storage.md" lines="1-5"}

Whoever asks later why the app stopped asking finds both reasons, the one for the question and the one for replacing it.

## Weighing options

If the choice wasn't obvious, a section with the options that were on the table pays off. The template [MADR](https://adr.github.io/madr/), in version 4.0.0 from 2024, provides "Considered Options" for this and, if you like, pros and cons of each option. The decision then says which option was chosen and why the others weren't.

## The place in the repository

ADRs belong in the repository, next to the code they explain. Nygard suggested `doc/arch/adr-NNN.md`, MADR keeps them in `docs/decisions`, and the running case app in `docs/adr` with a file `README.md` that lists every decision with its status. Public administrations work with them as well, the UK government published a [framework for ADRs](https://www.gov.uk/government/publications/architectural-decision-record-framework) for the public sector in 2025.

## Decisions that deserve an ADR

An ADR is worth it for anything that's hard to undo or that would surprise a newcomer, such as the framework, how the files are organized, where state lives, the data source, the kind of history in the router or where the app is published. Variable names or the color of a button don't deserve one.

## In your project

According to the [project assignment](../../project/assignment/), your README contains the important decisions as short architecture decisions. The minimum scope asks for global state for a sensible area or a justified decision against it, recorded as an architecture decision. Record a decision as soon as you make it, while you still know the reasons. The [README template](../../project/readme-template/) contains an example.

## In code

Work with the decisions of the running case app in the folder `case/08-architecture/en/docs/adr` of the course repo. Read first, before you write anything.

1. Read ADR 3. Which sentence of the context would you miss most if it weren't there?
2. Compare ADR 2 and ADR 5. What's left of ADR 2, and why is it worth keeping?
3. The login with an `HttpOnly` cookie from chapter 7.4 has no ADR yet. Write its context in two sentences.
4. Which of these decisions deserve an ADR? The color of the header, Pinia for state, sorting by name as the default, hash mode for the demo.

## Exercises

The exercises record decisions about the favorites and the search. You'll find the project in the folder `exercises/08-architecture/adr/en` of the course repo. You write the decisions in `docs/adr`, `template.md` shows the structure, and ADR 1 serves as an example. The tests check the structure, the status and the links, not the content.

```bash
npm install
npm test
```

::::exercise[Getting started]
Members lose their favorites as soon as they reload the page, and the association has no server that could store them. So the app keeps them in `localStorage`. Record this decision as ADR 2 "Favorites in localStorage" with the sections Status, Context, Decision and Consequences, in full sentences, and add it to the index `docs/adr/README.md`.

:::solution[Solution]
::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/0002-favorites-in-local-storage.md"}

In your version the status reads "Accepted". The solution already shows the status after going further.
:::
::::

::::exercise[Going further]
Members want to see their favorites at the counter and on their phone too. The association's API should store them for members who are signed in. Record this as ADR 3 "Favorites on the server", which supersedes ADR 2. ADR 2 stays, its status reads "Superseded by" with a link to ADR 3, and ADR 3 names ADR 2 with a link in its status. Update the index.

:::solution[Solution]
::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/0003-favorites-on-the-server.md"}

::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/README.md"}
:::
::::

::::exercise[Challenge]
A new volunteer suggests putting the search text into a store. Record this as ADR 4 with the status "Proposed". Between context and decision there's a section "Options" with at least two options as a list, and the decision says which option you propose and why.

:::solution[Solution]
::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/0004-search-text-without-a-store.md"}

A proposal is accepted or rejected only after a discussion. Until then, the ADR records what the team is deciding about.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| An ADR describes what was built, but not why. | Name the forces that led to the decision in the context. |
| An outdated decision gets deleted or overwritten. | Keep it, set its status to "Superseded by" with a link, and point to the old one in the new ADR. |
| The consequences only list advantages. | Also name drawbacks and open questions, they help with later decisions. |
| Every detail gets an ADR. | Only record decisions that are hard to undo or would surprise newcomers. |
| An AI assistant writes an ADR with reasons that never played a role in the project. | The context and the reasons come from you. Check every sentence against what actually happened in the project. |

## Self-check

::::selfcheck
1. Which parts does an ADR have according to Nygard?
2. Why does a superseded decision stay?
3. When is a section with options worth it?
4. Name two decisions in your project that deserve an ADR.

:::solution[Answers]
1. Title, context, decision, status and consequences.
2. It explains why the app used to be different, and the new decision builds on its reasons. The number stays unique.
3. When several solutions were possible and the choice wasn't obvious.
4. For example the framework, the data source, where state lives or where the app is published.
:::
::::

:::assignment
The decisions of the app are in `docs/adr` now, and the new volunteer looks things up there. Shortly afterwards, Martina Hostettler reports an old bug. After a change to the rules, the app accepts requests whose first day has already passed again, although that was fixed once. The next chapter makes sure with tests that a bug like this doesn't come back a third time.
:::
