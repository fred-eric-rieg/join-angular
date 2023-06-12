import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  users!: any[];


  constructor(private firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.firebaseService.users.subscribe(users => {
      this.users = users;
    });
  }

}
