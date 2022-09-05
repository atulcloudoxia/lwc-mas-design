import { track, api, LightningElement } from 'lwc';
import { COLUMNS_PARKING, COLUMNS_EXTRAS } from './constants';
import { findRowById,formatcurrencytoNumber,formatNumbertocurrency } from './utils';

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

  connectedCallback(){
    this.asset = JSON.parse(JSON.stringify(this.asset));
    this.asset.Condo_Price__c = formatNumbertocurrency(this.asset.Condo_Price__c);
    this.handleParkingLoad();
    this.handleExtraLoad();
  }
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
  handleSubmitAssetForm(event) {
    
    this.closingdetail = event.detail.closingdetail;
    this.handleDataUpdate();
  }
  handleDataUpdate(){
    let rowAddEvent = new CustomEvent('updatedata',{
      detail: {
        parkingdata: this.parkingdata,
        extradata: this.extradata,
        closingdetail:this.closingdetail
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


  @track draftParkingValues = [];
  handleParkingSave(event){
    //console.log(event.detail.draftValues);
    const recordInputs =  event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    //console.log(recordInputs);
    var parkingdata = JSON.parse(JSON.stringify(this.parkingdata));
    parkingdata.forEach(element => {
      recordInputs.forEach(draft => {
        if(draft.fields.id==element.id) {
          for (const [key, value] of Object.entries(draft.fields)) {
            element[key] = value;
          }
        }
        
      });
    });
    this.draftParkingValues = [];
    this.parkingdata = parkingdata;
    this.handleDataUpdate();
  }
  @track draftExtrasValues = [];
  handleExtraSave(event){
    //console.log(event.detail.draftValues);
    const recordInputs =  event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    //console.log(recordInputs);
    var extradata = JSON.parse(JSON.stringify(this.extradata));
    extradata.forEach(element => {
      recordInputs.forEach(draft => {
        if(draft.fields.id==element.id) {
          for (const [key, value] of Object.entries(draft.fields)) {
            element[key] = value;
          }
        }
        
      });
    });
    this.draftExtrasValues = [];
    this.extradata = extradata;
    this.handleDataUpdate();
  }
  @track disableParkingLockerEdit;
  @track totalMaxParkings;
  @track totalMaxLockers;
  
  handleParkingLoad  () {
    console.log("---------------------------------");
    var mHelper = this;
     

    console.log("MASParkingController.doInit - Fetching parking and lockers");

   /* var assetList = component.get("v.assetList");

    if(assetList.length == 1){
        component.set("v.selectedAsset", assetList[0]);
        component.set("v.selectedAssetLabel", assetList[0].Name);
    }

    // Build phase list
    var phasesChoices = new Array();
    for (var i = 0; i < assetList.length; i++) {
        var item = assetList[i];
        if (phasesChoices.includes(item.Phase__c) == false) phasesChoices.push(item.Phase__c);
    }

    // Build list of possible assets for each phase
    var assetChoices = new Array();

    for (var i = 0; i < phasesChoices.length; i++) {
        var assetListMap = new Map();

        var phase = phasesChoices[i];
        assetListMap['phase'] = phase;

        var assetsForPhase = new Array();
        for (var j = 0; j < assetList.length; j++) {
            var asset = assetList[j];
            if (asset.Phase__c == phase) assetsForPhase.push(asset);
        }
        assetListMap['assetList'] = assetsForPhase;

        assetChoices.push(assetListMap);
    }

    component.set("v.assetChoicesForPhaseList", assetChoices);*/

    // Build parking data
    /* var apexAction = component.get("c.getCurrentData");
    apexAction.setParams({
      assetListString: JSON.stringify(assetList),
      closingDetailId: component.get("v.closingDetail").Id
    });
    apexAction.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") { */
            var container = {"availableParkings":[{"Id":"a05f200000pCLKvAAO","Name":"P&L 000018","Available_For_Phases__c":"1;1A;2;2A","Phase__c":"2","Price__c":4500,"Project_Lookup__c":"a065x00000gHQYmAAO","Status__c":"Available","Asset__c":"02if200000WFTQzAAP","Type__c":"Locker - Concrete","Project_Lookup__r":{"Id":"a065x00000gHQYmAAO"},"Asset__r":{"Id":"02if200000WFTQzAAP","Name":"DevMcGill"}}],"currentParkings":[],"disableParkingLockerEdit":false,
                            "totalMaxLockers":2,
                            "totalMaxParkings":2};//response.getReturnValue();
            console.log("MASParkingController.getCurrentData currentParkings " + JSON.stringify(container.currentParkings));
            //console.log("MASParkingController.getCurrentData availableParkings " + JSON.stringify(container.availableParkings));

            //component.set("v.selectedParkingList", container.currentParkings);
            this.disableParkingLockerEdit = container.disableParkingLockerEdit;

            /* var selectedParkingList = component.get("v.selectedParkingList");
            for(let parking of selectedParkingList){
                if(!$A.util.isEmpty(parking.Related_Asset__c) && parking.Related_Asset__c == parking.Asset__c){
                    parking.isDisabled = true;
                }
            }
            component.set("v.selectedParkingList", selectedParkingList); */

            this.totalMaxParkings = container.totalMaxParkings;
            this.totalMaxLockers = container.totalMaxLockers;
            /* component.set("v.availableParkings", container.availableParkings) */;
            /* helper.refreshParkingPicklist(component, event, helper); */

            /* mHelper.setSpinnerVisibility(component, false); */
        /* }
        else {
            console.log("MASContactRolesController.doInit | Apex Callback error ", JSON.stringify(response.getError()) + " state " + state);
        }
    });
    $A.enqueueAction(apexAction); */

  }
  @track roomTypePicklistItems;
  handleExtraLoad() {

    var closingDetailId = this.closingdetail.Id;
    console.log("MASExtraController.doInit - fetching extras for closingDetail id " + closingDetailId);
    /* var assetList = component.get('v.assetList');
    var apexAction = component.get("c.getCurrentData");
    apexAction.setParams({
        "closingDetailId" : closingDetailId,
        "ProjectId": (assetList.length!=0?assetList[0].Project_lookup__c:null)
    });
    apexAction.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") { */

            var container = {"roomTypePicklistItems":[{}]}//response.getReturnValue();
            //console.log(container.extraList);
            //component.set('v.selectedExtraList', container.extraList);
            //component.set('v.extraCatalogList', container.extraCatalog);
            this.roomTypePicklistItems= container.roomTypePicklistItems;

            console.log("MASExtraController.doInit | selectedExtraList", JSON.stringify(container.extraList));

            /* if( !$A.util.isEmpty(component.get('v.value')) && !isCallback) {
                helper.searchRecordsHelper( component, event, helper, component.get('v.value') );
            }
            helper.setSpinnerVisibility(component, false);
        }
        else {
            console.log("MASExtraController.doInit | Apex Callback error ", JSON.stringify(response.getError()) + " state " + state);
        }
    });
    $A.enqueueAction(apexAction); */
  }

}
