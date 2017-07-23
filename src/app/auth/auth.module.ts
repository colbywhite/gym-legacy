import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { CallbackComponent } from './callback.component';
import { AuthService } from '../shared/auth.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CallbackComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    SharedModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
