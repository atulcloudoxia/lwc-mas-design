import { LightningElement, track } from 'lwc';
import { COLUMNS_ADD_INCLUSION } from './constants';

export default class TableInclusionsAdd extends LightningElement {

    columns = COLUMNS_ADD_INCLUSION;

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
    ];

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
