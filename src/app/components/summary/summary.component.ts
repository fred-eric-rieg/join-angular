import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  username: string = 'Sofia Müller';
  @ViewChild('greeting') greeting: any;
  hasGreeted: boolean = false;

  constructor() {
    
  }

  ngOnInit() {
    this.getLocalStorage();
    if (!this.hasGreeted) {
      setTimeout(() => {
        this.hasGreeted = true;
        this.setLocalStorage();
        this.greeting.nativeElement.style.transition = 'all 1s ease-out';
        this.greeting.nativeElement.style.opacity = 0;
        this.greeting.nativeElement.style.zIndex = -1;
      }, 3000);
    }
  }


  setLocalStorage() {
    localStorage.setItem('hasGreeted', this.hasGreeted.toString());
  }

  getLocalStorage() {
    if (localStorage.getItem('hasGreeted')) {
      this.hasGreeted = localStorage.getItem('hasGreeted') === 'true' ? true : false;
    } else {
      this.hasGreeted = false;
    }
  }
}
