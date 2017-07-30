///<reference path="../typings/json-typings.d.ts" />

import { Injectable } from '@angular/core';

import * as stronglifts from './programs/stronglifts.json'
import * as candito_squat from './programs/candito_squat.json'

@Injectable()
export class ProgramService {
  public get standards() : any[] {
    return [stronglifts, candito_squat]
  }

  public getProgram(name:string) {
    return this.standards.find((p) => p.name==name)
  }

  public activateProgram(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(name)
      }, 5000)
    })
  }
}
