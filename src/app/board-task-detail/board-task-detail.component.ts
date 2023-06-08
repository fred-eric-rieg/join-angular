import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.class';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-board-task-detail',
  templateUrl: './board-task-detail.component.html',
  styleUrls: ['./board-task-detail.component.scss']
})
export class BoardTaskDetailComponent {

  @Output() toggleOverlay = new EventEmitter();
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    status: '',
    creationDate: new Date(),
    lastUpdated: new Date(),
    priority: '',
    creatorId: '',
    dueDate: new Date(),
    category: [],
    assignedTo: [],
    subtasks: [],
    toJSON: function (): { id: string; title: string; description: string; status: string; creationDate: Date; lastUpdated: Date; priority: string; creatorId: string; dueDate: Date; category: string[]; assignedTo: string[]; subtasks: object[]; } {
      throw new Error('Function not implemented.');
    }
  };

  constructor() {}


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
