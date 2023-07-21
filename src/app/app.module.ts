import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPwComponent } from './components/forgot-pw/forgot-pw.component';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { SummaryComponent } from './components/summary/summary.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoardComponent } from './components/board/board.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LegalComponent } from './components/legal/legal.component';
import { HelpinfoComponent } from './components/helpinfo/helpinfo.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { BoardTaskDetailComponent } from './components/board-task-detail/board-task-detail.component';
import { BoardAllTasksComponent } from './components/board-all-tasks/board-all-tasks.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';

// Firebase 
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat'; // for compat version required by AngularFireAuth

// Directives
import { GoogleSigninDirective } from './directives/google-signin.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPwComponent,
    ResetPwComponent,
    SummaryComponent,
    HeaderComponent,
    FooterComponent,
    BoardComponent,
    AddtaskComponent,
    ContactsComponent,
    LegalComponent,
    HelpinfoComponent,
    ContactFormComponent,
    BoardTaskDetailComponent,
    BoardAllTasksComponent,
    ContactAddComponent,
    GoogleSigninDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, // for compat version required by AngularFireAuth
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
