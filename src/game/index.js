import Simon from '../simon'
import User from '../User'
import Cells from '../cells'
import handleColor from '../handleColors'

class Game {
  constructor() {
    this.newSimon = new Simon(4)
    this.newCells = new Cells()
    this.newUser = new User('jose')
    this.button = {
      continue: {
        className: 'start',
        text:'Continue'
      },
      start: {
        className: 'start',
        text: 'Start'
      },
      check: {
        className: 'check',
        text: 'Check'
      }
    }
  }

  handleButton(button, cName){
    const handler = cName === 'start'
      ? () => this.newCells.removeHandlers()
      : () => this.newCells.setHandlers(this.newUser.addSequence)

    button.className = this.button[cName].className
    button.textContent = this.button[cName].text
    button.style.visibility = 'visible'
    handler()
  }

  setLevel(){
    document.querySelector('.box').innerHTML = this.newSimon.sequence.length
  }

  restartTheGame(button){
    this.newSimon.resetSequence()
    this.newUser.resetSequence()
    this.handleButton(button, 'start')
    this.setLevel()
  }

  setButtonEvent(){
    document.getElementById("start").addEventListener('click', event => {
      if(event.target.className === 'start') {
        event.target.style.visibility = 'hidden'
        this.newSimon.addSequence()
        handleColor(this.newCells.cells, this.newSimon.sequence, () => this.handleButton(event.target, 'check'))
        this.setLevel()
      } else {
        if(this.newUser.currentSequence.join('') === this.newSimon.sequence.join('')) {
          this.handleButton(event.target, 'continue')
          this.newUser.resetSequence()
        } else {
          this.restartTheGame(event.target)
        }
      }
    })
  }

  init(){
    this.newCells.setCells()
    this.setLevel()
    this.setButtonEvent()
  }
}

export default Game