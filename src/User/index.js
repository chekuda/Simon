class User {
  constructor(name){
    this.name = name
    this.currentSequence = []
    this.addSequence = this.addSequence.bind(this)
  }
  addSequence(index){
    this.currentSequence.push(index)
  }
  resetSequence() {
    this.currentSequence = []
  }
}

export default User