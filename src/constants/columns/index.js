const COLUMNS_CONTACTS = [
  {
    label: 'Role',
    fieldName: 'Role',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Name',
    fieldName: 'Name',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Email',
    fieldName: 'Email',
    type: 'email',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Phone',
    fieldName: 'Phone',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Status',
    fieldName: 'Status',
    type: 'customStatus',
    typeAttributes: {
      status: {
        fieldName: 'isComplete'
      }
    },
  },
  {
    type: 'action',
    typeAttributes: {
      rowActions:[
        {
          label: 'Edit Contact',
          name: 'edit'
        },
        {
          label: 'Delete Contact',
          name: 'delete'
        }
      ]
    }
  }
];

const COLUMNS_PARKING = [
  {
    label: 'Type',
    fieldName: 'Type__c',
    editable: false,
    hideDefaultActions:true,
    sortable:true
  },
  {
    label: 'Assigned Spot',
    fieldName: 'Assigned_Spot__c',
    editable: true,
    hideDefaultActions:true,
    sortable:true
  },
  {
    label: 'Asset Price',
    fieldName: 'Price__c',
    type: 'currency',
    editable: true,
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
      iconName: 'utility:delete'
    },
    cellAttributes: {
      alignment: 'right',
    },
  },
];

const COLUMNS_EXTRAS = [
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
      name: 'delete',
      title: 'Remove',
      disabled: false,
      value: 'delete',
      iconName: 'utility:delete'
    },
    cellAttributes: {
      alignment: 'right',
    },
  },
];

const COLUMNS_DEPOSIT = [
  {
    label: 'Payment Number',
    fieldName: 'Deposit_Number__c',
    type: 'number',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Date',
    fieldName: 'Reception_Date__c',
    type: 'date',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Deposit To',
    fieldName: 'Deposit_To__c',
    type:'select',
    editable: true
  },
  {
    label: 'Deposit For',
    fieldName: 'Deposit_For__c',
    editable: true
  },
  {
    label: 'Amount',
    fieldName: 'Deposit_Amount__c',
    type: 'currency',
    editable: true
  },
  {
    label: 'Percent',
    fieldName: 'Percent__c',
    type: 'percent',
    editable: true,
    cellAttributes: {
      alignment: 'left',
    },
  },
  {
    label: 'Received',
    fieldName: 'Deposit_Received__c',
    type: 'boolean',
    editable: true
  },
  {
    type: "button-icon",
    fixedWidth: 40,
    typeAttributes: {
      label: 'Image',
      name: 'image',
      title: 'Image',
      disabled: false,
      value: 'image',
      iconName: 'utility:image'
    },
    cellAttributes: {
      alignment: 'right',
    },
  },
  {
    type: "button-icon",
    fixedWidth: 40,
    typeAttributes: {
      label: 'Remove',
      name: 'delete',
      title: 'Remove',
      disabled: false,
      value: 'delete',
      iconName: 'utility:delete'
    },
    cellAttributes: {
      alignment: 'right',
    },
  },
];

const COLUMNS_VARIA = [
  {
    label: 'Description',
    fieldName: 'description',
    editable: true,
    hideDefaultActions:true,
  },
  {
    type: 'action',
    hideDefaultActions:true,
    typeAttributes: {
      rowActions: [
        {
          label: 'Delete Varia',
          name: 'delete'
        }
      ]
    },
  },
];

const COLUMNS_CHANGE_ORDERS = [
  {
    label: 'Description',
    fieldName: 'description',
    editable: true,
    hideDefaultActions:true,
  },
  {
    type: 'action',
    hideDefaultActions:true,
    typeAttributes: {
      rowActions: [
        {
          label: 'Delete Varia',
          name: 'delete'
        }
      ]
    },
  },
];



const REVIEW_CONTACTS_COLUMNS = [
  {
    label: 'Role',
    fieldName: 'Role',
    hideDefaultActions: true,
    sortable: false
  },
  {
    label: 'Name',
    fieldName: 'Name',
    hideDefaultActions: true,
    sortable: false
  },
  {
    label: 'Email',
    fieldName: 'Email',
    type: 'email',
    hideDefaultActions: true,
    sortable: false
  },
  {
    label: 'Phone',
    fieldName: 'Phone',
    hideDefaultActions: true,
    sortable: false
  },
  {
    label: 'Status',
    fieldName: 'Status',
    type: 'customStatus',
    typeAttributes: {
      status: {
        fieldName: 'isComplete'
      }
    },
  }
];

const REVIEW_DEPOSITS_COLUMNS = [
  {
    label: 'Payment Number',
    fieldName: 'Deposit_Number__c',
    type: 'number',
    editable: false,
    hideDefaultActions:true,
    fixedWidth: 150,
    cellAttributes: {
      alignment: 'left',
    },
  },
  {
    label: 'Date',
    fieldName: 'Reception_Date__c',
    type: 'date',
    editable: false,
    hideDefaultActions:true,
  },
  {
    label: 'Deposit To',
    fieldName: 'Deposit_To__c',
    type:'select',
    editable: false
  },
  {
    label: 'Deposit For',
    fieldName: 'Deposit_For__c',
    editable: false
  },
  {
    label: 'Amount',
    fieldName: 'Deposit_Amount__c',
    type: 'currency',
    editable: false
  },
  {
    label: 'Percent',
    fieldName: 'Percent__c',
    type: 'percent',
    editable: false,
    cellAttributes: {
      alignment: 'left',
    },
  },
  {
    label: 'Received',
    fieldName: 'Deposit_Received__c',
    type: 'boolean',
    editable: false
  },
];


export {
  COLUMNS_CONTACTS,
  COLUMNS_PARKING,
  COLUMNS_EXTRAS,
  COLUMNS_DEPOSIT,
  COLUMNS_VARIA,
  COLUMNS_CHANGE_ORDERS,
  REVIEW_CONTACTS_COLUMNS,
  REVIEW_DEPOSITS_COLUMNS
};
