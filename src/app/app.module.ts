import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProgramLibraryComponent } from './program-lib/program-lib.component';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { ProgramService } from './shared/program.service';
import { RestDayComponent } from './shared/rest-day.component'
import { WorkoutDayComponent } from './shared/workout-day.component'

@NgModule({
  declarations: [AppComponent, RestDayComponent, ProgramLibraryComponent, ProgramInfoComponent, WorkoutDayComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NgbModule.forRoot(), AppRoutingModule],
  providers: [ProgramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
