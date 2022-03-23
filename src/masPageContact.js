import { LightningElement, track, api } from 'lwc';
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
   * Handle add contact form
   *
   * @param (Event) e
   */
  handleAddContactForm(e) {
    e.preventDefault();

    // Example dispatch event
    this.dispatchEvent(
      new CustomEvent("update", {
        detail: {
          pageIdx: 0,
          completed: false,
          warning: true,
          error: false,
          message: "This page has incomplete information"
        }
      })
    );

    // Close modal
    this.addContact = false;
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
    const index = this.findRowById(id, data);

    if (index !== -1) {
      return data
        .slice(0, index)
        .concat(data.slice(index + 1));
    }
  }

  /**
   * Find row by id
   *
   * @param (Number)  id
   * @param (Array)   data
   */
  findRowById(id, data) {
    let ret = -1;
    data.some((row, index) => {
      if (row.id === id) {
        ret = index;
        return true;
      }
      return false;
    });

    return ret;
  }
}
