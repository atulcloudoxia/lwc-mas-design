import { LightningElement, api, track } from 'lwc';
import { REVIEW_CONTACTS_COLUMNS, REVIEW_DEPOSITS_COLUMNS } from './constants';

export default class ReviewPage extends LightningElement {

  @api contactslist;
  @api depositsdata;
  @api asset;

  contactsColumns = REVIEW_CONTACTS_COLUMNS;
  depositsColumns = REVIEW_DEPOSITS_COLUMNS;

  /**
   * Modify a contact
   *
   * @param (Event) e
   */
  handleModifyContacts(e) {
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: 0   // Index page number
        }
      })
    )
  }

  /**
   * Modify a contact
   *
   * @param (Event) e
   */
  handleModifyDeposits(e) {
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: 2     // Index page number
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
