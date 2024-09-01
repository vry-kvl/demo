(() => {
  // app/scripts/cart-page.js
  var CartNote = class extends HTMLElement {
    constructor() {
      super();
      this.querySelector("[name=note]")?.addEventListener("input", theme.debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${theme.routes.cartUpdate}`, { ...theme.request(), ...{ body } });
      }, 300));
    }
  };
  customElements.define("cart-note", CartNote);
})();
