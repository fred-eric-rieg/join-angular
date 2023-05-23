import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  username: string = 'Sofia Müller';
  @ViewChild('greeting') greeting: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.greeting.nativeElement.style.transition = 'all 1s ease-out';
      this.greeting.nativeElement.style.opacity = 0;
      this.greeting.nativeElement.style.zIndex = -1;
    }, 3000);
  }
}
