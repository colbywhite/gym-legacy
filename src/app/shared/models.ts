export interface Load {
  type: string
  increment?: number
  from?: string
  percent?: number
  of?: string
}

export interface Exercise {
  name: string
  sets: number
  reps: number
  load: Load
}

export interface WorkoutDay {
  exercises: Exercise[]
}

export type Day = string | WorkoutDay
