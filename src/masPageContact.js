import { LightningElement, track, api } from 'lwc';
import { findRowById } from './utils';
import {
  COLUMNS_CONTACTS,
  OPTIONS_ROLES,
  OPTIONS_LANGUAGES,
  OPTIONS_SALUTATIONS,
  MOCK_CONTACTS
} from './constants';


export default class ContactPage extends LightningElement {

  @api data;

  @track editContact = false;
  @track selectedRow = {};
  @track isCorporation = false;
  @track addContact = false;
  @track errorMessage = "";
  @track hasError = false;

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
         this.data = this.deleteRow(row, this.data);
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
    const { id } = row;
    const index = findRowById(id, data);

    if (index !== -1) {
      return data
        .slice(0, index)
        .concat(data.slice(index + 1));
    }
  }
}
