import { Component, Input } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(public service: MenuService) { }

  closeMenu() {
    this.service.getMenuVisibility();
  }
}