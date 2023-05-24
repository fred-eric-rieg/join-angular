import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuVisible: boolean = false;

  constructor() { }

  getMenuVisibility() {
    if (this.menuVisible) {
      this.menuVisible = false;
      return true;
    } else {
      this.menuVisible = true;
      return false;
    }
  }
}