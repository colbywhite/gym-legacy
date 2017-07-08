import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramService } from '../shared/program.service'

@Component({
  selector: 'gl-program-lib',
  templateUrl: './program-lib.component.html',
  styleUrls: ['./program-lib.component.css']
})
export class ProgramLibraryComponent {
  public programs: any[]

  constructor(private router: Router, private programService: ProgramService) {
    this.programs = programService.standards
  }

  public showProgram(program: any) {
    this.router.navigate(['/program', program])
  }
}
