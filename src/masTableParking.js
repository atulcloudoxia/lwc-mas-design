import { LightningElement, track } from 'lwc';

const rowActions = [
  { 
    label: 'Delete Parking', 
    name: 'delete' 
  }
];

const columns = [
  { label: 'Type', fieldName: 'type', editable: false },
  { label: 'Assigned Spot', fieldName: 'assigned', editable: true },
  { label: 'Asset Price', fieldName: 'price', type: 'currency', editable: true },
  {
    type: 'action',
    typeAttributes: { 
      rowActions 
    },
  },
]; 

export default class masTableParking extends LightningElement {
  columns = columns;

 @track data = [
    { 
        id: 1,
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    { 
        id: 2,
        type: 'Parking Standard',
        assigned: 'Side by Side',
        price: '36933',
    },
  ]

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