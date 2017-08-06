import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { addWeeks, addDays } from 'date-fns'

import { ProgramService } from '../shared/program.service'
import { Day } from '../shared/models'

@Component({
  selector: 'gl-schedule-info',
  templateUrl: './schedule-info.component.html',
  styleUrls: ['./schedule-info.component.css']
})
export class ScheduleInfoComponent implements OnInit {
  public scheduleInfo: any
  public initiliazing: Promise<any>
  public week_start: any
  public week_end: any
  public states: boolean[][]

  constructor(private router: Router,
    private route: ActivatedRoute,
    private programService: ProgramService) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.initiliazing = this.init(params.get('name'))
      })
  }

  init(name: string): Promise<void> {
    return this.programService.getSchedule(name)
      .then((schedule) =>{
        this.scheduleInfo=schedule
        this.calcWeekDates(0)
        this.states = this.scheduleInfo.schedule.map((week: Day[]) => week.map((day: Day) => false))
      })
  }

  showLibrary() {
    this.router.navigate(['/lib'])
  }

  onSlide(event:any) {
    this.calcWeekDates(+event.current.split(' ')[1])
  }

  toggle(i: number, j: number): void {
    this.states[i][j] = !this.states[i][j]
  }

  stopProgram() {
    this.initiliazing = this.programService.stopProgram(this.scheduleInfo.name)
      .then(() => this.router.navigate(['/program', this.scheduleInfo.name]))
  }

  calcWeekDates(week: number) {
    const day_zero = new Date(this.scheduleInfo.start_date as string)
    this.week_start = addWeeks(day_zero, week)
    this.week_end = addDays(this.week_start, 6)
  }
}
