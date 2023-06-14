import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.class';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent {

  type: string = '';
  user: User = new User(
    'id',
    'firstName',
    'lastName',
    'email',
    0,
    new Date(),
    new Date(),
    this.returnRandomColor()
  );

  contactForm!: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.route.params.subscribe(params => {
      this.type = params['id'];
    });
    this.contactForm.valueChanges.subscribe(console.log);
  }


  createFormGroup() {
    this.contactForm = this.formBuilder.group({
      id: new FormControl('id'),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }


  createUser() {
    if (this.contactForm.valid) {
      this.separateName();
      this.addEmailPhone();
      this.firebaseService.createUser(this.user);
      this.router.navigate(['contacts']);
    } else {
      alert('All fields are required! Please fill them.');
    }
  }


  returnRandomColor() {
    const colors = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
      '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#dce775',
      '#fff176', '#ffd54f', '#ffb74d', '#ff8a65'];
    return colors[Math.floor(Math.random() * colors.length)];
  }


  separateName() {
    this.contactForm.value.name = this.contactForm.value.name.trim();
    this.user.firstName = this.contactForm.value.name.split(' ')[0];
    this.user.lastName = this.contactForm.value.name.split(' ')[1];
  }


  addEmailPhone() {
    this.user.email = this.contactForm.value.email;
    this.user.phone = this.contactForm.value.phone;
  }
}
