///<reference path="../typings/json-typings.d.ts" />

import { ProgramService } from './program.service'
import * as stronglifts from './programs/stronglifts.json'
import * as candito_squat from './programs/candito_squat.json'

export class MockProgramService extends ProgramService {
  private _stronglifts: any
  private _candito: any

  constructor() {
    super(null, null)
    this._stronglifts = stronglifts
    this._stronglifts.start_date = new Date().toString()
    this._candito = candito_squat
    this._candito.start_date = new Date().toString()
  }

  public getProgram(name:string): Promise<any> {
    if(name===this._stronglifts.name) {
      return Promise.resolve(this._stronglifts)
    }
    else {
      return Promise.resolve(this._candito)
    }
  }

  public getActivePrograms(): Promise<any[]> {
    return Promise.resolve([this._stronglifts, this._candito])
  }
}
