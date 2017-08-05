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
  public busy: Promise<any>
  public program: any
  public schedule: Day[][]
  public states: boolean[][]
  public currentWeek: number = 1

  constructor(private router: Router,
    private route: ActivatedRoute,
    private programService: ProgramService) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.init(params.get('name'))
      })
  }

  init(name: string): Promise<void> {
    return this.programService.getProgram(name)
      .then((program) => {
        this.program = program
        this.schedule = spliceIntoChunks(schedule_calculator(this.program), 7) as Day[][]
        this.states = this.schedule
          .map((week: Day[]) => week.map((day: Day) => false))
        this.currentWeek = 1
      })
  }

  public showLibrary() {
    this.router.navigate(['/lib'])
  }

  toggle(i: number, j: number): void {
    this.states[i][j] = !this.states[i][j]
  }

  startProgram() {
    this.busy = this.programService.activateProgram(this.program)
      .then(() => this.init(this.program.name))
  }

  stopProgram() {
    this.busy = this.programService.deactivateProgram(this.program.name)
      .then(() => this.init(this.program.name))
  }

  onSlide(event:any) {
    this.currentWeek = +event.current.split(' ')[1]
  }
}
