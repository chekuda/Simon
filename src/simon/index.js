import random from '../helpers/math'

class Simon {
  constructor(numTabs) {
    this.numTabs = numTabs
    this.sequence = []
  }
  addSequence() {
    const lastValue = this.sequence.slice(-1)[0]

    this.sequence.push(random(lastValue, this.numTabs))
  }
  resetSequence() {
    this.sequence = []
  }
}

export default Simon