import { LightningElement, api, track } from 'lwc';

export default class FormAddVaria extends LightningElement {
    @track variaText;

    /**
     * Handle Submit
     *
     * @param (Event) e
     */
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.variaText);
      this.dispatchEvent(
        new CustomEvent("save", { detail: {variatext: this.variaText} })
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
      this.variaText = e.detail.value;
    }
}
