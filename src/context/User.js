import { makeAutoObservable } from "mobx";

class User {
  constructor() {
    makeAutoObservable(this);
  }

  // session
  session = "";
  nfts = [];
  nextPage = "";
  previousPage = "";
  galleryRef = "";

  // inputs
  wallet = "";
  collection = "";

  // snackbars
  contractCopiedSnackbar = false;
  missingInputSnackbar = false;

  async setMissingInputSnackbar(missingInputSnackbar) {
    this.missingInputSnackbar = missingInputSnackbar;
  }

  async setGalleryRef(galleryRef) {
    this.galleryRef = galleryRef;
  }

  async setPreviousPage(previousPage) {
    this.previousPage = previousPage;
  }

  async setNextPage(nextPage) {
    this.nextPage = nextPage;
  }

  async setContractCopiedSnackbar(contractCopiedSnackbar) {
    this.contractCopiedSnackbar = contractCopiedSnackbar;
  }

  async setNfts(nfts) {
    this.nfts = nfts;
  }

  async setWallet(wallet) {
    this.wallet = wallet;
  }

  async setCollection(collection) {
    this.collection = collection;
  }

  async setSession(session) {
    this.session = session;
  }
}

export default User;
