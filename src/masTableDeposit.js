import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const rowActions = [
  { 
    label: 'Delete Parking', 
    name: 'delete' 
  }
];

const columns = [
  { label: 'Date', fieldName: 'date', editable: true },
  { label: 'Deposit To', fieldName: 'name', editable: true },
  { label: 'Deposit For', fieldName: 'company',  editable: true },
  { label: 'Received', fieldName: 'id', editable: true },
  { label: 'Amount', fieldName: 'amount', type: 'currency', editable: true },
  { label: 'Percent', fieldName: 'phone', type: 'phone', editable: true },
  {
    type: 'action',
    typeAttributes: { 
      rowActions 
    },
  },
]; 


export default class BasicDatatable extends LightningElement {
    data = [];
    columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 3 });
        this.data = data;
    }
}