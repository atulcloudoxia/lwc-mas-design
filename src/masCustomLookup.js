import { LightningElement, track, api } from 'lwc';
//import findRecords from '@salesforce/apex/CustomLookupController.findRecords';
export default class CustomLookup extends LightningElement {
    
    @track records;
    @track result=[{"Id":"0035x000005BMvoAAG","Name":"Andrew Hamilton"},{"Id":"0035x000005BMsfAAG","Name":"Tao"},{"Id":"0035x000005BModAAG","Name":"Test Contact 1"},{"Id":"0035x000005BMqtAAG","Name":"a1s5x000005BMqt"},{"Id":"0035x000005BNa8AAG","Name":"Contact Test 2"},{"Id":"0035x000005BNa9AAG","Name":"Test 3"},{"Id":"0035x000005BNsWAAW","Name":"Contact1"},{"Id":"0035x000005BNslAAG","Name":"Andrew"},{"Id":"0035x000005BNuXAAW","Name":"Testing 123"},{"Id":"0035x000004hboRAAQ","Name":"Test POST 2"},{"Id":"0035x000005BLejAAG","Name":"Contact 1"}];
    @track error;
    @track selectedRecord;
    @api displayOnLoad;
    @api index;
    @api relationshipfield;
    @api iconname = "standard:account";
    @api objectName = 'Account';
    @api searchfield = 'Name';
    @api whereCondition='';
    @api filterConditions = '';
    @api isStackingPlan;
    @api fieldstoquery;
    @api blank = false;
    @api placeholder;
    @api
    get selectedRecordId() {
        return this.selectedRecord;
    }
    set selectedRecordId(value) {
        if(this.records)
        this.selectedRecord = this.records.find( record => record.Id === value);
    }
    connectedCallback(){
        console.log('==='+this.selectedRecordId);
        if(this.blank==false){

        
        this.records = this.result;
        for(let i=0; i < this.records.length; i++){
            const rec = this.records[i];
            this.records[i].Name = rec[this.searchfield];
        }
    }
        /*findRecords({
            searchKey : '',
            objectName : this.objectName,
            searchField : this.searchfield,
            filterConditions : this.filterConditions,
            fieldstoquery : this.fieldstoquery,
            stackingplan : this.blank,
            whereCondition:this.whereCondition
        })
        .then(result => {
            this.records = result;
            for(let i=0; i < this.records.length; i++){
                const rec = this.records[i];
                this.records[i].Name = rec[this.searchfield];
            }
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.records = undefined;
        });*/
        if(this.records)
        this.selectedRecord = this.records.find( record => record.Id === this.selectedRecordId);

    }
    handleOnclick(event){
        const search = event.detail;
        if(this.blank=='true'){
            this.records = this.result;
            for(let i=0; i < this.records.length; i++){
                const rec = this.records[i];
                this.records[i].Name = rec[this.searchfield];
            }
            /*findRecords({
                searchKey : search,
                objectName : this.objectName,
                searchField : this.searchfield,
                filterConditions : this.filterConditions,
                fieldstoquery : this.fieldstoquery,
                stackingplan : this.blank,
                whereCondition:this.whereCondition
            })
            .then(result => {
                this.records = result;
                for(let i=0; i < this.records.length; i++){
                    const rec = this.records[i];
                    this.records[i].Name = rec[this.searchfield];
                }
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.records = undefined;
            });*/
        }
    }
    handleOnchange(event){
        //event.preventDefault();
        const searchKey = event.detail;
        //this.records = null;
        /* eslint-disable no-console */
        //console.log(searchKey);
        /* Call the Salesforce Apex class method to find the Records */
        if(this.blank==true && (searchKey=='' || searchKey==null || searchKey==undefined)){
            
            this.records = this.result.filter(value => value.Name.includes(searchKey));
            for(let i=0; i < this.records.length; i++){
                const rec = this.records[i];
                this.records[i].Name = rec[this.searchfield];
            }
            /*findRecords({
                searchKey : searchKey,
                objectName : this.objectName,
                searchField : this.searchfield,
                filterConditions : this.filterConditions,
                fieldstoquery : this.fieldstoquery,
                stackingplan : this.isStackingPlan,
                whereCondition:this.whereCondition
            })
            .then(result => {
                this.records = result;
                for(let i=0; i < this.records.length; i++){
                    const rec = this.records[i];
                    this.records[i].Name = rec[this.searchfield];
                }
                this.error = undefined;
                //console.log(' records ', this.records);
            })
            .catch(error => {
                this.error = error;
                this.records = undefined;
            });*/
        }
        else{
            this.records = this.result.filter(value => value.Name.includes(searchKey));
            for(let i=0; i < this.records.length; i++){
                const rec = this.records[i];
                this.records[i].Name = rec[this.searchfield];
            }
            /*findRecords({
                searchKey : searchKey,
                objectName : this.objectName,
                searchField : this.searchfield,
                filterConditions : this.filterConditions,
                fieldstoquery : this.fieldstoquery,
                stackingplan : this.isStackingPlan,
                whereCondition:this.whereCondition
            })
            .then(result => {
                this.records = result;
                for(let i=0; i < this.records.length; i++){
                    const rec = this.records[i];
                    this.records[i].Name = rec[this.searchfield];
                }
                this.error = undefined;
                //console.log(' records ', this.records);
            })
            .catch(error => {
                this.error = error;
                this.records = undefined;
            });*/
        }
    }
    handleSelect(event){
        const selectedRecordId = event.detail;
        /* eslint-disable no-console*/
        this.selectedRecord = this.records.find( record => record.Id === selectedRecordId);
        /* fire the event with the value of RecordId for the Selected RecordId */
        const selectedRecordEvent = new CustomEvent(
            "selectedrec",
            {
                //detail : selectedRecordId
                detail : { recordId : selectedRecordId, index : this.index, relationshipfield : this.relationshipfield}
            }
        );
        this.dispatchEvent(selectedRecordEvent);
    }

    handleRemove(event){
        event.preventDefault();
        this.selectedRecord = undefined;
        this.records = undefined;
        this.error = undefined;
        /* fire the event with the value of undefined for the Selected RecordId */
        const selectedRecordEvent = new CustomEvent(
            "selectedrec",
            {
                detail : { recordId : undefined, index : this.index, relationshipfield : this.relationshipfield}
            }
        );
        this.dispatchEvent(selectedRecordEvent);
    }
    @api 
    removevalues(){
        this.selectedRecord = undefined;
        this.records = undefined;
        this.error = undefined;
    }
}