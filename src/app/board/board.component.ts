import { Component, Output } from '@angular/core';
import { Task } from '../models/task.class';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  // Transfers task data from the board-all-tasks component to the board-task-detail component.
  @Output() task!: Task;
  toggleOverlay: boolean = false;

  constructor() {
    
  }

  /**
   * Reads the event from the board-task-detail component and sets the toggleOverlay variable.
   * @param $event as boolean
   */
  readEvent($event: boolean) {
    this.toggleOverlay = $event;
  }


  readTaskEvent($event: Task) {
    this.task = $event;
  }
}