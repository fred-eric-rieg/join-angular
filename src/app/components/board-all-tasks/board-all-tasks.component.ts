import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-board-all-tasks',
  templateUrl: './board-all-tasks.component.html',
  styleUrls: ['./board-all-tasks.component.scss']
})
export class BoardAllTasksComponent {

  tasks!: any;
  users!: any;
  @Output() toggleOverlay = new EventEmitter();
  @Output() task = new EventEmitter();

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.users.subscribe(users => {
      this.users = users;
    });
    this.firebaseService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  /**
   * Toggles the overlay and shows the task details.
   * @param id as string
   */
  showTaskDetails(id: string) {
    this.toggleOverlay.emit(true);
    this.task.emit(this.returnTaskById(id));
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
