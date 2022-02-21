import { LightningElement } from "lwc";

export default class ProgressBar extends LightningElement {
  count = 1;

  step(e) {
    let something =e.getAttribute('data-step');
    alert('test ' + something)
  }

}

customElements.define("progress-bar", ProgressBar.CustomElementConstructor);
