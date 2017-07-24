import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service'

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  profile: any
  constructor(public authService: AuthService) {}

  ngOnInit() {
    if(this.authService.isAuthenticated() && !this.profile) {
      this.authService.getProfile((err, profile) => this.profile = profile)
    }
  }
}
