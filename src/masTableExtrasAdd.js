import { LightningElement, track } from 'lwc';

const columns = [
    {
      label: 'Quantity',
      fieldName: 'quantity',
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
      fieldName: 'description',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Type',
      fieldName: 'type',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      label: 'Price',
      fieldName: 'price',
      type: 'currency',
      editable: false,
      hideDefaultActions:true,
      sortable:true
    },
    {
      type: "button-icon",
      typeAttributes: {
        label: 'Remove',
        name: 'delete',
        title: 'Remove',
        disabled: false,
        value: 'delete',
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

export default class BasicDatatable extends LightningElement {
    columns = columns;

    @track data = [
      {
          id: 1,
          quantity: 3,
          name: 'Extra 1',
          description: 'lorem ipsum',
          type: 'Upper',
          price: '87272'
      },
      {
          id: 1,
          quantity: 3,
          name: 'Extra 1',
          description: 'lorem ipsum',
          type: 'Bathroom',
          price: '87272'
      },
      {
          id: 1,
          quantity: 3,
          name: 'Extra 1',
          description: 'lorem ipsum',
          type: 'Ground',
          price: '87272'
      },
    ];

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
