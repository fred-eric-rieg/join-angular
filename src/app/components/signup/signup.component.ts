import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form!: FormGroup;
  // loading boolean for the signup button: prevents user from clicking multiple times
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AngularFireAuth,
    private router: Router
    ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordRepeat: ['', []]
    });
  }


  async signup() {
    if (this.passwordMatch()) {
      this.loading = true;
      this.authService.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password).then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('hasGreeted', 'false');
        this.router.navigate(['/summary']);
      }).catch((error) => {
        alert(error.message);
      });
    } else {
      alert('Passwords do not match!');
    }
    this.loading = false;
  }


  passwordMatch() {
    if (this.form.value.password === this.form.value.passwordRepeat) {
      return true;
    } else {
      return false;
    }
  }
}
