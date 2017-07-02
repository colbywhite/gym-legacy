import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ProgramLibraryComponent } from './program-lib.component';

@NgModule({
  declarations: [ProgramLibraryComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [ProgramLibraryComponent]
})
export class AppModule { }
