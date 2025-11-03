class CustomDropdown extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector("details.custom-dropdown");
    if (!this.mainDetailsToggle) return;

    this.summary = this.mainDetailsToggle.querySelector(
      "summary.custom-dropdown"
    );
    this.content = this.summary.nextElementSibling;

    this.mainDetailsToggle.addEventListener("toggle", this.onToggle.bind(this));

    this.summary.addEventListener("click", (event) => {
      // Allow link clicks as normal (do not prevent default)
      if (event.target.tagName.toLowerCase() === "a") return;

      // Let summary toggle open/close normally on click
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute("open")) {
      this.animations.forEach((an) => an.play());
      this.summary.classList.add("arrow-rotated");
    } else {
      this.animations.forEach((an) => an.cancel());
      this.summary.classList.remove("arrow-rotated");
      // Only remove bold if it’s not the current active page
      const item = this.summary.querySelector(".sidebar-menu__item");
      if (item && !item.classList.contains("current-page")) {
        item.classList.remove("sidebar-menu__item--active");
      }
    }
  }
}
customElements.define("custom-dropdown-wrapper", CustomDropdown);
