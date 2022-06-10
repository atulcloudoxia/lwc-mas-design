import { track, api, LightningElement } from 'lwc';

export default class PageAsset extends LightningElement {

  @api asset;
  @api closingdetail;
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
  get developerDealOptions() {
      return [
          { label: 'true', value: 'true' },
          { label: 'false', value: 'false' }
      ];
  }

  handleDeveloperDealChange(event) {
      var closingdetail = JSON.parse(JSON.stringify(this.closingdetail));
      closingdetail.Developer_Deal__c = event.detail.value;
      this.closingdetail = closingdetail;
  }
}
