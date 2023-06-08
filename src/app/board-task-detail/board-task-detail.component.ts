import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.class';
import { formatDate } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-board-task-detail',
  templateUrl: './board-task-detail.component.html',
  styleUrls: ['./board-task-detail.component.scss']
})
export class BoardTaskDetailComponent {

  tasks!: any;
  users!: any;
  @Output() toggleOverlay = new EventEmitter();
  @Input() task!: Task;

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.users.subscribe(users => {
      this.users = users;
    });
    this.firebaseService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    });
  }


  /**
   * Close the overlay via the toggleOverlay EventEmitter.
   */
  closeOverlay() {
    this.toggleOverlay.emit(false);
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
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


  formatDate(timestamp: any) {
    let date = timestamp.toDate();
    return formatDate(date, 'dd.MM.yyyy', 'en-US');
  }
}
