/**
 * wname - Workout Name
 * xname - Exercise Name
 * weight - Weight
 * repset - Reps and Set
 * tags - Hash tags
 * comment - Exercise comment
 * groupstart - Defines the beginning of a superset or circuit
 * groupend - Defines the end of a superset or a circuit  
 * -----------------------------------------------------------------*/
export interface ExerciseToken {
  type: 'wname' | 'xname' | 'weight' | 'repset' | 'groupstart' | 'groupend' | 'tags' | 'comment' 
}

// interface ExerciseInterface {
//   name: string
//   weight: [number, 'lbs' | 'kgs']
//   repset: [number, number]
//   hashtags: string[]
//   note: string
// }

const wname = {}

const xname = {
  type: 'xname',
  name: 'Exercise Name'
}

const weight = {
  type: 'weight',
  unit: 'lb',
  value: 245
}

const repset = {
  type: 'repset',
  sets: 3,
  reps: 5
}

const groupstart = {
  type: 'groupstart'
}

const groupend = {
  type: 'groupend'
}

const tags = {
  type: 'tags',
  tags: ['WideGrip', 'no-back-pain', 'ExtraReps']
}

const comment = {
  type: 'comment',
  text: 'felt much lighter than I expected'
}