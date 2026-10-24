---
title: Web pages and web apps
description: Multi-page websites, single page applications, pages rendered on the server and pages built ahead of time, what an SPA costs and when it doesn't pay off.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler showed the overview to the board, and a question came up that she passes on.

> Why do we need an app? Wouldn't an ordinary website with pages do, like the one of the neighborhood association?

> As a board member, I want to understand why the catalog should become an app and not an ordinary website, so that we can free up the volunteers' time for it.

The acceptance criteria for your answer are:

1. It explains the difference between an ordinary website and an app without assuming technical terms.
2. It names at least two advantages and two disadvantages of an app for Lorraine Commons.
3. It recommends a solution and gives reasons for it.
:::

:::goals
After this chapter you can

- explain how a multi-page website and a single page application load pages,
- place server-side rendering and statically generated pages,
- name the costs of an SPA, for the first load, search engines, JavaScript and accessibility,
- decide with reasons whether an SPA pays off for a project.
:::

## The classic website

On a classic website, every address has a page of its own. When someone clicks a link, the browser requests the next page from the server, receives a complete HTML document and builds the display anew. Since such a website consists of many pages, it is called a multi-page application, MPA for short.

The pages can sit on the server as files or be created on every request, for example with PHP, Java or Node. The browser takes care of a lot by itself. It keeps the list for the "Back" button, jumps to the top of the page when it loads and announces the title. An MPA also works without JavaScript, and every page has an address that search engines and previews in chats can read.

![Requests of a multi-page website and of an SPA. On the left a multi-page website, on the right a single page application, each in three steps. When the catalog opens, the multi-page website loads a whole page, the SPA an almost empty page, its JavaScript and the data as JSON. On the following clicks, the multi-page website loads a whole page each time, while the SPA sends no request.](../../../../assets/figures/en/p2c1-requests.svg)

## The single page application

A single page application, SPA for short, loads one single, almost empty HTML page plus its JavaScript. The JavaScript loads the data as JSON, like the overview from part 1, and builds the display from it. When someone clicks a link, the browser doesn't request a new page. The JavaScript shows another view and changes the address while doing so, so that the "Back" button and links to single views keep working.

After the first load, an SPA feels like a program. A click shows the result right away, a search field filters while you type, and data such as a half-filled form stay around while someone looks something up in another view. Typical SPAs are webmail, maps, tools for working together and the interfaces of many administration systems.

## Pages on the server and ahead of time

Between MPA and SPA there are mixed forms. With server-side rendering, SSR for short, the server already creates the first page as finished HTML, with the same components that later run in the browser. Then the JavaScript takes over, and the page behaves like an SPA. For Vue, Nuxt does this, one of the optional topics of this course.

With a statically generated website, static site generation or SSG for short, all pages are created as finished HTML files when the site is published. This course site is built that way. When it is published, the tool Astro creates an HTML page from every chapter, and only single parts such as the "Run" button bring JavaScript of their own. Such islands of JavaScript in static pages are another mixed form.

## The costs of an SPA

An SPA has its price, and it falls where an MPA gets a lot for free.

1. The first load takes longer. Before anything appears, the browser has to load and run the JavaScript and fetch the data. Over a slow connection, members see an empty page or a loading notice until then.
2. Search engines and previews see less. Google runs JavaScript, but with a delay and not always completely. Other search engines and the previews in chat apps often see only the almost empty page.
3. Nothing works without JavaScript. If a browser blocks the script or it stops with an error, the page stays empty.
4. Accessibility takes work. When the view changes without a new page, a screen reader doesn't notice, the focus stays where it was and the title doesn't change. The app has to handle this itself, and part 6 and part 8 show how.
5. The structure gets more demanding. State, routing and build tools come in, which an MPA doesn't need.

## The right way to build

For content that people mainly read, an SPA is usually the wrong choice. A blog, a newspaper, documentation or the page of an association with opening hours and address are faster, simpler and better for search engines as an MPA or a statically generated website. An SPA pays off where people do a lot with the data, search, filter, select and enter things, and where they open the app again and again.

For Lorraine Commons both apply. The catalog with search, filters, reservations and an area for the team is an application that members and volunteers use often. The public information about the association, on the other hand, is read by people who don't know it yet and find it through a search engine. That's why many organizations separate the two parts, a static website for the information and an SPA for the application.

## Common mistakes

| Mistake | What helps |
|---|---|
| An SPA is assumed to be faster than any website. | After the first load yes, on the first load usually not. Measure both, for example in the network panel from the chapter "Tools". |
| Search engines are said to see an SPA exactly like an ordinary page. | Only Google runs JavaScript reliably. For content that must be found, choose SSR or static pages. |
| An SPA seems impossible without a framework. | The next chapter builds one by hand. A framework makes the work easier, it doesn't make it possible. |
| SSR is understood to mean that no JavaScript runs in the browser anymore. | With SSR the first page comes finished from the server, then JavaScript takes over as in an SPA. |
| An SPA is said to need no server. | The files of the SPA sit on a server, and the data come from an API, even if no server creates pages. |
| An AI assistant suggests an SPA framework for every website. | First clarify whether people mainly read the content or work with it. |

## Exercises

::::exercise[Getting started]
Assign each of these offerings to a way of building, multi-page website, SPA or statically generated website, and give a reason in one sentence. The course site WEB2, a webmail program, the website of a daily newspaper, an online city map on which you draw routes, and the page of a soccer club with fixtures and contact details.

:::solution[Solution]
The course site is statically generated, all chapters are created when it is published. Webmail is an SPA, you work in it for a long time and switch views often. The daily newspaper is usually a multi-page website with pages from the server, since the articles must be found and open quickly. The city map is an SPA, it reacts to input all the time. The soccer club's page suits a statically generated website, it is read and rarely changed. For the borderline cases, the reasoning counts more than the assignment.
:::
::::

::::exercise[Going further]
Write the answer to the board of Lorraine Commons, five to eight sentences without technical terms. It meets the three acceptance criteria of the assignment.

:::solution[Solution]
For example this answer.

> An ordinary website loads a new page from the server on every click. An app loads everything it needs once and then shows every view right away. A lot speaks for an app for the catalog, since members search and filter, reserve things, and the volunteers at the counter work with it all afternoon. An app has disadvantages too. Opening it the first time takes a bit longer, and search engines find its content less well. So I suggest two parts. The information about the association stays an ordinary website that people find through search engines. The catalog becomes an app for members and volunteers.

The answer explains the difference with a picture from everyday life, names the advantages for the people who use the app and doesn't hide the costs.
:::
::::

::::exercise[Challenge]
Members should be able to share links to single things in chats, and people with a screen reader should be able to use the catalog without obstacles. What does the SPA have to take care of itself that the browser handles for a multi-page website? Name at least four points.

:::solution[Solution]
1. Every view needs an address of its own, so that a link leads straight to the thing and the "Back" button works.
2. When the view changes, the app has to update the title of the page.
3. It has to put the focus at the start of the new view or have the change announced, so that a screen reader notices it.
4. It has to jump to the top on a change and restore the old position on "Back".
5. Previews in chats need information that is readable without JavaScript, for example with pages from the server or pages generated ahead of time for the things.

In part 6, Vue Router handles the first four points with little code. The fifth one is a reason for SSR, which the optional topic on Nuxt shows.
:::
::::

## Self-check

::::selfcheck
1. What does the server send on a click in a multi-page website, and what in an SPA?
2. How do server-side rendering and statically generated pages differ?
3. Name three costs of an SPA.
4. For which parts of Lorraine Commons does an SPA pay off, and for which not?

:::solution[Answers]
1. In a multi-page website the server sends a whole new page. In an SPA it often sends nothing at all on a click, at most data as JSON, and the JavaScript builds the display.
2. With server-side rendering the page is created on the server for every request. Statically generated pages are created once when the site is published and then wait as files.
3. For example a slower first load, less visibility for search engines and previews, an empty page without JavaScript, extra work for accessibility and a more demanding structure.
4. It pays off for the catalog with search, reservations and the area for the team. Not for the public information about the association, which search engines should find.
:::
::::

:::assignment
The board agrees, the catalog becomes an app. Before the volunteers choose a tool, though, Martina Hostettler wants to see what makes an SPA work. "Why don't you build a first version without any tools, with the catalog and a page for every thing?" That's the next chapter.
:::
