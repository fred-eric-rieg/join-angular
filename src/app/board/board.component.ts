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
}