import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service'

@Component({
  selector: 'gl-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public isCollapsed = true
  constructor(public authService: AuthService) {}
}
