import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Company', fieldName: 'company', },
    { label: 'Role', fieldName: 'phone', type: 'phone' },
    { label: 'Status', fieldName: 'amount', type: 'currency' }
]; 

export default class TableContacts extends LightningElement {
    data = [];
    columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 10 });
        this.data = data;
    }
}