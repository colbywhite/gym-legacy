import { AuthService } from './auth.service'

export class MockAuthService extends AuthService {
  loggedin: boolean

  constructor() {
    super()
    this.loggedin = false
  }

  public login(): void {
    this.loggedin = true
  }

  public logout(): void {
    this.loggedin = false
  }

  public handleAuthentication(): void {}

  public isAuthenticated(): boolean {
    return this.loggedin
  }
}
