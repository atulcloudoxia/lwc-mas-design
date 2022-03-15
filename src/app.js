import { LightningElement, api, track } from 'lwc';

export default class Mas extends LightningElement {

  @track
  pages = [
    {
      id: "contact",
      step: 1,
      label: "Contact",
      selected:true,        // Current page in view
      completed:true,       // Page is completed
      warning: false,       // Page has warning
      error: false,         // Page has error
    },
    {
      id: "asset",
      step: 2,
      label: "Asset",
      selected:false,
      completed:false,
      warning: true,
      error: false,
    },
    {
      id: "deposit",
      step: 3,
      label: "Deposit",
      selected:false,
      completed:false,
      warning: false,
      error: false,
    },
    {
      id: "varia",
      step: 4,
      label: "Varia",
      selected:false,
      completed:false,
      warning: false,
      error: false,
    },
    {
      id: "files",
      step: 5,
      label: "Files",
      selected:false,
      completed:false,
      warning: false,
      error: true,
    },
    {
      id: "review",
      step: 6,
      label: "Review",
      selected:false,
      completed:false,
      warning: false,
      error: false,
    }
  ];

  @track showContact = true;
  @track showAsset = false;
  @track showDeposit = false;
  @track showVaria = false;
  @track showFiles = false;
  @track showReview = false;

  handleStepChange(e) {
    let changeToPage = e.detail.page;

    for(let i=0; i < this.pages.length; i++) {
      this.pages[i].selected = i === parseInt(changeToPage);
    }

    this.showContact = this.pages[0].selected;
    this.showAsset = this.pages[1].selected;
    this.showDeposit = this.pages[2].selected;
    this.showVaria = this.pages[3].selected;
    this.showFiles = this.pages[4].selected;
    this.showReview = this.pages[5].selected;
  }


}
