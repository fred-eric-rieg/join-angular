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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-pw', component: ForgotPwComponent },
  { path: 'reset-pw', component: ResetPwComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'board', component: BoardComponent },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'helpinfo', component: HelpinfoComponent },
  { path: 'contact-form/:id', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
