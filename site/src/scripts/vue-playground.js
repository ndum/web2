/**
 * <vue-playground>: turns the code tabs written by remark-learn-blocks into the Vue playground.
 *
 * Markup in (also what a visitor without JavaScript sees, every file is visible):
 *
 *   <vue-playground data-files='{"App.vue": "...", "ItemCard.vue": "..."}' data-lang="de">
 *     <lt-tabs> one panel per file </lt-tabs>
 *   </vue-playground>
 *
 * The editor, the SFC compiler and the Vue runtime load only when someone opens the playground.
 * All of them come from the course site itself, so no request goes to another host.
 */

const TEXT = {
  de: {
    open: 'Im Playground öffnen',
    close: 'Playground schliessen',
    reset: 'Zurücksetzen',
    loading: 'Der Playground wird geladen …',
    failed: 'Der Playground konnte nicht geladen werden. Die Dateien oben funktionieren auch in einem eigenen Projekt.',
  },
  en: {
    open: 'Open in the playground',
    close: 'Close the playground',
    reset: 'Reset',
    loading: 'Loading the playground …',
    failed: 'The playground could not be loaded. The files above also work in a project of your own.',
  },
};

function button(label, className) {
  const element = document.createElement('button');
  element.type = 'button';
  element.textContent = label;
  if (className) element.className = className;
  return element;
}

class VuePlayground extends HTMLElement {
  #app = null;

  connectedCallback() {
    if (this.hasAttribute('data-ready')) return;
    this.setAttribute('data-ready', '');
    const text = TEXT[this.dataset.lang] ?? TEXT.de;
    this.code = [...this.children];

    this.bar = document.createElement('div');
    this.bar.className = 'lt-play-bar not-content';
    this.openButton = button(text.open, 'lt-play-open');
    this.openButton.setAttribute('aria-expanded', 'false');
    this.resetButton = button(text.reset);
    this.resetButton.hidden = true;
    this.status = document.createElement('span');
    this.status.className = 'lt-play-status';
    this.status.setAttribute('role', 'status');
    this.bar.append(this.openButton, this.resetButton, this.status);

    this.stage = document.createElement('div');
    this.stage.className = 'lt-play-stage not-content';
    this.stage.hidden = true;
    this.append(this.bar, this.stage);

    this.openButton.addEventListener('click', () => (this.#app ? this.#close(text) : this.#open(text)));
    this.resetButton.addEventListener('click', () => this.#reset(text));
  }

  disconnectedCallback() {
    this.#app?.unmount();
    this.#app = null;
  }

  async #mount() {
    const { mountPlayground } = await import('./playground/mount.js');
    this.#app = await mountPlayground(this.stage, JSON.parse(this.dataset.files ?? '{}'));
  }

  async #open(text) {
    this.openButton.disabled = true;
    this.status.textContent = text.loading;
    try {
      this.stage.hidden = false;
      await this.#mount();
      for (const element of this.code) element.hidden = true;
      this.openButton.textContent = text.close;
      this.openButton.setAttribute('aria-expanded', 'true');
      this.resetButton.hidden = false;
      this.status.textContent = '';
    } catch (error) {
      this.stage.hidden = true;
      this.status.textContent = text.failed;
      console.error(error);
    } finally {
      this.openButton.disabled = false;
    }
  }

  #close(text) {
    this.#app?.unmount();
    this.#app = null;
    this.stage.replaceChildren();
    this.stage.hidden = true;
    for (const element of this.code) element.hidden = false;
    this.openButton.textContent = text.open;
    this.openButton.setAttribute('aria-expanded', 'false');
    this.resetButton.hidden = true;
    this.openButton.focus();
  }

  async #reset(text) {
    this.#app?.unmount();
    this.stage.replaceChildren();
    try {
      await this.#mount();
    } catch (error) {
      this.status.textContent = text.failed;
      console.error(error);
    }
  }
}

if (!customElements.get('vue-playground')) customElements.define('vue-playground', VuePlayground);
