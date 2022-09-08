import { LightningElement, track, api } from 'lwc';
import {
  MOCK_CONTACTS_DATA,
  OPTIONS_ROLES
} from './constants';

export default class FormAddContact extends LightningElement {
  @track selectedContact;
  roleOptions = OPTIONS_ROLES;
  @track contactList = MOCK_CONTACTS_DATA;
  @track role;

  /**
   * Handle add contact form
   *
   * @param (Event) e
   */
  handleFormSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("continue", { detail: {selectedContact: this.selectedContact[0], role:this.role} })
    );
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
  handleContactSelect(event){
    var selectedContactId = event.detail.recordId;
    console.log('selectedContactId: '+selectedContactId);
    this.selectedContact = this.contactList.filter(function (e) {
      console.log(selectedContactId);
      console.log(e.id);
      return selectedContactId == e.id;
    });

  }
  handleRoleChange(e){
    this.role = e.detail.value;

  }
  get displayCorporation(){
    return this.role!=undefined && this.role.includes('corporation');
  }
}
