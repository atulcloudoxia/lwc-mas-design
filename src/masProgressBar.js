import { LightningElement, api, track } from "lwc";


export default class ProgressBar extends LightningElement {

  @api isContact=false;
  @api isAsset=false;
  @api nav={};

  onItemClick(event) {
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: event.currentTarget.getAttribute("data-page")
        }
      })
    )
  }
}
