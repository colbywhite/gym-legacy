import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service'

@Component({
  template: `
    <gl-header></gl-header>
    <div class="card card-inverse card-success text-xs-center">
      <div class="card-block">
        <blockquote class="card-blockquote">
          <p>You've successfully been logged out.</p>
          <footer>Feel free to <a routerLink="/login">log back in.</a></footer>
        </blockquote>
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
