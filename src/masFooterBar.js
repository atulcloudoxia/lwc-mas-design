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
    this.dispatchEvent(
      new CustomEvent("delete")
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
}
