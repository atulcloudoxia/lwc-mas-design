import { track, api, LightningElement } from 'lwc';

export default class FormCheck extends LightningElement {

  /**
   * Close window
   *
   * @param (Event) e
   */
  handleClose(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("close")
    );
  }

}
