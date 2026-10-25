---
title: Accessibility
description: The rules of WCAG 2.2 and Switzerland, semantic HTML, names for buttons and links, the keyboard, the focus after a change, status messages, forms, contrast and checking with the browser.
sidebar:
  order: 5
---

:::assignment
A member who works with a screen reader writes to the association. The number of hits in the catalog stays silent, all the "Favorite" buttons sound the same, and after the back button the focus lands in the search field instead of on the thing they were just looking at.

> As a member who works with a screen reader, I want to hear what changes on the page and continue where I was, so that I can use the app without help.

The acceptance criteria are:

1. The screen reader announces the number of hits as soon as it changes.
2. Every button and every link says what it's for, even without its surroundings.
3. After the back button, the focus is on the thing the member came from.
:::

:::goals
After this chapter you can

- explain which rules apply to accessibility,
- work with semantic HTML, labels and names,
- set the focus on purpose after a navigation and after a change,
- announce status messages with live regions,
- check contrast and the keyboard and inspect a page with the browser's tools.
:::

## The rules

The [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/), WCAG for short, have been a W3C Recommendation since October 2023 and were last updated in December 2024. Their success criteria come in the levels A, AA and AAA, and requirements usually ask for level AA. In Switzerland, version 3.0 of the standard [eCH-0059](https://www.ech.ch/de/ech/ech-0059/3.0) from 2020 asks websites to meet WCAG 2.1 at level AA, as a recommendation. Article 14 of the [Disability Discrimination Act](https://www.fedlex.admin.ch/eli/cc/2003/667/de#art_14) requires online services of the Confederation to be accessible to people with visual impairments without aggravating conditions. An SPA needs extra care here, because without a new page a screen reader notices nothing of a change, as chapter 2.1 showed.

## Semantic HTML first

A `button` can be reached and triggered with the keyboard, and a screen reader calls it a button. A `div` with `@click` can do none of that. The [Vue documentation](https://vuejs.org/guide/best-practices/accessibility.html) therefore recommends the fitting elements, headings in their order, landmarks like `header`, `nav`, `main` and `footer`, and a link to skip the navigation as the first element of the page. The running case app puts this link in front of the header.

::code{file="case/08-architecture/{lang}/src/components/PageLayout.vue" lines="1-17"}

The link only moves the focus. An ordinary link to `#main` would turn into a navigation of the router in the hash mode of the demo.

## Names for buttons and links

According to WCAG 4.1.2, every control needs a name that assistive technology can read. The name comes from the element's text, from `aria-label` or from text that's only there for screen readers. A button that only shows a cross has no useful name without one of these.

::playground{dir="examples/08-architecture/accessible-names"}

In the running case app, the buttons and links on the cards now name the thing they belong to, with text that's only there for screen readers. The visible text comes first in the name, so that voice control also finds the button by the word on the screen.

## The keyboard

According to WCAG 2.1.1, everything has to work with the keyboard, in a sensible order and with a visible focus. WCAG 2.2 also asks that your own content, such as a fixed banner, doesn't fully hide the focus, and that pointer targets are at least 24 by 24 pixels or have enough space around them. You can check this without any tool. Put the mouse aside and go through the page with Tab, Shift and Tab, Enter, the space bar and Escape.

## The focus after a change

Since chapter 6.5, the running case app has put the focus on the heading of the new page after a navigation. When someone comes back from a thing to the catalog with the back button, the router restores the old position, and until now the focus landed in the search field far up the page. Now the catalog puts the focus on the card of the thing, without the page jumping.

::code{file="case/08-architecture/{lang}/src/features/catalog/CatalogView.vue" lines="68-76"}

Vue Router keeps the address someone comes back from in `history.state`, and `preventScroll` leaves the restored position alone. When an element that has the focus disappears, for example after removing an entry, the app has to pass the focus on as well. Otherwise the keyboard starts again at the top of the page.

::playground{dir="examples/08-architecture/focus-after-remove"}

## Status messages

According to WCAG 4.1.3, a screen reader has to be able to read status messages without them receiving the focus. That's what live regions are for. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions), a screen reader reads a region with `role="status"` as soon as it's idle, and one with `role="alert"` right away. The region has to be on the page before its content changes.

::playground{dir="examples/08-architecture/live-region"}

The running case app announces the number of hits in the catalog, sent requests and recorded returns this way. Errors while loading come as `role="alert"`.

## Forms

Every field needs a `label` that points to its `id` with `for`. According to the Vue documentation, a placeholder doesn't replace a label. When a field reports an error, `aria-invalid` marks the field, and `aria-describedby` connects it with the message, which a screen reader then reads together with the label.

::code{file="case/08-architecture/{lang}/src/features/reservations/ReservationForm.vue" lines="52-62"}

## Contrast

According to WCAG 1.4.3, text needs a contrast of at least 4.5:1 against its background, large text 3:1. For controls and important graphics, WCAG 1.4.11 asks for at least 3:1. The running case app checks its text colors in a test with the formula of the WCAG.

::code{file="case/08-architecture/{lang}/tests/accessibility.test.js" lines="17-26"}

## Checking with the browser

The [Chrome DevTools](https://developer.chrome.com/docs/devtools/accessibility/reference) show the tree that assistive technology reads in the "Accessibility" pane, with the role and name of every element. Lighthouse rates the accessibility of a page automatically and lists further items that someone has to check by hand. The Accessibility Inspector of Firefox looks for problems with contrast, keyboard and text labels with "Check for issues". A screen reader shows most clearly what a page sounds like. Windows comes with Narrator, macOS with VoiceOver, and NVDA is free for Windows.

## In your project

The minimum scope asks for the basic rules of accessibility. Before you hand in, check that every field has a label, that buttons act and links navigate, that every control has a name, that the focus lands in a sensible place after a navigation, that messages appear in live regions and that text reaches the contrast. Use the app once with the keyboard only and run Lighthouse.

## In code

Work with the examples of this chapter and with the running case app. Write down what you expect before you try anything.

1. In the example with the three buttons, open the developer tools and the "Accessibility" pane. Which name does each button have?
2. In the example with the live region, remove `role="status"`. What changes on the screen, and what for a screen reader?
3. In the example on removing, remove the lines that set the focus and remove an entry with the keyboard. Where does the next Tab take you?
4. Load the catalog in the running case app and press Tab. Which element gets the focus first, and what happens on Enter?

## Exercises

The exercises make a page with a search, favorites and a form accessible. You'll find the project in the folder `exercises/08-architecture/accessibility/en` of the course repo. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Give the search field and the category select a `label` each. Turn the star for favorites into a `button` with `aria-pressed` whose name mentions the thing, and give the remove buttons a name with the thing.

:::solution[Solution]
::code{file="exercises/08-architecture/accessibility/solution/{lang}/src/components/SearchPanel.vue" lines="20-43"}

The star stays visible, `aria-hidden` hides it from the screen reader, and the hidden text supplies the name.
:::
::::

::::exercise[Going further]
Turn the number of hits into a live region that's on the page from the start. In the form, mark a field with an error with `aria-invalid` and connect it to its message with `aria-describedby`. Once the field is right again, the connection disappears.

:::solution[Solution]
::code{file="exercises/08-architecture/accessibility/solution/{lang}/src/components/RequestForm.vue" lines="27-46"}
:::
::::

::::exercise[Challenge]
Whoever removes a favorite loses the focus together with the button. Move it to the entry that takes its place, at the end of the list to the one before, and to the heading once the list is empty.

:::solution[Solution]
::code{file="exercises/08-architecture/accessibility/solution/{lang}/src/components/FavoritesList.vue"}

`nextTick` waits until Vue has redrawn the list. The heading gets `tabindex="-1"`, so it can take the focus without joining the tab order.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A `div` with `@click` serves as a button. | A `button` comes with a role, the focus and the keyboard. |
| A field only has a placeholder. | Use a `label` with `for`. |
| A live region only appears together with its message and stays silent. | Show the region from the start and only change its content. |
| After removing an entry, the keyboard starts again at the top. | Move the focus to the next entry or to a heading. |
| `outline: none` takes the keyboard's orientation away. | Keep the visible focus or design one of your own, as WCAG 2.4.7 asks. |
| An AI assistant puts `aria-label` on elements with visible text and overrides their names that way. | Visible text is usually the best name. Use ARIA only where HTML isn't enough. |

## Self-check

::::selfcheck
1. Which WCAG level do most requirements ask for, and which version is current?
2. Where does a button get its name from?
3. Why does an SPA have to decide about the focus after a navigation?
4. How does a page announce a change without moving the focus?

:::solution[Answers]
1. Level AA, and WCAG 2.2 is current.
2. From its text, from `aria-label` or from text that's only there for screen readers.
3. Without a new page the focus stays where it was, and a screen reader doesn't notice the change.
4. With a live region, such as an element with `role="status"` that's already on the page.
:::
::::

:::assignment
The member writes back that they can now use the catalog without help. Martina Hostettler now wants to show the app at the general meeting, publicly reachable and without a server of the association. The next chapter builds and publishes it.
:::
