import { LightningElement, track, wire, api } from "lwc";

export default class MakeASale extends NavigationMixin(LightningElement) {
    // @api recordId;

    // State machine
    @track masState : {};

    // Data
    @track opportunity;
    @track contactList = [];
    @track salesRep;
    @track asset;

    // MAS
    @track closingDetail;
    // isReservation? TBD
    @track parkingLockersList = [];
    @track extraList = [];
    @track appliedTaxesList = [];
    @track depositList = [];

    // MAR
    @track rentalDetail;
    @track inclusionsList = [];
    @track servicesList = [];

    flowType() {
        return "SALE"; // "RENTAL", "RESERVATION"
    }

}