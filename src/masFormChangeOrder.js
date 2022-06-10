import { LightningElement, api, track } from 'lwc';

export default class AddChangeOrderForm extends LightningElement {
    @track changeOrderText;
    /**
     * Handle Submit
     *
     * @param (Event) e
     */
    handleSubmit(e) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("save", { detail: {changeordertext: this.changeOrderText} })
      );
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
