import { LightningElement, track, api } from 'lwc';
import { COLUMNS_DEPOSIT, MOCK_DEPOSIT_SCHEDULE } from './constants';
import { findRowById,formatcurrencytoNumber,formatNumbertocurrency  } from './utils';

export default class DepositPage extends LightningElement {

    columns = COLUMNS_DEPOSIT;
    @api closingdetail;
    @api data;
    @api asset;
    @api extradata;
    @api parkingdata;
    @track addDiscount = false;
    @api contactRoleList;
    @api opportunity;
    optionsSchedule = [{ }]; // Options for "Select Deposit Schedule"
    @track selectedDepositSchedule;
    @track selectedDepositScheduleValue;
    
    handleEligibleCheckbox(e){
        this.closingdetail= {...this.closingdetail};  
        this.closingdetail.Eligible_for_tax_rebate__c = e.target.checked;
        this.handleDataUpdate();  
        
    }
    connectedCallback(){
        this.closingdetail  = {...this.closingdetail} ;
        console.log('closingdetail');
        console.log(this.closingdetail);
      this.asset = JSON.parse(JSON.stringify(this.asset));
      console.log(this.asset);
     //this.asset.Condo_Price__c = formatNumbertocurrency(this.asset.Condo_Price__c);
      
      
     var optionsSchedule = [];

      MOCK_DEPOSIT_SCHEDULE.forEach(object => {
        const option = {};
        option['value']= object.Id;
        option['label']= object.Name;
    
        optionsSchedule.push(option);
      });
      this.optionsSchedule = optionsSchedule;
      console.log(this.optionsSchedule);
      this.selectedDepositScheduleValue = this.closingdetail.Deposit_Schedule__c;
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
          console.log(JSON.stringify(item));
        total += parseFloat(item.depositPerJS);
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
      var selectedDepositSchedule ;
      var depositSchedule = e.target.value;
      var depositScheduleNamePicklist = this.optionsSchedule;
      console.log('depositSchedule: '+depositSchedule);
      depositScheduleNamePicklist.forEach(function(depositScheduleName){
        console.log(depositScheduleName);
        if(depositScheduleName.value == depositSchedule){
            selectedDepositSchedule = JSON.parse(JSON.stringify(depositScheduleName));
            
        }
      });
      console.log('selectedDepositSchedule');
      console.log(selectedDepositSchedule);
      if(selectedDepositSchedule) {
        this.selectedDepositScheduleValue = selectedDepositSchedule.value;
          var closingDetail = JSON.parse(JSON.stringify(this.closingdetail));
          closingDetail.Primary_Usage__c = 'Primary Residence';//REVIEW THIS LINE (selectedDepositSchedule!=undefined && selectedDepositSchedule!=null?selectedDepositSchedule.Primary_Usage_Type__c:null);

          if(closingDetail.Primary_Usage__c != "Primary Residence") {
              selectedDepositSchedule.Eligible_for_Tax_Rebates__c = false;
          }
          closingDetail.Eligible_for_tax_rebate__c = selectedDepositSchedule.Eligible_for_Tax_Rebates__c;
          closingDetail.Deposit_Schedule__c = selectedDepositSchedule.value;
          this.closingdetail = closingDetail;
          this.selectedDepositSchedule = selectedDepositSchedule;
          console.log('Calling Update Old Deposit');
          console.log(this.closingdetail);
          console.log(this.selectedDepositSchedule);
          this.updateOldDeposit();
          this.handleDataUpdate();
      }else{
           
      }
      
    }

    /**
     * Handle schedule reload
     *
     * @param (Event) e
     */
    handleReloadSchedule(e) {
      // Schedule change logic
      this.updateOldDeposit();
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
        console.log(JSON.parse(JSON.stringify(this.closingdetail)));
      let rowAddEvent = new CustomEvent('updatedata',{
        detail: {
          depositdata: this.data,
          closingdata : this.closingdetail
        },
        bubbles: true,
        composed: false
      });
      console.table(this.data);
      this.dispatchEvent(rowAddEvent);
    }
    @track draftDepositValues = [];
    handleDepositSave(event){
      console.log(event.detail.draftValues);
      const recordInputs =  event.detail.draftValues.slice().map(draft => {
          const fields = Object.assign({}, draft);
          return { fields };
      });
      //console.log(recordInputs);
      var data = JSON.parse(JSON.stringify(this.data));
      var i = 0;
      var needToUpdatePercent = false;
      var needToUpdateAmount = false;
      data.forEach(element => {
          
        recordInputs.forEach(draft => {
            console.log(draft.fields.Id);
            console.log(element);
            var index;
            if(draft.fields.Id.startsWith('row-')){
                index = draft.fields.Id.substring(4, draft.fields.Id.length);
            }else{
                index= undefined;
            }
            console.log(index);
            
            if((draft.fields.Id!=undefined && element.Id!=undefined && draft.fields.Id==element.Id) || i == index) {
        
                for (const [key, value] of Object.entries(draft.fields)) {
                    if(key=='Deposit_Amount__c'){
                        element[key] = value;
                        needToUpdateAmount=true;
                    }
                    else if(key=='Percent__c'){
                        element['depositPerJS'] = parseFloat(value)*100;
                        element[key] = parseFloat(value) ;
                        needToUpdatePercent=true;
                    }else if(key!='Id')
                    element[key] = value;
                }
    
            }
        });
        i++;
      });
      this.draftDepositValues = [];
      console.table(data);
      this.data = data;

      
      if(needToUpdateAmount || needToUpdatePercent){
        if(needToUpdateAmount )this.updateDepositAmount();
        if(needToUpdatePercent)this.updateDepositPercent();
        this.calculatePercentage();
      }
      

      this.saveDeposits();
      //this.handleDataUpdate();
    }

    // Calculate_On_Asset_Only__c uses the price of assets only instead of net condo price for deposit calculation
    getDepositReferencePrice() {
      var closingDetail = this.closingdetail;
      var selectedDepositSchedule = JSON.parse(JSON.stringify(this.selectedDepositSchedule));
      var asset = this.asset;
      console.log("MakeASaleDeposit.getDepositReferencePrice | asset " + JSON.stringify(asset));
        console.log(selectedDepositSchedule);
      var referencePrice = 0;
      if (selectedDepositSchedule.Calculate_On_Asset_Only__c) {
          console.log('MakeASaleDeposit.getDepositReferencePrice | Calculate_On_Asset_Only__c is true');
          var price = asset.Condo_Price__c;
          if( asset.Unit_Purpose_Type__c=='Lot' && asset.Lot_House__r!=undefined && asset.Lot_House__r.Price__c!=null){
            price = price + asset.Lot_House__r.Price__c;
          }
          if (price != null) referencePrice = referencePrice + price;
          
      }
      else {
          referencePrice =  closingDetail.Net_Condo_Price__c;
      }
      console.log("MakeASaleDeposit.getDepositReferencePrice | referencePrice " + referencePrice);
      return referencePrice;
  }
  @track depositSum;
  @track depositPercent;
  @track isContainsQuebec;
  updateDepositAmount(){
      console.log('-----Start updateDepositAmount----');
      var referencePrice = this.getDepositReferencePrice();
      var depositList = JSON.parse(JSON.stringify(this.data));
      var depositSum = 0;
      for (var i = 0; i < depositList.length; i++) {
          var deposit = depositList[i];
          var price = deposit.Deposit_Amount__c;
          if (price != null && price != undefined) {
              deposit.Deposit_Amount__c = parseFloat(deposit.Deposit_Amount__c);
              deposit.Percent__c = (Number(deposit.Deposit_Amount__c/referencePrice * 100).toFixed(6))/100;
              deposit.depositPerJS = Number(deposit.Deposit_Amount__c/referencePrice * 100).toFixed(6);
              depositSum = depositSum + deposit.Deposit_Amount__c;
          }
          console.log(deposit);
      }
      this.depositSum = depositSum;
      this.data = depositList;

      var depositPercent = Number(depositSum/referencePrice * 100).toFixed(6);
      this.depositPercent = " (" + depositPercent + "%)";
      console.log('-----End updateDepositAmount----');
  }

  @track showDepositComplianceIssue = false;
  @track cmhcMinimumDeposit;
  checkCmhcCompliance(){
      try {
          //Do not show alert if isSupressComplianceAlert = true
           if(this.isContainsQuebec)
           {
               var cmhcMinimumDeposit = 0.00;
               var netCondoPrice = parseFloat(this.closingdetail.Net_Condo_Price__c);
               if(netCondoPrice<500000){
                   cmhcMinimumDeposit = netCondoPrice*0.05 + ((netCondoPrice-500000)*0.1);
               }else if(netCondoPrice>1000000){
                   cmhcMinimumDeposit = netCondoPrice*0.2;
               } else {
                   cmhcMinimumDeposit = 500000*0.05 +500000*0.1 + ((netCondoPrice-1000000)*0.2) ;
               }
               console.log('cmhcMinimumDeposit=====>'+ cmhcMinimumDeposit);
               if( this.depositSum!=null && this.depositSum<=cmhcMinimumDeposit){
                   this.showDepositComplianceIssue = true;
                   this.cmhcMinimumDeposit = cmhcMinimumDeposit.toFixed(2);
               }
           }
       } catch (error) {
           console.log(error);
       }
  }
  updateDepositPercent(){
      var referencePrice = this.getDepositReferencePrice();

      var depositList = this.data;
      var depositSum = 0;

      for (var i = 0; i < depositList.length; i++) {
          var deposit = depositList[i];
          var per = deposit.depositPerJS;
          if (per != null && per != undefined) {
              deposit.depositPerJS = parseFloat(deposit.depositPerJS)
              deposit.Deposit_Amount__c = parseFloat((deposit.depositPerJS * referencePrice)/100).toFixed(6);
              depositSum = parseFloat(depositSum) + parseFloat(deposit.Deposit_Amount__c);
          }
          console.log(deposit);
      }
      this.depositSum = depositSum;
      this.data = depositList;
      var depositPercent = Number(depositSum/referencePrice * 100).toFixed(6);
      this.depositPercent= "(" + depositPercent + "%)";

  }

  calculatePercentage() {
      var referencePrice = this.getDepositReferencePrice();

      var depositList = JSON.parse(JSON.stringify(this.data));
      for(var i=0 ; i < depositList.length; i++){
          depositList[i].depositPerJS = Number((depositList[i].Deposit_Amount__c/referencePrice) * 100).toFixed(6);
      }
      this.data = depositList;
  }
  @track depositNumberField = 'Deposit_Number__c';
  @track flowType='Sale';
  updateDepositNumberField() {
      var mHelper = this;

      var depositNumberField = this.depositNumberField;
      var depositList = this.data;

      var flowType = this.flowType;
      var newNumber = 0;

      //Include reserved deposits
      var reservedDepositCount = 0;
      if(flowType == "Sale"){
          for(let dep of depositList){
              if(dep.Deposit_For__c == "Reservation" || dep.Deposit_For__c == "VIP"){
                  reservedDepositCount = parseInt(reservedDepositCount) + 1;
              }
          }
      }

      newNumber = parseInt(newNumber) + parseInt(reservedDepositCount);

      for(let i=0 ; i < depositList.length ; i++){
          var currentDepositNumberfield = depositList[i][depositNumberField]

          // Business wants to mark some deposit values with special number (10, 20) so they do not change
          // That way, they can refer to that static deposit number in contracts and other paper work
          if (mHelper.isDepositNumberOutOfRange(currentDepositNumberfield) == false) {
              newNumber = parseInt(newNumber) + 1;
              depositList[i][depositNumberField] = newNumber;
              depositList[i]['depositNumberJS'] = newNumber;
              depositList[i]['Alternate_Deposit_Number__c'] = newNumber;
          }
      }

      // Update deposit number value of the new deposit to be the last value of the continuous range
      if (depositList.length > 0) {
          var lastDeposit = depositList[depositList.length-1];
          var lastDepositValue = mHelper.lastDepositInRangeValue() + 1;
          lastDeposit[depositNumberField] = lastDepositValue;
          lastDeposit['depositNumberJS'] = lastDepositValue;
          lastDeposit['Alternate_Deposit_Number__c'] = lastDepositValue;
      }

      // Resort depositList by deposit number (optional)
      depositList.sort(function(a,b) {
          var t1 = a.depositNumberJS == b.depositNumberJS, t2 = a.depositNumberJS < b.depositNumberJS;
          return t1? 0: -(t2?1:-1);
      });

      this.data= depositList;
  }

  // Check depositList for largest depositNumber in the range
  lastDepositInRangeValue() {
      var depositList = this.data;

      var foundLastValue = false;
      var lastValue = 1;
      while (!foundLastValue) {
          var found = false;
          for (let deposit of depositList) {
              if (deposit['depositNumberJS'] == lastValue + 1) {
                  lastValue = lastValue + 1;
                  found = true;
                  break;
              }
          }
          if (!found) {
              foundLastValue = true;
          }
      }
      return lastValue;
  }

  isDepositNumberOutOfRange(currentDepositNumberfield) {
      var depositList = this.data;
      if (currentDepositNumberfield <= 0) {
          return false;
      }

      // Scan all possible values and make sure all previous numbers are present
      for(let i = 0 ; i < currentDepositNumberfield ; i++) {
          var rangeItemExists = false;
          // Find expected deposit number value
          for (let deposit of depositList) {
              if (deposit['depositNumberJS'] == i) {
                  rangeItemExists = true;
                  break;
              }
          }
          if (!rangeItemExists) {
              // Found no item at withexpected deposit number value of i
              return true;
          }
      }
      return false;
  }
  @track appliedTaxes;
  @track newDeposit = {'sobjectType':'Deposits__c'};
  @track canShowDeposit;
  @track depositScheduleList;
  @track depositScheduleItemList;
  //do tax calculations, deposit schedule calculations and calculate deposit percentage
  updateTaxInfo(callbackFun) {
      
      var mHelper = this;

     /* var apexAction = component.get("c.updateTaxData");
      apexAction.setParams({
          "closingDetailString" : JSON.stringify(this.closingdetail),
          "depositScheduleString" : JSON.stringify(component.get("v.selectedDepositSchedule"))
      });
      apexAction.setCallback(this, function(response) {
          var state = response.getState();
          if (component.isValid() && state === "SUCCESS") {*/
              var container = {"appliedTaxesList":[{"Id":"a0c5x00000EBoJQAA1","Name":"AT-0629","Tax_Name__c":"PST","Total_Paid__c":0,"Maximum_Tax_Rebate__c":0,"Tax_Amount__c":0,"Tax_Rebate__c":0,"Closing_Detail__c":"a015x00001DPkcpAAD"},{"Id":"a0c5x00000EBoJRAA1","Name":"AT-0630","Tax_Name__c":"GST","Total_Paid__c":10873.6,"Maximum_Tax_Rebate__c":0,"Tax_Amount__c":16990,"Tax_Rebate__c":6116.4,"Closing_Detail__c":"a015x00001DPkcpAAD"}],"closingDetail":{"Id":"a015x00001DPkcpAAD","Name":"CCD-0149","Primary_Usage__c":"Primary Residence","Opportunity__c":"0065x000025zD0cAAE","Project_Lookup__c":"a065x00000gHQYmAAO","Eligible_for_tax_rebate__c":true,"TPS_Amount__c":0,"TPS_Paid__c":0,"TPS_Refund__c":0,"TVQ_Amount__c":0,"TVQ_Refund__c":0,"TVQ_Paid__c":0,"Total_Price_Sum__c":339800,"Discount_On_Total__c":0,"Total_Price_Discounted__c":339800,"Vip_Amount__c":0,"Net_Condo_Price__c":350673.6,"Preliminary_Contract_Signed_D__c":"2022-07-07","Is_Demo__c":false,"Deposit_Schedule__c":"a0D5x00000mLhUCEA0","Tax_Exempt__c":false,"Tax_Rebate_Percent__c":100,"Opportunity__r":{"Id":"0065x000025zD0cAAE"}},"depositForCheckPaymentMap":{},"depositList":[],"depositScheduleItemList":[{"Deposit_Date__c":"2022-07-07","Deposit_Number__c":1,"Percentage__c":5},{"Deposit_Number__c":2,"Percentage__c":5},{"Deposit_Number__c":3,"Percentage__c":5},{"Deposit_Number__c":4,"Percentage__c":5},{"Deposit_To__c":"Notary at Closing","Deposit_Number__c":5,"Percentage__c":5}],"depositScheduleList":[{"Id":"a0D5x00000mLhUCEA0","Name":"DS-00000002 - Kingsway Cres Phase 1","Primary_Usage_Type__c":"Primary Residence","Project__c":"a065x00000gHQYmAAO","Eligible_for_Tax_Rebates__c":true,"Limit_Payable_To_Vendor__c":30000,"Calculate_On_Asset_Only__c":false}]};
              console.log("MASDepositController.updateTaxInfo : " + JSON.stringify(container));
              var closingDetail = this.closingdetail;
              this.appliedTaxes = container.appliedTaxesList;

              // Updating tax information
              var closingDetailWithNewTax = container.closingDetail;
              closingDetail.TPS_Amount__c = closingDetailWithNewTax.TPS_Amount__c;
              closingDetail.TPS_Paid__c = closingDetailWithNewTax.TPS_Paid__c;
              closingDetail.TPS_Refund__c = closingDetailWithNewTax.TPS_Refund__c;
              closingDetail.TVQ_Amount__c = closingDetailWithNewTax.TVQ_Amount__c;
              closingDetail.TVQ_Refund__c = closingDetailWithNewTax.TVQ_Refund__c;
              closingDetail.TVQ_Paid__c = closingDetailWithNewTax.TVQ_Paid__c;
              closingDetail.Price_Excluding_HST__c = closingDetailWithNewTax.Price_Excluding_HST__c;
              closingDetail.HST_13__c = closingDetailWithNewTax.HST_13__c;
              closingDetail.Federal_HST_Credit__c = closingDetailWithNewTax.Federal_HST_Credit__c;
              closingDetail.Provincial_HST_Rebate__c = closingDetailWithNewTax.Provincial_HST_Rebate__c;
              if(closingDetailWithNewTax.Net_Condo_Price__c &&
                 closingDetailWithNewTax.TPS_Amount__c &&
                 closingDetailWithNewTax.TPS_Paid__c){
                  closingDetail.Net_Condo_Price__c = closingDetailWithNewTax.Net_Condo_Price__c;
              }else{
                  // if Tax calculation is not working or initial load
                closingDetail.Net_Condo_Price__c = closingDetail.Total_Price_Discounted__c;
              }

              this.closingdetail=closingDetail;
console.log(closingDetail);
              console.log('closingDetail.Primary_Usage__c: '+closingDetail.Primary_Usage__c);
              //Deposit Schedule Management
              if(closingDetail.Primary_Usage__c) {

                  console.log("MASDepositController.updateTaxInfo | Starting Deposit schedule management");
                  var referencePrice = mHelper.getDepositReferencePrice();
                  var depositList = this.data;
                  var depositScheduleList = container.depositScheduleList;
                  var depositScheduleItemList = container.depositScheduleItemList;

                  console.log('depositScheduleList ==> ' + JSON.stringify(depositScheduleList));
                  console.log('depositScheduleItemList ==> ' + JSON.stringify(depositScheduleItemList));
                  console.log('depositList ==> ' + JSON.stringify(depositList));

                  this.depositScheduleList= depositScheduleList;
                  this.depositScheduleItemList= depositScheduleItemList;

                  var depositNumberField = this.depositNumberField;
                  var closingDetailId = this.closingdetail.Id;

                  var depositListMap={};
                  var depositListAlternateMap={};
                  if(container.depositList!=undefined){
                      depositListMap = new Map(container.depositList.map(key => [key[depositNumberField], key.Id]));
                      depositListAlternateMap = new Map(container.depositList.map(key => [key['Alternate_Deposit_Number__c'], key.Id]));
                  }
                  console.dir(depositListMap);
                  //Check if any cashdown deposit and get sum of reserved deposits
                  var isAnyCashdownDeposit = false;
                  var reservedDepositSum = 0;

                  for(let dep of depositList){
                      if(dep.Deposit_For__c == "Cashdown"){
                          isAnyCashdownDeposit = true;
                      }else{
                          reservedDepositSum += Number(dep.Deposit_Amount__c).toFixed(6);
                      }
                  }

                  // Find primary contact Id
                  var contactRoleList = this.contactRoleList;
                  var primaryContactId;
                  for (var i = 0; i < contactRoleList.length; i++) {
                      var item = contactRoleList[i];
                      if (item && item.Role == "Primary") {
                          primaryContactId = item.ContactId;
                      }
                  }
                  if(primaryContactId && !contactRoleList){
                      primaryContactId = contactRoleList[0].ContactId;
                  }

                  var flowType = this.flowType;

                  // Using deposit schedule when no previous deposit and not in Reservation mode
                  if(!isAnyCashdownDeposit && flowType == "Sale"){

                      var initialDepositLength = parseInt(depositList.length);
                      // This handles some cases (VIP, reservation) where we have only 1 deposit with Deposit_Number = 0
                      if (initialDepositLength == 1 && parseInt(depositList[0].depositNumberJS) == 0) {
                          initialDepositLength = 0;
                      }

                      for(let i= 0 ; i < depositScheduleItemList.length ; i++){

                          var newDeposit = this.newDeposit;
                          newDeposit.Deposit_For__c = "Cashdown";
                          newDeposit.Project_Lookup__c = depositScheduleList[0].Project__c;
                          newDeposit.Closing_Detail__c = closingDetailId;
                          newDeposit.Contact__c = primaryContactId;
                          newDeposit.Prevent_Changes__c = depositScheduleItemList[i].Prevent_Changes__c;

                          //Include reserved deposit
                          newDeposit[depositNumberField] = parseInt(depositScheduleItemList[i].Deposit_Number__c) + initialDepositLength;
                          newDeposit.depositNumberJS = newDeposit[depositNumberField];
                          newDeposit.Alternate_Deposit_Number__c = newDeposit.depositNumberJS;
                          newDeposit.Id = depositListMap.get(newDeposit.depositNumberJS);
                          if(!(depositScheduleItemList[i].Deposit_To__c)) {
                              newDeposit.Deposit_To__c = depositScheduleItemList[i].Deposit_To__c;
                          }

                          // Amount__c calculations
                          if(depositScheduleItemList[i].Amount__c > 0){
                              newDeposit.Deposit_Amount__c = parseFloat(depositScheduleItemList[i].Amount__c);
                              newDeposit.depositPerJS = Number((newDeposit.Deposit_Amount__c/referencePrice) * 100).toFixed(6);
                              newDeposit.Calculation_Reference__c = 'Amount';
                          }
                          // Percentage calculation
                          else{
                              newDeposit.depositPerJS = parseFloat(depositScheduleItemList[i].Percentage__c);
                              newDeposit.Deposit_Amount__c = parseFloat((newDeposit.depositPerJS * referencePrice)/100).toFixed(6);
                              newDeposit.Calculation_Reference__c = 'Percent';

                              //Substract_First_Deposit_Amount__c calculations
                              if(i > 0 && depositScheduleItemList[i].Substract_First_Deposit_Amount__c == true){
                                  var firstDepositItem = depositScheduleItemList[0];
                                  var firstDepositAmount = parseFloat(firstDepositItem.Amount__c).toFixed(6);

                                  newDeposit.Deposit_Amount__c =  (parseFloat((parseFloat(depositScheduleItemList[i].Percentage__c)/100) * referencePrice) - firstDepositAmount).toFixed(6);
                                  newDeposit.depositPerJS = Number((newDeposit.Deposit_Amount__c/referencePrice) * 100).toFixed(6);
                                  newDeposit.Calculation_Reference__c = 'PreviousAmount:' + depositScheduleItemList[i].Percentage__c;
                              }

                          }

                          // Days_After_Previous_Deposit__c calculations : Date and Deadline calculations
                          if(depositScheduleItemList[i].Days_After_Previous_Deposit__c){
                              var depDeadline = new Date();
                              if(i > 0 && depositScheduleItemList[i-1].Deposit_Date__c){
                                  var newDateStr = depositScheduleItemList[i-1].Deposit_Date__c;
                                  depDeadline = new Date(newDateStr);

                              }
                              depDeadline.setDate(depDeadline.getDate() + parseInt(depositScheduleItemList[i].Days_After_Previous_Deposit__c));
                              newDeposit.Deposit_Deadline__c = depDeadline.getFullYear() + "-" + (depDeadline.getMonth() + 1) + "-" + depDeadline.getDate();
                              depositScheduleItemList[i].Deposit_Date__c = depDeadline;


                          }else{

                              if(depositScheduleItemList[i].Deposit_Date__c){
                                  if(i==0){
                                      depositScheduleItemList[i].Deposit_Date__c = new Date();
                                      var depDeadline = new Date();
                                      newDeposit.Deposit_Deadline__c = depDeadline.getFullYear() + "-" + (depDeadline.getMonth() + 1) + "-" + depDeadline.getDate();
                                  }
                              }
                              else {
                                newDeposit.Deposit_Deadline__c = depositScheduleItemList[i].Deposit_Date__c;
                              }
                          }

                          /// Subtract reserved deposit sum for initial deposit
                          if(i == 0 && reservedDepositSum > 0){
                              newDeposit.Deposit_Amount__c = Number(newDeposit.Deposit_Amount__c - reservedDepositSum).toFixed(6);
                              newDeposit.depositPerJS = Number((newDeposit.Deposit_Amount__c/referencePrice) * 100).toFixed(6);
                              newDeposit.Calculation_Reference__c = 'Amount';
                          }

                          depositList.push(newDeposit);

                          // Reset newDeposit to a empty item so we can keep adding
                          this.newDeposit = {'sobjectType':'Deposits__c'};
                      }
                      this.data = depositList;

                      console.log("depositList ", JSON.stringify(depositList));
                  }
                  else if (!depositList || depositList.length == 0) {
                      console.log("MASDepositController.updateTaxInfo - no deposit found, calculating initial deposits");
                      this.recalculateDeposit();
                  }

                  var depositSum = 0;
                  for(var i = 0;i < depositList.length;i++) {
                      var deposit = depositList[i];
                      var price = deposit.Deposit_Amount__c;
                      if((price) || price <= 0) {
                          if((deposit.depositPerJS) || deposit.depositPerJS == 0) {
                              deposit.depositPerJS = parseFloat(5.0);
                          }
                          price = ((deposit.depositPerJS/100) * referencePrice);
                          deposit.Deposit_Amount__c = price;
                      }
                      depositSum = depositSum + price;
                  }

                  // Update deposit list UI
                  this.data= depositList;
                  this.depositSum= depositSum;

                  var referencePrice = this.getDepositReferencePrice();
                  var depositPercent = Number(depositSum / referencePrice * 100).toFixed(6);
                  this.depositPercent= " (" + depositPercent + "%)";

                  //calculate "depositPerJS"
                  this.calculatePercentage();

                  //update depositPerJS, depositAmount and depositSum
                  this.updateDepositAmount();

                  //check cmhc compliance for Qubec province only.
                  this.checkCmhcCompliance();

                  //Adding default deposit for Reservation mode
                  if(depositList.length == 0 && flowType == "Reservation"){
                      var newDeposit = this.newDeposit;
                      var asset = this.asset;
                      var projectId = asset.Project_lookup__r.Id;

                      // Find primary contact Id
                      var contactRoleList = this.contactRoleList;
                      var primaryContactId;
                      for(var i = 0;i < contactRoleList.length;i++) {
                          var item = contactRoleList[i];
                          if(item && item.Role == "Primary") {
                              primaryContactId = item.ContactId;
                          }
                      }
                      if(primaryContactId && !contactRoleList) {
                          primaryContactId = contactRoleList[0].ContactId;
                      }

                      newDeposit[depositNumberField] = 0;
                      newDeposit.depositNumberJS = newDeposit[depositNumberField];
                      newDeposit.Alternate_Deposit_Number__c = newDeposit.depositNumberJS;
                      newDeposit.Deposit_For__c = "Reservation";
                      newDeposit.Deposit_To__c = "Vendor";
                      newDeposit.Project_Lookup__c = projectId;
                      newDeposit.Closing_Detail__c = closingDetailId;
                      newDeposit.Contact__c = primaryContactId;
                      newDeposit.depositPerJS = null;
                      newDeposit.Deposit_Amount__c = null;
                      newDeposit.Calculation_Reference__c = 'Amount';
                      var today = new Date();
                      newDeposit.Deposit_Deadline__c = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

                      depositList.push(newDeposit);
                      this.data= depositList;
                  }

                  //auto modify deposits initially for sale
                  if(!isAnyCashdownDeposit && flowType == "Sale"){
                      if(this.depositVendorCompliance() == false){
                          this.depositVendorProcess(depositListAlternateMap);
                          depositList = this.data;
                      }
                  }

                  // Process callback after vendor calculations
                  if(callbackFun){
                      callbackFun();
                  }

                  this.canShowDeposit = true;
              }

              //his.setSpinnerVisibility(component, false);
          /*}
          else {
              console.log("MASDepositController.updateTaxInfo | Apex Callback error ", JSON.stringify(response.getError()) + " state " + state);
          }
      });
      $A.enqueueAction(apexAction);*/
  }

  deleteDeposit(depositId) {
      console.log("MASDepositController.deleteDeposit");

      /*var apexAction = component.get("c.deleteDepositRec");
      apexAction.setParams({
          "Id" : depositId
      });
      apexAction.setCallback(this, function(response) {
          var state = response.getState();
          if (state === "SUCCESS") {
              if(response.getReturnValue()){
                  console.log('MASDepositController.deleteDeposit : deposite deleted ' + depositId);
              }
              else{
                  console.log('MASDepositController.deleteDeposit error in deleting deposit record');
              }
          }else{
              console.log('MASDepositController.deleteDeposit callback error' + response.getError());
          }
      });
      $A.enqueueAction(apexAction);*/
  }
  @track initialDepositScheduleId;
  @track depositSaved;
  @track vipList = [];
  @track vipApplied;
   
  updateOldDeposit() {
      //helper.setSpinnerVisibility(component, false);
      console.log('Is deposit schedule change? '+ (this.initialDepositScheduleId!=this.closingdetail.Deposit_Schedule__c));
      var closingDetailId = this.closingdetail.Id;
      //var action = component.get("c.deleteAllDepositRec");
      /*action.setParams({"closingDetailsId":closingDetailId,
                          "isDSChanged" : this.initialDepositScheduleId != this.closingDetail.Deposit_Schedule__c});
      action.setCallback(this,function(response){
          if(response.getState() === "SUCCESS"){*/
              //helper.setSpinnerVisibility(component, false);
                var response = [];
              // Only received deposits
              let depositList = this.data;
              let recDepositList = [];
              let recExistingDepositList = [];
              for(let recDep of response){
                  for(let dep of depositList){
                      if(dep.Id == recDep.Id && dep.Deposit_Received__c){
                          recDepositList.push(dep);
                          //break;
                      }else if(dep.Id == recDep.Id){
                          recExistingDepositList.push(dep);
                      }
                  }
              }
              this.data = [];
              this.depositSaved = false;

              //remove VIP as deposit has been deleted
              var closingDetail = JSON.parse(JSON.stringify(this.closingdetail));
              this.initialDepositScheduleId = closingDetail.Deposit_Schedule__c;
              var vipList = this.vipList;
              for (var i = 0; i < vipList.length; i++) {
                  vipList[i].Closing_Detail__c = null;
              }
              this.vipList = vipList;

              closingDetail.Vip_Amount__c = 0;
              this.closingdetail=closingDetail;
              this.vipApplied = false;
              // Recreate and adjust deposits if there were received ones
              // this section compares new extra deposits of type percent
              // and devide total difference of amount into correct proportion
              if(recDepositList.length > 0){
                  this.updateTaxInfo( () => {

                      console.log('inside updateOldDeposit > updateTaxInfo > callback');
                      console.log('before recDepositList ==> ' + JSON.stringify(recDepositList));

                      //update depositPerJS, depositAmount and depositSum
                      this.updateDepositAmount();

                      let newDepositList = this.data;
                      let totalAmountDiff = 0;
                      let i = 0;
                      let amountDivideTotalPart = 0;

                      for(i=0 ; i < recDepositList.length ; i++){
                          if(newDepositList.length > i){
                              totalAmountDiff =
                                  parseFloat(totalAmountDiff) +
                                  parseFloat(newDepositList[i].Deposit_Amount__c) -
                                  parseFloat(recDepositList[i].Deposit_Amount__c);
                          }
                      }

                      if(totalAmountDiff != 0){
                          for(let j = i ; j < newDepositList.length ; j++){
                              if(newDepositList[j].Calculation_Reference__c == 'Percent'){
                                  amountDivideTotalPart =
                                      parseFloat(amountDivideTotalPart) +
                                      parseFloat(newDepositList[j].depositPerJS);
                              }
                          }
                      }
                      var k = 0;
                      // Merge old received and new remaining deposits
                      for(let j = i ; j < newDepositList.length ; j++){
                          if(newDepositList[j].Calculation_Reference__c == 'Percent' && amountDivideTotalPart > 0){
                              newDepositList[j].Deposit_Amount__c =
                                  (
                                      parseFloat(newDepositList[j].Deposit_Amount__c) +
                                      parseFloat(
                                          totalAmountDiff * parseFloat(newDepositList[j].depositPerJS) /
                                          amountDivideTotalPart
                                      )
                                  ).toFixed(6);
                              newDepositList[j].Calculation_Reference__c = 'Amount';
                          }

                          if(recExistingDepositList.length>0 ){
                              if(recExistingDepositList[k]!=undefined) newDepositList[j].Id = recExistingDepositList[k].Id;
                              k++;
                          }else{
                              newDepositList[j].Id =null;
                          }

                          recDepositList.push(newDepositList[j]);
                      }

                      this.data = recDepositList;
                      // again update depositPerJS, depositAmount and depositSum
                      this.updateDepositAmount();

                      console.log('after recDepositList ==> ' + JSON.stringify(recDepositList));
                  });
              }
              else{
                  this.updateTaxInfo();
              }
        //  }
     // });
      //$A.enqueueAction(action);
  }

  recalculateDeposit() {
      var referencePrice = this.getDepositReferencePrice();
      var depositList = this.data;

      for(var i=0 ; i < depositList.length; i++){
          if(depositList[i].Deposit_For__c == 'Cashdown'){
              if(depositList[i].Calculation_Reference__c == 'Amount'){
                  //recalculate using amount
                  if(!(depositList[i].Deposit_Amount__c)) {
                      depositList[i].depositPerJS = Number((depositList[i].Deposit_Amount__c / referencePrice) * 100).toFixed(6);
                  }
              }
              else if(!(depositList[i].Calculation_Reference__c) && depositList[i].Calculation_Reference__c.startsWith('PreviousAmount') && i > 0){
                  //recalculate using previous amount and depositSchedulePercentage
                  if(!(depositList[i-1].depositPerJS)){
                      var calculationReference = depositList[i].Calculation_Reference__c.split(':');
                      if(calculationReference.length > 1){
                          var depositSchedulePer = calculationReference[1];
                          var firstDepositAmount = parseFloat((depositList[i-1].depositPerJS * referencePrice)/100).toFixed(6);
                          depositList[i].Deposit_Amount__c = (parseFloat((parseFloat(depositSchedulePer) / 100) * referencePrice) - firstDepositAmount).toFixed(6);
                          depositList[i].depositPerJS = Number((depositList[i].Deposit_Amount__c/referencePrice) * 100).toFixed(6);
                      }
                  }
              }
              else{
                  //recalculate using percentage
                  if(!(depositList[i].depositPerJS)){
                      depositList[i].Deposit_Amount__c =  ((parseFloat(depositList[i].depositPerJS)/100) * referencePrice).toFixed(6);
                  }
              }
          }
      }

      this.data= depositList;
  }
  @track disableDepositVendorRestriction;
  depositVendorCompliance() {
      let maximumAllowedAmount;

      if(this.depositScheduleList[0]){
          maximumAllowedAmount = this.depositScheduleList[0].Limit_Payable_To_Vendor__c;
      }

      if(maximumAllowedAmount < 0){
          maximumAllowedAmount = 0;
      }

      let disableDepositVendorRestriction = this.disableDepositVendorRestriction;
      let depositList = this.data;

      // Vendor processing
      if(maximumAllowedAmount > 0 && disableDepositVendorRestriction == false){
          let depositSum = 0;

          for(let dep of depositList){
              depositSum = parseFloat(depositSum) + parseFloat(dep.Deposit_Amount__c);

              if(depositSum > maximumAllowedAmount && dep.Deposit_To__c == 'Vendor'){
                  return false; // not compliant
              }
          }
      }
      return true; // compliant
  }

  depositVendorProcess(depositListAlternateMap) {
      let maximumAllowedAmount;

      if(this.depositScheduleList[0]){
          maximumAllowedAmount = this.depositScheduleList[0].Limit_Payable_To_Vendor__c;
      }

      if(maximumAllowedAmount < 0){
          maximumAllowedAmount = 0;
      }

      let project = component.get("v.project");
      let disableDepositVendorRestriction = this.disableDepositVendorRestriction;
      let depositList = this.data;
      let processedDepositList = [];
      let depositNumberField = this.depositNumberField;

      // Vendor processing
      if(disableDepositVendorRestriction == false){
          let depositSum = 0;
          var i = 0;
          for(let dep of depositList){
              i++;
              depositSum = parseFloat(depositSum) + parseFloat(dep.Deposit_Amount__c);
              dep.Calculation_Reference__c = 'Amount'; //For vendor calculations always use Amount

              if(depositSum > maximumAllowedAmount){

                  if((depositSum - parseFloat(dep.Deposit_Amount__c)) == maximumAllowedAmount){
                      //exact maximumAllowedAmount and no need to break
                      if(dep.Deposit_To__c != 'Notary at Closing'){
                          dep.Deposit_To__c = 'Notary';
                      }

                      processedDepositList.push(dep);
                  }
                  else if((depositSum - parseFloat(dep.Deposit_Amount__c)) < maximumAllowedAmount){
                      // need to break amount between vendor and notary
                      let newDeposit = Object.assign({}, dep);

                      let currentAmount = dep.Deposit_Amount__c

                      newDeposit.Deposit_Amount__c = depositSum - maximumAllowedAmount;
                      newDeposit.Deposit_To__c = 'Notary';
                      newDeposit.Calculation_Reference__c = 'Amount';
                      newDeposit[depositNumberField] = dep[depositNumberField] + 1;
                      newDeposit['depositNumberJS'] = newDeposit[depositNumberField];
                      newDeposit['Alternate_Deposit_Number__c'] = parseFloat(i+'.2');
                      newDeposit.Id = depositListAlternateMap.get(newDeposit.Alternate_Deposit_Number__c);

                      dep['Alternate_Deposit_Number__c'] =  parseFloat(i+'.1');
                      dep.Id = depositListAlternateMap.get(newDeposit.Alternate_Deposit_Number__c);
                      dep.Deposit_Amount__c = currentAmount - newDeposit.Deposit_Amount__c;
                      dep.Deposit_To__c = 'Vendor';

                      processedDepositList.push(dep);
                      processedDepositList.push(newDeposit);
                  }
                  else{
                      if(dep.Deposit_To__c != 'Notary at Closing'){
                          dep.Deposit_To__c = 'Notary';
                      }
                      dep[depositNumberField] = processedDepositList[processedDepositList.length - 1][depositNumberField] + 1;
                      dep['depositNumberJS'] = dep[depositNumberField];
                      dep['Alternate_Deposit_Number__c'] =  i;
                      processedDepositList.push(dep);
                  }

              }
              else{
                  dep.Deposit_To__c = 'Vendor';
                  dep['Alternate_Deposit_Number__c'] =  i;
                  processedDepositList.push(dep);
              }
          }

          if(depositSum > maximumAllowedAmount){
              //process decimals
              let vendorTotal = 0;
              let vendorTotalRound = 0;
              for(let i=0 ; i < processedDepositList.length ; i++){
                  if(processedDepositList[i].Deposit_To__c == 'Vendor'){
                      vendorTotal = parseFloat(vendorTotal) + parseFloat(processedDepositList[i].Deposit_Amount__c);
                      vendorTotalRound = parseFloat(vendorTotalRound) + parseFloat(parseFloat(processedDepositList[i].Deposit_Amount__c).toFixed(2));
                      processedDepositList[i].Deposit_Amount__c = parseFloat(parseFloat(processedDepositList[i].Deposit_Amount__c).toFixed(2))
                  }
                  else{
                      if(i > 0){
                          processedDepositList[i].Deposit_Amount__c = processedDepositList[i].Deposit_Amount__c
                                                                          - (maximumAllowedAmount - vendorTotalRound)
                                                                          - (vendorTotalRound - vendorTotal);
                          processedDepositList[i-1].Deposit_Amount__c = processedDepositList[i-1].Deposit_Amount__c
                                                                          + (maximumAllowedAmount - vendorTotalRound); //last vendor deposit
                      }
                      break;
                  }
              }
          }

          this.depositList = processedDepositList;

          this.updateDepositAmount();
      }
  }
 
 

   
  saveDeposits() {
      // Data Validation
      var opportunity = this.opportunity;
      var depositList = this.data;

      //process Sale or Reservation
      var flowType = this.flowType;
      var depositFor;
      if(flowType == "Reservation"){
          depositFor = "Reservation";
      }else{
          depositFor = "Cashdown";
      }

      var depositSum = 0;
      for (var i = 0; i < depositList.length; i++) {
          var deposit = depositList[i];
          var price = deposit.Deposit_Amount__c;
          if (price == null && price == undefined) {
              //helper.displayToast('Error', 'Enter all deposit amounts');
              alert('Enter all deposit amounts'/*$A.get('$Label.c.MAS_Enter_all_deposit_amounts')*/);
              return;
          }
          else {
              depositSum = depositSum + price;
          }
          if (deposit.Deposit_To__c == "") {
              //helper.displayToast('Error', 'Enter all deposit recipients');
              alert('Enter all deposit recipients'/*$A.get('$Label.c.MAS_Enter_all_deposit_recipients'*/);
              return;
          }

          //process Sale or Reservation
          if((deposit.Deposit_For__c)) {
              deposit.Deposit_For__c = depositFor;
          }
      }
      this.data= depositList;


      if (depositSum == 0) {
          //helper.displayToast('Error', 'Enter deposits');
          alert('Enter deposits' /* $A.get('$Label.c.MAS_Enter_deposits') */);
          return;
      }

      /*var closingDetail = this.closingdetail;
      var asset = this.asset;
      var parkingList = this.parkingList;
      var vipList = this.vipList;

      var cmpEvent2 = component.getEvent("updateDepositDataEvent");
      cmpEvent2.setParams({
          "itemDepositParam" : depositList,
          "itemOpportunityParam" : opportunity,
          "assetParam" : asset,
          "parkingListParam" : parkingList,
          "vipListParam" : vipList,
          "itemClosingDetailParam" : closingDetail
      });
      cmpEvent2.fire(); */

      // To prevent multiple fileUploadClicked events
      //component.set("v.depositSaved", true);
      
      this.handleDataUpdate();
      return true;
  }
}
