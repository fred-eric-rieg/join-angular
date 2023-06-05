import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { Task } from '../models/task.class';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent {

  // For setting the date input to today's date as default.
  today: string | null = '';

  // For setting the priority buttons to default (low = true).
  lowPrio: boolean = true;
  mediumPrio: boolean = false;
  urgentPrio: boolean = false;

  expandedCategory: boolean = false;
  expandedAssigned: boolean = false;

  taskForm!: FormGroup;

  constructor(private datePipe: DatePipe, private firebaseService: FirebaseService, private formBuilder: FormBuilder) {
    this.today = this.formatToday(new Date());
    console.log(this.today);
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      id: '',
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      creationDate: [new Date, [Validators.required]],
      lastUpdated: [new Date, [Validators.required]],
      priority: ['low', [Validators.required]],
      creatorId: ['guest', [Validators.required]],
      dueDate: [new Date, [Validators.required]],
      category: ['', [Validators.required]],
      assignedTo: [[], [Validators.required]],
      subtasks: [[], [Validators.required]]
    });

    this.taskForm.valueChanges.subscribe(console.log);
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


  setPrio(prio: string) {
    if (prio === 'low') {
      this.lowPrio = true;
      this.mediumPrio = false;
      this.urgentPrio = false;
    } else if (prio === 'medium') {
      this.lowPrio = false;
      this.mediumPrio = true;
      this.urgentPrio = false;
    } else if (prio === 'urgent') {
      this.lowPrio = false;
      this.mediumPrio = false;
      this.urgentPrio = true;
    }
    this.taskForm.patchValue({ priority: prio });
  }


  expandCategory() {

  }


  expandAssigned() {
    
  }


  createTask() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.taskForm.reset();
    } else {
      console.log('Form is not valid!');
    }
    
    //this.firebaseService.createTask(new Task('id', 'Finish Addtask Form', 'Within the next days finish the addtask form design', 'todo', new Date(), new Date(), 'high', 'guest', new Date(), 'Design', ['guest'], []));
  }
}
