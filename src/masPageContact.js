import { LightningElement, track } from 'lwc';

const rowActions = [
  {
    label: 'Edit Contact',
    name: 'edit'
  },
  {
    label: 'Delete Contact',
    name: 'delete'
  }
];

const columns = [
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
      rowActions
    }
  }
];

const data = [{
    id: 1,
    name: 'Andrew Hamilton',
    firstname: 'Andrew',
    lastname: 'Hamilton',
    language: 'en',
    dob: '1978-10-29',
    salutation: 'mr',
    sin: '123123123',
    role: 'Buyer 1',
    email: 'andrew@lucidlive.com',
    phone: '514-555-5555',
    address: '123 Main Street',
    city: 'Montreal',
    province: 'qc',
    country: 'ca',
    status: 'Complete',
    isComplete: true,
  },
  {
    id: 2,
    name: 'Tao-Nhan Nguyen',
    firstname: 'Tao-Nhan',
    lastname: 'Nguyen',
    language: 'fr',
    dob: '1942-10-09',
    salutation: 'mr',
    sin: '123123123',
    role: 'Buyer 2',
    email: 'tao@onyxtech.ca',
    phone: '514-555-5555',
    status: 'Missing Information',
    isComplete: false,
  },
  {
    id: 3,
    name: 'Chuck Norris',
    firstname: 'Chuck',
    lastname: 'Norris',
    language: 'ch',
    dob: '1852-10-09',
    salutation: 'mr',
    sin: '123123123',
    role: 'corporation',
    email: 'chuck@norris.ca',
    phone: '514-555-5555',
    status: 'Complete',
    isComplete: true,
  }
];

const roleOptions = [{
    label: 'Buyer 1',
    value: 'buyer-1'
  },
  {
    label: 'Buyer 2',
    value: 'buyer-2'
  },
  {
    label: 'Buyer 3',
    value: 'buyer-3'
  },
  {
    label: 'Buyer 4',
    value: 'buyer-4'
  },
  {
    label: 'Realtor',
    value: 'realtor'
  },
  {
    label: '3rd Party',
    value: '3rd-party'
  },
  {
    label: 'Former Buyer 1',
    value: 'former-buyer-1'
  },
  {
    label: 'Former Buyer 2',
    value: 'former-buyer-2'
  },
  {
    label: 'Former Buyer 3',
    value: 'former-buyer-3'
  },
  {
    label: 'Former Buyer 4',
    value: 'former-buyer-4'
  },
  {
    label: 'Witness',
    value: 'witness'
  },
  {
    label: 'Corporation',
    value: 'corporation'
  },
  {
    label: 'Referred by Client',
    value: 'referred-by-client'
  },
];

const salutationOptions = [{
    label: 'Mr.',
    value: 'mr'
  },
  {
    label: 'Ms.',
    value: 'ms'
  },
  {
    label: 'Mrs.',
    value: 'mrs'
  },
  {
    label: 'Dr.',
    value: 'dr'
  },
  {
    label: 'Prof.',
    value: 'prof'
  },
];

const languageOptions = [{
    label: 'English',
    value: 'en'
  },
  {
    label: 'French',
    value: 'fr'
  },
  {
    label: 'Chinese.',
    value: 'ch'
  },
];

export default class ContactPage extends LightningElement {

  @track
  editContact = false;

  @track
  selectedRow = {};

  @track
  isCorporation = false;

  @track
  addContact = false;

  @track
  errorMessage = "";

  @track
  hasError = false;

  @track
  data = data;

  columns = columns;
  languageOptions = languageOptions;
  salutationOptions = salutationOptions;
  roleOptions = roleOptions;

  /**
   * Add contact
   *
   * @param (Event) e
   */
  handleAddContact(e) {
    this.addContact = true;
  }

  /**
   * Handle add contact form
   *
   * @param (Event) e
   */
  handleAddContactForm(e) {
    e.preventDefault();

    // Example dispatch event
    this.dispatchEvent(
      new CustomEvent("update", {
        detail: {
          pageIdx: 0,
          completed: false,
          warning: true,
          error: false,
          message: "This page has incomplete information"
        }
      })
    );

    // Close modal
    this.addContact = false;
  }

  /**
   * Handle edit contact form
   *
   * @param (Event) e
   */
  handleEditContactForm(e) {
    e.preventDefault();

    // Example dispatch event
    this.dispatchEvent(
      new CustomEvent("update", {
        detail: {
          page: 'contact',
          completed: false,
          warning: true,
          error: false,
          message: "This page has incomplete information"
        }
      })
    );

    // Close modal
    this.editContact = false;
  }

  /**
   * Handle role change
   *
   * @param (Event) e
   */
  handleRoleChange(e) {
    let role = e.detail.value;

    this.isCorporation = role === 'corporation';
    this.selectedRow.role = role;
  }

  /**
   * Parse row actions
   *
   * @param (Event) e
   */
   handleRowAction(e) {
     const { action, row } = e.detail;

     switch (action.name) {
       case 'edit':
         this.editRow(row);
         break;

       case 'delete':
         this.data = this.deleteRow(row, this.data);
         // deleteId - Handle delete logic
         break;

       // No other actions but delete for now
       default:
     }
   }

  /**
   * Edit row
   */
  editRow(row) {
    const { id } = row;

    this.selectedRow = row;
    this.isCorporation = row.role === 'corporation';
    this.editContact = true;
  }

  /**
   * Delete
   *
   * @param (Object)  row
   * @param (Array)   data
   */
  deleteRow(row, data) {
    const { id } = row;
    const index = this.findRowById(id, data);

    if (index !== -1) {
      return data
        .slice(0, index)
        .concat(data.slice(index + 1));
    }
  }

  /**
   * Find row by id
   *
   * @param (Number)  id
   * @param (Array)   data
   */
  findRowById(id, data) {
    let ret = -1;
    data.some((row, index) => {
      if (row.id === id) {
        ret = index;
        return true;
      }
      return false;
    });

    return ret;
  }
}
