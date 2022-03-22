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

export { COLUMNS_CONTACTS };
