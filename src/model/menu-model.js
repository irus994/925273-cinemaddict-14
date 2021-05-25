import Observer from '../utils/observer.js';
import {MenuItem} from '../utils/const.js';

export default class MenuModel extends Observer {
  constructor() {
    super();
    this._activeMenuItem = MenuItem.MOVIES;
  }

  setMenuItem(updateType, menuItem) {
    this._activeMenuItem = menuItem;
    this._notify(updateType, menuItem);
  }

  getMenuItem() {
    return this._activeMenuItem;
  }
}
