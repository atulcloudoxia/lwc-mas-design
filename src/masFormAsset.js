import { track, api, LightningElement } from 'lwc';
//import timeZone from @salesforce/i18n/timeZone

export default class FormAsset extends LightningElement {

  @api asset;
  @api closingdetail;

  get assetPriceOptions() {
      return [
          { label: '$873,340', value: '873340.00' },
          { label: '$973,340', value: '973340.00' },
      ];
  }

  /**
   * When a asset price is changed
   *
   * @param (Event) e
   */
  handleAssetPriceChange(event) {

  }
  
  /**
   * Assets form submit
   *
   * @param (Event) e
   */
  handleFormInputChange(event){
    var closingDetail = {...this.closingdetail};
    closingDetail[event.target.name] = event.target.value;
    this.closingdetail = closingDetail;
  }

  handleSubmit(e) {
    e.preventDefault();
    // Nhan, handle "edit" logic here
    var item = {...this.asset};
    console.log(this.asset);
    // Data Validation
    if (item == null || item.Id == null) {
        console.log("No asset selected");
        return;
    }

    var isValid = true;
    // console.log("MASAssetController.handleNextClick"+ component.find("salesRepForm").get("v.body"));
    let salesRepUserId = this.closingdetail.Sales_Representative__c;
    let priContractDate = this.template.querySelector('[data-id="contract-date"]').value;

    console.log(salesRepUserId);
    if(!salesRepUserId){
      alert('Please select Sales Rep'/* $A.get('$Label.c.MAS_Select_Sales_Rep') */);
      return;
    }

    if(!priContractDate){
      alert('MAS_Fill_Transaction_Date' /* $A.get('$Label.c.MAS_Fill_Transaction_Date') */);
        return;
    }


    // Data Validation
    var project = this.closingdetail.Project_Lookup__c;
    var assetList = this.asset;
    var closingDetail = this.closingdetail;

    if (!project) {
        alert('MAS_Select_Project_Asset' /* $A.get('$Label.c.MAS_Select_Project_Asset') */);
        isValid = false;
    }
    else if (assetList.length == 0) {
        alert('MAS_Select_Minimum_Asset'/* $A.get('$Label.c.MAS_Select_Minimum_Asset') */);
        isValid = false;
    }
    if(isValid){

    /* ar selectedAssetList = component.get("v.selectedAssetList");
        if (selectedAssetList.length > 0) {
            $A.get('e.force:showToast').setParams({
                'type' : 'error',
                'title': 'Error',
                'message' : 'Only one Asset can be added'
            }).fire();
            return;
        } */

        var timezone = 'America/Los_Angeles';
        var today = new Date().toLocaleString("en-US", {timeZone: timezone});

        var project = item.Project__c;
        var phase = item.Phase__c;
        var lotWidth = item.Lot_Width__c;

        var td = today.substr(0, today.indexOf(',')).split('/');
        var year = td[2];
        var month = td[0];
        var date = td[1];
        item.PurchaseDate = year+'-'+month+'-'+date;
        let lhm;
        if(item.Unit_Purpose_Type__c=='Lot'){
            var LotHouseModelList = this.LotHouseModelList;
            // console.log("MASContactAssetController.addAsset > LotHouseModelList " + JSON.stringify(LotHouseModelList));
            lhm = LotHouseModelList.filter(function (houseModel) {
                return houseModel.Id == item.Lot_House__r.LotHouseModel__c;
            });
            if (item.Lot_House__r == undefined || item.Lot_House__r.LotHouseModel__c == '') {
                lhm = [];
                lhm.push(LotHouseModelList[0]);
            }

        }
        /* var duplicateFound = false;
        for (var i = 0; i < selectedAssetList.length; i++) {
            var selectedItem = selectedAssetList[i];
            if (item.Id == selectedItem.Id) {
                duplicateFound = true;
                break;
            }
        }
        if (duplicateFound == true) {
            alert($A.get('$Label.c.MAS_Item_Already_in_List'));
            return;
        } */

        console.log("MASAssetController.selectedAsset " + JSON.stringify(item));
        if(item.Unit_Purpose_Type__c=='Lot'){
            this.fetchLotHouseModelList( project, phase, lotWidth);
        }else{
            this.LotHouseModelList = [];
        }
//CREATE A ENTRY IN PRICE VERSION

        if (lhm != undefined && lhm[0] != undefined) {
          console.log('fetchAssetPriceHistory lmh[0] ' + lhm[0]);
          this.createLotHouse( lhm[0].Id, item.Id);
        }
        let rowAddEvent = new CustomEvent('updatedata',{
          detail: {
            closingdetail: this.closingdetail

          },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(rowAddEvent);
      }


  }

  /**
   * Cancel form submission
   *
   * @param (Event) e
   */
  handleCancel(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("close")
    );
  }
  get developerDealOptions() {
      return [
          { label: 'true', value: 'true' },
          { label: 'false', value: 'false' }
      ];
  }

  handleDeveloperDealChange(event) {
      var closingdetail = JSON.parse(JSON.stringify(this.closingdetail));
      closingdetail.Developer_Deal__c = event.detail.value;
      this.closingdetail = closingdetail;
  }
  handleReservationChange(event) {
    var closingdetail = JSON.parse(JSON.stringify(this.closingdetail));
    closingdetail.Is_Reservation__c = event.detail.value;
    this.closingdetail = closingdetail;
  }
  handleAssetSelect(event) {
      var selectedAssetId = event.detail.recordId;
      console.log('selectedAssetId: '+selectedAssetId);
      console.log('selectedAssetId: '+event.detail.record);
      this.asset =  event.detail.record;
  }
  handleSalesRepSelect(event) {
      var selectedSalesRepId = event.detail.recordId;
      console.log('selectedSalesRepId: '+selectedSalesRepId);
      var closingDetail = JSON.parse(JSON.stringify(this.closingdetail));
      closingDetail.Sales_Representative__c = selectedSalesRepId;
      if(event.detail.record)
      closingDetail.Sales_Representative__r={Id:selectedSalesRepId,Name:event.detail.record.Name}
      else closingDetail.Sales_Representative__r = {};
      this.closingDetail = closingDetail;
  }
  connectedCallback(){
    //calling to fetch lot house model
    this.fetchLotHouseModelList();
  }
  @track selectedProject;
  @track selectedAssetList;
  @track disableAssetEdit;
  @track assetPriceEditMode;
  @track priceListVersionsSteps;
  @track disallowModelPriceEdit;
  getCurrentData() {

    console.log("MASAssetController.getCurrentData: retrieving current project and assets for assetId " + this.asset.Id);

    var mHelper = this;

    /* var apexAction = component.get("c.getCurrentData");
    apexAction.setParams({
        "opportunityId" : recordId
    });
    apexAction.setCallback(this, function(response) {
        var state = response.getState();
        if (component.isValid() && state === "SUCCESS") { */
            var obj = JSON.parse('{"assetPriceEditMode":"Price History","disableAssetEdit":false,"disallowModelPriceEdit":false,"priceListVersionsSteps":3,"selectedAssetList":[],"selectedProject":{"Id":"a065x00000gHQYmAAO","Name":"Kingsway Cres"}}');//response.getReturnValue();

            console.log("MASAssetHelper.getCurrentData : " + JSON.stringify(obj));
            console.log("MASAssetHelper.getCurrentData selectedProject : " + JSON.stringify(obj.selectedProject));
            this.selectedProject  =  obj.selectedProject
            this.selectedAssetList  =  obj.selectedAssetList
            this.disableAssetEdit  =  obj.disableAssetEdit
            this.assetPriceEditMode  =  obj.assetPriceEditMode
            this.priceListVersionsSteps  =  obj.priceListVersionsSteps
            this.disallowModelPriceEdit  =  obj.disallowModelPriceEdit


           /*  if (obj.selectedProject == null || obj.selectedProject == undefined) {
                mHelper.setSpinnerVisibility(component, false);
                console.log("MASAssetHelper.getCurrentData selectedProject is null ");
            }
            else {
                console.log("MASAssetHelper.loadAssetPicklistForProject");
                mHelper.loadAssetPicklistForProject(component, obj.selectedProject.Id);
            } */

            // Check for Lot Assets
            //let selectedAssetList = component.get("v.selectedAssetList");
            // console.log("MakeASaleHelper.selectedAssetList " + JSON.stringify(selectedAssetList));
            var hasLotAssets = false;
            //for(let i=0 ; i < selectedAssetList.length ; i++){
                var item = {...this.asset};selectedAssetList[i];
                if(item.Unit_Purpose_Type__c=='Lot'){
                    hasLotAssets = true;
                    //break;
                }
            //}
            this.containsLot = hasLotAssets;

        /* }
        else {
            console.log("MASAssetController.getCurrentData | Apex Callback error ", JSON.stringify(response.getError()) + " state " + state);
        }
    });
    $A.enqueueAction(apexAction); */
  }

  @track LotHouseModelListDetail;
  @track LotHouseModelList;
  @track containsLot;
  fetchLotHouseModelList(phase, lotwidth, iseditbutton) {
    //HOPEFULLY we don't need the contains lot variable because we will now only have one asset record.

    /*helper.setSpinnerVisibility(component, true);

    var action = component.get("c.getLotHouseModel");
    action.setParam("projectId", projectId);
    action.setParam("phase", phase);
    action.setParam("lotWidth", lotWidth);

    action.setCallback(this,function(response){
        if(response.getState() === "SUCCESS"){*/
            var obj = JSON.parse('[{"Id":"a0j5x00000O99nQAAR","Name":"LHM- 1","Available_for_Phases__c":"1;2;2a;2b;2c;3;4;5;6;7;8;9;10","Width_Ft__c":500,"Lot_House_Model_Projects__r":[{"LotHouseModel__c":"a0j5x00000O99nQAAR","Id":"a215x000003EnecAAC","Project__c":"a065x00000gHQYmAAO","Model_Price__c":5000}]},{"Id":"a0j5x00000O99nVAAR","Name":"LHM- 2","Available_for_Phases__c":"1;2;2a;2b;2c;3;4;5;6;7;8;9;10","Width_Ft__c":500,"Lot_House_Model_Projects__r":[{"LotHouseModel__c":"a0j5x00000O99nVAAR","Id":"a215x000003EucoAAC","Project__c":"a065x00000gHQYmAAO"}]}]');//.getReturnValue();
            if(iseditbutton){
                this.LotHouseModelListDetail =obj;
            }else{
                this.LotHouseModelList = obj;
                console.log(JSON.stringify(obj));
                if(this.containsLot==false && obj.length>0){
                    this.containsLot = true ;
                }else if(this.containsLot==true && obj.length==0){
                    let selectedAssetList = this.asset;
                    let lotAst = selectedAssetList.filter(function (ast) {
                        return ast.Unit_Purpose_Type__c == 'Lot';
                    });
                    if(lotAst.length==0 || (this.containsLot==true && obj.length==0)){
                        this.containsLot = false;
                    }
                }
            }

            //helper.setSpinnerVisibility(component, false);
        /* }
        else{
            console.error('Error fetchLotHouseModelList ==> ' + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
  }

  @track priceListVersionsSteps;
  @track selectedAssetPriceListVersion;
  fetchAssetPriceHistory(){
        let priceListVersionsSteps = this.priceListVersionsSteps;

        /* var action = component.get("c.getAssetPriceHistory");
        action.setParam("assetId", assetId);
        action.setParam("recordLimit", priceListVersionsSteps);
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){ */

              this.selectedAssetPriceListVersion = [{}];//response.getReturnValue();
                helper.setSpinnerVisibility(component, false);
           /*  }
            else{
                console.error('Error getAssetPrice ==> ' + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action); */
  }

  createLotHouse(lotHouseModelId, assetId){

/*     var action = component.get("c.createLotHouse");
    action.setParam("lotHouseModelId", lotHouseModelId);
    action.setParam("assetId", assetId);
    action.setParam("projectId", component.get("v.selectedProject").Id);
    action.setCallback(this,function(response){
        if(response.getState() === "SUCCESS"){ */
            var obj = response.getReturnValue();
            var astList = this.selectedAsset; // result
            astList.Lot_House__r = obj;
            this.asset = astList;

       /*  }
        else{
            console.error('Error fetchLotHouseModelList ==> ' + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
}
updateLotHouse(lotHouseList){
    /* helper.setSpinnerVisibility(component, true);

    var action = component.get("c.updateLotHouse");
    action.setParam("lotHouseList", lotHouseList);

    action.setCallback(this,function(response){
        if(response.getState() === "SUCCESS"){
            var obj = response.getReturnValue();

            helper.setSpinnerVisibility(component, false);
         }
         else{
            console.error('Error fetchLotHouseModelList ==> ' + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
}
deleteLotHouse(lotHouseList){
    /* helper.setSpinnerVisibility(component, true);

    var action = component.get("c.deleteLotHouse");
    action.setParam("lotHouseList", lotHouseList);

    action.setCallback(this,function(response){
        if(response.getState() === "SUCCESS"){
            var obj = response.getReturnValue();

            helper.setSpinnerVisibility(component, false);
         }
        else{
            console.error('Error fetchLotHouseModelList ==> ' + JSON.stringify(response.getError()));
        }
    });
    $A.enqueueAction(action); */
}
editLotHouseModel(){


  let selectedAsset = {...this.asset};
  var LotHouseModelListDetail = this.LotHouseModelListDetail;

  //for(let i=0 ; i < selectedAssetList.length ; i++){
      //if(selectedAssetList[i].isEdit || selectedAssetList[i].isEditModel){
          var lhmId = selectedAsset.Lot_House__r.LotHouseModel__c;
          console.log(lhmId);
          let lhm = LotHouseModelListDetail.filter(function (houseModel) {
             return houseModel.Id == lhmId;
          });
          if(lhm[0]!=undefined){
              selectedAsset.Lot_House__r.LotHouseModel__r = {"Name":lhm[0].Name,"Id":lhmId};
          }
          // Reinit LH price to that of model when changing model
          if(lhm[0].Lot_House_Model_Projects__r!=undefined)
          selectedAsset.Lot_House__r.Price__c = lhm[0].Lot_House_Model_Projects__r[0].Model_Price__c;
          //break;
      //}
  //}
  this.selectedAsset = selectedAsset;
}
}
