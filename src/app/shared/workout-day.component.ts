import { Component, Input } from '@angular/core';
import { Exercise } from '../shared/models'

@Component({
  selector: 'gl-workout-day',
  styleUrls: ['./workout-day.component.css'],
  templateUrl: './workout-day.component.html'
})
export class WorkoutDayComponent {
  @Input()
  name: string
  @Input()
  expanded: boolean
  @Input()
  exercises: Exercise[]
}
