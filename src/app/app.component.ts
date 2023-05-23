import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'join-angular';

  loginForm = this.fb.group({
    username: '',
    password: ''
  });

  constructor(private fb: FormBuilder) {
    
  }
}

