import { LightningElement, api, track } from 'lwc';

export default class PageFiles extends LightningElement {

  @api asset;

  get acceptedFormats() {
    return ['.pdf', '.png'];
  }

  handleUploadFinished(event) {
    const uploadedFiles = event.detail.files;

    alert('Files : ' + uploadedFiles.length);
  }

}
