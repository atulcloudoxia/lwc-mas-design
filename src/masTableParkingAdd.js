import { LightningElement, track, api} from 'lwc';
//import timeZone from @salesforce/i18n/timeZone
const rowActions = [
  {
    label: 'Delete Varia',
    name: 'delete'
  }
];

const columns = [
  { label: 'Type', fieldName: 'Type__c', hideDefaultActions:true},
  { label: 'Assigned Spot', fieldName: 'Assigned_Spot__c', hideDefaultActions:true},
  { label: 'Asset Price', fieldName: 'Price__c', type: 'currency', hideDefaultActions:true,
    cellAttributes: {
      alignment: 'left',
    }
  },
  {
    type: "button-icon",
    typeAttributes: {
      label: 'Remove',
      name: 'add',
      title: 'Remove',
      disabled: false,
      value: 'add',
      iconPosition: 'left',
      iconName: 'utility:add',
      variant: 'success',
      class:'addbutton',
      iconClass: 'addbutton__icon'
    },
    cellAttributes: {
      alignment: 'right',
    },
  }
];

export default class TableParkingAdd extends LightningElement {
    columns = columns;
    @api asset;
    @api closingDetail;
    @api totalMaxParkings;
    @api totalMaxLockers;
  @api availableParkings;
  @api
  addRowAfterDelete() {
    console.log('addRowAfterDelete');
    //this.availableParkings;
  }

  /**
     * Row actions
     */
   handleRowAction(event) {
    const { action, row } = event.detail;

    switch (action.name) {
      case 'add':
        this.addRow(row);
         //delete after it got added to the parent
        break;
      // No other actions but delete for now
      default:
    }
  }
  addRow(row){
    const { id } = row;
    const index = this.findRowById(id);
    if (index !== -1) {
      console.log('// '+this.availableParkings[index]);
      var selectedParkings = this.availableParkings;
      var item = {...this.availableParkings[index]}; // result
      if (item == null) {
        console.log("MASParkingController.addParking - no value selected");
        return;
      }
      var asset = {...this.asset};
      var isLockerItem = false;
      if(item.Type__c.includes('Locker') || item.Type__c.includes('locker')){
          isLockerItem = true;
      }
      var totalMaxParkings = this.totalMaxParkings;
      var totalMaxLockers = this.totalMaxLockers;
      var selectedParkingsCount = 0;
      var selectedLockersCount = 0;
      for(var i in selectedParkings){
        if(selectedParkings[i].Type__c != null && selectedParkings[i].Type__c != undefined && (selectedParkings[i].Type__c.includes('Locker') || selectedParkings[i].Type__c.includes('locker'))){
            selectedLockersCount++;
        }
        if(selectedParkings[i].Type__c != null && selectedParkings[i].Type__c != undefined && (selectedParkings[i].Type__c.includes('Parking') || selectedParkings[i].Type__c.includes('parking'))){
            selectedParkingsCount++;
        }
      }
      if (isLockerItem && selectedLockersCount>=totalMaxLockers){
          console.log("No more than "+totalMaxLockers+" lockers can be selected.");
          alert("No more than "+totalMaxLockers+" lockers can be selected.");
          return;
      }
      if (!isLockerItem && selectedParkingsCount>=totalMaxParkings){
          console.log("No more than "+totalMaxParkings+" parkings can be selected.");
          alert("No more than "+totalMaxParkings+" parkings can be selected.");
          return;
      }
      console.log(item);
      if (item == null || item.Id) {
          console.log("No parking selected");
          alert(/* $A.get( */'$Label.c.MAS_Parking_Locker_Required')/* ) */;
          return;
      }
      console.log(asset);
      if (asset == null || !asset || !asset.id) {
          console.log("No asset selected");
          alert(/* $A.get( */'$Label.c.MAS_Asset_Required')/* ) */;
          return;
      }
      var duplicateFound = false;
      for (var i = 0; i < selectedParkings.length; i++) {
          var selectedParking = selectedParkings[i];
          console.log(JSON.stringify(item));
          console.log(JSON.stringify(selectedParking));
          if (item.Id == selectedParking.id) {
            duplicateFound = true;
              break;
          }
      }
      if (duplicateFound == true) {
          alert(/* $A.get( */'$Label.c.MAS_Item_Already_in_List')/* ) */;
          return;
      }
      // Override Asset__c on P&L record
      item.Closing_Detail__c = this.closingDetail.id;
      item.Asset__c = asset.id;
      item.Asset__r = { Id : '', Name : ''};
      item.Asset__r.id = asset.id;
      item.Asset__r.Name = asset.Name;
      var timezone = 'America/Los_Angeles';
      var today = new Date().toLocaleString("en-US", {timeZone: timezone});
      var td = today.substr(0, today.indexOf(',')).split('/');
      var year = td[2];
      var month = td[0];
      if(month.length==1){
          month='0'+month;
      }
      var date = td[1];
      if(date.length==1){
          date='0'+date;
      }
      item.Purchase_Date__c = year+'-'+month+'-'+date;

      let rowAddEvent = new CustomEvent('rowadd',{
        detail: {
          row:item
        },
        bubbles: true,
        composed: false
      });
      this.dispatchEvent(rowAddEvent);
      this.deleteRow(row);
    }
  }
  /**
     * Delete
     */
   deleteRow(row) {
    const { id } = row;
    const index = this.findRowById(id);

    if (index !== -1) {
      this.availableParkings = this.availableParkings
        .slice(0, index)
        .concat(this.availableParkings.slice(index + 1));

      // Nhan, handle delete logic here
    }
  }
  findRowById(id) {
    let ret = -1;
    this.availableParkings.some((row, index) => {
      if (row.id === id) {
        ret = index;
        return true;
      }
      return false;
    });
    return ret;
  }


}
