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
    
    @track data = [
    {
        id: 1,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30933',
    },
    {
        id: 2,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30933',
    },
    {
        id: 3,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30933',
    },
    {
        id: 4,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30933',
    },
    {
        id: 5,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30933',
    },
    {
        id: 6,
        Type__c: 'Parking Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '36933',
    },
    {
        id: 7,
        Type__c: 'Parking Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '36933',
    },
    {
        id: 8,
        Type__c: 'Parking Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '36933',
    },
  ]
  @api
  addRowAfterDelete() {
    console.log('addRowAfterDelete');
    //this.data;
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
      console.log('// '+this.data[index]);
      let rowAddEvent = new CustomEvent('rowadd',{
        detail: {
          row:this.data[index]
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
