import { LightningElement, api, track } from 'lwc';
import { COLUMNS_VARIA, COLUMNS_CHANGE_ORDERS } from './constants';
import { findRowById } from './utils';


export default class VariaPage extends LightningElement {

  columnsVaria = COLUMNS_VARIA;
  columnsChangeOrders = COLUMNS_CHANGE_ORDERS;

  @api variadata;
  @api changeorderdata;
  @api asset;

  @track addVaria=false;
  @track addChangeOrder=false;
  @track activeTab;
  @track draftVariaValues= [];
  @track draftChangeOrderValues= [];
  /**
   * Search varia
   *
   * @param (Event) e
   */
  handleSearch(e) {
    const isEnterKey = e.keyCode === 13;
    const searchTerm = e.target.value;

    if (isEnterKey) {
      // Nhan, handle "search" logic here
    }
  }

  /**
   * Search (Change Order)
   *
   * @param (Event) e
   */
  handleSearchChangeOrder(e) {
    const isEnterKey = e.keyCode === 13;
    const searchTerm = e.target.value;

    if (isEnterKey) {
      // Nhan, handle "search" logic here
    }
  }

  /**
   * Add varia
   *
   * @param (Event) e
   */
  handleAdd(e) {
    this.addVaria=true;
  }

  /**
   * Add change order
   *
   * @param (Event) e
   */
  handleAddChangeOrder(e) {
    this.addChangeOrder=true;
  }

  /**
   * Close forms
   *
   * @param (Event) e
   */
  handleCloseForm(e) {
    e.preventDefault();

    // OnSuccess
    this.addVaria=false;
    this.addChangeOrder=false;
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
        this.deleteRow(row);
        break;
      // No other actions but delete for now
      default:
    }
  }

  /**
   * Delete
   *
   * @param (Object) row
   */
  deleteRow(row) {
    const { id } = row;
    var index;
    if(this.activeTab=='varias'){
          index = findRowById(id, this.variadata);
          if (index !== -1) {
            let variadata= this.variadata;
            console.log(index);
            this.variadata = variadata.slice(0, index).concat(variadata.slice(index + 1));
             
            // Nhan, handle delete logic here
          }
      }else if(this.activeTab=='change-orders'){
          index = findRowById(id, this.changeorderdata);
          if (index !== -1) {
            this.changeorderdata = this.changeorderdata
              .slice(0, index)
              .concat(this.changeorderdata.slice(index + 1));
             
            // Nhan, handle delete logic here
          }
      }   
      this.handleDataUpdate();
  }

  handleSaveForm(event){
    if(event.detail.variatext){
      var variadata = [...this.variadata];
      variadata.push({ description: event.detail.variatext});
      this.variadata = variadata;
    }
    if(event.detail.changeordertext){
      var changeorderdata = [...this.changeorderdata];
      changeorderdata.push({ description: event.detail.changeordertext});
      this.changeorderdata = changeorderdata;
    }
    this.handleCloseForm(event);
    this.handleDataUpdate();
  }
  
  handleDataUpdate(){
    let rowAddEvent = new CustomEvent('updatedata',{
      detail: {
        changeorderdata: this.changeorderdata,
        variadata: this.variadata 
      },
      bubbles: true,
      composed: false
    });
    this.dispatchEvent(rowAddEvent);
  }
  handleActive(event) {
    const tab = event.target;
    this.activeTab = event.target.value;
  }


  handleVariaSave(event){
    //console.log(event.detail.draftValues);
    const recordInputs =  event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    //console.log(recordInputs);
    var variadata = JSON.parse(JSON.stringify(this.variadata));
    variadata.forEach(element => {
      recordInputs.forEach(draft => {
        if(draft.fields.id==element.id) {
          for (const [key, value] of Object.entries(draft.fields)) {
            element[key] = value;
          }
        }
        
      });
    });
    this.draftVariaValues = [];
    this.variadata = variadata;
    this.handleDataUpdate();
  }
  handleChangeOrderSave(event){
    //console.log(event.detail.draftValues);
    const recordInputs =  event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    //console.log(recordInputs);
    var changeorderdata = JSON.parse(JSON.stringify(this.changeorderdata));
    changeorderdata.forEach(element => {
      recordInputs.forEach(draft => {
        if(draft.fields.id==element.id) {
          for (const [key, value] of Object.entries(draft.fields)) {
            element[key] = value;
          }
        }
        
      });
    });
    this.draftChangeOrderValues = [];
    this.changeorderdata = changeorderdata;
    this.handleDataUpdate();
  }
}
