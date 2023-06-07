import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tasks!: any;
  users!: any;

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.users.subscribe(users => {
      this.users = users;
    });
    this.firebaseService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  
  ngOnInit() {
    this.renderTasks();
  }


  renderTasks() {
  }


  showUsers() {
    console.log(this.users);
    console.log(this.tasks);
  }


  countDoneSubtasks(subtasks: any) {
    let doneSubtasks: number = 0;
    subtasks.forEach((subtask: any) => {
      if (subtask.status === 1) {
        doneSubtasks++;
      }
    });
    return doneSubtasks;
  }


  returnWidth(subtasks: any) {
    return `width: ` + this.countDoneSubtasks(subtasks)/subtasks.length * 100 + '%';
  }
}