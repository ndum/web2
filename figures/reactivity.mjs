/**
 * Figures of part 5, reactivity and composables. Writes one SVG per language into
 * site/src/assets/figures/<lang>/.
 *
 *   node figures/reactivity.mjs
 */
import { arrow, band, figure, fitted, label, note, save, tile, WIDTH } from './diagram.mjs';

const TEXT = {
  de: {
    dependencies: {
      title: 'Abhängigkeiten verfolgen und auslösen',
      desc:
        'Vier Karten in einer Reihe, das Ref favorites, der berechnete Wert favoriteCount, die Render-Funktion von AppHeader und die ' +
        'Seite mit dem Text 3 Favoriten. ' +
        'Pfeile über der Reihe zeigen, wer wen liest. Die Render-Funktion liest favoriteCount, favoriteCount liest favorites, und Vue ' +
        'merkt sich jede dieser Abhängigkeiten. ' +
        'Pfeile unter der Reihe zeigen, was die Änderung favorites.value.push(3) auslöst. Vue markiert favoriteCount als veraltet, ' +
        'lässt die Render-Funktion neu laufen, ' +
        'und die Seite zeigt den neuen Wert.',
      cards: [
        ['favorites', 'ref'],
        ['favoriteCount', 'computed'],
        ['render()', 'AppHeader'],
        ['Seite', '3 Favoriten'],
      ],
      track: 'Lesen, Vue merkt es sich (track)',
      trigger: 'Ändern, Vue löst neu aus (trigger)',
      reads: 'liest',
      steps: ['veraltet', 'läuft neu', 'neuer Wert'],
      change: 'favorites.value.push(3)',
    },
    choice: {
      title: 'computed oder watch',
      desc:
        'Ein Entscheidungsbaum mit zwei Fragen als Karten. Entsteht ein Wert aus anderen Werten, wie die Zahl der Treffer, dann ' +
        'computed. ' +
        'Soll sonst etwas ausserhalb der Komponente passieren, wie Speichern, der Titel des Tabs oder eine Anfrage an den Server, dann ' +
        'watch oder watchEffect. ' +
        'Reagiert der Code nur auf eine Handlung, wie einen Klick, dann eine Funktion für das Event.',
      questions: ['Entsteht ein Wert aus anderen Werten?', 'Soll ausserhalb der Komponente etwas passieren?'],
      yes: 'ja',
      no: 'nein',
      computed: ['computed', 'Zahl der Treffer'],
      watch: ['watch, watchEffect', 'Speichern, Titel, Server'],
      handler: ['Funktion für ein Event', 'Klick auf Reservieren'],
    },
    lifecycle: {
      title: 'Der Lebenszyklus einer Komponente',
      desc:
        'Eine Zeitachse von oben nach unten in drei Bändern. Beim Einhängen läuft zuerst setup, dann onBeforeMount, dann onMounted, ab ' +
        'hier steht die Komponente im DOM. ' +
        'Bei jeder Änderung des Zustands folgen onBeforeUpdate und onUpdated, ein Pfeil führt von onUpdated zurück zu onBeforeUpdate. ' +
        'Wenn die Komponente verschwindet, folgen onBeforeUnmount und onUnmounted. ' +
        'Rechts steht neben setup, dass dort der Zustand entsteht und es noch kein DOM gibt, neben onMounted, dass dort Fokus, Messen ' +
        'und Listener hingehören, ' +
        'neben den beiden Hooks für Updates, dass sie bei jeder Änderung laufen, und neben onUnmounted, dass dort Listener und Timer ' +
        'aufgeräumt werden.',
      bands: ['Einhängen', 'Aktualisieren', 'Aushängen'],
      hooks: [['setup', 'onBeforeMount', 'onMounted'], ['onBeforeUpdate', 'onUpdated'], ['onBeforeUnmount', 'onUnmounted']],
      notes: {
        setup: 'Zustand anlegen, noch kein DOM',
        onMounted: 'DOM ist da, Fokus, Messen, Listener',
        update: 'bei jeder Änderung des Zustands',
        onUnmounted: 'aufräumen, Listener und Timer entfernen',
      },
    },
  },
  en: {
    dependencies: {
      title: 'Tracking and triggering dependencies',
      desc:
        'Four cards in a row, the ref favorites, the computed value favoriteCount, the render function of AppHeader and the page with ' +
        'the text 3 favorites. ' +
        'Arrows above the row show who reads whom. The render function reads favoriteCount, favoriteCount reads favorites, and Vue ' +
        'remembers each of these dependencies. ' +
        'Arrows below the row show what the change favorites.value.push(3) triggers. Vue marks favoriteCount as stale, runs the render ' +
        'function again, ' +
        'and the page shows the new value.',
      cards: [
        ['favorites', 'ref'],
        ['favoriteCount', 'computed'],
        ['render()', 'AppHeader'],
        ['Page', '3 favorites'],
      ],
      track: 'Reading, Vue remembers it (track)',
      trigger: 'Changing, Vue triggers again (trigger)',
      reads: 'reads',
      steps: ['stale', 'runs again', 'new value'],
      change: 'favorites.value.push(3)',
    },
    choice: {
      title: 'computed or watch',
      desc:
        'A decision tree with two questions as cards. If a value is derived from other values, such as the number of hits, then ' +
        'computed. ' +
        'Otherwise, if something should happen outside the component, such as storing, the title of the tab or a request to the ' +
        'server, then watch or watchEffect. ' +
        'If the code only reacts to an action, such as a click, then a function for the event.',
      questions: ['Is a value derived from other values?', 'Should something happen outside the component?'],
      yes: 'yes',
      no: 'no',
      computed: ['computed', 'number of hits'],
      watch: ['watch, watchEffect', 'storing, title, server'],
      handler: ['Function for an event', 'click on Reserve'],
    },
    lifecycle: {
      title: 'The lifecycle of a component',
      desc:
        'A timeline from top to bottom in three bands. On mounting, setup runs first, then onBeforeMount, then onMounted, from here on ' +
        'the component is in the DOM. ' +
        'Every change of the state is followed by onBeforeUpdate and onUpdated, an arrow leads from onUpdated back to onBeforeUpdate. ' +
        'When the component disappears, onBeforeUnmount and onUnmounted follow. ' +
        'On the right, next to setup it says that the state is created there and there is no DOM yet, next to onMounted that focus, ' +
        'measuring and listeners belong there, ' +
        'next to the two update hooks that they run on every change, and next to onUnmounted that listeners and timers are cleaned up ' +
        'there.',
      bands: ['Mounting', 'Updating', 'Unmounting'],
      hooks: [['setup', 'onBeforeMount', 'onMounted'], ['onBeforeUpdate', 'onUpdated'], ['onBeforeUnmount', 'onUnmounted']],
      notes: {
        setup: 'create state, no DOM yet',
        onMounted: 'DOM is there, focus, measuring, listeners',
        update: 'on every change of the state',
        onUnmounted: 'clean up, remove listeners and timers',
      },
    },
  },
};

// The ref holds the data, the computed value adds up, render() is code and the last card is the page
const CHAIN_ICONS = ['database', 'sigma', 'code', 'browser'];

function dependencies(lang) {
  const t = TEXT[lang].dependencies;
  const id = `p5c1-deps-${lang}`;
  const w = 144;
  const gap = 24;
  const h = 52;
  const top = 100;
  const xs = t.cards.map((_, index) => 16 + index * (w + gap));
  // Every card links to its left neighbour at 0.3 of its width and to its right neighbour at 0.7,
  // so an arrow that ends and one that starts at the same card never meet
  const near = (x) => x + 44;
  const far = (x) => x + w - 44;
  const above = top - 28;
  const below = top + h + 36;
  const body = [label(16, 34, t.track)];
  for (const index of [2, 1]) {
    const from = near(xs[index]);
    const to = far(xs[index - 1]);
    body.push(
      arrow(id, [[from, top], [from, above], [to, above], [to, top - 4]]),
      fitted((from + to) / 2, above - 7, t.reads, from - to - 16, 'middle'),
    );
  }
  t.steps.forEach((step, index) => {
    const from = far(xs[index]);
    const to = near(xs[index + 1]);
    body.push(
      arrow(id, [[from, top + h + 1.5], [from, below], [to, below], [to, top + h + 5.5]], { accent: true }),
      fitted((from + to) / 2, below - 8, step, to - from - 16, 'middle'),
    );
  });
  // The change starts at the ref, the call sits below it
  const call = below + 26;
  body.push(
    arrow(id, [[near(xs[0]), call - 14], [near(xs[0]), top + h + 5.5]], { accent: true }),
    note(16, call, t.change, 'start', { code: true }),
    label(16, call + 32, t.trigger, 'start', { tone: 'blue' }),
  );
  t.cards.forEach(([name, sub], index) => {
    body.push(tile(xs[index], top, w, h, name, sub, { code: index < 3, icon: CHAIN_ICONS[index] }));
  });
  return figure({ id, width: WIDTH, height: call + 32 + 18, title: t.title, desc: t.desc, body });
}

function choice(lang) {
  const t = TEXT[lang].choice;
  const id = `p5c2-choice-${lang}`;
  const qx = 16;
  const qw = 360;
  const ax = 456;
  const aw = WIDTH - 16 - ax;
  const h = 52;
  const step = 96;
  const rows = [16, 16 + step, 16 + 2 * step];
  const body = [];
  t.questions.forEach((question, index) => {
    const y = rows[index];
    body.push(
      // Yes leads to the answer on the right, no to the next row below
      arrow(id, [[qx + qw, y + h / 2], [ax - 4, y + h / 2]], { accent: index === 0 }),
      fitted((qx + qw + ax) / 2, y + h / 2 - 8, t.yes, ax - qx - qw - 16, 'middle'),
      arrow(id, [[qx + qw / 2, y + h + 1.5], [qx + qw / 2, rows[index + 1] - 4]]),
      fitted(qx + qw / 2 + 10, y + h + (step - h) / 2 + 4, t.no, qw / 2 - 20),
      tile(qx, y, qw, h, question),
    );
  });
  body.push(
    tile(ax, rows[0], aw, h, ...t.computed, { accent: true, icon: 'sigma' }),
    tile(ax, rows[1], aw, h, ...t.watch, { icon: 'eye' }),
    tile(qx, rows[2], qw, h, ...t.handler, { icon: 'bolt' }),
  );
  return figure({ id, width: WIDTH, height: rows[2] + h + 18, title: t.title, desc: t.desc, body });
}

function lifecycle(lang) {
  const t = TEXT[lang].lifecycle;
  const id = `p5c3-lifecycle-${lang}`;
  const x = 40;
  const w = 200;
  const h = 36;
  const gap = 22;
  const head = 40;
  const notesX = x + w + 64;
  const notesW = WIDTH - 32 - notesX;
  const body = [];
  const cards = [];
  let y = 16;
  t.hooks.forEach((hooks, group) => {
    const height = head + hooks.length * h + (hooks.length - 1) * gap + 18;
    body.push(
      band(16, y, WIDTH - 32, height, [1, 2, 1][group]),
      label(32, y + 24, t.bands[group], 'start', group === 1 ? { tone: 'blue' } : {}),
    );
    hooks.forEach((hook, row) => cards.push({ hook, y: y + head + row * (h + gap) }));
    y += height + 16;
  });
  const bottom = y - 16;
  const at = (hook) => cards.find((card) => card.hook === hook).y;
  // One arrow from each hook to the next, also across the borders of the bands
  cards.slice(1).forEach((card, index) => {
    body.push(arrow(id, [[x + w / 2, cards[index].y + h + 1.5], [x + w / 2, card.y - 4]]));
  });
  // The two update hooks repeat on every change, the loop runs on the right of their cards
  const loop = x + w + 28;
  const before = at('onBeforeUpdate') + h / 2;
  const after = at('onUpdated') + h / 2;
  body.push(arrow(id, [[x + w, after], [loop, after], [loop, before], [x + w + 4, before]]));
  body.push(
    fitted(notesX, at('setup') + h / 2 + 4, t.notes.setup, notesW),
    fitted(notesX, at('onMounted') + h / 2 + 4, t.notes.onMounted, notesW),
    fitted(notesX, (before + after) / 2 + 4, t.notes.update, notesW),
    fitted(notesX, at('onUnmounted') + h / 2 + 4, t.notes.onUnmounted, notesW),
  );
  for (const card of cards) {
    const accent = card.hook === 'onMounted' || card.hook === 'onUnmounted';
    body.push(tile(x, card.y, w, h, card.hook, '', { accent }));
  }
  return figure({ id, width: WIDTH, height: bottom + 16, title: t.title, desc: t.desc, body });
}

for (const lang of Object.keys(TEXT)) {
  save(lang, 'p5c1-dependencies', dependencies(lang));
  save(lang, 'p5c2-computed-or-watch', choice(lang));
  save(lang, 'p5c3-lifecycle', lifecycle(lang));
}
