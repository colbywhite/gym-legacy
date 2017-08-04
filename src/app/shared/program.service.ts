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
  private _activePrograms: any[] = undefined
  private _activeProgramsPromise: Promise<any[]> = undefined

  constructor(private http: Http, private authService: AuthService) {}

  public get standards(): any[] {
    return [stronglifts, candito_squat]
  }

  public getActivePrograms(): Promise<any[]> {
    if(this._activeProgramsPromise) {
      return this._activeProgramsPromise
    }
    if(this._activePrograms) {
      return Promise.resolve(this._activePrograms)
    }
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/programs`
    this._activeProgramsPromise = this.http.get(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.json() as any[])
               .then((programs) => {
                 this._activePrograms = programs
                 return this._activePrograms
               })
    return this._activeProgramsPromise
  }

  public getProgram(name:string): Promise<any> {
    return this.getActivePrograms()
      .then((programs) => programs.find((p) => p.name===name))
  }

  public activateProgram(program: any): Promise<number> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/program`
    return this.http.post(url, program, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.status)
               .then(this.clearCacheIfSuccess.bind(this))
  }

  public deactivateProgram(name: string): Promise<number> {
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/program/${name}`
    return this.http.delete(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.status)
               .then(this.clearCacheIfSuccess.bind(this))
  }

  private clearCacheIfSuccess(status: number): number {
    if(status===200) {
      this._activePrograms = undefined
      this._activeProgramsPromise = undefined
    }
    return status
  }

  private get authHeaders(): Headers {
    const access_token = localStorage.getItem('access_token')
    return new Headers({'Authorization': `Bearer ${access_token}`});
  }
}
