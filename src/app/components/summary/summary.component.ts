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

  constructor() { }

  ngOnInit(): void {
    if (!this.hasGreeted) {
      this.hasGreeted = true;
      setTimeout(() => {
        this.greeting.nativeElement.style.transition = 'all 1s ease-out';
        this.greeting.nativeElement.style.opacity = 0;
        this.greeting.nativeElement.style.zIndex = -1;
      }, 3000);
    }
  }
}
