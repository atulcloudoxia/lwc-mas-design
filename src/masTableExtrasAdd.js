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

export default class BasicDatatable extends LightningElement {
    columns = columns;

    @track data = [
      {
          id: 1,
          Quantity__c: 3,
          name: 'Extra 1',
          Description_ENG__c: 'lorem ipsum',
          Room_Type__c: 'Upper',
          Price__c: '87272'
      },
      {
          id: 1,
          Quantity__c: 3,
          name: 'Extra 1',
          Description_ENG__c: 'lorem ipsum',
          Room_Type__c: 'Bathroom',
          Price__c: '87272'
      },
      {
          id: 1,
          Quantity__c: 3,
          name: 'Extra 1',
          Description_ENG__c: 'lorem ipsum',
          Room_Type__c: 'Ground',
          Price__c: '87272'
      },
    ];
    @api
    addRowAfterDelete() {
      console.log('addRowAfterDelete');
      //this.data;
    }
    /**
     * Row actions
     */
    handleRowAction(event) {
      const { action, row } = event.detail;

      switch (action.name) {
        case 'add':
          this.addRow(row);
          this.deleteRow(row); //delete after it got added to the parent
          break;
        // No other actions but delete for now
        default:
      }
    }
    addRow(row){
      const { id } = row;
      const index = this.findRowById(id);
      if (index !== -1) {
        console.log('// '+this.data[index]);
        let rowAddEvent = new CustomEvent('rowadd',{
          detail: {
            row:this.data[index]
          },
          bubbles: true,
          composed: false
        });
        this.dispatchEvent(rowAddEvent);
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
