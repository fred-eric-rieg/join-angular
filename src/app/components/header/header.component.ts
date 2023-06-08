import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuVisibility: boolean = false;

  constructor() { }

  setMenuVisibility() {
    if (!this.menuVisibility) {
      this.menuVisibility = true;
      return true;
    } else {
      this.menuVisibility = false;
      return false;
    }
  }
}