import { LightningElement, track, api } from 'lwc';

export default class FormAddContact extends LightningElement {

  /**
   * Handle add contact form
   *
   * @param (Event) e
   */
  handleFormSubmit(e) {
    e.preventDefault();

    // Submit logic
  }

  /**
   * Handle cancel
   *
   * @param (Event) e
   */
  handleCancel(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("close")
    );
  }
}
