import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProgramService } from '../shared/program.service'
import { spliceIntoChunks } from '../shared/utils'
import { Day } from '../shared/models'
import {schedule_calculator} from 'weight-program-schema'

@Component({
  selector: 'gl-program-info',
  templateUrl: './program-info.component.html',
  styleUrls: ['./program-info.component.css']
})
export class ProgramInfoComponent implements OnInit {
  public busy: Promise<number>
  public program: any
  public schedule: Day[][]
  public states: boolean[][]
  public active: boolean

  constructor(private router: Router,
    private route: ActivatedRoute,
    private programService: ProgramService) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.program = this.programService.getProgram(params.get('name'))
        this.schedule = spliceIntoChunks(schedule_calculator(this.program), 7) as Day[][]
        this.states = this.schedule
          .map((week: Day[]) => {
            return week.map((day: Day) => false)
          })
        // TODO do this once at the lib component and pass it along
        this.programService.isProgramActive(this.program.name)
          .then((isActive) => this.active = isActive)
      })
  }

  public showLibrary() {
    this.router.navigate(['/lib'])
  }

  toggle(i: number, j: number): void {
    this.states[i][j] = !this.states[i][j]
  }

  startProgram() {
    this.busy = this.programService.activateProgram(this.program.name)
    this.busy.then((status) => {
      if(status == 200) {
        this.router.navigate(['/active'])
      }
    })
  }

  stopProgram() {
    this.busy = this.programService.deactivateProgram(this.program.name)
    this.busy.then((status) => {
      if(status == 200) {
        this.active = false
      }
    })
  }
}
