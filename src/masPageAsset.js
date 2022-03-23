import { track, api, LightningElement } from 'lwc';
import { COLUMNS_PARKING, COLUMNS_EXTRAS } from './constants';
import { findRowById } from './utils';

export default class PageAsset extends LightningElement {

  @api parkingdata;
  @api extradata;
  @api asset;

  columns = COLUMNS_PARKING;
  columnsExtras = COLUMNS_EXTRAS;

  @track addAsset=false;

  /**
   * Shows modal to edit asset details
   *
   * @param (Event) e
   */
  handleEditAsset(e) {
    this.addAsset=true;
  }

  /**
   * Handle close form
   *
   * @param (Event) e
   */
  handleCloseForm(e) {
    this.addAsset = false;
  }

  /**
   * Row actions
   *
   * @param (Event) e
   */
  handleRowAction(e) {
    const { action, row } = e.detail;

    switch (action.name) {
      case 'delete':
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
