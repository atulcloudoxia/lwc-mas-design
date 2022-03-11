import { LightningElement, track } from 'lwc';

const rowActions = [
  {
    label: 'Delete Varia',
    name: 'delete'
  }
];

const columns = [
  {
    label: 'Description',
    fieldName: 'description',
    editable: true,
    hideDefaultActions:true,
  },
  {
    type: 'action',
    typeAttributes: {
      rowActions
    },
  },
];

export default class Varias extends LightningElement {
  columns = columns;
  record = {};

  @track data = [
    {
      id: 1,
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
    },
    {
      id: 2,
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
    },
    {
      id: 3,
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
    },
    {
      id: 4,
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
    }
  ]

  /**
   * Search
   */
  handleSearch(evt) {
    const isEnterKey = evt.keyCode === 13;
    const searchTerm = evt.target.value;

    if (isEnterKey) {

      // Nhan, handle "search" logic here
    }
  }

  /**
   * Add
   */
  handleAdd() {
    // Nhan, handle "add" logic here
  }

  /**
   * Row actions
   */
  handleRowAction(event) {
    const { action, row } = event.detail;

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
   */
  deleteRow(row) {
    const { id } = row;
    const index = this.findRowById(id);

    if (index !== -1) {
      this.data = this.data
        .slice(0, index)
        .concat(this.data.slice(index + 1));

      // Nhan, handle delete logic here
    }
  }

  findRowById(id) {
    let ret = -1;
    this.data.some((row, index) => {
      if (row.id === id) {
        ret = index;
        return true;
      }
      return false;
    });
    return ret;
  }
}
