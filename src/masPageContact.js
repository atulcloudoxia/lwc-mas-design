import { LightningElement, track, api } from 'lwc';
import { findRowById } from './utils';
import {
  MOCK_CONTACTS_DATA,
  COLUMNS_CONTACTS,
  OPTIONS_ROLES,
  OPTIONS_LANGUAGES,
  OPTIONS_SALUTATIONS
} from './constants';


export default class ContactPage extends LightningElement {

  @api data;

  @track editContact = false;
  @track selectedRow = {};
  @track isCorporation = false;
  @track addContact = false;

  columns = COLUMNS_CONTACTS;

  /**
   * Add contact
   *
   * @param (Event) e
   */
  handleAddContact(e) {
    this.addContact = true;
  }

  /**
   * Handle close form
   *
   * @param (Event) e
   */
  handleCloseForm(e) {
    this.addContact = false;
    this.editContact = false;
  }

  /**
   * Parse row actions
   *
   * @param (Event) e
   */
   handleRowAction(e) {
     const { action, row } = e.detail;

     switch (action.name) {
       case 'edit':
         this.editRow(row);
         break;

       case 'delete':
         this.data = this.deleteRow(row, [...this.data]);
         this.handleDataUpdate();
         // deleteId - Handle delete logic
         break;

       // No other actions but delete for now
       default:
     }
   }

  /**
   * Edit row
   *
   * @param (Object) row
   */
  editRow(row) {
    const { id } = row;
    console.table(row);
    this.selectedRow = row;
    this.isCorporation = row.role === 'corporation';
    this.editContact = true;
  }

  /**
   * Delete
   *
   * @param (Object)  row
   * @param (Array)   data
   */
  deleteRow(row, data) {
    const { Id } = row;
    console.log( JSON.stringify(Id));
    console.log(JSON.parse(JSON.stringify(data)));
    
    const index = findRowById(Id, data);
    console.log(index);
    if (index !== -1) {
      return data
        .slice(0, index)
        .concat(data.slice(index + 1));
    }
  }

  handleAddContactSubmitForm(event){
    console.log(JSON.stringify(event.detail.selectedContact));
    this.addContact = false;
    if(event.detail.selectedContact!=null){
      var contact = event.detail.selectedContact;
      contact.role = event.detail.role;
      var data = [...this.data];
      data.splice(this.data.length+1,0,contact);
      this.data = data;
    }
    this.handleDataUpdate();
  }
  handleDataUpdate(){

    var buyer1Found = false;
    var buyer2Found= false;
    var corporationFound= false;
    console.log( this.data );
    for(let conRole of [...this.data] ){
      console.log('===conRole===');
      console.log(conRole);
        if(conRole.Role == 'Buyer 1' || conRole.Role == 'buyer-1'){
            buyer1Found = true;
        }
        if(conRole.Role == 'Buyer 2' || conRole.Role == 'buyer-2'){
            buyer2Found = true;
        }
        if(conRole.Role == 'Corporation' || conRole.Role == 'corporation'){
            corporationFound = true;
        }
    }

      if (corporationFound == true) {
        if (buyer2Found == true || buyer1Found == true) {
            //alert($A.get('$Label.c.MAS_Corporation_Role_Error'));
            alert('MAS_Corporation_Role_Error');
            return;
        }
    }
    else if(buyer1Found == false){
        //alert($A.get('$Label.c.MAS_Buyer_Required_Error'));
        alert('MAS_Buyer_Required_Error');
        return;
    }  
    

    let rowAddEvent = new CustomEvent('updatedata',{
      detail: {
        contactdata: this.data 
      },
      bubbles: true,
      composed: false
    });
    this.dispatchEvent(rowAddEvent);
  }
  handleEditFormSave(event){
    
    
    if(event.detail.contact!=null){
      var contact = event.detail.contact;
      console.table(contact);
      contact.Name = contact.FirstName +' '+contact.LastName;
      var contactList = [...this.data];
      var index = contactList.findIndex(x => x.Id ===contact.Id);

      console.log(index);
      
      contactList.splice(index,1,contact);
      this.data = contactList;
      console.table(JSON.parse(JSON.stringify(this.data)));
      this.handleCloseForm();
      this.handleDataUpdate();
    }
    
  }
}
