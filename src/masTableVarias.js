import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchDataHelper from './fetchDataHelper';

const rowActions = [
  { 
    label: 'Delete Varia', 
    name: 'delete' 
  }
];

const columns = [
  { 
    label: 'Name', 
    fieldName: 'name',
    editable: true
  },
  {
    type: 'action',
    typeAttributes: { 
      rowActions 
    },
  },
];

export default class Varias extends LightningElement {
  data = [];
  columns = columns;
  record = {};

  @track addVaria = false;

  async connectedCallback() {
    this.data = await fetchDataHelper({ amountOfRecords: 10 });
  }

  /**
   * Search
   */
  handleSearch(evt) {
    const isEnterKey = evt.keyCode === 13;
    const searchTerm = evt.target.value;

    if (isEnterKey) {
      
      // Nhan, handle "search" logic here
    }
  }

  /**
   * Add
   */
  handleAdd(e) {
    this.addVaria=true;
    
  }

  handleFormSubmit(event) {
    event.preventDefault();

    // OnSuccess
    this.addVaria=false;
    // Nhan, handle "add" logic here
  }

  /**
   * Row actions
   */
  handleRowAction(event) {
    const { action, row } = event.detail;

    switch (action.name) {
      case 'delete':
        this.deleteRow(row);
        break;
      // No other actions but delete for now
      default:
    }
  }

  /**
   * Delete
   */
  deleteRow(row) {
    const { id } = row;
    const index = this.findRowById(id);
    
    if (index !== -1) {
      this.data = this.data
        .slice(0, index)
        .concat(this.data.slice(index + 1));
      
      // Nhan, handle delete logic here
    }
  }

  findRowById(id) {
    let ret = -1;
    this.data.some((row, index) => {
      if (row.id === id) {
        ret = index;
        return true;
      }
      return false;
    });
    return ret;
  }
}

