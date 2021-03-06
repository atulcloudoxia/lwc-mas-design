import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const rowActions = [
  { 
    label: 'Delete Parking', 
    name: 'delete' 
  }
];

const columns = [
  { label: 'Type', fieldName: 'name', editable: true },
  { label: 'Assigned Spot', fieldName: 'website', type: 'url', editable: true },
  { label: 'Asset Price', fieldName: 'phone', type: 'phone', editable: true },
  {
    type: 'action',
    typeAttributes: { 
      rowActions 
    },
  },
]; 

export default class masTableParking extends LightningElement {
  data = [];
  columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
  async connectedCallback() {
    const data = await fetchDataHelper({ amountOfRecords: 3 });
    this.data = data;
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