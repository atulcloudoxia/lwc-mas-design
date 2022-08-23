import { LightningElement, track } from 'lwc';

const columns = [
  { label: 'Type', fieldName: 'type', hideDefaultActions:true },
  { label: 'Assigned Spot', fieldName: 'assigned', hideDefaultActions:true },
  { label: 'Price', fieldName: 'price', type: 'currency', hideDefaultActions:true,
    cellAttributes: {
      alignment: 'left',
    },
  },
  {
    type: "button-icon",
    typeAttributes: {
      label: 'Remove',
      name: 'delete',
      title: 'Remove',
      disabled: false,
      value: 'delete',
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

export default class TableParkingAdd extends LightningElement {
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
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    {
        id: 3,
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    {
        id: 4,
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    {
        id: 5,
        type: 'Locker Standard',
        assigned: 'Side by Side',
        price: '30933',
    },
    {
        id: 6,
        type: 'Parking Standard',
        assigned: 'Side by Side',
        price: '36933',
    },
    {
        id: 7,
        type: 'Parking Standard',
        assigned: 'Side by Side',
        price: '36933',
    },
    {
        id: 8,
        type: 'Parking Standard',
        assigned: 'Side by Side',
        price: '36933',
    },
  ]
}
