import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../shared/program.service';

@Component({
  selector: 'gl-active-programs',
  templateUrl: './active-programs.component.html',
  styleUrls: ['./active-programs.component.css']
})
export class ActiveProgramsComponent implements OnInit {
  programs: any[]
  constructor(private programService: ProgramService) { }

  ngOnInit() {
    // TODO don't do this on every init
    this.programService.getActivePrograms()
      .then((programs) => this.programs=programs)
  }

}
