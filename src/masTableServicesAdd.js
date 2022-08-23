import { LightningElement, track } from 'lwc';
import { MOCK_SERVICES, COLUMNS_ADD_SERVICE } from './constants';

export default class TableAddService extends LightningElement {

    columns = COLUMNS_ADD_SERVICE;

    @track data = MOCK_SERVICES;

    /**
     * Row actions
     */
    handleRowAction(event) {
      const { action, row } = event.detail;

      switch (action.name) {
        case 'add':
          alert('Handle add logic');
          break;

        default:
      }
    }
}
