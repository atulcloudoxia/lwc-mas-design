import { LightningElement, track } from 'lwc';

const rowActions = [
  { 
    label: 'Delete Varia', 
    name: 'delete' 
  }
];

const columns = [
    { label: 'Type', fieldName: 'type'},
    { label: 'Assigned Spot', fieldName: 'assigned' },
    { label: 'Asset Price', fieldName: 'price', type: 'currency'},
    {
      cellAttributes: {
          iconName: 'utility:add',
      },
  },
]; 

export default class masTableParkingAdd extends LightningElement {
    columns = columns;

    @track data = [
    { 
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    { 
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    { 
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    { 
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    { 
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    { 
        type: 'Parking Standard',
        assigned: 'Side by Side',
        price: '36933',
    },
    { 
        type: 'Parking Standard',
        assigned: 'Side by Side',
        price: '36933',
    },
    { 
        type: 'Parking Standard',
        assigned: 'Side by Side',
        price: '36933',
    },
  ]
}