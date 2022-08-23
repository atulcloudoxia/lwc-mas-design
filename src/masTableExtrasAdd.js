import { LightningElement, track, api } from 'lwc';

const columns = [
    {
      label: 'Quantity',
      fieldName: 'Quantity__c',
      type: 'number',
      editable: false,
      hideDefaultActions:true,
      sortable:true,
      cellAttributes: {
        alignment: 'left',
      },
    },
    {
      label: 'Name',
      fieldName: 'name',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Description',
      fieldName: 'Description_ENG__c',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Type',
      fieldName: 'Room_Type__c',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Price',
      fieldName: 'Price__c',
      type: 'currency',
      editable: false,
      hideDefaultActions:true,
      sortable:true
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
      }
    }
];

export default class TableExtrasAdd extends LightningElement {
    columns = columns;
    @api closingDetail;
    @api asset;
    @api availableExtras;
    @api
    addRowAfterDelete() {
      console.log('addRowAfterDelete');
      //this.availableExtras;
    }
    /**
     * Row actions
     */
    handleRowAction(event) {
      const { action, row } = event.detail;

      switch (action.name) {
        case 'add':
          this.addRow(row);
          
          break;
        // No other actions but delete for now
        default:
      }
    }
    @track extraCatalogList = [{"Id":"123ExtraId"}];
    addRow(row){
      const { id } = row;
      const index = this.findRowById(id);
      if (index !== -1) {
        console.log('// '+this.availableExtras[index]);

        var closingDetail = this.closingDetail;
        var Extra_Catalog = [{"Id":"123ExtraId"}]//this.ExtraCatalogLookupValue;
        var selectedAssetId = this.asset.id;
        var asset = this.asset;
        var extraCatalogList = this.extraCatalogList;
        var timezone = 'America/Los_Angeles';
        var today = new Date().toLocaleString("en-US", {timeZone: timezone});
        var td = today.substr(0, today.indexOf(',')).split('/');
        if(extraCatalogList.length==1){
            Extra_Catalog = extraCatalogList[0].Id;
        }
                    /* if(assetList.length > 0){
                        selectedAssetId = assetList[0].Id;
                    }
                    console.log(selectedAssetId); */
                    var item = {};
                    item.Extra_Catalog__c = (Extra_Catalog==null || Extra_Catalog=='')?null:Extra_Catalog;
                    item.Asset__c = selectedAssetId;
                    item.Closing_Detail__c = closingDetail.Id;
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
                    for(var i in extraCatalogList){
                        if(extraCatalogList[i].Id==Extra_Catalog){
                            item.Name = extraCatalogList[i].Name;
                            item.Price__c = extraCatalogList[i].Price__c;
                            item.Total_Price__c = extraCatalogList[i].Price__c * 1;
                            item.Room_Type__c = extraCatalogList[i].Room_Type__c;
                            item.Project__c = extraCatalogList[i].Project__c;
                            item.Extra_Catalog__r = {};
                            item.Description_ENG__c = extraCatalogList[i].Description_ENG__c;
                            item.Description_FR__c = extraCatalogList[i].Description_fr__c;
                            item.Extra_Catalog__r.Id = extraCatalogList[i].Id;
                        }
                    }

                    item.Quantity__c = 1;
                    //component.set("v.newExtra",item);
                    //item = component.get("v.newExtra");

                    if (item == null || item.Extra_Catalog__c == null) {
                        console.log("MASExtraController.addExtra Extra is null");
                    }

                    console.log("MASExtraController.addExtra Extra : " + JSON.stringify(item));

                    // Data validation
                    var dataValid = true;
                    if (item.Extra_Catalog__c == null) {
                        dataValid = false;
                        console.log("Error - Need to choose Extra Catalog");
                        //alert($A.get('$Label.c.MAS_Contact_Role_Required'));
                        alert('Need to choose Extra Catalog');
                    }
                    if (item.Asset__c == null) {
                        dataValid = false;
                        console.log("Error - Need to choose Asset ");
                        //alert($A.get('$Label.c.MAS_Contact_Role_Required'));
                        alert('Need to choose Asset');
                    }
                    if (!dataValid) return;


                     

                   /*  var action = component.get("c.insertExtra");
                    action.setParam("ext",item);
                    //action.setParam("ClosingDetailId",component.get("v.closingDetail").Id);
                    //action.setParam("AssetId",item.Asset__c);
                    action.setCallback(this,function(response){
                        if(response.getState() === "SUCCESS"){
                            var selectedExtraList = component.get('v.selectedExtraList');
                            //item.Id = response.getReturnValue();
                            selectedExtraList.push(response.getReturnValue());
                            component.set('v.selectedExtraList' ,selectedExtraList);
                            helper.setSpinnerVisibility(component, false);

                        }
                        else{
                            console.log('MASExtraController.addExtra insertExtra error :' + JSON.stringify(response.getError()));
                            helper.setSpinnerVisibility(component, false);
                            let errors = response.getError();
                            let message = 'Unknown error'; // Default error message
                            // Retrieve the error message sent by the server
                            if (errors && Array.isArray(errors) && errors.length > 0) {
                                message = errors[0].message;
                            }
                            // Display the message
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "type" : "error",
                                "title": "Error",
                                "message": message
                            });
                            toastEvent.fire();

                        }
                    });
                    $A.enqueueAction(action); */

        let rowAddEvent = new CustomEvent('rowadd',{
          detail: {
            row:item
          },
          bubbles: true,
          composed: false
        });
        this.dispatchEvent(rowAddEvent);
        this.deleteRow(row); //delete after it got added to the parent
        // Nhan, handle delete logic here
      }
    }
    /**
     * Delete
     */
    deleteRow(row) {
      const { id } = row;
      const index = this.findRowById(id);

      if (index !== -1) {
        this.availableExtras = this.availableExtras
          .slice(0, index)
          .concat(this.availableExtras.slice(index + 1));

        // Nhan, handle delete logic here
      }
    }

    findRowById(id) {
      let ret = -1;
      this.availableExtras.some((row, index) => {
        if (row.id === id) {
          ret = index;
          return true;
        }
        return false;
      });
      return ret;
    }
}
