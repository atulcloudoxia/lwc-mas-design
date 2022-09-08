var MOCK_CONTACTS_DATA = [{
  Id: "0035x000005BMvoAAG",
  name: 'Andrew Hamilton',
  firstname: 'Andrew',
  lastname: 'Hamilton',
  language__c: 'en',
  birthdate: '1978-10-29',
  salutation: 'mr',
  email: 'andrew@lucidlive.com',
  phone: '514-555-5555',
  mailingaddress: '123 Main Street',
  mailingcity: 'Montreal',
  mailingstate: 'qc',
  mailingpostalcode: '221002',
  mailingcountry: 'ca',
  Account:{}
},
{
  Id: "0035x000005BMsfAAG",
  name: 'Tao Nguyen',
  firstname: 'Tao',
  lastname: 'Nguyen',
  language__c: 'fr',
  birthdate: '1942-10-09',
  salutation: 'mr',
  email: 'tao@onyxtech.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BModAAG",
  name: 'Test Contact 1',
  firstname: 'Test',
  lastname: 'Contact 1',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BMqtAAG",
  name: 'a1s5x000005BMqt',
  firstname: '',
  lastname: 'a1s5x000005BMqt',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BNa8AAG",
  name: 'Contact Test 2',
  firstname: 'Contact',
  lastname: 'Test 2',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BNa9AAG",
  name: 'Test 3',
  firstname: 'Test',
  lastname: '3',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BNsWAAW",
  name: 'Contact1',
  firstname: 'Contact1',
  lastname: 'Test 2',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BNslAAG",
  name: 'Andrew',
  firstname: '',
  lastname: 'Andrew',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BNuXAAW",
  name: 'Testing 123',
  firstname: 'Test',
  lastname: '123',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000004hboRAAQ",
  name: 'Test',
  firstname: 'Test',
  lastname: 'POST 2',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
},
{
  Id: "0035x000005BLejAAG",
  name: 'Contact 1',
  firstname: 'Contact',
  lastname: '1',
  language__c: 'ch',
  birthdate: '1852-10-09',
  salutation: 'mr',
  email: 'chuck@norris.ca',
  phone: '514-555-5555',
  Account:{}
}

];
var MOCK_CONTACTS = [{
    Id: '0035x000037f2SDAAY',
    Name: 'Andrew Hamilton Static',
    FirstName: 'Andrew',
    LastName: 'Hamilton',
    Language__c: 'en',
    Birthdate: '1978-10-29',
    Salutation: 'mr',
    Sin: '123123123',
    Role: 'Buyer 1',
    Email: 'andrew@lucidlive.com',
    Phone: '514-555-5555',
    MailingAddress: '123 Main Street',
    MailingCity: 'Montreal',
    MailingState: 'qc',
    MailingPostalCode: '221002',
    MailingCountry: 'ca',
    Status: 'Complete',
    IsComplete: true,
    Account:{}
  },
  {
    Id: 2,
    Name: 'Tao-Nhan Nguyen',
    FirstName: 'Tao-Nhan',
    LastName: 'Nguyen',
    Language__c: 'fr',
    Birthdate: '1942-10-09',
    Salutation: 'mr',
    Sin: '123123123',
    Role: 'Buyer 2',
    Email: 'tao@onyxtech.ca',
    Phone: '514-555-5555',
    Status: 'Missing Information',
    IsComplete: false,
    Account:{}
  },
  {
    Id: 3,
    Name: 'Chuck Norris',
    FirstName: 'Chuck',
    LastName: 'Norris',
    Language__c: 'ch',
    Birthdate: '1852-10-09',
    Salutation: 'mr',
    Sin: '123123123',
    Role: 'corporation',
    Email: 'chuck@norris.ca',
    Phone: '514-555-5555',
    Status: 'Complete',
    IsComplete: true,
    Account:{}
  }
];

const MOCK_INCLUSIONS = [
  {
    Id: 1,
    type: 'Locker Standard',
    assigned: 'Side by Side',
    price: '30933'
  },
  {
    Id: 2,
    type: 'Parking Standard',
    assigned: 'Side by Side',
    price: '36933'
  },
];

const MOCK_PARKING = [
  {
    Id: 1,
    Type__c: 'Locker Standard',
    Assigned_Spot__c: 'Side by Side',
    Price__c: '30933'
  },
  {
    Id: 2,
    Type__c: 'Parking Standard',
    Assigned_Spot__c: 'Side by Side',
    Price__c: '36933'
  },
];

const MOCK_EXTRAS = [
  {
    Id: 1,
    Quantity__c: 3,
    name: 'Extra 1',
    Description_ENG__c: 'lorem ipsum',
    Room_Type__c: 'Upper',
    Price__c: '87272'
  },
  {
    Id: 2,
    Quantity__c: 3,
    name: 'Extra 1',
    Description_ENG__c: 'lorem ipsum',
    Room_Type__c: 'Bathroom',
    Price__c: '87272'
  },
  {
    Id: 3,
    Quantity__c: 3,
    name: 'Extra 1',
    Description_ENG__c: 'lorem ipsum',
    Room_Type__c: 'Ground',
    Price__c: '87272'
  },
];

const MOCK_ASSET = {
  Id: 1,
  Name: 'Kingsway Crescent 401',
  Condo_Price__c: '1309001.00',
  Total_Price__c: '1454400.00',

};

const MOCK_CLOSING_DETAIL = {

  Id: 1,
  Name: 'CCD-0145',
  Sales_Representative__c:"005AAAAAAAAAAAA",
  Sales_Representative__r:{Id:"005AAAAAAAAAAAA", Name:"Tao Nhan"},
  Preliminary_Contract_Signed_D__c: '2020-09-07',
  Developer_Deal__c: true,
  Primary_Usage__c :"Primary Residence" ,
  Opportunity__c :"0065x000026bwDgAAI",
  Project_Lookup__c:"a065x00000gHQYmAAO",
  "Eligible_for_tax_rebate__c":true,
  "TPS_Amount__c":0,
  "TPS_Paid__c":0,
  "TPS_Refund__c":0,
  "TVQ_Amount__c":0,
  "TVQ_Refund__c":0,
  "TVQ_Paid__c":0,
  "Total_Price_Sum__c":116702,
  "Discount_On_Total__c":0,
  "Total_Price_Discounted__c":116702,
  "Vip_Amount__c":0,
  "Net_Condo_Price__c":120436.464,
  "Preliminary_Contract_Signed_D__c":"2022-07-14",
  "Is_Demo__c":false,
  //"Deposit_Schedule__c":"a0D5x00000mLhUCEA0",
  "Tax_Exempt__c":false,
  "Tax_Rebate_Percent__c":100,
  "Opportunity__r":{"Id":"0065x000026bwDgAAI"}
};

const MOCK_RENTAL_ASSET = {
  Id: 1,
  name: 'Kingsway Crescent 401',
  salesRep: 'Baker Real Estate',
  leastStartDate: '2020-09-07',
  leastEndDate: '2021-09-07',
  term: 12,
  rate: '1309000.00',
  rentalIncreasePercent: 5,
  rentalIncreaseFrequencyMonths: 12,
  securityDeposit: '5000.00'
};

const MOCK_RENTAL_DEPOSIT = [
 {
   Id: 1,
   date: '01/01/2022',
   total: 1850,
   subtotal: 2000,
   discount: 150,
 },
 {
    Id: 2,
    date: '02/01/2022',
    total: 1850,
    subtotal: 2000,
    discount: 150,
 },
 {
    Id: 3,
    date: '03/01/2022',
    total: 1850,
    subtotal: 2000,
    discount: 150,
 },
 {
    Id: 4,
    date: '04/01/2022',
    total: 1850,
    subtotal: 2000,
    discount: 150,
 },
 {
    Id: 5,
    date: '05/01/2022',
    total: 1850,
    subtotal: 2000,
    discount: 150,
 },
 {
    Id: 6,
    date: '06/01/2022',
    total: 1850,
    subtotal: 2000,
    discount: 150,
 },
 {
    Id: 7,
    date: '07/01/2022',
    total: 1850,
    subtotal: 2000,
    discount: 150,
 },
 {
    Id: 8,
    date: '08/01/2022',
    total: 1850,
    subtotal: 2000,
    discount: 150,
 },
];

const MOCK_DEPOSIT = [
 {
     Id: 1,
     Deposit_Number__c: 1,
     Reception_Date__c: '09/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: true
 },
 {
     Id: 2,
     Deposit_Number__c: 2,
     Reception_Date__c: '10/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     Id: 3,
     Deposit_Number__c: 3,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     Id: 4,
     Deposit_Number__c: 4,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     Id: 5,
     Deposit_Number__c: 5,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
 {
     Id: 6,
     Deposit_Number__c: 6,
     Reception_Date__c: '11/01/2022',
     Deposit_To__c: 'notary',
     Deposit_For__c: 'cashdown',
     Deposit_Amount__c: "2000",
     Percent__c: "1",
     Deposit_Received__c: false
 },
];

const MOCK_SERVICES = [
 {
     Id: 1,
     name: 'SERV-0000232',
     contact_name: 'Andrew Hamilton',
     description: 'My test asset',
     fee: '400.99',
 },
 {
     Id: 2,
     name: 'SERV-0000233',
     contact_name: 'Andrew Hamilton',
     description: 'My test asset',
     fee: '400.99',
 },
 {
     Id: 3,
     name: 'SERV-0000234',
     contact_name: 'Andrew Hamilton',
     description: 'My test asset',
     fee: '400.99',
 },
 {
     Id: 4,
     name: 'SERV-0000235',
     contact_name: 'Andrew Hamilton',
     description: 'My test asset',
     fee: '400.99',
 },
];

const MOCK_VARIA = [
  {
    Id: 1,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  },
  {
    Id: 2,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  },
  {
    Id: 3,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  },
  {
    Id: 4,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  }
];

const MOCK_CHANGE_ORDERS = [
  {
    Id: 1,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  },
  {
    Id: 2,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  },
  {
    Id: 3,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  },
  {
    Id: 4,
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
  }
];

const MOCK_DEPOSIT_SCHEDULE = [
  {"Id":"a0Df200000YpP48EAF","Name":"Deposit Schedule Project 1 (Primary Residence) KC P1","Project__c":"a065x00000gHQYmAAO","Primary_Usage_Type__c":"Primary Residence","Eligible_for_Tax_Rebates__c":true,"Calculate_On_Asset_Only__c":false},{"Id":"a0D5x00000mLhU7EAK","Name":"DS-00000001 Kingsway Cres Phases 12345","Project__c":"a065x00000gHQYmAAO","Primary_Usage_Type__c":"Primary Residence","Eligible_for_Tax_Rebates__c":true,"Calculate_On_Asset_Only__c":false},{"Id":"a0D5x00000mLhUCEA0","Name":"DS-00000002 - Kingsway Cres Phase 1","Project__c":"a065x00000gHQYmAAO","Primary_Usage_Type__c":"Primary Residence","Eligible_for_Tax_Rebates__c":true,"Calculate_On_Asset_Only__c":false},{"Id":"a0D5x00000mZ1esEAC","Name":"M City 4 - Local - copied","Project__c":"a065x00000gHQYmAAO","Primary_Usage_Type__c":"Primary Residence","Eligible_for_Tax_Rebates__c":true,"Calculate_On_Asset_Only__c":false}
];

export { MOCK_CONTACTS_DATA, MOCK_INCLUSIONS, MOCK_RENTAL_ASSET, MOCK_SERVICES, MOCK_CONTACTS, MOCK_PARKING, MOCK_ASSET, MOCK_CLOSING_DETAIL, MOCK_EXTRAS, MOCK_RENTAL_DEPOSIT, MOCK_DEPOSIT, MOCK_VARIA, MOCK_CHANGE_ORDERS, MOCK_DEPOSIT_SCHEDULE };
