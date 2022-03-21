import { LightningElement, api } from "lwc";
import { ERROR, WARNING, PROCESSING } from './constants';

export default class Message extends LightningElement {

  @api message={};
  @api type;

  get isError() {
    return String(this.type).toLowerCase() === ERROR;
  };

  get isWarning() {
    return String(this.type).toLowerCase() === WARNING;
  };

  get isProcessing() {
    return String(this.type).toLowerCase() === PROCESSING;
  };
}
