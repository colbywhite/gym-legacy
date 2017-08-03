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

  public get standards(): any[] {
    return [stronglifts, candito_squat]
  }

  public getActiveProgramNames(): Promise<string[]> {
    return this.getUserInfo()
      .then((info) => info.user_metadata.active as string[])
  }

  public getActivePrograms(): Promise<any[]> {
    return this.getActiveProgramNames()
      .then((active) => active.map(this.getProgram.bind(this)))
  }

  public getUserInfo(): Promise<any> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/info`
    return this.http.get(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.json() as any)
  }

  public getProgram(name:string): any {
    return this.standards.find((p) => p.name==name)
  }

  public activateProgram(name: string): Promise<number> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const program = this.getProgram(name)
    const url = `${environment.apiUrl}/user/program`
    return this.http.post(url, program, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.status)
  }

  public deactivateProgram(name: string): Promise<number> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/program/${name}`
    return this.http.delete(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.status)
  }

  public isProgramActive(name: string): Promise<boolean> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject(false)
    }
    return this.getActiveProgramNames()
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
