///<reference path="../typings/json-typings.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import * as stronglifts from './programs/stronglifts.json'
import * as candito_squat from './programs/candito_squat.json'
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ProgramService {
  constructor(private http: Http, private authService: AuthService) {}

  public get standards() : any[] {
    return [stronglifts, candito_squat]
  }

  public getProgram(name:string) {
    return this.standards.find((p) => p.name==name)
  }

  public activateProgram(name: string): Promise<number> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const access_token = localStorage.getItem('access_token')
    const headers = new Headers({'Authorization': `Bearer ${access_token}`});
    const url = `${environment.apiUrl}/user/activateWorkout?name=${name}`
    return this.http.post(url, {}, {headers: headers})
               .toPromise()
               .then((response) => response.status)
  }
}
