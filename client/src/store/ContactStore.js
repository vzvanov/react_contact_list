import { makeAutoObservable } from "mobx";

export default class ContactStore {
  constructor() {
    this._findString = "";
    this._contact = {};
    this._refresh = Date.now();
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

}