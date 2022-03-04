import { track, LightningElement } from 'lwc';

export default class PageAsset extends LightningElement {

  @track addAsset = false;

  handleEditAsset() {
    this.addAsset=true;
  }

  /**
   * Add
   */
  handleAdd(e) {
    this.addAsset=true;
  }


  handleFormSubmit(event) {
    event.preventDefault();

    // OnSuccess
    this.addAsset=false;
    // Nhan, handle "add" logic here
  }

}