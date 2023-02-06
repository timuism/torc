export interface WorkoutData {
  wtitle: string
  wdate: string
  exercises: ExerciseData[]
  notes: string
  raw: string
}

export interface ExerciseData {
  name: string
  sets: SetData[]
  notes: string
}

export interface SetData {
  reps: number
  weight?: WeightTuple
}

export type WeightTuple = [number, ('lbs' | 'kgs')?]