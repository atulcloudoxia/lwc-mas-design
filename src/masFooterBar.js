import { LightningElement, track } from 'lwc';

export default class FooterBar extends LightningElement {

  @track
  showDeletePrompt=false;

  /**
   * Prompt to delete sale
   *
   * @param (Event) e
   */
  handleDeleteSale(e) {
    this.showDeletePrompt=true;
  }

  /**
   * Confirm delete sale
   *
   * @param (Event) e
   */
  handleConfirm(e) {
    console.log('The event: ', e.payload) // Not sure why this is undefined

    this.dispatchEvent(
      new CustomEvent("delete", { payload: e.payload })
    );
  }

  /**
   * Abort deleting sale
   *
   * @param (Event) e
   */
  handleCancel(e) {
    this.showDeletePrompt=false;
  }

  /**
   * On next page
   *
   * @param (Event) e
   */
  handleNext(e) {
    this.dispatchEvent(
      new CustomEvent("next")
    );
  }

  /**
   * On previous page
   *
   * @param (Event) e
   */
  handlePrevious(e) {
    this.dispatchEvent(
      new CustomEvent("previous")
    );
  }

}
