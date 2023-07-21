import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Task } from 'src/app/models/task.class';
import { Timestamp } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  username: string = 'Guest';
  @ViewChild('greeting') greeting: any;
  hasGreeted: boolean = false;
  tasks: Array<Task> = [];


  constructor(private firebaseService: FirebaseService, public auth: AngularFireAuth) {
    this.firebaseService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    });
    this.auth.user.subscribe(user => {
      if (user) {
        this.username = user.email ? user.email.split('@')[0] : 'Guest';
      }
    });
  }


  ngOnInit() {
    this.getLocalStorage();
    if (!this.hasGreeted) {
      this.fadeOutGreeting();
    }
  }

  /**
   * Fades out greeting after 3 seconds and saves the hasGreeted boolean into localStorage.
   * This way, the greeting will not be shown again. Only after user logs out, then hasGreeted will
   * be reset to "false".
   */
  fadeOutGreeting() {
    setTimeout(() => {
      this.hasGreeted = true;
      this.setLocalStorage();
      this.greeting.nativeElement.style.transition = 'all 1s ease-out';
      this.greeting.nativeElement.style.opacity = 0;
      this.greeting.nativeElement.style.zIndex = -1;
    }, 3000);
  }

  /**
   * Saving the hasGreeted boolean in the localStorage.
   */
  setLocalStorage() {
    localStorage.setItem('hasGreeted', this.hasGreeted.toString());
  }

  /**
   * Loading the hasGreeted boolean from the localStorage.
   */
  getLocalStorage() {
    if (localStorage.getItem('hasGreeted')) {
      this.hasGreeted = localStorage.getItem('hasGreeted') === 'true' ? true : false;
    } else {
      this.hasGreeted = false;
    }
  }


  countTasks() {
    return this.tasks.length;
  }

  /**
   * Searching and counting tasks depending on their type.
   * The priority type is handled seperately (type === high).
   * @param type as string
   * @returns a number of counted tasks
   */
  countSpecificTasks(type: string) {
    let counter = 0;
    if (type === 'high') {
      this.tasks.forEach(task => {
        task.priority === type ? counter++ : null;
      });
    } else {
      this.tasks.forEach(task => {
        task.status === type ? counter++ : null;
      });
    }
    return counter;
  }

  /**
   * Searches all tasks with priority "high" for a "dueDate" that is
   * closest to today's date.
   * @returns a string representing a date
   */
  calculateMostUrgentDeadline() {
    if (this.tasks.length > 0) {
      return this.mostUrgentDueDate();
    } else {
      return 'No urgent'
    }
  }


  mostUrgentDueDate() {
    let urgentDueDate: Timestamp = new Timestamp(0, 0);
    let today = new Date().getTime() / 1000;
    this.tasks.forEach(task => {
      if (task.priority === 'high' && task.dueDate.seconds > today) {
        if (urgentDueDate.seconds > 0) {
          // If an dueDate has already been copied, then check if the next dueDate is younger ( e.g. even closer to today's date).
          task.dueDate.seconds < urgentDueDate.seconds ? urgentDueDate = task.dueDate : null;
        } else {
          // The first dueDate that is situated in the future (greater than today) is copied into urgentDueDate.
          urgentDueDate = task.dueDate;
        }
      }
    });
    if (urgentDueDate.seconds === 0) {
      return 'No urgent';
    } else {
      return formatDate(urgentDueDate.toDate(), 'dd.MM.yyyy', 'en-US');
    }
  }
}
