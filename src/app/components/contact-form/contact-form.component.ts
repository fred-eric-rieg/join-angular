import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  displayedUser: any;

  constructor(private route: ActivatedRoute, private router: Router, private firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.getContact(id!);
    });
  }


  getContact(id: string) {
    this.displayedUser = this.firebaseService.users.subscribe(users => {
      users.forEach((user: any) => {
        user.userId === id ? this.displayedUser = user : null;
      });
    });
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
