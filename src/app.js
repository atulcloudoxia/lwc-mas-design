import { LightningElement, api, track } from 'lwc';
import {
  ERROR,
  WARNING,
  PROCESSING,
  MOCK_PARKING,
  MOCK_ASSET,
  MOCK_EXTRAS,
  MOCK_DEPOSIT,
  MOCK_VARIA,
  MOCK_CHANGE_ORDERS,
  MOCK_CONTACTS
} from './constants';

const defaults = {
  selected:false,         // Page is in view
  completed:false,        // Page is completed
  warning: false,         // Page has warning
  error: false,           // Page has error
  processing: false,      // Page is processing
  message: ""             // Status message for page
};

export default class Mas extends LightningElement {

  @track
  contactsData = MOCK_CONTACTS;

  @track
  parkingData = MOCK_PARKING;

  @track
  extraData = MOCK_EXTRAS;

  @track
  asset = MOCK_ASSET;

  @track
  depositData = MOCK_DEPOSIT;

  @track
  variaData = MOCK_VARIA;

  @track
  changeOrderData = MOCK_CHANGE_ORDERS;

  @track
  isLoading=false;

  @track
  pages = [
    {
      id: "contact",
      step: 1,
      label: "Contact",
      enabled: true,    
      ...defaults,
      selected:true,
    },
    {
      id: "asset",
      step: 2,
      label: "Asset",
      enabled: true,
      ...defaults,
      completed:true
    },
    {
      id: "deposit",
      step: 3,
      label: "Deposit",
      enabled: true,
      ...defaults,
      warning:true,
      "message": "The selected deposit schedule is not compliant."
    },
    {
      id: "varia",
      step: 4,
      label: "Varia",
      enabled: false,
      ...defaults,
    },
    {
      id: "files",
      step: 5,
      label: "Files",
      enabled: false,
      ...defaults,
    },
    {
      id: "review",
      step: 6,
      label: "Review",
      enabled: true,
      ...defaults,
      processing:true
    }
  ];

  get showContactPage() {
    return this.pages[0].selected;
  };

  get showAssetPage() {
    return this.pages[1].selected;
  };

  get showDepositPage() {
    return this.pages[2].selected;
  };

  get showVariaPage() {
    return this.pages[3].selected;
  };

  get showFilesPage() {
    return this.pages[4].selected;
  };

  get showReviewPage() {
    return this.pages[5].selected;
  };

  get hasPageMessage() {
    let currentPage = this.currentPage()[0];

    return currentPage.warning || currentPage.error || currentPage.processing;
  }

  get pageMessage() {
    let currentPage = this.currentPage()[0];

    return currentPage.message;
  }

  get pageMessageType() {
    let currentPage = this.currentPage()[0];

    if (currentPage.warning) {
      return WARNING;

    } else if (currentPage.error) {
      return ERROR;

    } else if (currentPage.processing) {
      return PROCESSING;
    }
  }

  currentPage() {
    return this.pages.filter((page) => page.selected == true);
  }

  /**
   * When a user confirms they wish to delete sale
   *
   * @param (Event) e
   */
  handleDeleteSale(e) {
    // Add logic for deleting sale
  }

  /**
   * Page/Step Change Listener
   *
   * @param (Event) e
   */
  handleStepChange(e) {
    let changeToPage = e.detail.page;

    for(let i=0; i < this.pages.length; i++) {
      this.pages[i].selected = i === parseInt(changeToPage);
    }
  }

  /**
   * Page Updated Listener
   *
   * @param (Event) e
   */
  handlePageUpdate(e) {
    const { pageIdx, error, completed, warning, message } = e.detail;

    if (pageIdx || pageIdx === 0) {
      this.pages[pageIdx] = {
        ...this.pages[pageIdx],
        error,
        completed,
        warning,
        message
      };
    }
  }
}
