import { LightningElement, api, track } from 'lwc';
import { REVIEW_CONTACTS_COLUMNS, REVIEW_DEPOSITS_COLUMNS } from './constants';

export default class PageReview extends LightningElement {

  @api contactslist;
  @api depositsdata;
  @api asset;
  @api extradata;
  @api parkingdata;

  contactsColumns = REVIEW_CONTACTS_COLUMNS;
  depositsColumns = REVIEW_DEPOSITS_COLUMNS;

  /**
     * Get the total line item
     */
   get amountTotalLineItem() {
     console.log(this.asset);
    let total= parseFloat(this.asset.Condo_Price__c);
    
    console.log(total);
    this.parkingdata.forEach((item) => {
      total += parseFloat(item.Price__c);
    });
    console.log(total);
    this.extradata.forEach((item) => {
      total += parseFloat(item.Price__c);
    });
    console.log(typeof(total));
    console.log(total);
    return Number((total).toFixed(2));
  };
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
