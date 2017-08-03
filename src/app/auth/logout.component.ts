import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service'

@Component({
  template: `
    <gl-header></gl-header>
    <div class="card card-inverse card-success text-xs-center">
      <div class="card-block">
        <p class="card-text">
          You've successfully been logged out.
        </p>
        <p class="card-text">
          Feel free to <a routerLink="/login">log back in</a>.
        </p>
      </div>
    </div>
  `
})
export class LogoutComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.logout()
  }
}
