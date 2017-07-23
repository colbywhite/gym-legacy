import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ProgramLibraryComponent } from './program-lib/program-lib.component';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { ProgramService } from './shared/program.service';
import { RestDayComponent } from './shared/rest-day.component'
import { WorkoutDayComponent } from './shared/workout-day.component'
import { HomeComponent } from './home/home.component'
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProgramLibraryComponent,
    ProgramInfoComponent,
    RestDayComponent,
    WorkoutDayComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    SharedModule,
    AppRoutingModule
  ],
  providers: [ProgramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
