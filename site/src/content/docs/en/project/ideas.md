---
title: Project ideas
description: Directions for a project idea of your own from clubs, schools, hobbies and small businesses, what makes an idea viable and why rebuilt tutorial apps aren't approved.
sidebar:
  order: 3
---

You pick the idea for your project yourself. That's easiest when you know people who could use an app and whom you can ask a question. This page gives directions, not finished assignments, and your teacher approves the idea together with the sketch.

## Directions

Many good ideas come from a setting you know.

1. A club, such as a sports club with training plans, attendance and car pools to matches, or a band with rehearsals, songs and set lists.
2. A school or a training company, such as an overview of exams with study plans or a booking of rooms and equipment.
3. A hobby, such as a collection with the condition and value of each piece, a log of tours with routes and weather or a garden calendar with sowing and harvest.
4. A small business, such as orders for a farm shop, appointments for a studio or shift plans for a café.
5. A neighborhood, such as a seed swap, a calendar of street parties or classes at a community center.

A lending service for things like the running case is too close to Lorraine Commons. Pick another topic or an idea that does clearly more.

## Checking an idea

An idea carries the project when it meets the [minimum scope](../assignment/#minimum-scope) without tricks. These questions help with checking it.

1. Can you write down five user stories of people who exist or could exist?
2. Does the app have at least four pages, one of them with a parameter like the number of an entry?
3. Do the data have relations, such as teams with trainings and players, instead of a single list?
4. Is there state that several pages need, or a good reason to do without it?
5. Is there a form with rules that deserve checking?
6. Where do the data come from, a public API, your own backend or a stand-in in the browser?

## Data for the project

A public API is one option for data, for example from the portal [opendata.swiss](https://opendata.swiss/) with open data of the Confederation, the cantons and the municipalities. Before you choose one, check whether the API works without a key or whether a key may only live on a server. A key in the code in the browser is readable by everyone, as chapter 8.6 shows. Without a fitting API, you simulate the data with a stand-in in the browser, like the demo of the running case app. Your own backend earns bonus points, but it isn't required.

## Rebuilt tutorial apps

Your teacher doesn't approve an app that rebuilds a well-known tutorial, such as a plain to-do list, a counter or a weather display without an idea of your own. Such apps don't show that you can design an SPA yourself, and their solutions are all over the web. A well-known kind of app can still fit when it gets rules, data and pages of its own for a particular group.
