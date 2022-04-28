import { LightningElement, api, track } from 'lwc';
import {
  ERROR,
  WARNING,
  PROCESSING,
  MOCK_PARKING,
  MOCK_INCLUSIONS,
  MOCK_ASSET,
  MOCK_RENTAL_ASSET,
  MOCK_EXTRAS,
  MOCK_SERVICES,
  MOCK_DEPOSIT,
  MOCK_RENTAL_DEPOSIT,
  MOCK_VARIA,
  MOCK_CHANGE_ORDERS,
  MOCK_CONTACTS
} from './constants';

const TYPES = {
  sale: 'sale',
  rental: 'rental'
};

const defaults = {
  selected:false,         // Page is in view
  completed:false,        // Page is completed
  warning: false,         // Page has warning
  error: false,           // Page has error
  processing: false,      // Page is processing
  message: ""             // Status message for page
};

const pageContact = {
  id: "contact",
  step: 1,
  label: "Contact",
  enabled: true,
  ...defaults,
  selected:true,
};

const pageAsset = {
  id: "asset",
  step: 2,
  label: "Asset",
  enabled: true,
  ...defaults,
  completed:true
};

const pageRentalAsset = {
  id: "rental_asset",
  step: 2,
  label: "Asset",
  enabled: true,
  ...defaults,
  completed:true
};

const pageRentalVaria = {
  id: "rental_varia",
  step: 2,
  label: "Varia",
  enabled: true,
  ...defaults,
}

const pageInclusions = {
  id: "inclusions",
  step: 4,
  label: "Inclusions",
  enabled: true,
  ...defaults,
  completed:true
};

const pageServices = {
  id: "services",
  step: 5,
  label: "Services",
  enabled: true,
  ...defaults,
  completed:true
};

const pageRentalDeposit = {
  id: "rental_deposit",
  step: 6,
  label: "Rent",
  enabled: true,
  ...defaults,
  warning:false,
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

const pageRentalReview = {
  id: "rental_review",
  step: 8,
  label: "Review",
  enabled: true,
  ...defaults,
}

export default class Mas extends LightningElement {

  constructor() {
    super();
    this.setType(TYPES.rental);
  }

  @track type; // rental or sale
  @track contactsData = MOCK_CONTACTS;
  @track parkingData = MOCK_PARKING;
  @track extraData = MOCK_EXTRAS;
  @track asset = MOCK_ASSET;
  @track rentalAsset = MOCK_RENTAL_ASSET;
  @track servicesData = MOCK_SERVICES;
  @track inclusionsData = MOCK_INCLUSIONS;
  @track depositData = MOCK_DEPOSIT;
  @track rentalDepositData = MOCK_RENTAL_DEPOSIT;
  @track variaData = MOCK_VARIA;
  @track changeOrderData = MOCK_CHANGE_ORDERS;
  @track isLoading=false;
  @track pages = [
    pageContact,
    pageAsset,
    pageDeposit,
    pageVaria,
    pageFiles,
    pageReview
  ];

  get assetData() {
    return this.type === 'rental' ? this.rentalAsset : this.asset;
  }

  get showContactPage() {
    return this.findSelectedById('contact');
  }

  get showAssetPage() {
    return this.findSelectedById('asset');
  }

  get showRentalAssetPage() {
    return this.findSelectedById('rental_asset');
  }

  get showInclusionsPage() {
    return this.findSelectedById('inclusions');
  }

  get showServicesPage() {
    return this.findSelectedById('services');
  }

  get showRentalDepositPage() {
    return this.findSelectedById('rental_deposit');
  }

  get showRentalVariaPage() {
    return this.findSelectedById('rental_varia');
  }

  get showRentalReviewPage() {
    return this.findSelectedById('rental_review');
  }

  get showDepositPage() {
    return this.findSelectedById('deposit');
  }

  get showVariaPage() {
    return this.findSelectedById('varia');
  }

  get showFilesPage() {
    return this.findSelectedById('files');
  }

  get showReviewPage() {
    return this.findSelectedById('review');
  }

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

  /**
   * Reservation mode
   *
   * @param (Boolean) isReservation
   */
  setReservation(isReservation) {
    if (isReservation) {
      this.pages = [
        { ...pageAsset, ...{ selected:true } },
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

    this.reorderSteps();
  }

  /**
   * Swap between rental pages and sale pages
   *
   * @param (String) type
   */
  setType(type) {
    if (type === TYPES.sale) {
      this.pages = [
        { ...pageContact, ...{ selected:true } },
        pageAsset,
        pageDeposit,
        pageVaria,
        pageFiles,
        pageReview
      ];

    } else if (TYPES.rental) {
      this.pages = [
        { ...pageContact, ...{ selected:true } },
        pageRentalAsset,
        pageVaria,
        pageRentalDeposit,
        pageFiles,
        pageRentalReview
      ];
    }

    this.type = type;
    this.reorderSteps();
  }

  /**
   * Re-assign page step numbers
   */
  reorderSteps() {
    for (let i=0; i < this.pages.length; i++) {
      this.pages[i].step = i + 1;
    }
  }

  /**
   * Get current page
   */
  currentPage() {
    return this.pages.filter((page) => page.selected == true);
  }

  /**
   * Get current page index
   */
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
}
