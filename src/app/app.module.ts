import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { SignupComponent } from './signup/signup.component';
import { SignupCardComponent } from './signup-card/signup-card.component';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';
import { ForgotPwCardComponent } from './forgot-pw-card/forgot-pw-card.component';
import { ResetPwComponent } from './reset-pw/reset-pw.component';
import { ResetPwCardComponent } from './reset-pw-card/reset-pw-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginCardComponent,
    SignupComponent,
    SignupCardComponent,
    ForgotPwComponent,
    ForgotPwCardComponent,
    ResetPwComponent,
    ResetPwCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
