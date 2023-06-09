import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { Task } from '../../models/task.class';

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

  subtasks: any = [];
  subtask: string = '';

  categories: any = [];
  users: any = [];

  taskForm!: FormGroup;

  constructor(private datePipe: DatePipe, private firebaseService: FirebaseService, private formBuilder: FormBuilder) {
    this.today = this.formatToday(new Date());
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
    this.firebaseService.categories.subscribe(categories => {
      categories.forEach((category: any) => {
        this.categories.push(category);
      });
    });
    this.firebaseService.users.subscribe(users => {
      users.forEach((user: any) => {
        this.users.push(user);
      });
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
    if (this.expandedCategory) {
      this.expandedCategory = false;
    } else {
      this.expandedCategory = true;
    }
  }


  expandAssigned() {
    if (this.expandedAssigned) {
      this.expandedAssigned = false;
    } else {
      this.expandedAssigned = true;
    }
  }


  addSubtask() {
    if (this.subtask) {
      this.subtasks.push({ description: this.subtask, status: 0 });
      this.taskForm.patchValue({ subtasks: this.subtasks });
      this.subtask = '';
    }
  }


  toggleSubtaskStatus(index: number) {
    this.subtasks[index].status === 0 ? this.subtasks[index].status = 1 : this.subtasks[index].status = 0;
    this.taskForm.patchValue({ subtasks: this.subtasks });
  }


  createTask() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);

    } else {
      alert('All fields (except subtasks) are required! Please fill them.');
    }

    //this.firebaseService.createTask(new Task('id', 'Finish Addtask Form', 'Within the next days finish the addtask form design.', 'todo', new Date(), new Date(), 'high', 'guest', new Date(), ['Design', 'red'], [{ id: 'guest', name: 'guest', color: 'pink' }], [{ description: 'Make creating tasks work', status: 0 }]));
    //this.firebaseService.createTask(new Task('id', 'Create Marketing Strategy', 'We need a strategy to promote our product within our target audience.', 'todo', new Date(), new Date(), 'high', 'guest', new Date(), ['Marketing', 'orange'], [{ id: 'guest', name: 'guest', color: 'pink' }], [{ description: 'Write a user story', status: 0 }, { description: 'Create a marketing plan', status: 0 }]));
  }
}
