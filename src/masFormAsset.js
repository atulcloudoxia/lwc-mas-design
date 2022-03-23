import { track, api, LightningElement } from 'lwc';
import { COLUMNS_PARKING, COLUMNS_EXTRAS } from './constants';
import { findRowById } from './utils';

export default class PageAsset extends LightningElement {

  @api asset;

  /**
   * Assets form submit
   *
   * @param (Event) e
   */
  handleSubmit(e) {
    e.preventDefault();
    // Nhan, handle "edit" logic here
  }

  /**
   * Cancel form submission
   *
   * @param (Event) e
   */
  handleCancel(e) {
    e.preventDefault();

    // Cancel logic
  }
}
