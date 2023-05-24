import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent {
  today: string | null = this.formatTodayDate();

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {

  }

  /**
   * Getting today's date in yyyy-MM-dd format for the date input field.
   * @returns today's date in yyyy-MM-dd format
   */
  formatTodayDate() {
    return this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }
}
