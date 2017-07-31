import { TestBed, inject } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { HeaderComponent } from './header.component';
import { AuthService} from '../auth.service'
import { MockAuthService} from '../mock-auth.service'
import { AppModule } from '../../app.module';


describe('HeaderComponent', () => {
  let fixture
  let component
  let element

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .createComponent(HeaderComponent)
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement
  })

  it('should compile', () => {
    expect(component).toBeTruthy();
  })

  describe('when logged in', () => {
    it('should display log out out link first in navbar', inject([AuthService], (authService: AuthService) => {
      authService.login()
      fixture.detectChanges()
      expect(element.querySelector('ul li').textContent.trim()).toBe('Log Out');
    }))
  })

  describe('when logged out', () => {
    it('should display log in link first in navbar', inject([AuthService], (authService: AuthService) => {
      authService.logout()
      fixture.detectChanges()
      expect(element.querySelector('ul li').textContent.trim()).toBe('Log In');
    }))
  })
})
