import { track, api, LightningElement } from 'lwc';
import { COLUMNS_PARKING, COLUMNS_EXTRAS } from './constants';
import { findRowById } from './utils';

export default class PageAsset extends LightningElement {

  @api parkingdata;
  @track availableExtras = [
    {
        id: 1,
        Quantity__c: 3,
        name: 'Extra 1',
        Description_ENG__c: 'lorem ipsum',
        Room_Type__c: 'Upper',
        Price__c: '87270'
    },
    {
        id: 2,
        Quantity__c: 3,
        name: 'Extra 1',
        Description_ENG__c: 'lorem ipsum',
        Room_Type__c: 'Bathroom',
        Price__c: '87271'
    },
    {
        id: 3,
        Quantity__c: 3,
        name: 'Extra 1',
        Description_ENG__c: 'lorem ipsum',
        Room_Type__c: 'Ground',
        Price__c: '87272'
    },
  ];
  @track availableParkings = [
    {
        id: 1,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30930',
    },
    {
        id: 2,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30931',
    },
    {
        id: 3,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30932',
    },
    {
        id: 4,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30933',
    },
    {
        id: 5,
        Type__c: 'Locker Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '30934',
    },
    {
        id: 6,
        Type__c: 'Parking Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '36935',
    },
    {
        id: 7,
        Type__c: 'Parking Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '36936',
    },
    {
        id: 8,
        Type__c: 'Parking Standard',
        Assigned_Spot__c: 'Side by Side',
        Price__c: '36937',
    },
  ];

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
        
        //this.addRow(row);
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
          let parkingdata= this.parkingdata;
          console.log(index);
          this.parkingdata = parkingdata.slice(0, index).concat(parkingdata.slice(index + 1));
          this.handleRefresh('parkings');
          // Nhan, handle delete logic here
        }
    }else if(this.activeTab=='extras'){
        index = findRowById(id, this.extradata);
        if (index !== -1) {
          this.extradata = this.extradata
            .slice(0, index)
            .concat(this.extradata.slice(index + 1));
          this.handleRefresh('extras');
          // Nhan, handle delete logic here
        }
    }
  }
  /*addRow(row) {
    console.log('this.activeTab: '+this.activeTab);
    const { id } = row;
    if(this.activeTab=='parking'){
      const index = findRowById(id, this.parkingdata);
      console.log(index);
      this.handleRefresh('parkings');
       
    }else if(this.activeTab=='extras'){
      const index = findRowById(id, this.extradata);
      this.handleRefresh('extras');
       
    }
  }*/

  handleExtraRowAdd(event) {
    console.log(JSON.stringify(event.detail.row));
    this.extradata = [...this.extradata,event.detail.row];
    this.handleDataUpdate();
  }
  handleParkingRowAdd(event) {
    console.log(JSON.stringify(event.detail.row));
    this.parkingdata = [...this.parkingdata,event.detail.row];
    this.handleDataUpdate();
  }
  handleDataUpdate(){
    let rowAddEvent = new CustomEvent('updatedata',{
      detail: {
        parkingdata: this.parkingdata,
        extradata: this.extradata
      },
      bubbles: true,
      composed: false
    });
    this.dispatchEvent(rowAddEvent);
  }

  handleRefresh(objectName){
    //call apex to sort by id
    if(objectName=='extras'){
     let availableExtras = [
        {
            id: 1,
            Quantity__c: 3,
            name: 'Extra 1',
            Description_ENG__c: 'lorem ipsum',
            Room_Type__c: 'Upper',
            Price__c: '87270'
        },
        {
            id: 2,
            Quantity__c: 3,
            name: 'Extra 1',
            Description_ENG__c: 'lorem ipsum',
            Room_Type__c: 'Bathroom',
            Price__c: '87271'
        },
        {
            id: 3,
            Quantity__c: 3,
            name: 'Extra 1',
            Description_ENG__c: 'lorem ipsum',
            Room_Type__c: 'Ground',
            Price__c: '87272'
        },
      ];
      let extradata = this.extradata;
      this.availableExtras = availableExtras.filter(function (e) {
        let found = extradata.find(p => p.id == e.id);
        return found==undefined ;
      });
    }else if(objectName=='parkings'){
      let availableParkings = [
        {
            id: 1,
            Type__c: 'Locker Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '30930',
        },
        {
            id: 2,
            Type__c: 'Locker Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '30931',
        },
        {
            id: 3,
            Type__c: 'Locker Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '30932',
        },
        {
            id: 4,
            Type__c: 'Locker Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '30933',
        },
        {
            id: 5,
            Type__c: 'Locker Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '30934',
        },
        {
            id: 6,
            Type__c: 'Parking Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '36935',
        },
        {
            id: 7,
            Type__c: 'Parking Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '36936',
        },
        {
            id: 8,
            Type__c: 'Parking Standard',
            Assigned_Spot__c: 'Side by Side',
            Price__c: '36937',
        },
      ];
      let parkingdata = this.parkingdata;
      this.availableParkings = availableParkings.filter(function (e) {
        let found = parkingdata.find(p => p.id == e.id);
        return found==undefined ;
      });
    }
    this.handleDataUpdate();
  }
  handleActive(event) {
    const tab = event.target;
    this.activeTab = event.target.value;
    if(this.activeTab=='extras')
    this.handleRefresh('extras');
    else if(this.activeTab=='parking')
    this.handleRefresh('parkings');
  }
}
