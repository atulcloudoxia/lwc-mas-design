import { LightningElement, api, track } from 'lwc';
import {
  ERROR,
  WARNING,
  PROCESSING,
  MOCK_PARKING,
  MOCK_INCLUSIONS,
  MOCK_ASSET,
  MOCK_CLOSING_DETAIL,
  MOCK_RENTAL_ASSET,
  MOCK_EXTRAS,
  MOCK_SERVICES,
  MOCK_DEPOSIT,
  MOCK_RENTAL_DEPOSIT,
  MOCK_VARIA,
  MOCK_CHANGE_ORDERS,
  MOCK_CONTACTS
} from './constants';

const TYPES = {
  sale: 'sale',
  rental: 'rental'
};

// State machine
const defaults = {
  selected:false,         // Page is in view
  completed:false,        // Page is completed
  warning: false,         // Page has warning
  error: false,           // Page has error
  processing: false,      // Page is processing
  message: ""             // Status message for page
};

let pageContact = {
  id: "contact",
  step: 1,
  label: "Contact",
  enabled: true,
  ...defaults,
  selected:true,
  should_recompute: false,
  warning: true,
  message: "There is no bank approval."
};

const pageAsset = {
  id: "asset",
  step: 2,
  label: "Asset",
  enabled: true,
  ...defaults,
  completed:true
};

const pageRentalAsset = {
  id: "rental_asset",
  step: 2,
  label: "Asset",
  enabled: true,
  ...defaults,
  completed:true
};

const pageRentalVaria = {
  id: "rental_varia",
  step: 2,
  label: "Varia",
  enabled: true,
  ...defaults,
}

const pageInclusions = {
  id: "inclusions",
  step: 4,
  label: "Inclusions",
  enabled: true,
  ...defaults,
  completed:true
};

const pageServices = {
  id: "services",
  step: 5,
  label: "Services",
  enabled: true,
  ...defaults,
  completed:true
};

const pageRentalDeposit = {
  id: "rental_deposit",
  step: 6,
  label: "Rent",
  enabled: true,
  ...defaults,
  warning:false,
};

const pageDeposit = {
  id: "deposit",
  step: 3,
  label: "Deposit",
  enabled: true,
  ...defaults,
  warning:true,
  "message": "The selected deposit schedule is not compliant."
};

const pageVaria = {
  id: "varia",
  step: 4,
  label: "Varia",
  enabled: true,
  ...defaults,
}

const pageFiles = {
  id: "files",
  step: 5,
  label: "Files",
  enabled: true,
  ...defaults,
}

const pageReview = {
  id: "review",
  step: 6,
  label: "Review",
  enabled: true,
  ...defaults,
  processing:true
}

const pageRentalReview = {
  id: "rental_review",
  step: 8,
  label: "Review",
  enabled: true,
  ...defaults,
}

export default class Mas extends LightningElement {

  constructor() {
    super();
    this.setType(TYPES.sale);
  }

  // @api recordId;

  // Common Data
  @track opportunity = {};
  @track contactList = MOCK_CONTACTS;
  @track asset = MOCK_ASSET;
  @track closingdetail = MOCK_CLOSING_DETAIL;
  @track salesRep = {};

  // MAS Data
  @track parkingData = MOCK_PARKING;
  @track extraData = MOCK_EXTRAS;
  @track depositData = MOCK_DEPOSIT;
  @track variaData = MOCK_VARIA;
  @track changeOrderData = MOCK_CHANGE_ORDERS;
  @track closingDetail = {};

  // MAR Data
  @track rentalDetail = {};
  @track inclusionsList = [];
  @track servicesList = [];

  // Other
  @track isLoading=false;

  @track type; // rental or sale
  @track contactsData = MOCK_CONTACTS;
  @track parkingData = MOCK_PARKING;
  @track extraData = MOCK_EXTRAS;
  @track asset = MOCK_ASSET;
  @track rentalAsset = MOCK_RENTAL_ASSET;
  @track servicesData = MOCK_SERVICES;
  @track inclusionsData = MOCK_INCLUSIONS;
  @track depositData = MOCK_DEPOSIT;
  @track rentalDepositData = MOCK_RENTAL_DEPOSIT;
  @track variaData = MOCK_VARIA;
  @track changeOrderData = MOCK_CHANGE_ORDERS;
  @track isLoading=false;
  @track pages = [
    pageContact,
    pageAsset,
    pageDeposit,
    pageVaria,
    pageFiles,
    pageReview
  ];

  get assetData() {
    return this.type === 'rental' ? this.rentalAsset : this.asset;
  }

  get showContactPage() {
    return this.findSelectedById('contact');
  }

  get showAssetPage() {
    return this.findSelectedById('asset');
  }

  get showRentalAssetPage() {
    return this.findSelectedById('rental_asset');
  }

  get showInclusionsPage() {
    return this.findSelectedById('inclusions');
  }

  get showServicesPage() {
    return this.findSelectedById('services');
  }

  get showRentalDepositPage() {
    return this.findSelectedById('rental_deposit');
  }

  get showRentalVariaPage() {
    return this.findSelectedById('rental_varia');
  }

  get showRentalReviewPage() {
    return this.findSelectedById('rental_review');
  }

  get showDepositPage() {
    return this.findSelectedById('deposit');
  }

  get showVariaPage() {
    return this.findSelectedById('varia');
  }

  get showFilesPage() {
    return this.findSelectedById('files');
  }

  get showReviewPage() {
    return this.findSelectedById('review');
  }

  get hasPageMessage() {
    let currentPage = this.currentPage()[0];

    return currentPage.warning || currentPage.error || currentPage.processing;
  }

  get pageMessage() {
    let currentPage = this.currentPage()[0];

    return currentPage.message;
  }

  get pageMessageType() {
    let currentPage = this.currentPage()[0];

    if (currentPage.warning) {
      return WARNING;

    } else if (currentPage.error) {
      return ERROR;

    } else if (currentPage.processing) {
      return PROCESSING;
    }
  }

  /**
   * Reservation mode
   *
   * @param (Boolean) isReservation
   */
  setReservation(isReservation) {
    if (isReservation) {
      this.pages = [
        { ...pageAsset, ...{ selected:true } },
        pageDeposit,
        pageReview
      ];

    } else {
      this.pages = [
        pageContact,
        pageAsset,
        pageDeposit,
        pageVaria,
        pageFiles,
        pageReview
      ];
    }

    this.reorderSteps();
  }

  /**
   * Swap between rental pages and sale pages
   *
   * @param (String) type
   */
  setType(type) {
    if (type === TYPES.sale) {
      this.pages = [
        { ...pageContact, ...{ selected:true } },
        pageAsset,
        pageDeposit,
        pageVaria,
        pageFiles,
        pageReview
      ];

    } else if (TYPES.rental) {
      this.pages = [
        { ...pageContact, ...{ selected:true } },
        pageRentalAsset,
        pageVaria,
        pageRentalDeposit,
        pageFiles,
        pageRentalReview
      ];
    }

    this.type = type;
    this.reorderSteps();
  }

  /**
   * Re-assign page step numbers
   */
  reorderSteps() {
    for (let i=0; i < this.pages.length; i++) {
      this.pages[i].step = i + 1;
    }
  }

  /**
   * Get current page
   */
  currentPage() {
    return this.pages.filter((page) => page.selected == true);
  }

  /**
   * Get current page index
   */
  currentPageIndex() {
    for(let i=0; i < this.pages.length; i++) {
      if (this.pages[i].selected) {
        return i;
      }
    }
  }

  /**
   * Find selected page by string/id
   *
   * @param (String) id
   */
  findSelectedById(id) {
    for(let i=0; i < this.pages.length; i++) {
      if (this.pages[i].id === id) {
        return this.pages[i].selected;
      }
    }
  }

  /**
   * Previous Page
   *
   * @param (Event) e
   */
  handlePreviousPage(e) {
    let currentPageIndex = this.currentPageIndex();

    if (currentPageIndex === 0) return;

    for(let i=0; i < this.pages.length; i++) {
      this.pages[i].selected = i === (currentPageIndex - 1);
    }
  }

  /**
   * Next Page
   *
   * @param (Event) e
   */
  handleNextPage(e) {
    let currentPageIndex = this.currentPageIndex();

    if (currentPageIndex === (this.pages.length -1)) return;

    for(let i=0; i < this.pages.length; i++) {
      this.pages[i].selected = i === (currentPageIndex + 1);
    }
  }

  /**
   * When a user confirms they wish to delete sale
   *
   * @param (Event) e
   */
  handleDeleteSale(e) {
    console.log('The final destination: ', e.payload)
    alert('Delete The Sale')
    // Add logic for deleting sale
  }

  /**
   * Page/Step Change Listener
   *
   * @param (Event) e
   */
  handleStepChange(e) {
    let changeToPage = e.detail.page;

    for(let i=0; i < this.pages.length; i++) {
      this.pages[i].selected = i === parseInt(changeToPage);
    }
  }

  /**
   * Page Updated Listener
   *
   * @param (Event) e
   */
  handlePageUpdate(e) {
    const { pageIdx, error, completed, warning, message } = e.detail;

    if (pageIdx || pageIdx === 0) {
      this.pages[pageIdx] = {
        ...this.pages[pageIdx],
        error,
        completed,
        warning,
        message
      };
    }
  }
  handleDataUpdate(e) {
    const { pageIdx, error, completed, warning, message, contactdata, parkingdata, extradata, depositdata, closingdata, variadata, changeorderdata} = e.detail;

    if(parkingdata!=undefined){
      this.parkingData = parkingdata;
      //CALL APEX
    }
    if(extradata!=undefined) this.extraData = extradata;
    if(contactdata!=undefined) this.contactList = contactdata;
    if(depositdata!=undefined) this.depositData = depositdata;
    if(closingdata!=undefined) this.closingdetail = closingdata;
    if(variadata!=undefined) this.variaData = variadata;
    if(changeorderdata!=undefined) this.changeOrderData = changeorderdata;
  }

  // Saving Data
  updateAssetProject (event) {
    /* console.log("MakeASaleController.updateAssetProject: entered|Event Name " + event.getName());
    var project = event.getParams().itemProjectParam;
    var assetList = event.getParams().itemAssetParam;
    var closingDetail = event.getParams().itemClosingDetailParam; */
    this.saveAssets( project, assetList, closingDetail);
  }

  updateParkingList (event) {
    /* console.log("MakeASaleController.updateParkingList: entered|Event Name " + event.getName());
    var parkingList = event.getParams().itemParkingParam; */
    this.updateParkingList( parkingList);
  }

  updateExtraList (event) {
    /* console.log("MakeASaleController.updateExtraList: entered|Event Name " + event.getName());
    var extraList = event.getParams().itemExtraParam; */
    this.updateExtraList( extraList);
  }

  updateContactRoleList (event) {
    /* console.log("MakeASaleController.updateContactRole | Event " + event.getName());

    var contactRoleList = event.getParams().itemListParam;
    var contactRoleRemoveList = event.getParams().itemRemoveListParam;
    var onlySave = event.getParams().onlySave;
    var opportunity = event.getParams().opportunity;
    var idInformations = event.getParams().IdInformationsParam;

    console.log("MakeASaleController.updateContactRole | opportunity " + opportunity);
 */
    this.saveContactRoleList( contactRoleList, contactRoleRemoveList, opportunity, onlySave, idInformations);
  }

  updateDepositList (event) {
/* 
    console.log("MakeASaleController.updateDepositList: entered|Event Name " + event.getName());

    var depositList = event.getParams().itemDepositParam;
    var closingDetail = event.getParams().itemClosingDetailParam;
    var opportunity = event.getParams().itemOpportunityParam;

    var assetList = event.getParams().assetListParam;
    var parkingList = event.getParams().parkingListParam;
  */
    this.saveDepositList( depositList, closingDetail, opportunity, assetList, parkingList, vipList);
  }

  
orgLevelDisableSale;
orgLevelDisableReservation;
orgLevelHideChangeOrder;
orgLevelHideExtras;
orgLevelHideVaria;
orgLevelDisableRental;
orgLevelHideDeleteButton;
orgLevelDisplayFintracAndInfo;
orgLevelDisplayCorpFintracAndInfo;
orgLevelDisableRealtorValidation;
orgLevelDisableRentalServices;
showStartScreen;
showSaleFlowSelection;
showFlowSelection;
showRental;
  checkFlow ( event ) {
    ////this.spinnerShown = true);

    /* var action = component.get("c.checkFlowType");
    action.setParam("oppId", this.recordId));
    action.setCallback(this,function(response){
        if(response.getState() === "SUCCESS"){ */
           // //this.spinnerShown = false);

            //let wrapper = response.getReturnValue();
            let result = wrapper.flowType;
            let wrapper = {orgLevelDisableSale:false, orgLevelHideVaria:true}
            this.orgLevelDisableSale = wrapper.orgLevelDisableSale;
            this.orgLevelDisableReservation = wrapper.orgLevelDisableReservation;
            this.orgLevelHideChangeOrder = wrapper.orgLevelHideChangeOrder;
            this.orgLevelHideExtras = wrapper.orgLevelHideExtras;
            this.orgLevelHideVaria = wrapper.orgLevelHideVaria;
            this.orgLevelDisableRental = wrapper.orgLevelDisableRental;
            this.orgLevelHideDeleteButton = wrapper.orgLevelHideDeleteButton;
            this.orgLevelDisplayFintracAndInfo = wrapper.orgLevelDisplayFintracAndInfo;
            this.orgLevelDisplayCorpFintracAndInfo = wrapper.orgLevelDisplayCorpFintracAndInfo;
            this.orgLevelDisableRealtorValidation = wrapper.orgLevelDisableRealtorValidation;
            this.orgLevelDisableRentalServices = wrapper.orgLevelDisableRentalServices;

            if(result == 'Sale'){
                this.loadData();

                //this.showStartScreen = true;
                //this.showSaleFlowSelection = true;
                //this.showFlowSelection = false;
            }
            else if(result == 'Rental'){
                this.loadRentalData();

                //this.showStartScreen = false;
                //this.showSaleFlowSelection = false;
                //this.showFlowSelection = false;

                //this.showRental = true;
            }
            else if(result == 'Error'){
              alert(wrapper.errorMessage);
                /* $A.get('e.force:showToast').setParams({
                    'type' : 'error',
                    'title': 'Error',
                    'message' : wrapper.errorMessage
                }).fire();
                $A.get('e.force:closeQuickAction').fire(); */
            }
            else{
                //this.showStartScreen = true;
                //this.showSaleFlowSelection = false;
                //this.showFlowSelection = true;
            }
        /*}
        else{
            console.log("Error MakeASaleHelper.checkFlow :" + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
}
disableReservation;
reservationCompleted;
reservationLabel='RESERVATION';
saleLabel= 'SALE';
loadData () {
    ////this.spinnerShown = true);
    /* var myPageRef = this.pageReference);
    var assetId;
    if(myPageRef != null){
        assetId = myPageRef.state.c__assetId;
    }
    var recordId = this.recordId);
    var apexAction = component.get("c.initClass");
    apexAction.setParams({
        "recordId": recordId,
        "assetId": assetId
    });
    apexAction.setCallback(this, function(response) {
        var state = response.getState(); */
        //if (component.isValid() && state === "SUCCESS") {
            ////this.spinnerShown = false);

            var object = response.getReturnValue();
            this.opportunity = object.opportunity;
            this.closingDetail = object.closingDetail;
            this.salesRep = object.salesRep;
            this.buyer1 = object.buyer1;
            this.appliedTaxes = object.appliedTaxesList;

            //Check Sale and Reservation status
            var depositList = object.depositList;
            var disableReservation = false;
            var reservationCompleted = true;

            if(depositList && depositList.length > 0){
                for(let dep of depositList){
                    if(dep.Deposit_For__c == "Cashdown" || !dep.Deposit_For__c){
                        disableReservation = true;
                        break;
                    }
                }
            }else{
                reservationCompleted = false;
            }
            this.disableReservation = disableReservation;
            this.reservationCompleted = reservationCompleted;

            /* //Set button labels
            if(reservationCompleted){
                this.reservationLabel = $A.get('$Label.c.MAS_Edit_Reservation');
                this.saleLabel = $A.get('$Label.c.MAS_Convert_to_Sale');
            } */
            /* if(disableReservation){
                this.saleLabel = $A.get('$Label.c.MAS_Edit_Sale');
            }
 */
            // directly show sale or reservation screen
            let orgLevelDisableSale = this.orgLevelDisableSale;
            let orgLevelDisableReservation = this.orgLevelDisableReservation;
            if(orgLevelDisableReservation){
                // go directly to sale screen
                //TAO will provide business logic
                /* this.showStartScreen = false;
                this.showSaleFlowSelection = false;
                this.startSale( '' ); */
            }
            else if(orgLevelDisableSale){
                // go directly to reservation screen if not disabled
                //TAO will provide business logic
                /* if(disableReservation == false){
                    this.showStartScreen = false;
                    this.showSaleFlowSelection = false;
                    this.startReservation( '' );
                } */
            }
            if(this.sObjectName=='Closing_Detail__c'){
                this.handleMakeASaleHelper( );
            }
            console.log("MakeASaleHelper.closingDetail : " + JSON.stringify(object.closingDetail));
        //}
        /* else {
            console.log("MakeASaleHelper.loadData | Apex Callback error ", JSON.stringify(response.getError()) + " state " + state);
        }
    });
    $A.enqueueAction(apexAction); */
}

loadRentalData ( event ) {
    ////this.spinnerShown = true;

    /* var action = component.get("c.initRentalClass");
    action.setParam("oppId", this.recordId);
    action.setCallback(this,function(response){
        if(response.getState() === "SUCCESS"){ */
            //this.spinnerShown = false;

            let result = response.getReturnValue();
            this.opportunity = result.opportunity;
            this.rentalDetail = result.rentalDetail;
            console.log(result.rentalDetail);
            this.salesRep = result.salesRep;
            this.buyer1 = result.buyer1;

            this.flowType = "Rental";

            // Setup UI : Hide next step components
           /*  $A.util.addClass(component.find("assetRentalDiv"), 'hide');
            $A.util.addClass(component.find("variaRentalDiv"),'hide');
            $A.util.addClass(component.find("inclusionRentalDiv"),'hide');
            $A.util.addClass(component.find("serviceRentalDiv"),'hide');
            $A.util.addClass(component.find("depositRentalDiv"),'hide');
            $A.util.addClass(component.find("fileManagementRentalDiv"),'hide');
            $A.util.addClass(component.find("reviewRentalDiv"),'hide'); */

            // Refresh the child component now that new data is loaded
            //component.find("cMASRentalContactRole").update();
        /* }
        else{
            console.log("Error MakeASaleHelper.loadRentalData :" + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
}

startReservation ( event ) {
    var closingDetail = this.closingDetail;
    if(!closingDetail){
        //refetch or recreate closingDetail again
        helper.loadData( helper);
        return;
    }

    //this.spinnerShown = true;

    closingDetail.Is_Reservation__c = true;
    if(!closingDetail.Stage__c){
        closingDetail.Stage__c = 'Reservation';
    }
    if(!closingDetail.Preliminary_Contract_Signed_D__c){
        closingDetail.Preliminary_Contract_Signed_D__c = null;//$A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
    }
    this.closingDetail = closingDetail;

    /* var action = component.get("c.updateClosingDetail");
    action.setParam("closingDetail", closingDetail);
    action.setCallback(this,function(response){ 
        if(response.getState() === "SUCCESS"){*/
            ////this.spinnerShown = false;

            //Start Reservation
            this.showMakeAReservation = true;
            this.flowType = "Reservation";

            // Setup UI : Hide next step components
            /* $A.util.addClass(component.find("parkingDiv"),'hide');
            $A.util.addClass(component.find("depositDiv"),'hide');
            $A.util.addClass(component.find("reviewDiv"),'hide'); */

            // Refresh the child component now that new data is loaded
            //component.find("cMASAsset").update();
        /* }
        else{
            console.log('Error MakeASaleHelper.startReservation' + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
}

startSale ( event ) {
    var closingDetail = this.closingDetail;
    let reservationCompleted = this.reservationCompleted;
    let disableReservation = this.disableReservation;

    if(!closingDetail){
        //refetch or recreate closingDetail again
        this.loadData();
        return;
    }

    //this.spinnerShown = true;

    closingDetail.Is_Reservation__c = false;
    if(!closingDetail.Stage__c || (reservationCompleted && !disableReservation)){
        closingDetail.Stage__c = 'In Process';
    }

    if($A.util.isEmpty(closingDetail.Preliminary_Contract_Signed_D__c)){
        closingDetail.Preliminary_Contract_Signed_D__c = null;//$A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
    }

    this.closingDetail = closingDetail;
//save the closing detail
    /* var action = component.get("c.updateClosingDetail");
    action.setParam("closingDetail", closingDetail);
    action.setCallback(this,function(response){
        if(response.getState() === "SUCCESS"){ */
            //this.spinnerShown = false;

            //Start Sale
            /* this.showMakeASale = true; */
            this.flowType = "Sale";

            // Setup UI : Hide next step components
            /* $A.util.addClass(component.find("extrasDiv"),'hide');
            $A.util.addClass(component.find("assetDiv"),'hide');
            $A.util.addClass(component.find("parkingDiv"),'hide');
            $A.util.addClass(component.find("variaDiv"),'hide');
            $A.util.addClass(component.find("changeOrderDiv"),'hide');
            $A.util.addClass(component.find("depositDiv"),'hide');
            $A.util.addClass(component.find("fileManagementDiv"),'hide');
            $A.util.addClass(component.find("reviewDiv"),'hide'); */

            // Refresh the child component now that new data is loaded
            //component.find("cMASContactRole").update();
        /* }
        else{
            console.log('Error MakeASaleHelper.startSale' + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
}

saveAssets ( project, assetList, closingDetail) {

    var opportunity = this.opportunity;
    console.log("MakeASaleHelper.saveAssets");
    console.log("MakeASaleHelper.saveAssets: assetList : " + JSON.stringify(assetList));
    // console.log("akeASaleHelper.saveAssets: Lot_House_Model__c : " + assetList[0].Lot_House_Model__c + " Name : " + assetList[0].Lot_House_Model__r.Name);

    // Create the apex action to execute
    /* ar apexAction = component.get("c.saveAssets");
    apexAction.setParams({
        "opportunityString" : JSON.stringify(opportunity),
        "closingDetailString" : JSON.stringify(closingDetail),
        "assetListString" : JSON.stringify(assetList),
        "projectId" : project.Id
    });

    // Add callback behavior for when response is received
    apexAction.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") { */
            var object = response.getReturnValue();
            //console.log("MakeASaleHelper.saveAssetChoice : " + JSON.stringify(response.getReturnValue()));

            this.opportunity = object.opportunity;
            this.closingDetail = object.closingDetail;
            this.assetList = object.assetList;
            this.salesRep = object.salesRep;

            // Refresh the next child component now that new data is loaded
            //component.find("cMASParking").update();

        /* }
        else {
            console.log("MakeASaleHelper.saveAssetChoice | Apex Callback error ", JSON.stringify(response.getError()) + " state " + state);
        }
    });
    $A.enqueueAction(apexAction); */
}

updateParkingList ( parkingList) {

    console.log("MakeASaleHelper.updateParkingList: entered - save updateParkingList selection to cloud");
    var orgLevelHideVaria = this.orgLevelHideVaria;
    // Create the apex action to execute
    /* var apexAction = component.get("c.saveParkings");
    apexAction.setParams({
        "parkingListString" : JSON.stringify(parkingList)
    });

    // Add callback behavior for when response is received
    apexAction.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") { */
            var object = response.getReturnValue();
            //console.log("MakeASaleHelper.updateParkingList : " + JSON.stringify(response.getReturnValue()));

            this.parkingList = object.parkingList;

            /* // Refresh the next child component now that new data is loaded
            var flowType = this.flowType;
            if(flowType == "Sale"){
                if(!orgLevelHideVaria){
                    //component.find("cMASVaria").update();
                }
            }
            else if(flowType == "Reservation"){
                //component.find("cMASDeposit").update();
            } */
        
       /* } else {
            console.log(state + " MakeASaleHelper.updateParkingList | Apex Callback error ", JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(apexAction); */
}

updateExtraList (extraList) {

    console.log("MakeASaleHelper.updateExtraList: entered - save updateExtraList selection to cloud");
    var orgLevelHideVaria = this.orgLevelHideVaria;
    // Create the apex action to execute
    /* var apexAction = component.get("c.saveExtra");
    apexAction.setParams({
        "extraListString" : JSON.stringify(extraList)
    });

    // Add callback behavior for when response is received
    apexAction.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") { */
            var object = response.getReturnValue();
            //console.log("MakeASaleHelper.updateExtraList : " + JSON.stringify(response.getReturnValue()));

            this.extraList = object.extraList;

            /* // Refresh the next child component now that new data is loaded
            var flowType = this.flowType;
            if(flowType == "Sale"){
                if(!orgLevelHideVaria){
                    component.find("cMASVaria").update();
                }
            }
            else if(flowType == "Reservation"){
                component.find("cMASDeposit").update();
            } */
        
       /*}  else {
            console.log(state + " MakeASaleHelper.updateExtraList | Apex Callback error ", JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(apexAction); */
}

saveContactRoleList ( contactRoleList, contactRoleRemoveList, opportunity, onlySave, idInformations) {

    console.log("MakeASaleHelper.saveContactRoleList: entered - save ContactRoleList selection to cloud");
    console.log("MakeASaleHelper.saveContactRoleList: idInformations " + JSON.stringify(idInformations));

    var contactRolesWithContactInfo = contactRoleList;
    var closingDetailId = this.closingDetail ? this.closingDetail.Id : '';

    // Create the apex action to execute
   /*  var apexAction = component.get("c.saveContactRoleList");
    apexAction.setParams({
        "contactRoleListString" : JSON.stringify(contactRoleList),
        "contactRoleRemoveListString" : JSON.stringify(contactRoleRemoveList),
        "opportunityString" : JSON.stringify(opportunity),
        "closingDetailId" : closingDetailId,
        "idInformationsString" : JSON.stringify(idInformations)
    });

    // Add callback behavior for when response is received
    apexAction.setCallback(this, function(response) { */
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") {
            var object = response.getReturnValue();
            console.log("MakeASaleHelper.saveContactRoleList : " + JSON.stringify(object.contactRoleList));

            // Repopulate contactName data, which is used for display purposes
            var newContactRoleList = object.contactRoleList;
            for (var k = 0; k < newContactRoleList.length; k++) {
                var contactRole = newContactRoleList[k];

                for (var i = 0; i < contactRolesWithContactInfo.length; i++) {
                    var contactRoleWithInfo = contactRolesWithContactInfo[i];
                    if (contactRoleWithInfo.ContactId == contactRole.ContactId) {
                        contactRole.contactName = contactRoleWithInfo.contactName;
                        break;
                    }
                }
            }

            this.contactRoleList = newContactRoleList;

            if(onlySave != true){
                var cmpEvent = component.getEvent("changeTabEvent");

                var flowType = this.flowType;
                if(flowType == "Rental"){
                    cmpEvent.setParams({"itemParam" : 'ChooseContactRoleRental_Next'});
                }
                else{
                    cmpEvent.setParams({"itemParam" : 'ChooseContactRole_Next'});
                }
                cmpEvent.fire();
            }
        }
        else {
            if(onlySave != true){
                let error = response.getError();
                let message = '';
                if(error[0].fieldErrors && error[0].fieldErrors.Email && error[0].fieldErrors.Email[0].message){
                    message = error[0].fieldErrors.Email[0].message;
                }
                else{
                    message = 'Entered data is invalid.';
                }
                alert(message);
                /* var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type" : "error",
                    "title": "Error",
                    "message": message
                });
                toastEvent.fire(); */
                //this.spinnerShown = false;
            }

            console.error(state + " MakeASaleHelper.saveContactRoleList | Apex Callback error ", JSON.stringify(response.getError()));
        }
    /* });
    $A.enqueueAction(apexAction); */
}

saveDepositList ( depositsList, closingDetails, opportunity, assetList, parkingList, vipList) {

    console.log("MakeASaleHelper.saveDepositList: entered - save DepositList selection to cloud");

    console.log("MakeASaleHelper.saveDepositList: opportunity " + JSON.stringify(opportunity));
    console.log("MakeASaleHelper.saveDepositList: closingDetails " + JSON.stringify(closingDetails));
    console.log("MakeASaleHelper.saveDepositList: depositList " + JSON.stringify(depositsList));

    // Create the apex action to execute
    /* var apexAction = component.get("c.saveDeposits");

    apexAction.setParams({
        "depositListString" : JSON.stringify(depositsList),
        "closingDetailString" : JSON.stringify(closingDetails),
        "opportunityString" : JSON.stringify(opportunity),
        "assetListString" : JSON.stringify(assetList),
        "parkingListString" : JSON.stringify(parkingList),
        "vipListString" : JSON.stringify(vipList),
    });

    // Add callback behavior for when response is received
    apexAction.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") { */
            var object = response.getReturnValue();
            console.log("MakeASaleHelper.saveDeposit : " + JSON.stringify(response.getReturnValue()));

            //only populate new Ids
            let depositList = this.depositList;
            for(let i=0 ; i < object.depositList.length ; i++){
                depositList[i].Id = object.depositList[i].Id;
                depositList[i].Deposit_Amount__c = object.depositList[i].Deposit_Amount__c;
            }
            this.depositList = depositList;

            this.assetList = assetList;
            this.parkingList = parkingList;
            this.closingDetail = closingDetails;
        /* }
        else {
            console.log(state + " MakeASaleHelper.saveDepositList | Apex Callback error ", JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(apexAction); */
}
}
