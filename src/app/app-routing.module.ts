import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';
import { ResetPwComponent } from './reset-pw/reset-pw.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-pw', component: ForgotPwComponent },
  { path: 'reset-pw', component: ResetPwComponent },
  { path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
