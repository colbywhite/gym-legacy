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
    const url = `${environment.apiUrl}/user/activateWorkout?name=${name}`
    return this.http.post(url, {}, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.status)
  }

  public isProgramActive(name: string): Promise<boolean> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject(false)
    }
    const url = `${environment.apiUrl}/user/info`
    return this.http.get(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.json().user_metadata.active as string[])
               .then((active) => this.containsValue(active, name))
  }

  private get authHeaders(): Headers {
    const access_token = localStorage.getItem('access_token')
    return new Headers({'Authorization': `Bearer ${access_token}`});
  }

  private containsValue(list: string[], value: string): boolean {
    if (!list || list.length == 0) {
      return false
    }
    return (list.find((el) => el === value)) ? true : false
  }
}
