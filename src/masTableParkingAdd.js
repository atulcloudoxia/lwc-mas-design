import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const rowActions = [
  { 
    label: 'Delete Varia', 
    name: 'delete' 
  }
];

const columns = [
    { label: 'Type', fieldName: 'name' },
    { label: 'Assigned Spot', fieldName: 'website', type: 'url' },
    { label: 'Asset Price', fieldName: 'phone', type: 'phone' },
    {
      cellAttributes: {
          iconName: 'utility:add',
      },
  },
]; 

export default class masTableParkingAdd extends LightningElement {
    data = [];
    columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 3 });
        this.data = data;
    }
}