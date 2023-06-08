import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tasks!: any;
  users!: any;
  toggleOverlay: boolean = false;
  task: any = {};

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.users.subscribe(users => {
      this.users = users;
    });
    this.firebaseService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    });
  }


  ngOnInit() {

  }

  /**
   * Toggles the overlay and shows the task details.
   * @param id as string
   */
  showTaskDetails(id: string) {
    this.toggleOverlay ? this.toggleOverlay = false : this.toggleOverlay = true;
    this.task = this.returnTaskById(id);
  }


  returnTaskById(id: string) {
    let task: any = {};
    this.tasks.forEach((t: any) => {
      if (t.id === id) {
        task = t;
        console.log(task);
      }
    });
    return task;
  }

  /**
   * Reads the event from the board-task-detail component and sets the toggleOverlay variable.
   * @param $event as boolean
   */
  readEvent($event: boolean) {
    this.toggleOverlay = $event;
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


  returnProgressWidth(subtasks: any) {
    return `width: ` + this.countDoneSubtasks(subtasks) / subtasks.length * 100 + '%';
  }


  returnFirstLetter(name: string) {
    let cleanName = name.trim().toUpperCase();
    if (cleanName.includes(' ')) {
      return cleanName.charAt(0) + cleanName.charAt(cleanName.indexOf(' ') + 1);
    } else {
      return cleanName.charAt(0);
    }
  }


  returnUserColor(color: string) {
    return `background: ${color}`;
  }
}