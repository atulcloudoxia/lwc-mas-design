import { LightningElement, api, track } from 'lwc';

const defaults = {
  selected:false,         // Page is in view
  completed:false,        // Page is completed
  warning: false,         // Page has warning
  error: false,           // Page has error
  processing: false,      // Page is procesing
  message: ""             // Status message
};

export default class Mas extends LightningElement {

  @track
  pages = [
    {
      id: "contact",
      step: 1,
      label: "Contact",
      ...defaults,
      selected:true,
    },
    {
      id: "asset",
      step: 2,
      label: "Asset",
      ...defaults,
      completed:true
    },
    {
      id: "deposit",
      step: 3,
      label: "Deposit",
      ...defaults,
      warning:true,
      "message": "The selected deposit schedule is not compliant."
    },
    {
      id: "varia",
      step: 4,
      label: "Varia",
      ...defaults,
    },
    {
      id: "files",
      step: 5,
      label: "Files",
      ...defaults,
    },
    {
      id: "review",
      step: 6,
      label: "Review",
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

  get pageWarning() {
    let currentPage = this.currentPage()[0];
    return currentPage.warning;
  }

  get pageError() {
    let currentPage = this.currentPage()[0];
    return currentPage.error;
  }

  get pageProcessing() {
    let currentPage = this.currentPage()[0];
    return currentPage.processing;
  }

  get pageMessage() {
    let currentPage = this.currentPage()[0];
    return currentPage.message;
  }

  currentPage() {
    return this.pages.filter((page) => page.selected == true);
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
