import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent} from './components/signup/signup.component';
import { ForgotPwComponent } from './components/forgot-pw/forgot-pw.component';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { SummaryComponent } from './components/summary/summary.component';
import { BoardComponent } from './components/board/board.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LegalComponent } from './components/legal/legal.component';
import { HelpinfoComponent } from './components/helpinfo/helpinfo.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-pw', component: ForgotPwComponent },
  { path: 'reset-pw', component: ResetPwComponent },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'addtask', component: AddtaskComponent, canActivate: [AuthGuard] },
  { path: 'addtask/:id', component: AddtaskComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'legal', component: LegalComponent, canActivate: [AuthGuard] },
  { path: 'helpinfo', component: HelpinfoComponent, canActivate: [AuthGuard] },
  { path: 'contact-form/:id', component: ContactFormComponent, canActivate: [AuthGuard] },
  { path: 'contact-add/:id', component: ContactAddComponent, canActivate: [AuthGuard] },
  { path: 'contact-add/edit/:id', component: ContactAddComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
