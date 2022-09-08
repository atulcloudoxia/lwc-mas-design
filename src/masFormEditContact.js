import { LightningElement, track, api } from 'lwc';
import {
  OPTIONS_ROLES,
  OPTIONS_LANGUAGES,
  OPTIONS_SALUTATIONS
} from './constants';


export default class ContactForm extends LightningElement {

  @api data={};
  @api iscorporation;
   
  @track Today = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60000).toISOString().split('T')[0];
  @track isCorporation = this.iscorporation;

  languageOptions = OPTIONS_LANGUAGES;
  salutationOptions = OPTIONS_SALUTATIONS;
  roleOptions = OPTIONS_ROLES;

  /**
   * Handle contact form
   *
   * @param (Event) e
   */
  handleSubmit(e) {
    e.preventDefault();

    // Submit logic
  }

  /**
   * Handle cancel
   *
   * @param (Event) e
   */
  handleCancel(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent("close")
    );
  }

  /**
   * Handle role change
   *
   * @param (Event) e
   */
  handleRoleChange(e) {
    let role = e.detail.value;
    console.log(role);
    this.isCorporation = role === 'corporation';
    this.data = {...this.data,"Role":role};
  }
    handleFormInputChange(event){
        var data = {...this.data};
        if(event.target.name.includes('.')){
            var parentObj = {...data[event.target.name.split('.')[0]]};
          
            parentObj[event.target.name.split('.')[1]] = event.target.value;
            data[event.target.name.split('.')[0]] =  parentObj ;
        }else{
            data[event.target.name] = event.target.value;
        }
        this.data = data;

        console.log({...this.data});
    }

  @track rolesPicklistItems;
  @track IdTypePicklistItems;
  @track OccupationPicklistItems;
  @track FintracStatusPicklistItems;
  @track AccountFintracStatusPicklistItems;
  @track JusrisdictionStatesPicklistItems;
  @track JusrisdictionCountryPicklistItems;
  @track salutationPicklistItems;
  @track IdInformations;
  @track ContactIdVSroleMap;
  @track ContactIdVSroleMap;
  @track contactForDocumentIdMap;
  @track contactRoles;
  @track langPicklist;
  @track Opp;
  @track disableOrgWideDemoSale;
  @track idInformationMandatory;
  @track onyxSetting;
  @track HowDidYouHearAboutUsPicklist;
  @track customRegexList;
  @track idInformation={};
  connectedCallback(contactId) {
    this.isCorporation = this.data.Role === 'corporation';
   // var opportunityId = component.get("v.opportunity.Id");
    //console.log("MASContactRolesController.doInit - fetching contact roles for opportunity id " + opportunityId);

    /*var apexAction = component.get("c.getCurrentData");
    apexAction.setParams({
        "opportunityId": opportunityId
    });
    apexAction.setCallback(this, function (response) {*/
        //var state = response.getState();
        //if (component.isValid() && state === "SUCCESS") {
            //var container = response.getReturnValue();
            var jsondata = '{"AccountFintracStatusPicklistItems":[{"label":"High-Foreign Citizen/Resident Operating in High Risk Country","value":"High-Foreign Citizen/Resident Operating in High Risk Country"},{"label":"High-Other, Explain","value":"High-Other, Explain"},{"label":"Low-Canadian Citizen/Resident Not Physically Present","value":"Low-Canadian Citizen/Resident Not Physically Present"},{"label":"Low-Canadian Citizen/Resident Physically Present","value":"Low-Canadian Citizen/Resident Physically Present"},{"label":"Low-Canadian Citizen/Resident High Crime Area","value":"Low-Canadian Citizen/Resident High Crime Area"},{"label":"Low-Foreign Citizen/Resident Not Operating In High Risk Country","value":"Low-Foreign Citizen/Resident Not Operating In High Risk Country"},{"label":"Low-Other, Explain","value":"Low-Other, Explain"},{"label":"Medium, Explain","value":"Medium, Explain"},{"label":"Close","value":"Close"}],"allowToSellMultiple":false,"contactForContactRoleMap":{"0035x000037f2SDAAY":{"Id":"0035x000037f2SDAAY","Name":"TOLA TONYSKI BOUGHT","ID_Informations__r":[{"Contact__c":"0035x000037f2SDAAY","Id":"a0e5x00000OTkDaAAL","ID__c":"T1507-160892-03","Id_Expiration_Date__c":"2030-08-17","Id_Jusrisdiction_Country__c":"Canada","Id_Jusrisdiction_State_Province__c":"QC - Quebec","ID_Type__c":"Drivers License"}]},"2":{"Id":"2","Name":"TOLA TONYSKI BOUGHT","ID_Informations__r":[{"Contact__c":"0035x000037f2SDAAY","Id":"a0e5x00000OTkDaAAL","ID__c":"T1507-160892-03","Id_Expiration_Date__c":"2030-08-17","Id_Jusrisdiction_Country__c":"Canada","Id_Jusrisdiction_State_Province__c":"QC - Quebec","ID_Type__c":"Drivers License"}]},"3":{"Id":"3","Name":"TOLA TONYSKI BOUGHT","ID_Informations__r":[{"Contact__c":"0035x000037f2SDAAY","Id":"a0e5x00000OTkDaAAL","ID__c":"T1507-160892-03","Id_Expiration_Date__c":"2030-08-17","Id_Jusrisdiction_Country__c":"Canada","Id_Jusrisdiction_State_Province__c":"QC - Quebec","ID_Type__c":"Drivers License"}]}},"contactForDocumentIdMap":{"0035x000037f2SDAAY":"0695x00000DVSdnAAH"},"contactRoles":[{"Id":"00K5x00000RIw0BEAT","Role":"Buyer 1","ContactId":"0035x000037f2SDAAY","OpportunityId":"0065x000026bwDgAAI","Contact":{"Language__c":"English","Salutation":"Mr.","FirstName":"TOLA","LastName":"TONYSKI BOUGHT","Phone":"9999998888","Email":"uuuu@uuu.com","MailingCity":"Montréal","MailingState":"QC","MailingCountry":"Canada","MailingPostalCode":"H1W 2W9","MailingStreet":"6925 CHAMPANGEUR APP3","Birthdate":"1987-08-16","Fintrac_Status__c":"Close","Occupation__c":"Government","Company_Of_Employment__c":"Amstudio","AccountId":"0015x00002AJztAAAT","Id":"0035x000037f2SDAAY","Account":{"Id":"0015x00002AJztAAAT","Name":"Default Company"}}}],"currentOpp":{"Id":"0065x000026bwDgAAI","Contact__c":"0035x000037f2SDAAY","Contact__r":{"AccountId":"0015x00002AJztAAAT","LeadSource":"Walk-In Sales Office","Status__c":"Primary","Id":"0035x000037f2SDAAY"}},"customRegexList":[],"disableOrgWideDemoSale":false,"FintracStatusPicklistItems":[{"label":"High-Foreign Citizen/Resident Operating in High Risk Country","value":"High-Foreign Citizen/Resident Operating in High Risk Country"},{"label":"High-Other, Explain","value":"High-Other, Explain"},{"label":"Low-Canadian Citizen/Resident Not Physically Present","value":"Low-Canadian Citizen/Resident Not Physically Present"},{"label":"Low-Canadian Citizen/Resident Physically Present","value":"Low-Canadian Citizen/Resident Physically Present"},{"label":"Low-Canadian Citizen/Resident High Crime Area","value":"Low-Canadian Citizen/Resident High Crime Area"},{"label":"Low-Foreign Citizen/Resident Not Operating In High Risk Country","value":"Low-Foreign Citizen/Resident Not Operating In High Risk Country"},{"label":"Low-Other, Explain","value":"Low-Other, Explain"},{"label":"Medium, Explain","value":"Medium, Explain"},{"label":"Close","value":"Close"},{"label":"tewt","value":"tewt"}],"HowDidYouHearAboutUsPicklist":[{"label":"APCHQ","value":"APCHQ"},{"label":"Broker Website","value":"Broker Website"},{"label":"Direct Mail (Postcard)","value":"Direct Mail (Postcard)"},{"label":"Du Proprio","value":"Du Proprio"},{"label":"Email","value":"Email"},{"label":"Exterior signage","value":"Exterior signage"},{"label":"Facebook","value":"Facebook"},{"label":"Guide Habitation","value":"Guide Habitation"},{"label":"Metro de Montréal – STM","value":"Metro de Montréal – STM"},{"label":"Web Search","value":"Web Search"}],"idInformationMandatory":true,"IdTypePicklistItems":[{"label":"Passport","value":"Passport"},{"label":"Canadian Permanent Resident Card","value":"Canadian Permanent Resident Card"},{"label":"Indian Status Card","value":"Indian Status Card"},{"label":"Other","value":"Other"},{"label":"Drivers License","value":"Drivers License"}],"JusrisdictionCountryPicklistItems":[{"label":"Canada","value":"Canada"},{"label":"USA","value":"USA"}],"JusrisdictionStatesPicklistItems":[{"label":"QC - Quebec","value":"QC - Quebec"},{"label":"ON - Ontario","value":"ON - Ontario"},{"label":"AB - Alberta","value":"AB - Alberta"},{"label":"BC - British Columbia","value":"BC - British Columbia"},{"label":"MB - Manitoba","value":"MB - Manitoba"},{"label":"NB - New Brunswick","value":"NB - New Brunswick"},{"label":"NF - Newfoundland","value":"NF - Newfoundland"},{"label":"NT - Northwest Territories","value":"NT - Northwest Territories"},{"label":"NS - Nova Scotia","value":"NS - Nova Scotia"},{"label":"NU - Nunavut","value":"NU - Nunavut"},{"label":"PE - Prince Edward Island","value":"PE - Prince Edward Island"},{"label":"SK - Saskatchewan","value":"SK - Saskatchewan"},{"label":"YT - Yukon","value":"YT - Yukon"},{"label":"AL - Alabama","value":"AL - Alabama"},{"label":"AK - Alaska","value":"AK - Alaska"},{"label":"AS - American Samoa","value":"AS - American Samoa"},{"label":"AZ - Arizona","value":"AZ - Arizona"},{"label":"AR - Arkansas","value":"AR - Arkansas"},{"label":"CA - California","value":"CA - California"},{"label":"CO - Colorado","value":"CO - Colorado"},{"label":"CT - Connecticut","value":"CT - Connecticut"},{"label":"DE - Delaware","value":"DE - Delaware"},{"label":"DC - District of Columbia","value":"DC - District of Columbia"},{"label":"FL - Florida","value":"FL - Florida"},{"label":"GA - Georgia","value":"GA - Georgia"},{"label":"GU - Guam","value":"GU - Guam"},{"label":"HI - Hawaii","value":"HI - Hawaii"},{"label":"ID - Idaho","value":"ID - Idaho"},{"label":"IL - Illinois","value":"IL - Illinois"},{"label":"IN - Indiana","value":"IN - Indiana"},{"label":"IA - Iowa","value":"IA - Iowa"},{"label":"KS - Kansas","value":"KS - Kansas"},{"label":"KY - Kentucky","value":"KY - Kentucky"},{"label":"LA - Louisiana","value":"LA - Louisiana"},{"label":"ME - Maine","value":"ME - Maine"},{"label":"MH - Marshall Islands","value":"MH - Marshall Islands"},{"label":"MD - Maryland","value":"MD - Maryland"},{"label":"MA - Massachusetts","value":"MA - Massachusetts"},{"label":"MI - Michigan","value":"MI - Michigan"},{"label":"MN - Minnesota","value":"MN - Minnesota"},{"label":"MS - Mississippi","value":"MS - Mississippi"},{"label":"MO - Missouri","value":"MO - Missouri"},{"label":"MT - Montana","value":"MT - Montana"},{"label":"NE - Nebraska","value":"NE - Nebraska"},{"label":"NV - Nevada","value":"NV - Nevada"},{"label":"NH - New Hampshire","value":"NH - New Hampshire"},{"label":"NJ - New Jersey","value":"NJ - New Jersey"},{"label":"NM - New Mexico","value":"NM - New Mexico"},{"label":"NY - New York","value":"NY - New York"},{"label":"NC - North Carolina","value":"NC - North Carolina"},{"label":"ND - North Dakota","value":"ND - North Dakota"},{"label":"MP - Northern Mariana Islands","value":"MP - Northern Mariana Islands"},{"label":"OH - Ohio","value":"OH - Ohio"},{"label":"OK - Oklahoma","value":"OK - Oklahoma"},{"label":"OR - Oregon","value":"OR - Oregon"},{"label":"PW - Palau","value":"PW - Palau"},{"label":"PA - Pennsylvania","value":"PA - Pennsylvania"},{"label":"PR - Puerto Rico","value":"PR - Puerto Rico"},{"label":"RI - Rhode Island","value":"RI - Rhode Island"},{"label":"SC - South Carolina","value":"SC - South Carolina"},{"label":"SD - South Dakota","value":"SD - South Dakota"},{"label":"TN - Tennessee","value":"TN - Tennessee"},{"label":"TX - Texas","value":"TX - Texas"},{"label":"UT - Utah","value":"UT - Utah"},{"label":"VT - Vermont","value":"VT - Vermont"},{"label":"VI - Virgin Islands","value":"VI - Virgin Islands"},{"label":"VA - Virginia","value":"VA - Virginia"},{"label":"WA - Washington","value":"WA - Washington"},{"label":"WV - West Virginia","value":"WV - West Virginia"},{"label":"WI - Wisconsin","value":"WI - Wisconsin"},{"label":"WY - Wyoming","value":"WY - Wyoming"}],"langList":[{"label":"English","value":"English"},{"label":"French","value":"French"},{"label":"Chinese","value":"Chinese"}],"OccupationPicklistItems":[{"label":"Government","value":"Government"},{"label":"Architecture & Design","value":"Architecture & Design"},{"label":"Agriculture & Food","value":"Agriculture & Food"},{"label":"Arts","value":"Arts"},{"label":"Audio/Video Technology","value":"Audio/Video Technology"},{"label":"Business Administration","value":"Business Administration"},{"label":"Business Management","value":"Business Management"},{"label":"Communications","value":"Communications"},{"label":"Construction","value":"Construction"},{"label":"Corrections & Security","value":"Corrections & Security"},{"label":"Education & Training","value":"Education & Training"},{"label":"Finance","value":"Finance"},{"label":"Government & Public Service","value":"Government & Public Service"},{"label":"Health Sciences","value":"Health Sciences"},{"label":"Hospitality & Tourism","value":"Hospitality & Tourism"},{"label":"Human Resources","value":"Human Resources"},{"label":"Information Technology","value":"Information Technology"},{"label":"Law","value":"Law"},{"label":"Manufacturing","value":"Manufacturing"},{"label":"Marketing, Sales & Service","value":"Marketing, Sales & Service"},{"label":"Math & Engineering","value":"Math & Engineering"}],"onyxSetting":{"Google_Cloud_Vision_API_Key__c":"AIzaSyABGdTFOhpbcShpWVjp1OHYGcZZ6TtE9rs","Id":"a0d5x00000XgNW6AAN"},"rolesPicklistItems":[{"label":"Buyer 1","value":"Buyer 1"},{"label":"Buyer 2","value":"Buyer 2"},{"label":"Spouse 1","value":"Spouse 1"},{"label":"Spouse 2","value":"Spouse 2"},{"label":"Realtor","value":"Realtor"},{"label":"Buyer 4","value":"Buyer 4"},{"label":"Corporation","value":"Corporation"}],"salutationPicklistItems":[{"label":"Mr.","value":"Mr."},{"label":"Ms.","value":"Ms."},{"label":"Mrs.","value":"Mrs."},{"label":"Dr.","value":"Dr."},{"label":"Prof.","value":"Prof."}],"totalUnitSoldToBuyer":0}';
            var container = JSON.parse(jsondata);
            //console.log("MASContactRolesController.getCurrentData : " + JSON.stringify(container));
            this.rolesPicklistItems = container.rolesPicklistItems;
            this.IdTypePicklistItems = container.IdTypePicklistItems;
            this.OccupationPicklistItems = container.OccupationPicklistItems;
            this.FintracStatusPicklistItems = container.FintracStatusPicklistItems;
            this.AccountFintracStatusPicklistItems = container.AccountFintracStatusPicklistItems;
            this.JusrisdictionStatesPicklistItems = container.JusrisdictionStatesPicklistItems;
            this.JusrisdictionCountryPicklistItems = container.JusrisdictionCountryPicklistItems;
            this.salutationPicklistItems = container.salutationPicklistItems;

            // Process contactRoles List to add contact data in there
            //var contactRoles = [];
             
            //contactRoles.push(this.data);
            var contactsMap = container.contactForContactRoleMap;
            console.table(contactsMap);
            var IdInformations = [];
            //for (var k = 0; k < contactRoles.length; k++) {
                var contactRole = {...this.data};//contactRoles[k];
                console.log(JSON.parse(JSON.stringify(contactRole)));
                console.log(contactsMap[contactRole.Id]);
                if(contactsMap[contactRole.Id]!=null){
                  contactRole.contactName = contactsMap[contactRole.Id].Name;
                }else{
                  console.log('Contact Map and contact id not matching.');
                }
                
                if (contactsMap[contactRole.Id]==null || contactsMap[contactRole.Id].ID_Informations__r == undefined) {
                    IdInformations.push({
                        "Contact__c": contactRole.ContactId,
                        "ID_Type__c": null,
                        "ID__c": null,
                        "Id": null,
                        "Id_Expiration_Date__c": null,
                        "Id_Jusrisdiction_Country__c": null,
                        "Id_Jusrisdiction_State_Province__c": null
                    });
                } else {
                    for (var idRec in contactsMap[contactRole.Id].ID_Informations__r) {
                        IdInformations.push(contactsMap[contactRole.Id].ID_Informations__r[idRec]);
                    }
                }
            //}
            this.IdInformations = IdInformations;
            this.idInformation = IdInformations[0];
            var ContactIdVSroleMap = this.ContactIdVSroleMap;
            //container.contactRoles.forEach(contactRole => {
                contactRole.Document_ID = container.contactForDocumentIdMap[contactRole.ContactId];
                if (contactId != null && contactRole.Id == contactId) {
                    contactRole.isVisibleSection = true;
                }
                console.log(contactRole);
                if (ContactIdVSroleMap != undefined && ContactIdVSroleMap != null && ContactIdVSroleMap[contactRole.ContactId] != null) {
                    contactRole.Role = ContactIdVSroleMap[contactRole.ContactId];
                }
            //});

            this.contactForDocumentIdMap = container.contactForDocumentIdMap;
            this.data = contactRole;
            this.langPicklist = container.langList;
            this.Opp = container.currentOpp;
            this.disableOrgWideDemoSale = container.disableOrgWideDemoSale;
            this.idInformationMandatory = container.idInformationMandatory;
            this.onyxSetting = container.onyxSetting;
            this.HowDidYouHearAboutUsPicklist = container.HowDidYouHearAboutUsPicklist;
            this.customRegexList = container.customRegexList;

             
         /*} else {
            console.log("MASContactRolesController.doInit | Apex Callback error ", JSON.stringify(response.getError()) + " state " + state);
        }
   });
    $A.enqueueAction(apexAction);*/
}
  saveContactRole(event, onlySave) {
    let reqFields = this.template.querySelectorAll('[data-id="reqField"]');
    let isValid = true;
    var idInformationMandatory = this.idInformationMandatory;
    var roleNamesForExp = [];
    var dobRoleNamesForExp = [];
    var valid;
    var licennceset = new Set();
    var contact = {...this.data};

    var orgLevelDisableRealtorValidation = this.orgLevelDisableRealtorValidation;

    // see https://onyxtech-ca.atlassian.net/wiki/spaces/OG/pages/151683289/Canadian+Broker+Standard+Specifications
    // https://rubular.com/r/KHXEtw1HQH
    // Ontario - RECO - have a specific format of 7 digits (2908766) or 0+7 digits (02342315)
    var onlicencefilter = /^\d{7}$/;
    var onlicencefilter1 = /0{7}/;

    // Québec - OAICQ - have a specific format of 1 Letter (D, E, F or G) + 4 digits (E0965)
    var qulicencefilter = /^[a-zA-Z]\d{4}$/;

    // BC / Vancouver - BCREA - have a specific format of 6 digits (348238) or 7 digits (3425498)
    var bclicencefilter1 = /^V\d{6}$/;
    var bclicencefilter2 = /^\d{6}$/;
    var bclicencefilter3 = /^\d{7}$/;

    if (onlySave != true) {
        //for (let i = 0; i < contactRoles.length; i++) {
            if (contact.Role == 'Realtor' && (contact.AccountId == '' || contact.AccountId == {} || contact.AccountId == null || contact.AccountId == undefined)) {
                /*var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "error",
                    "title": "Error",
                    "message": "Realtor Agency is required"
                });
                toastEvent.fire();*/
                alert('Realtor Agency is required');
                //this.expandAllSections(component, event, helper);
                return;
            } else {
                if ((contact.AccountId == null || contact.AccountId == undefined) && (contact.Account != null))
                    contact.AccountId = contact.Account.Id;
            }

            if ((contact.MailingPostalCode != null && contact.MailingPostalCode.length != 0) ||
                (contact.MailingState != null && contact.MailingState.length != 0) ||
                (contact.MailingCity != null && contact.MailingCity.length != 0) ||
                (contact.MailingStreet != null && contact.MailingStreet.length != 0)) {
                var mailingState = contact.MailingState;
                if (contact.Role == 'Realtor' && orgLevelDisableRealtorValidation == true) {
                    console.log("Realtor License Number > " + contact.Realtor_License_Number__c);
                    if (contact.Realtor_License_Number__c != null && contact.Realtor_License_Number__c.lenght != 0) {

                        // Default validation rules on Realtor License
                        var licencenumber = contact.Realtor_License_Number__c;
                        var mailingStateString = mailingState.toLowerCase();

                        // Ontario
                        if (mailingStateString == 'ontario' || mailingStateString == 'on') {
                            var licenseValid = (onlicencefilter.test(licencenumber) == true || onlicencefilter1.test(licencenumber) == true)
                            if (licenseValid == false) {
                                licenseValid = this.checkLicenseAgainstCustomRegex(licencenumber);
                            }
                            if (licenseValid == false || licencenumber == '1234567' || licencenumber == '0000000' || licencenumber == '1111111') {
                                licennceset.add(licencenumber);
                            }
                        }
                        // Quebec
                        else if (mailingStateString == 'quebec' || mailingStateString == 'québec' || mailingStateString == 'qc') {
                            var licenseValid = (qulicencefilter.test(licencenumber) == true);
                            if (licenseValid == false) {

                                licenseValid = this.checkLicenseAgainstCustomRegex(licencenumber);

                            }
                            if (licenseValid == false || licencenumber == '1234567' || licencenumber == '0000000' || licencenumber == '1111111') {
                                licennceset.add(licencenumber);

                            }
                        }
                        // BC
                        else if (mailingStateString == 'british columbia' || mailingStateString == 'bc') {
                            var licenseValid = (bclicencefilter1.test(licencenumber) == true || bclicencefilter2.test(licencenumber) == true || bclicencefilter3.test(licencenumber) == true);
                            if (licenseValid == false) {
                                licenseValid = this.checkLicenseAgainstCustomRegex(licencenumber);
                            }
                            if (licenseValid == false || licencenumber == '1234567' || licencenumber == '0000000' || licencenumber == '1111111') {
                                licennceset.add(licencenumber);
                            }
                        }
                        // Other provinces
                        else {
                            var licenseValid = this.checkLicenseAgainstCustomRegex(licencenumber);
                            if (licenseValid == false) {
                                licennceset.add(licencenumber);
                            }
                        }
                    }
                }

                let mailingCountryFld =  this.template.querySelector('[data-id="mailingcountry-req"]');
                try {
                    if (typeof (mailingCountryFld) == 'object' && mailingCountryFld.length == 1 && mailingCountryFld[0] != null) {
                        var value = mailingCountryFld[0].get('v.value');
                        var name = mailingCountryFld[0].get('v.name');
                        var indx = name.substr(0, name.indexOf('-'));
                        if ((value == undefined || value.length == 0)) {
                            isValid = false;
                            mailingCountryFld[0].showHelpMessageIfInvalid();
                        }
                    } else if (mailingCountryFld.length > 1) {
                        for (let fl of mailingCountryFld) {
                            var value = fl.get('v.value');
                            var name = fl.get('v.name');
                            var indx = name.substr(0, name.indexOf('-'));
                            if (indx == i && (value == undefined || value.length == 0)) {
                                isValid = false;
                                fl.showHelpMessageIfInvalid();
                                break;
                            }
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
       // }

        for (let fl of reqFields) {
            console.log(fl);
            var label = fl.label;
            var value = fl.value;
            // console.log("Checking reqField > ", label, value);

            if (!fl.checkValidity()) {
                // Id fields
                if ((label.toLowerCase().startsWith("id") || label.toLowerCase() == 'type')) {
                    if (idInformationMandatory) {
                        isValid = false;
                        fl.showHelpMessageIfInvalid();
                    }
                }
                // Other 'reqFields' fields
                else {
                    isValid = false;
                    fl.showHelpMessageIfInvalid();
                }
            }

            if (label == 'Realtor License') {
                if (value != null && value != '' && value != undefined && licennceset.has(value)) {
                    console.log('licennceset=>' + JSON.stringify(licennceset));
                    console.log('v value=>' + fl.get('v.value') + '==label==>' + label);
                    isValid = false;
                    fl.showHelpMessageIfInvalid();
                    fl.setCustomValidity('REALTOR LICENSE INVALID');
                    fl.reportValidity();
                } else {
                    fl.setCustomValidity('');
                }
            }
        }
        if (idInformationMandatory) {

            let dobReqField = this.template.querySelector('[data-id="dobReqField"]') ;
            if (Array.isArray(dobReqField)) {
                for (let fl of dobReqField) {
                    try {
                        valid = this.checkDobValidity(fl);
                        isValid = isValid ? valid['isValid'] : false;
                        if (valid['dobRoleNamesForExp'] != undefined && valid['dobRoleNamesForExp'] != null && valid['dobRoleNamesForExp'] != '') {
                            dobRoleNamesForExp.push(valid['dobRoleNamesForExp']);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                try {
                    valid = this.checkDobValidity(dobReqField);
                    isValid = isValid ? valid['isValid'] : false;
                    if (valid['dobRoleNamesForExp'] != undefined && valid['dobRoleNamesForExp'] != null && valid['dobRoleNamesForExp'] != '') {
                        dobRoleNamesForExp.push(valid['dobRoleNamesForExp']);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            let expDateReqField = this.template.querySelector('[data-id="expDateReqField"]');
            if (Array.isArray(expDateReqField)) {
                for (let fl of expDateReqField) {
                    try {
                        valid = this.checkDateFieldIsFuture(fl);
                        isValid = isValid ? valid['isValid'] : false;
                        if (valid['roleNamesForExp'] != undefined && valid['roleNamesForExp'] != null && valid['roleNamesForExp'] != '') {
                            roleNamesForExp.push(valid['roleNamesForExp']);
                        }
                    } catch (error) {
                        console.log(error);
                    }

                }
            } else {
                try {
                    valid = this.checkDateFieldIsFuture(expDateReqField);
                    isValid = isValid ? valid['isValid'] : false;
                    if (valid['roleNamesForExp'] != undefined && valid['roleNamesForExp'] != null && valid['roleNamesForExp'] != '') {
                        roleNamesForExp.push(valid['roleNamesForExp']);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            if (roleNamesForExp.length != 0) {
                var msg = roleNamesForExp.length != 0 ? roleNamesForExp.join(', ') + ' ' + 'ID CARD EXPIRED':'';//$A.get('$Label.c.MAS_ID_card_is_expired') + '.' : '';
                alert(msg);
                /* var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning",
                    "message": msg
                });
                toastEvent.fire(); */
            }

        }
    }
    console.log('isValid: '+isValid);
    if (isValid) {

        if (onlySave != true) {
            /*Phone field error */
            var phoneField = this.template.querySelector('[data-id="phoneField"]'); 
            var mobileField = this.template.querySelector('[data-id="mobileField"]');

            // Data Validation
            //for (let conRole of contactRoles) {
                if (contact.Phone && contact.MobilePhone) {
                    alert('MAS_Phone_or_Mobile_Required');
                    /* var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": $A.get('$Label.c.MAS_Phone_or_Mobile_Required')
                    });
                    toastEvent.fire();

                    $A.util.addClass(phoneField, 'slds-has-error');
                    $A.util.addClass(mobileField, 'slds-has-error'); */

                    //this.expandAllSections(component, event, helper);
                    return;
                } else {
                    /* $A.util.removeClass(phoneField, 'slds-has-error');
                    $A.util.removeClass(mobileField, 'slds-has-error'); */
                }
            //}
        }

        
        var IdInformations =this.idInformation;

        let save = new CustomEvent('save',{
            detail: {
              contact: this.data,
              
            },
            bubbles: true,
            composed: false
        });
        this.dispatchEvent(save);
        
        /*var cmpEvent2 = component.getEvent("updateContactRoleDataEvent");
        
        contactRoles.forEach(contactRole => {
            delete contactRole.Contact.Document_ID;
        });
        cmpEvent2.setParams({
            "itemListParam": contactRoles,
            "itemRemoveListParam": [],
            "onlySave": onlySave,
            "IdInformationsParam": IdInformations,
            "opportunity": component.get('v.opportunity')
        });
        cmpEvent2.fire();*/


        if (onlySave != true) {
            // Update UI to next tab
            //this.setSpinnerVisibility(component, true);
        }
    } else {
        if (dobRoleNamesForExp.length != 0) {
          //**DISPLAT ERROR */
            //var toastEvent = $A.get("e.force:showToast");
            //var msg = roleNamesForExp.length!=0?roleNamesForExp.join(', ')+$A.get('$Label.c.MAS_ID_card_is_expired')+'.':'';
            var msg = msg + (dobRoleNamesForExp.length != 0 ? ' ' + dobRoleNamesForExp.join(', ') + '$Label.c.MAS_should_be_older_than_18_years_old' + '.' : '');
            /* toastEvent.setParams({
                "type": "error",
                "title": "Error",
                "message": msg
            });
            toastEvent.fire(); */
            alert(msg);
            
        } else {
          alert('Required field error');
          //**DISPLAT ERROR */

           /*  var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "title": "Error",
                "message": $A.get('$Label.c.MAS_Required_Field_Error')
            });
            toastEvent.fire(); */
            
        }
    }
  }
      // Custom validation rules on Realtor License from regex specified in Custom Settings (see Realtor_Licence_Accepted_Formats__c)
      checkLicenseAgainstCustomRegex(license) {
        let customRegexList = this.customRegexList;
        for (let i = 0; i < customRegexList.length; i++) {
            let customRule = new RegExp(customRegexList[i]);
            if (customRule.test(license) == true) {
                return true;
            }
        }
        return false;
    }

    checkDateFieldIsFuture(fl) {
        var roleNamesForExp = [];
        if (fl != undefined) {
            fl.setCustomValidity('');
            fl.reportValidity();
        }

        var lowerRange = this.Today;
        var expDate = fl.value;
        var isValid = true;
        var name = fl.name;
        var role = name.substring(0, name.indexOf('-'))
        if (!fl.checkValidity()) {
            isValid = false;
            fl.showHelpMessageIfInvalid();
        } else {
            if (Date.parse(expDate)) {
                if (Date.parse(expDate) < Date.parse(lowerRange)) {
                    //isValid = false;
                    roleNamesForExp.push(role);
                    fl.setCustomValidity('Warning, this ID card his expired');
                    fl.reportValidity();
                }
            } else {
                //isValid = false;
                fl.showHelpMessageIfInvalid();
            }
        }
        return {
            "roleNamesForExp": roleNamesForExp,
            "isValid": isValid
        };
    }
    checkDobValidity(fl) {
        //greater than 18 yrs and required
        var dobRoleNamesForExp = [];
        fl.setCustomValidity('');
        fl.reportValidity();
        var dob = fl.value;
        var name = fl.name;
        var isValid = true;
        var role = name.substring(0, name.indexOf('-'))
        if (!fl.checkValidity()) {
            isValid = false;
            fl.showHelpMessageIfInvalid();
        } else {
            var isabove18yrs = getAge(dob) >= 18;
            if (!isabove18yrs) {
                isValid = false;
                dobRoleNamesForExp.push(role);
                fl.setCustomValidity(role + 'should_be_older_than_18_years_old' /*$A.get('$Label.c.MAS_should_be_older_than_18_years_old')*/);
                fl.reportValidity();
            }
        }

        function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        return {
            "dobRoleNamesForExp": dobRoleNamesForExp,
            "isValid": isValid
        };
    }

  /*setContactRole(event) {
    var ContactIdVSroleMap = {};
    var contactRoles = component.get('v.contactRoles');
    contactRoles.forEach(function (cr) {
        ContactIdVSroleMap[cr.ContactId] = cr.Role;
    });
    component.set('v.ContactIdVSroleMap', ContactIdVSroleMap);
    console.log(ContactIdVSroleMap);
  }*/
}
