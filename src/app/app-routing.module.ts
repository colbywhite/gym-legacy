import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramLibraryComponent } from './program-lib.component';
import { ProgramInfoComponent } from './program-info.component';

const appRoutes: Routes = [
  {path: 'program', component: ProgramInfoComponent},
  {path: 'lib', component: ProgramLibraryComponent},
  { path: '', redirectTo: 'lib', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
