import { makeAutoObservable } from "mobx";

export const PAGE_LIMIT = 4;

export default class ContactStore {
  constructor() {
    this._findString = "";
    this._contact = {};
    this._refresh = Date.now();
    this._page = 1;
    this._limit = PAGE_LIMIT;
    this._lastPage = false;
    makeAutoObservable(this);
  }

  setFindString(findString) {
    this._findString = findString;
  }

  setContact(contact) {
    this._contact = contact;
  }

  setRefresh(refresh) {
    this._refresh = refresh;
  }

  setPage(page) {
    if (page < 1) page = 1;
    this._page = page;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  setLastPage(bool) {
    this._lastPage = bool;
  }

  get findString() {
    return this._findString;
  }

  get contact() {
    return this._contact;
  }

  get title() {
    return this._contact?.title;
  }

  get refresh() {
    return this._refresh;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  get lastPage() {
    return this._lastPage;
  }

}