interface WorkoutData {
  wtitle: string
  wdate: string
  exercises: ExerciseData[]
  notes: string
}

interface ExerciseData {
  name: string
  sets: SetData[]
  notes: string
}

interface SetData {
  reps: number
  weight?: WeightTuple
}

type WeightTuple = [number, ('lbs' | 'kgs')?]

export function parse (text: string): WorkoutData {
  let wtitle = ''
  let wdate = ''
  let notes = ''
  let tags = ''
  let exercises: any[] = []

  const isMultiLine = text.match(/[\r\n]/)
  if(isMultiLine) {
    text.split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== '')
      .forEach((line: string, index: number, lines: string[]) => {

        // is a workout title/date
        const {title, date} = titleLine(line)
        if(title) wtitle = title
        if(date) wdate = date
        if(title || date) return line

        // exercises
        if(isExerciseStart(line)) {
          exercises.push(extractExercise(lines, index))
          return;
        }

        // @todo:
        // [x] exerciseName(line)
        // [x] weight / sets / reps check 
        // [] notes
        // [] hashtags
        // [x] exercise end
    })
  }

  // @todo: single line shorthand!
  return { wtitle, wdate, exercises, notes } 
}

function titleLine (line: string) {
  let title, date;
  const isTitleLine = (/\*[^*]+\*/).test(line) || checkForDate(line)
  if(isTitleLine) {
      title = line.match(/\*[^*]+\*/)
        ?.shift()
        ?.replace(/\*/g, '')

      date = line.match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/)
        ?.shift()
  }
  return {title, date}
}

function checkForDate (text: string) {
  return (/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/).test(text)
}

function isExerciseStart(line: string) {
  return (/^[^:]+:\s*/).test(line) 
}

function extractExercise(lines: string[], startIndex: number): ExerciseData {

  // defaults to end of lines array
  let endIndex = lines.length; 

  for(let i=startIndex+1; i<lines.length; i++) {
    const isExerciseEnd = (/([-][-])/).test(lines[i])

    if(isExerciseEnd) {
      endIndex = i;
      break;
    }
  }

  // adding 1 because slice doesnt attached the endIndex item
  const exerciseArr = lines.slice(startIndex, endIndex + 1)
  const sets = extractSets(exerciseArr.slice(1, exerciseArr.length-1))

  return {
    name: exerciseArr[0].replace(':', ''),
    sets: sets,
    notes: ''
  }
}

function extractSets(sets: string[]) :SetData[] {
  let w, weight, r, reps;
  return sets.map((set) => {
    let [r, w] = set
      .split("@")
      .map((str: string) => str.trim());

    // convert reps to a number
    reps = parseInt(r)

    // check if for unit (lbs or kgs)
    weight = checkForUnit(w)

    if(weight)
      return {reps, weight}

    return {reps}
  })
}

function checkForUnit(weight: string): WeightTuple | null
{  
  console.log(weight)
  if(!weight) return null

  const isLbs = (/(([0-9]{1,3})(lbs))/i).test(weight)
  const isKgs = ((/(([0-9]{1,3})(kgs))/i).test(weight))

  if(isLbs) {
   return [parseInt(weight.replace('lbs', '').trim()), 'lbs']
  }

  if(isKgs) {
    return [parseInt(weight.replace('kgs', '').trim()), 'kgs']
  }

  // @todo: might be a better way to do this...
  // checks if the only left is the unit (no weight value)
  if(weight === 'kgs' || weight === 'lbs') {
    return null
  }
    
  return [parseInt(weight)]
}