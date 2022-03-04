import { LightningElement, api } from 'lwc';

export default class PageFiles extends LightningElement {

  get acceptedFormats() {
    return ['.pdf', '.png'];
  }

  handleUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    
    alert('Files : ' + uploadedFiles.length);
  }

}

