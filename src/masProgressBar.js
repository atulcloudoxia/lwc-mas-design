import { LightningElement, api, track } from "lwc";

export default class ProgressBar extends LightningElement {

  @api isContact=false;
  @api isAsset=false;
  @api nav={};

  onItemClick(e) {
    const page = event.currentTarget.getAttribute("data-page");
    const enabled = String(event.currentTarget.getAttribute("data-enabled")) === 'true';

    if (enabled) {
      this.dispatchEvent(
        new CustomEvent("page", {
          detail: {
            page
          }
        })
      )
    }
  }
}
