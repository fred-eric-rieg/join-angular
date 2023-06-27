import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.class';
import { formatDate } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-board-task-detail',
  templateUrl: './board-task-detail.component.html',
  styleUrls: ['./board-task-detail.component.scss']
})
export class BoardTaskDetailComponent {

  tasks!: Task[];
  users!: User[];
  @Output() toggleOverlay = new EventEmitter();
  @Input() task!: Task;
  toggleStatus = false;
  toggleDeletable = false;

  constructor(private firebaseService: FirebaseService, private router: Router) {
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

  /**
   * Format the date to a readable format, if it is a timestamp.
   * @param timestamp as any
   * @returns formatted date as string
   */
  formatDate(timestamp: any) {
    if (typeof timestamp === 'object') {
      let date = timestamp.toDate();
      return formatDate(date, 'dd.MM.yyyy', 'en-US');
    }
    return timestamp;
  }


  deleteTask(id: string) {
    this.firebaseService.deleteTask(id);
    this.toggleOverlay.emit(false);
    this.toggleDeletable = false;
  }


  toggleDelete() {
    this.toggleDeletable === false ? this.toggleDeletable = true : this.toggleDeletable = false;
  }


  editTask(id: string) {
    this.router.navigate([`/addtask/${id}`]);
  }


  openStatusSelection() {
    this.toggleStatus = !this.toggleStatus;
  }


  changeStatus(task: Task, status: string) {
    task.status = status;
    this.firebaseService.updateTask(task);
    this.toggleStatus = false;
  }
}
