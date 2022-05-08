import { track, api, LightningElement } from 'lwc';
import { COLUMNS_PARKING, COLUMNS_EXTRAS } from './constants';
import { findRowById } from './utils';

export default class PageAsset extends LightningElement {

  @api parkingdata;
  @api extradata;
  @api asset;
  @api closingdetail;

  @track activeTab="parking";

  columns = COLUMNS_PARKING;
  columnsExtras = COLUMNS_EXTRAS;

  @track addAsset=false;

  /**
   * Shows modal to edit asset details
   *
   * @param (Event) e
   */
  handleEditAsset(e) {
    this.addAsset=true;
  }

  /**
   * Handle close form
   *
   * @param (Event) e
   */
  handleCloseForm(e) {
    this.addAsset = false;
  }

  /**
   * Row actions
   *
   * @param (Event) e
   */
  handleRowAction(e) {
    const { action, row } = e.detail;

    switch (action.name) {
      case 'delete':
        
        this.addRow(row);
        this.deleteRow(row);
        // handle delete logic here
        break;

      // No other actions but delete for now
      default:
    }
  }

  /**
   * Delete
   *
   * @param (object) row
   */
  deleteRow(row) {
    const { id } = row;
    var index;
    if(this.activeTab=='parking'){
        index = findRowById(id, this.parkingdata);
        if (index !== -1) {
          this.parkingdata = this.parkingdata
            .slice(0, index)
            .concat(this.parkingdata.slice(index + 1));
    
          // Nhan, handle delete logic here
        }
    }else if(this.activeTab=='extras'){
        index = findRowById(id, this.extradata);
        if (index !== -1) {
          this.extradata = this.extradata
            .slice(0, index)
            .concat(this.extradata.slice(index + 1));
    
          // Nhan, handle delete logic here
        }
    }
  }
  addRow(row) {
    console.log('this.activeTab: '+this.activeTab);
    const { id } = row;
    if(this.activeTab=='parking'){
      const index = findRowById(id, this.parkingdata);
      this.template.querySelector('[data-id="parkingTable"]').addRowAfterDelete(this.parkingdata[index]);
       
    }else if(this.activeTab=='extras'){
      const index = findRowById(id, this.extradata);
      this.template.querySelector('[data-id="extrasTable"]').addRowAfterDelete(this.extradata[index]);
    }
  }

  handleExtraRowAdd(event) {
    console.log(JSON.stringify(event.detail.row));
    this.extradata = [...this.extradata,event.detail.row];
    
  }
  handleParkingRowAdd(event) {
    console.log(JSON.stringify(event.detail.row));
    this.parkingdata = [...this.parkingdata,event.detail.row];
    
  }
  handleActive(event) {
    const tab = event.target;
    this.activeTab = event.target.value;
  }
}
