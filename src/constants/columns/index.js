const COLUMNS_CONTACTS = [
  {
    label: 'Role',
    fieldName: 'role',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Name',
    fieldName: 'name',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Email',
    fieldName: 'email',
    type: 'email',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Phone',
    fieldName: 'phone',
    hideDefaultActions: true,
    sortable: true
  },
  {
    label: 'Status',
    fieldName: 'status',
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
    fieldName: 'type',
    editable: false,
    hideDefaultActions:true,
    sortable:true
  },
  {
    label: 'Assigned Spot',
    fieldName: 'assigned',
    editable: true,
    hideDefaultActions:true,
    sortable:true
  },
  {
    label: 'Asset Price',
    fieldName: 'price',
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
    fieldName: 'number',
    type: 'number',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Date',
    fieldName: 'date',
    type: 'date',
    editable: true,
    hideDefaultActions:true,
  },
  {
    label: 'Deposit To',
    fieldName: 'deposit_to',
    type:'select',
    editable: true
  },
  {
    label: 'Deposit For',
    fieldName: 'deposit_for',
    editable: true
  },
  {
    label: 'Amount',
    fieldName: 'amount',
    editable: true
  },
  {
    label: 'Percent',
    fieldName: 'percent',
    type: 'percent',
    editable: true,
    cellAttributes: {
      alignment: 'left',
    },
  },
  {
    label: 'Received',
    fieldName: 'received',
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

export { COLUMNS_CONTACTS, COLUMNS_PARKING, COLUMNS_EXTRAS, COLUMNS_DEPOSIT };
