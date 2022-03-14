import { LightningElement, api, track } from 'lwc';

export default class Mas extends LightningElement {

  @track navigation = {
    pageIndex:0,
    pages: [
      {
        id: "contact",
        step: 1,
        label: "Contact",
        selected:true
      },
      {
        id: "asset",
        step: 2,
        label: "Asset",
        selected:false
      },
      {
        id: "deposit",
        step: 3,
        label: "Deposit",
        selected:false
      },
      {
        id: "varia",
        step: 4,
        label: "Varia",
        selected:false
      },
      {
        id: "files",
        step: 5,
        label: "Files",
        selected:false
      },
      {
        id: "review",
        step: 6,
        label: "Review",
        selected:false
      }
    ],
    get title() {
      return this.pages[this.pageIndex].label;
    },
    get currentPage() {
      return this.pages[this.pageIndex].id;
    },
    set currentPage(index) {
      this.pageIndex=index;
      this.pages[index].selected=true;
      this.pages.forEach((item, idx) => this.pages[idx].selected = idx === parseInt(index))
    },
    get showPages() {
      return this.pages;
    }
  }

  @track
  pages = [
    {
      id: "contact",
      step: 1,
      label: "Contact22",
      selected:true
    },
    {
      id: "asset",
      step: 2,
      label: "Asset",
      selected:false
    },
    {
      id: "deposit",
      step: 3,
      label: "Deposit",
      selected:false
    },
    {
      id: "varia",
      step: 4,
      label: "Varia",
      selected:false
    },
    {
      id: "files",
      step: 5,
      label: "Files",
      selected:false
    },
    {
      id: "review",
      step: 6,
      label: "Review",
      selected:false
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
