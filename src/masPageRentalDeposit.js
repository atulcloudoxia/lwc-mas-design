import { LightningElement, track, api } from 'lwc';
import { COLUMNS_RENTAL_DEPOSIT } from './constants';

export default class PageRentalDeposit extends LightningElement {

    columns = COLUMNS_RENTAL_DEPOSIT;

    @api data;
    @api asset;
}
