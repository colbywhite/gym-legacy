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
  private _programs: any[] = undefined
  private _programsPromise: Promise<any[]> = undefined

  constructor(private http: Http, private authService: AuthService) {}

  public getPrograms(): Promise<any[]> {
    if(this._programsPromise) {
      return this._programsPromise
    }
    if(this._programs) {
      return Promise.resolve(this._programs)
    }
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/programs`
    this._programsPromise = this.http.get(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.json() as any[])
               .then((programs) => {
                 this._programs = programs
                 return this._programs
               })
    return this._programsPromise
  }

  public getProgram(name:string): Promise<any> {
    return this.getPrograms()
      .then((programs) => programs.find((p) => p.name===name))
  }

  public startProgram(name: string, schedule: any): Promise<number> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/schedule/${name}`
    return this.http.post(url, schedule, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.status)
               .then(this.clearCacheIfSuccess.bind(this))
  }

  public stopProgram(name: string): Promise<number> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/schedule/${name}`
    return this.http.delete(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.status)
               .then(this.clearCacheIfSuccess.bind(this))
  }

  public getSchedule(name: string): Promise<any> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/schedule/${name}`
    return this.http.get(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.json() as any)
  }
  private clearCacheIfSuccess(status: number): number {
    if(status===200) {
      this._programs = undefined
      this._programsPromise = undefined
    }
    return status
  }

  private get authHeaders(): Headers {
    const access_token = localStorage.getItem('access_token')
    return new Headers({'Authorization': `Bearer ${access_token}`});
  }
}
