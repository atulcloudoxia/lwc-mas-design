import { track, api, LightningElement } from 'lwc';

export default class FormRentalAsset extends LightningElement {

  @api asset;

  /**
   * Assets form submit
   *
   * @param (Event) e
   */
  handleSubmit(e) {
    e.preventDefault();
    // Nhan, handle "edit" logic here
  }

  /**
   * Cancel form submission
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
