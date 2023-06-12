import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  users!: any[];
  firstLetters: string[] = [];


  constructor(private firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.firebaseService.users.subscribe(users => {
      this.users = users;
      this.listSortedFirstLetters();
    });
  }

  /**
   * Lists all the first letters of the users' first names in alphabetical order
   * and stores them in the firstLetters array.
   */
  listSortedFirstLetters() {
    this.users.forEach(user => {
      this.firstLetters.push(this.returnFirstLetter(user.firstName));
    });
    this.firstLetters.sort();
  }


  returnFirstLetter(name: string) {
    let cleanName = name.trim().toUpperCase();
    if (cleanName.includes(' ')) {
      return cleanName.charAt(0) + cleanName.charAt(cleanName.indexOf(' ') + 1);
    } else {
      return cleanName.charAt(0);
    }
  }
}