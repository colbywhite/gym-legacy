import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProgramLibraryComponent } from './program-lib.component';
import { ProgramInfoComponent } from './program-info.component';

@NgModule({
  declarations: [AppComponent, ProgramLibraryComponent, ProgramInfoComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
