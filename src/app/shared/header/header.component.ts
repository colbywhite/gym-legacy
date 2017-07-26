import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service'

@Component({
  selector: 'gl-header',
  styleUrls: ['./header.component.css'],
  template: `
    <nav class="navbar navbar-inverse bg-inverse">
      <button
        *ngIf="authService.isAuthenticated()"
        class="btn btn-secondary btn-small navbar-toggler-right"
        type="button"
        routerLink="/logout">
        Log Out
      </button>
      <button
        *ngIf="!authService.isAuthenticated()"
        class="btn btn-secondary btn-small navbar-toggler-right"
        type="button"
        routerLink="/login">
        Log In
      </button>
      <a class="navbar-brand" routerLink="/">
        Gym Legacy
        <small class="text-muted">beta</small>
      </a>
    </nav>
  `
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
}
