import { LightningElement, api, track } from 'lwc';
import { COLUMNS_VARIA, COLUMNS_CHANGE_ORDERS } from './constants';
import { findRowById } from './utils';


export default class VariaPage extends LightningElement {

  columnsVaria = COLUMNS_VARIA;
  columnsChangeOrders = COLUMNS_CHANGE_ORDERS;

  @api variadata;
  @api changeorderdata;

  @track addVaria=false;
  @track addChangeOrder=false;

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
   * Add
   *
   * @param (Event) e
   */
  handleVariaFormSubmit(e) {
    e.preventDefault();

    // OnSuccess
    this.addVaria=false;
    // Nhan, handle "add" logic here
  }

  /**
   * Add (Change order)
   *
   * @param (Event) e
   */
  handleChangeOrderFormSubmit(e) {
    e.preventDefault();

    // OnSuccess
    this.addChangeOrder=false;
    // Nhan, handle "add" logic here
  }

  /**
   * Cancel/Close add varia
   *
   * @param (Event) e
   */
  cancelVariaForm(e) {
    e.preventDefault();

    this.addVaria=false;
  }

  /**
   * Cancel/Close Change Order
   *
   * @param (Event) e
   */
  cancelChangeOrderForm(e) {
    e.preventDefault();

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
    const index = findRowById(id);

    if (index !== -1) {
      this.data = this.data
        .slice(0, index)
        .concat(this.data.slice(index + 1));

      // Nhan, handle delete logic here
    }
  }
}
