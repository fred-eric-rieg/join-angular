import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Task } from 'src/app/models/task.class';
import { User } from 'src/app/models/user.class';
import { Subscription } from 'rxjs';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-all-tasks',
  templateUrl: './board-all-tasks.component.html',
  styleUrls: ['./board-all-tasks.component.scss']
})
export class BoardAllTasksComponent implements OnDestroy {

  tasks!: Task[];
  todoTasks!: Task[];
  inProgressTasks!: Task[];
  feedbackTasks!: Task[];
  doneTasks!: Task[];

  users!: User[];
  @Output() toggleOverlay = new EventEmitter();
  @Output() task = new EventEmitter();
  search: string = '';

  taskSubscription: Subscription;
  userSubscription: Subscription;


  constructor(private firebaseService: FirebaseService) {
    this.userSubscription = this.firebaseService.users.subscribe(users => {
      this.users = users;
    });
    this.taskSubscription = this.firebaseService.tasks.subscribe(tasks => {
      this.tasks = tasks;
      this.filterTaskStatus();
    });
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }


  filterTaskStatus() {
    this.todoTasks = this.tasks.filter(task => task.status === 'todo');
    this.inProgressTasks = this.tasks.filter(task => task.status === 'progress');
    this.feedbackTasks = this.tasks.filter(task => task.status === 'feedback');
    this.doneTasks = this.tasks.filter(task => task.status === 'done');
  }

  /**
   * Handles the drop event when a task is dropped into another column (same column has no effect).
   * Each drop container has an id which is the same as the task status that is to be updated.
   * The task status is updated in Firestore and the tasks are reloaded.
   * @param $event as CdkDragDrop<Task[]>
   */
  drop($event: CdkDragDrop<Task[]>) {
    if($event.previousContainer != $event.container) {
      let task: Task = $event.previousContainer.data[$event.previousIndex];
      task.status = $event.container.id;
      this.firebaseService.updateTask(task);
      this.firebaseService.getAllTasks();
    }
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
    let task!: Task;
    this.tasks.forEach((t: Task) => {
      if (t.id === id) {
        task = t;
      }
    });
    return task;
  }


  countDoneSubtasks(subtasks: Array<object>) {
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

  /**
   * Filters the tasks according to the search input. Only title and description are filtered.
   */
  filterTasksSearch() {
    this.taskSubscription.unsubscribe(); // unsubscribe to prevent subscription overlap with filter
    if (this.search != '') {
      this.tasks = this.tasks.filter(task => {
        return task.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()) || task.description.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
      });
    } else {
      this.taskSubscription = this.firebaseService.tasks.subscribe(tasks => {
        this.tasks = tasks;
      });
    }
  }
}
