import { LightningElement } from 'lwc';

const contactsColumns = [
  {
    label: 'Role',
    fieldName: 'role',
    hideDefaultActions: true,
    sortable: false
  },
  {
    label: 'Name',
    fieldName: 'name',
    hideDefaultActions: true,
    sortable: false
  },
  {
    label: 'Email',
    fieldName: 'email',
    type: 'email',
    hideDefaultActions: true,
    sortable: false
  },
  {
    label: 'Phone',
    fieldName: 'phone',
    hideDefaultActions: true,
    sortable: false
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
  }
];

const contactsData = [{
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
    isComplete: true,
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

const depositsColumns = [
  {
    label: 'Payment Number',
    fieldName: 'number',
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
    fieldName: 'date',
    type: 'date',
    editable: false,
    hideDefaultActions:true,
  },
  {
    label: 'Deposit To',
    fieldName: 'deposit_to',
    type:'select',
    editable: false
  },
  {
    label: 'Deposit For',
    fieldName: 'deposit_for',
    editable: false
  },
  {
    label: 'Amount',
    fieldName: 'amount',
    editable: false
  },
  {
    label: 'Percent',
    fieldName: 'percent',
    type: 'percent',
    editable: false,
    cellAttributes: {
      alignment: 'left',
    },
  },
  {
    label: 'Received',
    fieldName: 'received',
    type: 'boolean',
    editable: false
  },
];

 const depositsData = [
  {
      id: 1,
      number: 1,
      date: '09/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 2,
      number: 2,
      date: '10/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 3,
      number: 3,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 4,
      number: 4,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 5,
      number: 5,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
  {
      id: 6,
      number: 6,
      date: '11/01/2022',
      deposit_to: 'notary',
      deposit_for: 'cashdown',
      amount: "2000",
      percent: "1",
      received: false
  },
];

export default class ReviewPage extends LightningElement {

  contactsData = contactsData;
  contactsColumns = contactsColumns;
  depositsData = depositsData;
  depositsColumns = depositsColumns;

  /**
   * Modify a contact
   *
   * @param (Event) e
   */
  handleModifyContacts(e) {
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: 0   // Index page number
        }
      })
    )
  }

  /**
   * Modify a contact
   *
   * @param (Event) e
   */
  handleModifyDeposits(e) {
    this.dispatchEvent(
      new CustomEvent("page", {
        detail: {
          page: 2     // Index page number
        }
      })
    )
  }
}
