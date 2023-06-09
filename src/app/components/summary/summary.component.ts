import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  username: string = 'Sofia Müller';
  @ViewChild('greeting') greeting: any;
  hasGreeted: boolean = false;
  tasks!: Task;

  
  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.tasks.subscribe(tasks => {
      this.tasks = tasks;
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
}
