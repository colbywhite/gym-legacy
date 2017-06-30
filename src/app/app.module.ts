import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ProgramListComponent } from './program-list.component';

@NgModule({
  declarations: [ProgramListComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [ProgramListComponent]
})
export class AppModule { }
