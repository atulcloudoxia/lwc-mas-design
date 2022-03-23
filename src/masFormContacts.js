import { LightningElement, track, api } from 'lwc';
import {
  OPTIONS_ROLES,
  OPTIONS_LANGUAGES,
  OPTIONS_SALUTATIONS
} from './constants';


export default class ContactForm extends LightningElement {

  @api data;

  @track isCorporation = false;

  languageOptions = OPTIONS_LANGUAGES;
  salutationOptions = OPTIONS_SALUTATIONS;
  roleOptions = OPTIONS_ROLES;

  /**
   * Handle contact form
   *
   * @param (Event) e
   */
  handleFormSubmit(e) {
    e.preventDefault();

    // Submit logic
  }

  /**
   * Handle role change
   *
   * @param (Event) e
   */
  handleRoleChange(e) {
    let role = e.detail.value;

    this.isCorporation = role === 'corporation';
    this.data.role = role;
  }
}
