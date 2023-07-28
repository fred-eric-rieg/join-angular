import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.class';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {

  displayedUser: any;

  // Subscription
  paramsSub!: Subscription;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.paramsSub = this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.getContact(id!);
    });
  }


  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


  getContact(id: string) {
    this.displayedUser = this.firebaseService.users.subscribe((users: User[]) => {
      users.forEach((user: User) => {
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
