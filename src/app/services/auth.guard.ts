import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AngularFireAuth,
    private router: Router
    ) { }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      console.log('Checking if user is logged in...');

      const user = await this.authService.currentUser;
      const isLoggedIn = !!user;  // !! converts to boolean "double bang"

      if (!isLoggedIn) {
        this.router.navigate(['']);
        console.log('User is not logged in!');
      }

      return isLoggedIn;
  }

}
