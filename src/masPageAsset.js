import { track, LightningElement } from 'lwc';

export default class PageAsset extends LightningElement {

  @track addAsset = false;
  @track salesRep = 'Baker Real Estate';
  @track contractDate = '2020-09-07';
  @track assetPrice = '$1,309,000';
  @track developerSale = 'Yes';

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