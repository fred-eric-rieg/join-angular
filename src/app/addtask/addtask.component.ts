import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent {

  today: string | null = '';

  constructor(private datePipe: DatePipe) {
    this.today = this.formatToday(new Date());
    console.log(this.today);
  }

  ngOnInit() {

  }

  /**
   * Transforms a date to yyyy-MM-dd format.
   * @returns as string
   */
  formatToday(date?: Date, numberDate?: number, stringDate?: string) {
    if (numberDate) {
      return this.datePipe.transform(numberDate, 'yyyy-MM-dd');;
    } else if (stringDate) {
      return this.datePipe.transform(stringDate, 'yyyy-MM-dd');
    } else {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
  }
}
