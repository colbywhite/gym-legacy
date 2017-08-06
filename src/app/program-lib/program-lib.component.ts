import { Component, OnInit } from '@angular/core';
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
  }

  ngOnInit() {
    this.programService.getPrograms()
      .then((programs) => this.programs = programs)
  }

  public showProgram(program: any) {
    if(program.start_date) {
      this.router.navigate(['/schedule', program.name])
    } else {
      this.router.navigate(['/program', program.name])
    }
  }
}
