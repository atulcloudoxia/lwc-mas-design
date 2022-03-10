import { LightningElement, track } from 'lwc';

const columns = [
    {
      label: 'Quantity',
      fieldName: 'quantity',
      type: 'number',
      editable: false,
      hideDefaultActions:true,
      sortable:true,
      cellAttributes: {
        alignment: 'left',
      },
    },
    {
      label: 'Name',
      fieldName: 'name',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Description',
      fieldName: 'description',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Type',
      fieldName: 'type',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Price',
      fieldName: 'price',
      type: 'currency',
      editable: false,
      hideDefaultActions:true,
      sortable:true
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
      }
    }
];

export default class BasicDatatable extends LightningElement {
    columns = columns;

    @track data = [
      {
          id: 1,
          quantity: 3,
          name: 'Extra 1',
          description: 'lorem ipsum',
          type: 'Upper',
          price: '87272'
      },
      {
          id: 1,
          quantity: 3,
          name: 'Extra 1',
          description: 'lorem ipsum',
          type: 'Bathroom',
          price: '87272'
      },
      {
          id: 1,
          quantity: 3,
          name: 'Extra 1',
          description: 'lorem ipsum',
          type: 'Ground',
          price: '87272'
      },
    ];
}
