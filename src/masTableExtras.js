import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const columns = [
    { label: 'Quantity', fieldName: 'quantity' },
    { label: 'Name', fieldName: 'website', type: 'url' },
    { label: 'Description', fieldName: 'phone', type: 'phone' }
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