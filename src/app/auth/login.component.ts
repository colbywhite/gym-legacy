import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service'
import { Router } from '@angular/router';

@Component({
  template: '<i class="fa fa-spinner" aria-hidden="true"></i>'
})
export class LoginComponent implements OnInit{
  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.authService.logout()
    this.authService.login()
  }
}
