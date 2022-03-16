import { LightningElement, track } from 'lwc';

const columns = [
  {
    label: 'Payment Number',
    fieldName: 'number',
    type: 'number',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Date',
    fieldName: 'date',
    type: 'date',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Deposit To',
    fieldName: 'deposit_to',
    type:'select',
    editable: true
  },
  {
    label: 'Deposit For',
    fieldName: 'deposit_for',
    editable: true
  },
  {
    label: 'Amount',
    fieldName: 'amount',
    editable: true
  },
  {
    label: 'Percent',
    fieldName: 'percent',
    type: 'percent',
    editable: true,
    cellAttributes: {
      alignment: 'left',
    },
  },
  {
    label: 'Received',
    fieldName: 'received',
    type: 'boolean',
    editable: true
  },
  {
    type: "button-icon",
    fixedWidth: 40,
    typeAttributes: {
      label: 'Image',
      name: 'image',
      title: 'Image',
      disabled: false,
      value: 'image',
      iconName: 'utility:image'
    },
    cellAttributes: {
      alignment: 'right',
    },
  },
  {
    type: "button-icon",
    fixedWidth: 40,
    typeAttributes: {
      label: 'Remove',
      name: 'delete',
      title: 'Remove',
      disabled: false,
      value: 'delete',
      iconName: 'utility:delete'
    },
    cellAttributes: {
      alignment: 'right',
    },
  },
];

 const data = [
  {
      id: 1,
      number: 1,
      date: '09/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 2,
      number: 2,
      date: '10/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 3,
      number: 3,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 4,
      number: 4,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 5,
      number: 5,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 6,
      number: 6,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
];

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


export default class DepositTable extends LightningElement {
    columns = columns;

    @track
    data = data;

    @track
    discounts = discounts;

    @track
    addDiscount = false;

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
      const index = this.findRowById(id, data);

      if (index !== -1) {
        return data
          .slice(0, index)
          .concat(data.slice(index + 1));
      }
    }

    /**
     * Find row by id
     *
     * @param (Number)  id
     * @param (Array)   data
     */
    findRowById(id, data) {
      let ret = -1;
      data.some((row, index) => {
        if (row.id === id) {
          ret = index;
          return true;
        }
        return false;
      });

      return ret;
    }
}
