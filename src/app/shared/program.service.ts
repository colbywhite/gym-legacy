///<reference path="../typings/json-typings.d.ts" />

import { Injectable } from '@angular/core';

import * as stronglifts from 'weight-program-schema/lib/stronglifts.json'
import * as candito_squat from 'weight-program-schema/lib/candito_squat.json'

@Injectable()
export class ProgramService {

  public get standards() : any[] {
    return [stronglifts, candito_squat]
  }
}
