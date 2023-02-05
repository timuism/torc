interface ExerciseInterface {
  name: string
  weight: [number, 'lbs' | 'kgs']
  repset: [number, number]
  hashtags: string[]
  note: string
}


export class Exercise {
  input;

  constructor(input: string) {
    this.input = input  
  }

  xname() {
    const xn = this.input.match(/^[^:]*/)
    console.log(xn)
    return xn ? xn[0] : null
  }

  weight() {
    const w = this.input.match(/(([0-9]{1,3})(lbs))/)
    return w ? [w[2], w[3]] : null
  }

  repsets() {
    const rs = this.input.match(/([0-9]{1,2})x([0-9]{1,2})/)
    return rs ? [rs[1], rs[2]] : null
  }

  hashtags() {
    const tags = this.input
      .match(/#\w+ /g)
      ?.map(tag => tag.trim().replace('#', ''))
    return tags ?? null
  }

  parse() {
    return {
      name: this.xname(),
      weight: this.weight(),
      repsets: this.repsets(),
      hashtags: this.hashtags()
    }
  }
}