import { LightningElement, track, api } from 'lwc';

const discounts = [
  {
    id: 1,
    name: "Free Locker",
    discount: 5000
  },
  {
    id: 2,
    name: "Free Parking",
    discount: 15000
  },
];


export default class DiscountForm extends LightningElement {

  optionsDiscounts = discounts;// Options for discounts

  /**
   * Handle Submit Discount Form
   *
   * @param (Event) e
   */
  handleSubmit(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("close")
    );
  }

  /**
   * Close/cancel the discount form
   *
   * @param (Event) e
   */
  handleCancel(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("close")
    );
  }
}
