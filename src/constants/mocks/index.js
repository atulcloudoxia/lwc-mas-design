const MOCK_CONTACTS = [{
    id: 1,
    name: 'Andrew Hamilton',
    firstname: 'Andrew',
    lastname: 'Hamilton',
    language__c: 'en',
    birthdate: '1978-10-29',
    salutation: 'mr',
    sin: '123123123',
    role: 'Buyer 1',
    email: 'andrew@lucidlive.com',
    phone: '514-555-5555',
    mailingaddress: '123 Main Street',
    mailingcity: 'Montreal',
    mailingstate: 'qc',
    mailingpostalcode: '221002',
    mailingcountry: 'ca',
    status: 'Complete',
    isComplete: true,
  },
  {
    id: 2,
    name: 'Tao-Nhan Nguyen',
    firstname: 'Tao-Nhan',
    lastname: 'Nguyen',
    language__c: 'fr',
    birthdate: '1942-10-09',
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
    language__c: 'ch',
    birthdate: '1852-10-09',
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
    Type__c: 'Locker Standard',
    Assigned_Spot__c: 'Side by Side',
    Price__c: '30933'
  },
  {
    id: 2,
    Type__c: 'Parking Standard',
    Assigned_Spot__c: 'Side by Side',
    Price__c: '36933'
  },
];

const MOCK_EXTRAS = [
  {
    id: 1,
    Quantity__c: 3,
    name: 'Extra 1',
    Description_ENG__c: 'lorem ipsum',
    Room_Type__c: 'Upper',
    Price__c: '87272'
  },
  {
    id: 2,
    Quantity__c: 3,
    name: 'Extra 1',
    Description_ENG__c: 'lorem ipsum',
    Room_Type__c: 'Bathroom',
    Price__c: '87272'
  },
  {
    id: 3,
    Quantity__c: 3,
    name: 'Extra 1',
    Description_ENG__c: 'lorem ipsum',
    Room_Type__c: 'Ground',
    Price__c: '87272'
  },
];

const MOCK_ASSET = {
  id: 1,
  Name: 'Kingsway Crescent 401',
  Condo_Price__c: '1309001.00',
  Total_Price__c: '1454400.00',
   
};

const MOCK_CLOSING_DETAIL = {

  id: 1,
  Name: 'CCD-0145',
  Sales_Representative__r:{Id:"005AAAAAAAAAAAA", Name:"Tao Nhan"},
  Preliminary_Contract_Signed_D__c: '2020-09-07',
  Developer_Deal__c: true,
};

const MOCK_DEPOSIT = [
 {
     id: 1,
     Deposit_Number__c: 1,
     Reception_Date__c: '09/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: true
 },
 {
     id: 2,
     Deposit_Number__c: 2,
     Reception_Date__c: '10/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     id: 3,
     Deposit_Number__c: 3,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     id: 4,
     Deposit_Number__c: 4,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     id: 5,
     Deposit_Number__c: 5,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     id: 6,
     Deposit_Number__c: 6,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
];

const MOCK_VARIA = [
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
];

const MOCK_CHANGE_ORDERS = [
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
];

export { MOCK_CONTACTS, MOCK_PARKING, MOCK_ASSET, MOCK_CLOSING_DETAIL, MOCK_EXTRAS, MOCK_DEPOSIT, MOCK_VARIA, MOCK_CHANGE_ORDERS };
