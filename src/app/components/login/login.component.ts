import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AngularFireAuth
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
    localStorage.clear();
  }


  async login(email: string, password: string) {
    return await this.authService.signInWithEmailAndPassword(email, password).then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('hasGreeted', 'false');
      window.location.href = '/summary';
    }).catch((error) => {
      alert(error.message);
    });
  }
}
