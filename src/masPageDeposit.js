import { LightningElement, track } from 'lwc';

const rowActions = [
  {
    label: 'Edit',
    name: 'edit'
  },
  {
    label: 'Delete',
    name: 'delete'
  }
];

const columns = [
  {
    label: 'Payment Number',
    fieldName: 'number',
    type: 'number',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Date',
    fieldName: 'date',
    type: 'date',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Deposit To',
    fieldName: 'deposit_to',
    type:'select',
    editable: true
  },
  {
    label: 'Deposit For',
    fieldName: 'deposit_for',
    editable: true
  },
  {
    label: 'Amount',
    fieldName: 'amount',
    editable: true
  },
  {
    label: 'Percent',
    fieldName: 'percent',
    type: 'percent',
    editable: true
  },
  {
    label: 'Received',
    fieldName: 'received',
    type: 'boolean',
    editable: true
  },
  {
    type: 'action',
    typeAttributes: {
      rowActions
    },
  },
];


export default class DepositTable extends LightningElement {
    columns = columns;

    @track data = [
      {
          id: 1,
          number: 1,
          date: '09/01/2022',
          deposit_to: 'notary',
          deposit_for: 'cashdown',
          amount: "100000",
          percent: "0.01",
          received: false
      },
    ];
}
