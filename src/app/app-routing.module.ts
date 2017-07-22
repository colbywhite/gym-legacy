import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramLibraryComponent } from './program-lib/program-lib.component';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { LoginComponent } from './auth/login.component';
import { LogoutComponent } from './auth/logout.component';
import { CallbackComponent } from './auth/callback.component';
import { HomeComponent } from './home/home.component'

const appRoutes: Routes = [
  {path: 'program/:name', component: ProgramInfoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'lib', component: ProgramLibraryComponent},
  {path: '', component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
