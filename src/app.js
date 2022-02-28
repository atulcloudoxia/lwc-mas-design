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

  @track showContact = true;
  @track showAsset = false;
  @track showDeposit = false;
  @track showVaria = false;
  @track showFiles = false;
  @track showReview = false;

  handleStepChange(e) {
    let changeToPage = e.detail.page;

    this.navigation.currentPage=changeToPage;
    this.showContact = this.navigation.currentPage === 'contact';
    this.showAsset = this.navigation.currentPage === 'asset';
    this.showDeposit = this.navigation.currentPage === 'deposit';
    this.showVaria = this.navigation.currentPage === 'varia';
    this.showFiles = this.navigation.currentPage === 'files';
    this.showReview = this.navigation.currentPage === 'review';
  }


}