// <lt-run> adds a run button and an editor to an embedded JavaScript or HTML example. The markup
// comes from remark-learn-blocks and keeps the file in data-code:
//
//   <lt-run data-lang="js" data-file="example.mjs" data-code="..."> code block </lt-run>
//
// JavaScript runs in a module worker. HTML runs in a frame with sandbox="allow-scripts", which
// cannot reach the page, its console output comes back as messages. Nothing leaves the browser.
// Without JavaScript the code block stays as it is.

const TIMEOUT_SECONDS = 10;

const STRINGS = {
  de: {
    run: 'Ausführen',
    stop: 'Stopp',
    edit: 'Bearbeiten',
    reset: 'Zurücksetzen',
    editor: (language) => `Code bearbeiten (${language})`,
    hint: 'Tab rückt ein. Mit Esc und danach Tab verlässt du das Feld.',
    output: 'Ausgabe',
    page: 'Seite',
    running: 'Das Programm läuft.',
    done: (lines) => (lines === 1 ? 'Fertig, 1 Zeile Ausgabe.' : `Fertig, ${lines} Zeilen Ausgabe.`),
    shown: 'Die Seite ist oben zu sehen.',
    failed: 'Das Programm ist mit einem Fehler abgebrochen.',
    line: (number) => `Zeile ${number}`,
    timeout: (seconds) => `Nach ${seconds} Sekunden abgebrochen.`,
    stopped: 'Abgebrochen.',
  },
  en: {
    run: 'Run',
    stop: 'Stop',
    edit: 'Edit',
    reset: 'Reset',
    editor: (language) => `Edit the code (${language})`,
    hint: 'Tab indents. Press Esc and then Tab to leave the field.',
    output: 'Output',
    page: 'Page',
    running: 'The program is running.',
    done: (lines) => (lines === 1 ? 'Done, 1 line of output.' : `Done, ${lines} lines of output.`),
    shown: 'The page is shown above.',
    failed: 'The program stopped with an error.',
    line: (number) => `line ${number}`,
    timeout: (seconds) => `Stopped after ${seconds} seconds.`,
    stopped: 'Stopped.',
  },
};

const LANGUAGE_NAMES = { js: 'JavaScript', html: 'HTML' };

// Prints values roughly the way Node.js does, shared by the worker and the HTML frame
const FORMAT = `
const format = (value, top) => {
  if (typeof value === 'string') return top ? value : "'" + value + "'";
  if (value === null || typeof value !== 'object') {
    return typeof value === 'function' ? '[Function: ' + (value.name || 'anonymous') + ']' : String(value);
  }
  if (Array.isArray(value)) return value.length ? '[ ' + value.map((item) => format(item, false)).join(', ') + ' ]' : '[]';
  if (value instanceof Error) return String(value);
  // Whether a promise is settled cannot be read synchronously, Node would show its state
  if (value instanceof Promise) return 'Promise {}';
  const entries = Object.entries(value).map(([key, item]) => key + ': ' + format(item, false));
  return entries.length ? '{ ' + entries.join(', ') + ' }' : '{}';
};`;

// Runs inside the JavaScript worker, console.log goes to the page. Like Node, the program is only
// done when no timer is left, so output from setTimeout and from promises that wait for a timer
// still arrives. Work that is not a timer, such as reading a response body, has to be awaited.
const JS_WORKER = `${FORMAT}
const send = (kind, text, line) => postMessage({ kind, text, line });
console.log = console.info = (...values) => send('out', values.map((value) => format(value, true)).join(' '));
console.error = console.warn = (...values) => send('err', values.map((value) => format(value, true)).join(' '));
const describe = (error) => (error && error.name ? error.name + ': ' + error.message : String(error));
const lineOf = (error) => {
  const place = /:(\\d+):\\d+\\)?\\s*$/m.exec(String(error && error.stack));
  return place ? Number(place[1]) : null;
};
const nativeSetTimeout = self.setTimeout.bind(self);
const nativeClearTimeout = self.clearTimeout.bind(self);
const nativeSetInterval = self.setInterval.bind(self);
const nativeClearInterval = self.clearInterval.bind(self);
const timers = new Set();
let settle = () => {};
// Looks again after the pending microtasks, a callback may have started the next timer
const check = () => nativeSetTimeout(() => timers.size === 0 && settle(), 0);
self.setTimeout = (callback, delay, ...args) => {
  const id = nativeSetTimeout(() => {
    timers.delete(id);
    try {
      callback(...args);
    } finally {
      check();
    }
  }, delay);
  timers.add(id);
  return id;
};
self.clearTimeout = (id) => {
  timers.delete(id);
  nativeClearTimeout(id);
  check();
};
self.setInterval = (callback, delay, ...args) => {
  const id = nativeSetInterval(callback, delay, ...args);
  timers.add(id);
  return id;
};
self.clearInterval = (id) => {
  timers.delete(id);
  nativeClearInterval(id);
  check();
};
self.addEventListener('unhandledrejection', (event) => {
  event.preventDefault();
  send('error', describe(event.reason), lineOf(event.reason));
});
self.onmessage = async ({ data }) => {
  const url = URL.createObjectURL(new Blob([data.code], { type: 'text/javascript' }));
  try {
    await import(url);
    await new Promise((resolve) => {
      settle = resolve;
      check();
    });
  } catch (error) {
    send('error', describe(error), lineOf(error));
  } finally {
    URL.revokeObjectURL(url);
    send('done');
  }
};`;

// Goes first into an HTML example, the frame reports console output and errors to the page
const HTML_PRELUDE = `<script>${FORMAT}
const send = (kind, text) => parent.postMessage({ source: 'lt-run', id: __RUN_ID__, kind, text }, '*');
console.log = console.info = (...values) => send('out', values.map((value) => format(value, true)).join(' '));
console.error = console.warn = (...values) => send('err', values.map((value) => format(value, true)).join(' '));
addEventListener('error', (event) => send('error', event.message));
// A click on a link with a hash would load an empty page in a srcdoc frame, so the hash is set instead
addEventListener('click', (event) => {
  const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
  if (!link || event.defaultPrevented) return;
  event.preventDefault();
  location.hash = link.getAttribute('href');
});
<\/script>`;

function runJavaScript(code, listener) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(new Blob([JS_WORKER], { type: 'text/javascript' }));
    const worker = new Worker(url, { type: 'module' });
    URL.revokeObjectURL(url);
    const finish = () => {
      worker.terminate();
      resolve();
    };
    listener.cancel = finish;
    worker.addEventListener('message', ({ data }) => {
      listener(data);
      if (data.kind === 'done') finish();
    });
    worker.addEventListener('error', (event) => {
      event.preventDefault();
      listener({ kind: 'error', text: event.message });
      listener({ kind: 'done' });
      finish();
    });
    listener({ kind: 'ready' });
    worker.postMessage({ code });
  });
}

let counter = 0;

class LtRun extends HTMLElement {
  connectedCallback() {
    if (this.hasAttribute('data-ready')) return;
    this.setAttribute('data-ready', '');
    this.lang2 = (document.documentElement.lang || 'en').startsWith('de') ? 'de' : 'en';
    this.t = STRINGS[this.lang2];
    this.language = this.dataset.lang === 'html' ? 'html' : 'js';
    this.original = this.dataset.code ?? '';
    this.build();
  }

  build() {
    const t = this.t;
    const id = `lt-run-${++counter}`;
    this.runId = counter;
    this.view = this.firstElementChild;

    this.editorBox = document.createElement('div');
    this.editorBox.className = 'lt-run-editor';
    this.editorBox.hidden = true;
    this.editorBox.innerHTML = `
      <label class="lt-run-label" for="${id}-code"></label>
      <textarea id="${id}-code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-describedby="${id}-hint"></textarea>
      <p class="lt-run-hint" id="${id}-hint"></p>`;
    this.editorBox.querySelector('label').textContent = t.editor(LANGUAGE_NAMES[this.language]);
    this.editorBox.querySelector('.lt-run-hint').textContent = t.hint;
    this.textarea = this.editorBox.querySelector('textarea');
    this.textarea.value = this.original;

    const bar = document.createElement('div');
    bar.className = 'lt-run-bar';
    bar.innerHTML = `
      <button type="button" class="lt-run-go"></button>
      <button type="button" class="lt-run-edit" aria-pressed="false"></button>
      <button type="button" class="lt-run-reset" hidden></button>
      <span class="lt-run-status" role="status"></span>`;
    this.runButton = bar.querySelector('.lt-run-go');
    this.editButton = bar.querySelector('.lt-run-edit');
    this.resetButton = bar.querySelector('.lt-run-reset');
    this.status = bar.querySelector('.lt-run-status');
    this.runButton.textContent = t.run;
    this.editButton.textContent = t.edit;
    this.resetButton.textContent = t.reset;

    this.pageBox = document.createElement('div');
    this.pageBox.className = 'lt-run-page';
    this.pageBox.hidden = true;
    this.pageBox.innerHTML = `<p class="lt-run-out-label" id="${id}-page"></p>`;
    this.pageBox.querySelector('p').textContent = t.page;

    this.outputBox = document.createElement('div');
    this.outputBox.className = 'lt-run-out';
    this.outputBox.hidden = true;
    this.outputBox.innerHTML = `<p class="lt-run-out-label" id="${id}-out"></p><pre aria-labelledby="${id}-out"><code></code></pre>`;
    this.outputBox.querySelector('.lt-run-out-label').textContent = t.output;
    this.output = this.outputBox.querySelector('code');

    this.append(this.editorBox, bar, this.pageBox, this.outputBox);
    this.runButton.addEventListener('click', () => (this.listener ? this.stop() : this.run()));
    this.editButton.addEventListener('click', () => this.toggleEditor());
    this.resetButton.addEventListener('click', () => {
      this.textarea.value = this.original;
      this.fitEditor();
      this.textarea.focus();
    });
    this.textarea.addEventListener('input', () => this.fitEditor());
    this.textarea.addEventListener('keydown', (event) => this.onKey(event));
  }

  toggleEditor() {
    const editing = this.editorBox.hidden;
    this.editorBox.hidden = !editing;
    this.resetButton.hidden = !editing;
    if (this.view) this.view.hidden = editing;
    this.editButton.setAttribute('aria-pressed', String(editing));
    if (editing) {
      this.fitEditor();
      this.textarea.focus();
    }
  }

  fitEditor() {
    this.textarea.rows = Math.max(4, this.textarea.value.split('\n').length + 1);
  }

  // Tab indents like in an editor. Esc first lets the next Tab move the focus as usual.
  onKey(event) {
    if (event.key === 'Escape') {
      this.escaped = true;
      return;
    }
    if (event.key === 'Tab' && !event.shiftKey && !this.escaped && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      if (!document.execCommand?.('insertText', false, '  ')) {
        this.textarea.setRangeText('  ', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
        this.fitEditor();
      }
    }
    this.escaped = false;
  }

  code() {
    return this.editorBox.hidden ? this.original : this.textarea.value;
  }

  async run() {
    const t = this.t;
    this.output.replaceChildren();
    this.outputBox.hidden = true;
    this.lines = 0;
    this.failed = false;
    this.status.textContent = t.running;
    if (this.language === 'html') {
      this.showPage();
      return;
    }
    this.outputBox.hidden = false;
    this.runButton.textContent = t.stop;
    const listener = (message) => this.receive(message);
    this.listener = listener;
    await runJavaScript(this.code(), listener);
    clearTimeout(this.timer);
    if (this.listener === listener) this.listener = null;
    this.runButton.textContent = t.run;
  }

  /** Renders an HTML example in a sandboxed frame and collects what it logs. */
  showPage() {
    const t = this.t;
    this.pageBox.querySelector('iframe')?.remove();
    window.removeEventListener('message', this.onFrameMessage ?? (() => {}));
    const frame = document.createElement('iframe');
    // allow-forms lets submit events fire, the frame still cannot reach the page or navigate it
    frame.setAttribute('sandbox', 'allow-scripts allow-forms');
    frame.setAttribute('title', `${t.page}: ${this.dataset.file ?? ''}`);
    frame.srcdoc = HTML_PRELUDE.replace('__RUN_ID__', String(this.runId)) + this.code();
    this.onFrameMessage = ({ data, source }) => {
      if (source !== frame.contentWindow || data?.source !== 'lt-run' || data.id !== this.runId) return;
      this.outputBox.hidden = false;
      if (data.kind === 'error') {
        this.failed = true;
        this.print(data.text, true);
        this.status.textContent = t.failed;
      } else {
        this.print(data.text, data.kind === 'err');
      }
    };
    window.addEventListener('message', this.onFrameMessage);
    this.pageBox.append(frame);
    this.pageBox.hidden = false;
    this.status.textContent = t.shown;
  }

  receive(message) {
    const t = this.t;
    switch (message.kind) {
      case 'ready':
        this.status.textContent = t.running;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.stop(t.timeout(TIMEOUT_SECONDS)), TIMEOUT_SECONDS * 1000);
        break;
      case 'out':
        this.print(message.text);
        break;
      case 'err':
        this.print(message.text, true);
        break;
      case 'error':
        this.failed = true;
        this.print(message.line ? `${message.text} (${t.line(message.line)})` : message.text, true);
        break;
      case 'done':
        this.status.textContent = this.failed ? t.failed : t.done(this.lines);
        break;
    }
  }

  print(text, error = false) {
    for (const line of String(text).split('\n')) {
      const span = document.createElement('span');
      span.textContent = `${line}\n`;
      if (error) span.className = 'lt-run-error';
      this.output.append(span);
      this.lines += 1;
    }
  }

  stop(reason = this.t.stopped) {
    const listener = this.listener;
    if (!listener) return;
    this.listener = null;
    clearTimeout(this.timer);
    listener.cancel?.();
    this.print(reason, true);
    this.status.textContent = reason;
    this.runButton.textContent = this.t.run;
  }
}

if (!customElements.get('lt-run')) customElements.define('lt-run', LtRun);
