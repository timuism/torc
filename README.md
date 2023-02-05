# (T)ext (O)nly (R)esistance Training (C)apture

## Syntax
I've logged my personal workouts in my notes app that same way for a long time. This syntax is inspired from it.

### Naming Workouts
Name a workout with `*Workout Name*`

### Add a date to a workout
By default, a workout is assigned today's date. You can manually define a date with the following formats:
M/D/YY, MM/DD/YYYY, D/M/YY DD/MM/YYYY

### Adding Exercises
To log an exercise, give it name, and ended it with a `:` like so.
Add sets with reps and weight like: 12 @135. This means "12 reps at 135lbs".
Both pounds and kilograms are recognized.
The mark the end of an exercise with double dashes: `--`

Here is an example exercise below:
```
Bench Press:
12 @45
10 @95
8 @135
8 @135
6 @145
--
```

## Installation
```
npm i @timuism/torc
yarn add @timuism/torc
```

## Usage
```
import {torc} from '@timuism/torc'

const text = `
  *Chest and Arms* 2/5/2023
  Bench Press:
  10 @45lbs
  8 @135
  8 @135
`

torc(text) // return object of captured data
```