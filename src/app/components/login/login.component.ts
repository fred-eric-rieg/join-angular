import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  // loading boolean for the signup button: prevents user from clicking multiple times
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AngularFireAuth,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
    localStorage.clear();
  }


  async login(email: string, password: string) {
    this.loading = true;
    return await this.authService.signInWithEmailAndPassword(email, password).then((user) => {
      localStorage.setItem('token', JSON.stringify(user.user?.refreshToken));
      localStorage.setItem('hasGreeted', 'false');
      this.loading = false;
      this.router.navigate(['/summary']);
    }).catch((error) => {
      alert(error.message);
      this.loading = false;
    });
  }
}
