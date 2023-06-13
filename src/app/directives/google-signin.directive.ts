import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  @HostListener('click')
  onclick() {
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['/summary']);
    });
  }
}
