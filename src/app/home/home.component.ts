import { Component } from '@angular/core';
import { AuthService} from '../shared/auth.service'

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
