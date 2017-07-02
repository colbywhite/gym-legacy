import { Component } from '@angular/core';
// TODO I'd much rather to import { programs } from 'weight-program-schema'
import * as stronglifts from 'weight-program-schema/lib/stronglifts.json'
import * as candito_squat from 'weight-program-schema/lib/candito_squat.json'

@Component({
  selector: 'gl-program-lib',
  templateUrl: './program-lib.component.html',
  styleUrls: ['./program-lib.component.css']
})
export class ProgramLibraryComponent {
  public programs: any[] = [stronglifts, candito_squat]


}
