import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProgramService } from '../shared/program.service'
import { spliceIntoChunks } from '../shared/utils'
import {schedule_calculator} from 'weight-program-schema'

@Component({
  selector: 'gl-program-info',
  templateUrl: './program-info.component.html',
  styleUrls: ['./program-info.component.css']
})
export class ProgramInfoComponent implements OnInit {
  public program: any
  public schedule: Day[][]
  public defaultName: string = 'Lift!'

  constructor(private route: ActivatedRoute, private programService: ProgramService) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.program = this.programService.getProgram(params.get('name'))
        this.schedule = spliceIntoChunks(schedule_calculator(this.program), 7) as Day[][]
      })
  }
}

interface Load {
  type: string
  increment: number
  from: string
}
interface Exercise {
  name: string
  sets: number
  reps: number
  load: Load
}
interface WorkoutDay {
  exercises: Exercise[]
}
type Day = string | WorkoutDay
