import { LightningElement, api, track } from 'lwc';

export default class FormAddChangeOrder extends LightningElement {
    @track changeOrderText;

    /**
     * Handle Submit
     *
     * @param (Event) e
     */
    handleSubmit(e) {
      e.preventDefault();

    }

    /**
     * Handle Cancel
     *
     * @param (Event) e
     */
    handleCancel(e) {
      e.preventDefault();

      this.dispatchEvent(
        new CustomEvent("close")
      );
    }
    handleChange(e){
      this.changeOrderText = e.detail.value;
    }
}
