import { LightningElement, api, track } from 'lwc';
import {
  ERROR,
  WARNING,
  PROCESSING,
  MOCK_PARKING,
  MOCK_ASSET,
  MOCK_CLOSING_DETAIL,
  MOCK_EXTRAS,
  MOCK_DEPOSIT,
  MOCK_VARIA,
  MOCK_CHANGE_ORDERS,
  MOCK_CONTACTS
} from './constants';

// State machine
const defaults = {
  selected:false,         // Page is in view
  completed:false,        // Page is completed
  warning: false,         // Page has warning
  error: false,           // Page has error
  processing: false,      // Page is processing
  message: ""             // Status message for page
};

let pageContact = {
  id: "contact",
  step: 1,
  label: "Contact",
  enabled: true,
  ...defaults,
  selected:true,
  should_recompute: false
};

const pageAsset = {
  id: "asset",
  step: 2,
  label: "Asset",
  enabled: true,
  ...defaults,
  completed:true
};

const pageDeposit = {
  id: "deposit",
  step: 3,
  label: "Deposit",
  enabled: true,
  ...defaults,
  warning:true,
  "message": "The selected deposit schedule is not compliant."
};

const pageVaria = {
  id: "varia",
  step: 4,
  label: "Varia",
  enabled: true,
  ...defaults,
}

const pageFiles = {
  id: "files",
  step: 5,
  label: "Files",
  enabled: true,
  ...defaults,
}

const pageReview = {
  id: "review",
  step: 6,
  label: "Review",
  enabled: true,
  ...defaults,
  processing:true
}

export default class Mas extends LightningElement {

  // @api recordId;

  // Common Data
  @track opportunity = {};
  @track contactList = MOCK_CONTACTS;
  @track asset = MOCK_ASSET;
  @track closingdetail = MOCK_CLOSING_DETAIL;
  @track salesRep = {};

  // MAS Data
  @track parkingData = MOCK_PARKING;
  @track extraData = MOCK_EXTRAS;
  @track depositData = MOCK_DEPOSIT;
  @track variaData = MOCK_VARIA;
  @track changeOrderData = MOCK_CHANGE_ORDERS;
  @track closingDetail = {};

  // MAR Data
  @track rentalDetail = {};
  @track inclusionsList = [];
  @track servicesList = [];

  // Other
  @track isLoading=false;

  @track
  pages = [
    pageContact,
    pageAsset,
    pageDeposit,
    pageVaria,
    pageFiles,
    pageReview
  ];

  /**
   * Reservation mode
   *
   * @param (Boolean) isReservation
   */
  setReservation(isReservation) {
    if (isReservation) {
      this.pages = [
        {
          ...pageAsset,
          ...{
            selected:true
          }
        },
        pageDeposit,
        pageReview
      ];
    } else {
      this.pages = [
        pageContact,
        pageAsset,
        pageDeposit,
        pageVaria,
        pageFiles,
        pageReview
      ];
    }

    for (let i=0; i < this.pages.length; i++) {
      this.pages[i].step = i + 1;
    }
  }

  get showContactPage() {
    return this.findSelectedById('contact');
  };

  get showAssetPage() {
    return this.findSelectedById('asset');
  };

  get showDepositPage() {
    return this.findSelectedById('deposit');
  };

  get showVariaPage() {
    return this.findSelectedById('varia');
  };

  get showFilesPage() {
    return this.findSelectedById('files');
  };

  get showReviewPage() {
    return this.findSelectedById('review');
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

  currentPageIndex() {
    for(let i=0; i < this.pages.length; i++) {
      if (this.pages[i].selected) {
        return i;
      }
    }
  }

  /**
   * Find selected page by string/id
   *
   * @param (String) id
   */
  findSelectedById(id) {
    for(let i=0; i < this.pages.length; i++) {
      if (this.pages[i].id === id) {
        return this.pages[i].selected;
      }
    }
  }

  /**
   * Previous Page
   *
   * @param (Event) e
   */
  handlePreviousPage(e) {
    let currentPageIndex = this.currentPageIndex();

    if (currentPageIndex === 0) return;

    for(let i=0; i < this.pages.length; i++) {
      this.pages[i].selected = i === (currentPageIndex - 1);
    }
  }

  /**
   * Next Page
   *
   * @param (Event) e
   */
  handleNextPage(e) {
    let currentPageIndex = this.currentPageIndex();

    if (currentPageIndex === (this.pages.length -1)) return;

    for(let i=0; i < this.pages.length; i++) {
      this.pages[i].selected = i === (currentPageIndex + 1);
    }
  }

  /**
   * When a user confirms they wish to delete sale
   *
   * @param (Event) e
   */
  handleDeleteSale(e) {
    console.log('The final destination: ', e.payload)
    alert('Delete The Sale')
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
  handleDataUpdate(e) {
    const { pageIdx, error, completed, warning, message, contactdata, parkingdata, extradata, depositdata, variadata, changeorderdata} = e.detail;

    if(parkingdata!=undefined) this.parkingData = parkingdata;
    if(extradata!=undefined) this.extraData = extradata;
    if(contactdata!=undefined) this.contactList = contactdata;
    if(depositdata!=undefined) this.depositData = depositdata;
    if(variadata!=undefined) this.variaData = variadata;
    if(changeorderdata!=undefined) this.changeOrderData = changeorderdata;
  }
  
}
