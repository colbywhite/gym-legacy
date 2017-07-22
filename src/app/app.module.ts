import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { LogoutComponent } from './auth/logout.component';
import { CallbackComponent } from './auth/callback.component';
import { ProgramLibraryComponent } from './program-lib/program-lib.component';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { ProgramService } from './shared/program.service';
import { AuthService } from './shared/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { RestDayComponent } from './shared/rest-day.component'
import { WorkoutDayComponent } from './shared/workout-day.component'
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    ProgramLibraryComponent,
    ProgramInfoComponent,
    RestDayComponent,
    WorkoutDayComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, NgbModule.forRoot(), AppRoutingModule],
  providers: [AuthService, ProgramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
