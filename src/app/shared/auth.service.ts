import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  // TODO: use config vars for clientID/redirectUri
  auth0 = new auth0.WebAuth({
    clientID: '',
    domain: 'gym-legacy.auth0.com',
    responseType: 'token id_token',
    audience: 'https://gym-legacy.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  profile: any

  constructor() {}

  public login(): void {
    this.auth0.authorize();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb: (err: any, profile: any) => void): void {
    if(!this.isAuthenticated()){
      throw new Error('Not logged in');
    }
    if(this.profile) {
      cb({}, this.profile)
    }
    const accessToken = localStorage.getItem('access_token');
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if(profile) {
        this.profile = profile
      }
      cb(err, profile)
    });
  }
}
