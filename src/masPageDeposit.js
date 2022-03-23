import { LightningElement, track, api } from 'lwc';
import { COLUMNS_DEPOSIT } from './constants';
import { findRowById } from './utils';

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


export default class DepositPage extends LightningElement {

    columns = COLUMNS_DEPOSIT;

    @api data;
    @api asset;
    @track discounts = discounts;
    @track addDiscount = false;

    optionsSchedule = [{ }]; // Options for "Select Deposit Schedule"
    optionsDiscounts = [{ }]; // Options for discounts

    /**
     * Get the schedule amount summary
     */
    get amountTotal() {
      let total=0;

      this.data.forEach((item) => {
        total += parseFloat(item.amount);
      });

      return Number((total).toFixed(2)).toLocaleString();
    };

    /**
     * Get the schedule percent summary
     */
    get percentTotal() {
      let total=0;

      this.data.forEach((item) => {
        total += parseFloat(item.percent);
      });

      return Number(total).toFixed(2);
    };

    /**
     * Add Discount
     *
     * @param (Event) e
     */
    handleAddDiscount(e) {
      this.addDiscount=true;
    }

    /**
     * Remove Discount
     *
     * @param (Event) e
     */
    handleRemoveDiscount(e) {
      const deleteId = e.currentTarget.getAttribute("data-discount-id");
      // deleteId - Handle delete logic
    }

    /**
     * Handle Submit Discount Form
     *
     * @param (Event) e
     */
    handleDiscountFormSubmit(e) {
      e.preventDefault();
      this.addDiscount = false;
    }

    /**
     * Close/cancel the discount form
     *
     * @param (Event) e
     */
    cancelDiscountForm(e) {
      e.preventDefault();
      this.addDiscount = false;
    }

    /**
     * Handle schedule change
     *
     * @param (Event) e
     */
    handleScheduleChange(e) {
      // Schedule change logic
    }

    /**
     * Handle schedule reload
     *
     * @param (Event) e
     */
    handleReloadSchedule(e) {
      // Schedule change logic
    }

    /**
     * Handle add deposit
     *
     * @param (Event) e
     */
    handleAddDeposit(e) {
      // Add deposit logic
      // Sample code...
      const id = this.data.length + 1;

      this.data = [
        ...this.data,
        {
          id,
          number: id,
          date: '11/01/2022',
          deposit_to: 'notary',
          deposit_for: 'cashdown',
          amount: "2000",
          percent: "1",
          received: false
        }
      ]
    }

    /**
     * Row actions
     *
     * @param (Event) e
     */
    handleRowAction(e) {
      const { action, row } = e.detail;
      const deleteId = row.id;

      switch (action.name) {
        case 'delete':
          this.data = this.deleteRow(row, this.data);
          // deleteId - Handle delete logic
          break;

        // No other actions but delete for now
        default:
      }
    }

    /**
     * Delete
     *
     * @param (Object)  row
     * @param (Array)   data
     */
    deleteRow(row, data) {
      const { id } = row;
      const index = findRowById(id, data);

      if (index !== -1) {
        return data
          .slice(0, index)
          .concat(data.slice(index + 1));
      }
    }
}
