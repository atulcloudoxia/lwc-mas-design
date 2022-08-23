import { LightningElement, track, api } from 'lwc';
import {
  OPTIONS_DELETE_SALE,
} from './constants';


export default class FormDeleteSale extends LightningElement {

  @api data;
  @api iscorporation;

  @track isCorporation = this.iscorporation;

  cancelReasons = OPTIONS_DELETE_SALE;

  /**
   * Handle contact form
   *
   * @param (Event) e
   */
  handleSubmit(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("submit", {
        payload: {
          event: e
        }
      })
    )
  }

  /**
   * Handle cancel
   *
   * @param (Event) e
   */
  handleCancel(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("close")
    );
  }

  /**
   * Handle role change
   *
   * @param (Event) e
   */
  handleReasonChange(e) {
    let reason = e.detail.value;
  }
}
