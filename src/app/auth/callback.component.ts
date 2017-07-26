import { Component, OnInit } from '@angular/core';
import { AuthService} from '../shared/auth.service'
import { Router } from '@angular/router';

@Component({
  template: '<i class="fa fa-spinner" aria-hidden="true"></i>'
})
export class CallbackComponent implements OnInit {
  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.authService.handleAuthentication()
    // TODO Figure out why this is needed. It shouldn't be.
    setTimeout(() => {
      this.authService.getProfile((err, profile) => {})
      this.router.navigate(['/'])
    }, 1000)
  }
}
