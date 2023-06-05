import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { Task } from '../models/task.class';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent {

  // For setting the date input to today's date as default.
  today: string | null = '';

  chechoutForm = this.formBuilder.group({
    id: '',
    title: '',
    description: '',
    status: '',
    creationDate: new Date,
    lastUpdated: new Date,
    priority: '',
    creatorId: '',
    dueDate: new Date,
    category: '',
    assignedTo: [],
    subtasks: []
  });

  constructor(private datePipe: DatePipe, private firebaseService: FirebaseService, private formBuilder: FormBuilder) {
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


  createTask() {
    this.firebaseService.createTask(new Task('id', 'Finish Addtask Form', 'Within the next days finish the addtask form design', 'todo', new Date(), new Date(), 'high', 'guest', new Date(), 'Design', ['guest'], []));
  }
}
