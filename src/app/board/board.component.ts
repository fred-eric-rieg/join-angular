import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tasks: object = [];

  constructor(private firebaseService: FirebaseService) { }

  
  ngOnInit() {
    this.tasks = this.firebaseService.getAllTasks();
    this.renderTasks();
  }


  renderTasks() {
  }
}