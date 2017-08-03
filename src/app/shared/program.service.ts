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

  constructor(private http: Http, private authService: AuthService) {}

  public get standards(): any[] {
    return [stronglifts, candito_squat]
  }

  public getActivePrograms(): Promise<any[]> {
    if(this._activePrograms) {
      return Promise.resolve(this._activePrograms)
    }
    if(!this.authService.isAuthenticated()) {
      return Promise.reject('Not logged in')
    }
    const url = `${environment.apiUrl}/user/programs`
    return this.http.get(url, {headers: this.authHeaders})
               .toPromise()
               .then((response) => response.json() as any[])
               .then((programs) => {
                 this._activePrograms = programs
                 return this._activePrograms
               })
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
    }
    return status
  }

  public isProgramActive(name: string): Promise<boolean> {
    return this.getActivePrograms()
               .then((programs) => programs.find((p) => p.name === name))
               .then((program) => program !== undefined)
  }

  private get authHeaders(): Headers {
    const access_token = localStorage.getItem('access_token')
    return new Headers({'Authorization': `Bearer ${access_token}`});
  }
}
