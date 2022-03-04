import { track, LightningElement } from 'lwc';

export default class PageContact extends LightningElement {

  @track addContact = false;

  /**
   * Add
   */
  handleAdd(e) {
    this.addContact=true;
  }


  handleFormSubmit(event) {
    event.preventDefault();

    // OnSuccess
    this.addContact=false;
    // Nhan, handle "add" logic here
  }

}