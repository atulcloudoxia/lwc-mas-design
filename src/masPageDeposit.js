import { LightningElement, track, api } from 'lwc';
import { COLUMNS_DEPOSIT } from './constants';
import { findRowById,formatcurrencytoNumber,formatNumbertocurrency  } from './utils';

export default class DepositPage extends LightningElement {

    columns = COLUMNS_DEPOSIT;

    @api data;
    @api asset;
    @api extradata;
    @api parkingdata;
    @track addDiscount = false;

    optionsSchedule = [{ }]; // Options for "Select Deposit Schedule"
    connectedCallback(){
      this.asset = JSON.parse(JSON.stringify(this.asset));
    console.log(this.asset);
     //this.asset.Condo_Price__c = formatNumbertocurrency(this.asset.Condo_Price__c);
    }
    /**
     * Get the total line item
     */
     get amountTotalLineItem() {
       
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
      return formatNumbertocurrency(total);
    };
    /**
     * Get the schedule amount summary
     */
    get amountTotal() {
      let total=0;

      this.data.forEach((item) => {
        total += parseFloat(item.Deposit_Amount__c);
      });

      return formatNumbertocurrency(total);
    };

    /**
     * Get the schedule percent summary
     */
    get percentTotal() {
      let total=0;

      this.data.forEach((item) => {
        total += parseFloat(item.Percent__c);
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
     * Handle close discount window
     *
     * @param (Event) e
     */
    handleDiscountClose(e) {
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
          Deposit_Number__c: id,
          Reception_Date__c: '11/01/2022',
          Deposit_To__c: 'notary',
          Deposit_For__c: 'cashdown',
          Deposit_Amount__c: "2000",
          Percent__c: "1",
          Deposit_Received__c: false
        }
      ]
      this.handleDataUpdate();
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
          this.handleDataUpdate();
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

    handleDataUpdate(){
      let rowAddEvent = new CustomEvent('updatedata',{
        detail: {
          depositdata: this.data 
        },
        bubbles: true,
        composed: false
      });
      this.dispatchEvent(rowAddEvent);
    }
}
