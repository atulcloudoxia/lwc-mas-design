const MOCK_CONTACTS = [{
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

const MOCK_PARKING = [
  {
    id: 1,
    type: 'Locker Standard',
    assigned: 'Side by Side',
    price: '30933'
  },
  {
    id: 2,
    type: 'Parking Standard',
    assigned: 'Side by Side',
    price: '36933'
  },
];

const MOCK_EXTRAS = [
  {
    id: 1,
    quantity: 3,
    name: 'Extra 1',
    description: 'lorem ipsum',
    type: 'Upper',
    price: '87272'
  },
  {
    id: 2,
    quantity: 3,
    name: 'Extra 1',
    description: 'lorem ipsum',
    type: 'Bathroom',
    price: '87272'
  },
  {
    id: 3,
    quantity: 3,
    name: 'Extra 1',
    description: 'lorem ipsum',
    type: 'Ground',
    price: '87272'
  },
];

const MOCK_ASSET = {
  id: 1,
  name: 'Kingsway Crescent 401',
  salesRep: 'Baker Real Estate',
  contractDate: '2020-09-07',
  price: '1309000.00',
  total: '1454400.00',
  developerSale: true,
};

const MOCK_DEPOSIT = [
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


export { MOCK_CONTACTS, MOCK_PARKING, MOCK_ASSET, MOCK_EXTRAS, MOCK_DEPOSIT };
