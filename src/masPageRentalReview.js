import { LightningElement, api, track } from 'lwc';
import { REVIEW_INCLUSIONS_COLUMNS, REVIEW_SERVICES_COLUMNS } from './constants';

export default class PageRentalReview extends LightningElement {

  @api inclusionsdata;
  @api servicesdata;
  @api asset;

  inclusionsColumns = REVIEW_INCLUSIONS_COLUMNS;
  servicesColumns = REVIEW_SERVICES_COLUMNS;

  /**
   * Modify asset
   *
   * @param (Event) e
   */
  handleModifyAsset(e) {
    /**
     * Nhan, we could probably just attach a "data-page-index=1" and have a generic function
     * like "handlePageChange" but I'm not sure if you wanted any custom logic for each button
     */
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: 1   // Index page number
        }
      })
    )
  }

  /**
   * Modify an inclusion
   *
   * @param (Event) e
   */
  handleModifyInclusions(e) {
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: 1   // Index page number
        }
      })
    )
  }

  /**
   * Modify a service
   *
   * @param (Event) e
   */
  handleModifyServices(e) {
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: 1     // Index page number
        }
      })
    )
  }

  /**
   * Modify a contact
   *
   * @param (Event) e
   */
  handleComplete(e) {
    // Handle complete logic here
  }
}
