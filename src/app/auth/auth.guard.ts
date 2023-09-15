import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    const user = await this.afAuth.currentUser;
    let check = JSON.parse(localStorage.getItem('token') || '');
    const isLoggedIn = user?.refreshToken == check ? true : false;
    if (!isLoggedIn) {
      console.log('Access denied');
      this.router.navigate(['']);
    }
    return isLoggedIn;
  }
}