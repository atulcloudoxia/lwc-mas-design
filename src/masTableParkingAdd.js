import { LightningElement, track, api} from 'lwc';

const rowActions = [
  {
    label: 'Delete Varia',
    name: 'delete'
  }
];

const columns = [
  { label: 'Type', fieldName: 'Type__c'},
  { label: 'Assigned Spot', fieldName: 'Assigned_Spot__c' },
  { label: 'Asset Price', fieldName: 'Price__c', type: 'currency'},
  {
    type: "button-icon",
    typeAttributes: {
      label: 'Remove',
      name: 'add',
      title: 'Remove',
      disabled: false,
      value: 'add',
      iconPosition: 'left',
      iconName: 'utility:add',
      variant: 'success',
      class:'addbutton',
      iconClass: 'addbutton__icon'
    },
    cellAttributes: {
      alignment: 'right',
    },
  }
];

export default class masTableParkingAdd extends LightningElement {
    columns = columns;
    
  @api availableParkings;
  @api
  addRowAfterDelete() {
    console.log('addRowAfterDelete');
    //this.availableParkings;
  }
  
  /**
     * Row actions
     */
   handleRowAction(event) {
    const { action, row } = event.detail;

    switch (action.name) {
      case 'add':
        this.addRow(row);
        this.deleteRow(row); //delete after it got added to the parent
        break;
      // No other actions but delete for now
      default:
    }
  }
  addRow(row){
    const { id } = row;
    const index = this.findRowById(id);
    if (index !== -1) {
      console.log('// '+this.availableParkings[index]);
      let rowAddEvent = new CustomEvent('rowadd',{
        detail: {
          row:this.availableParkings[index]
        },
        bubbles: true,
        composed: false
      });
      this.dispatchEvent(rowAddEvent);
     
    }
  }
  /**
     * Delete
     */
   deleteRow(row) {
    const { id } = row;
    const index = this.findRowById(id);

    if (index !== -1) {
      this.availableParkings = this.availableParkings
        .slice(0, index)
        .concat(this.availableParkings.slice(index + 1));

      // Nhan, handle delete logic here
    }
  }
  findRowById(id) {
    let ret = -1;
    this.availableParkings.some((row, index) => {
      if (row.id === id) {
        ret = index;
        return true;
      }
      return false;
    });
    return ret;
  }

  
}
