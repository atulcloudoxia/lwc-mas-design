import { LightningElement, track, api } from 'lwc';

const discounts = [
  {
    Id: 1,
    name: "Free Locker",
    discount: 5000
  },
  {
    Id: 2,
    name: "Free Parking",
    discount: 15000
  },
];


export default class FormDiscount extends LightningElement {

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
