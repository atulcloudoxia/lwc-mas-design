import { track, api, LightningElement } from 'lwc';
import { COLUMNS_SERVICES } from './constants';
import { findRowById } from './utils';

export default class PageServices extends LightningElement {

  @api data;
  @api asset;

  columns = COLUMNS_SERVICES;

  /**
   * Row actions
   *
   * @param (Event) e
   */
  handleRowAction(e) {
    const { action, row } = e.detail;

    switch (action.name) {
      case 'delete':
        this.deleteRow(row);
        // handle delete logic here
        break;

      // No other actions but delete for now
      default:
    }
  }

  /**
   * Delete
   *
   * @param (object) row
   */
  deleteRow(row) {
    const { id } = row;
    const index = findRowById(id, this.data);

    if (index !== -1) {
      this.data = this.data
        .slice(0, index)
        .concat(this.data.slice(index + 1));

      // Nhan, handle delete logic here
    }
  }
}