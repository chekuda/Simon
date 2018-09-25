import Game from './index'
import Simon from '../simon'
import User from '../User'
import Cells from '../cells'
import handleColor from '../handleColors'

jest.mock('../handleColors')

handleColor.mockImplementation(() => {})

describe('Game', () => {
  document.body.innerHTML = `
      <div class="box"></div>
      <div class="start" id="start"></div>
    `
  describe('when create a new game', () => {
    const newGame = new Game()
    it('a new Simon should be created', () => {
      expect(newGame.newSimon).toBeInstanceOf(Simon)
    })
    it('new cells should be created', () => {
      expect(newGame.newCells).toBeInstanceOf(Cells)
    })
    it('new User should be created', () => {
      expect(newGame.newUser).toBeInstanceOf(User)
    })
  })
  describe('when initialized a new game', () => {
    let newGame
    beforeAll(() => {
      newGame = new Game()
      newGame.setButtonEvent = jest.fn()
      newGame.newCells.setCells = jest.fn()
      newGame.init()
    })
    afterAll(() => {
      jest.resetAllMocks()
    })
    it('set ceels should be called for adding the cells within the DOM', () => {
      expect(newGame.newCells.setCells).toHaveBeenCalled()
    })
    it('level should be the same as the simon sequence length', () => {
      expect(document.querySelector('.box').innerHTML).toBe(newGame.newSimon.sequence.length.toString())
    })
    it('start button should have the events added', () => {
      expect(newGame.setButtonEvent).toHaveBeenCalled()
    })
  })
  describe('when click on start button', () => {
    let newGame
    let oldSimonSequence
    let newSimonSequence
    describe('when button is start or continute', () => {
      beforeAll(() => {
        newGame = new Game()
        newGame.init()
        const click = new Event('click')
        oldSimonSequence = newGame.newSimon.sequence
        document.getElementById('start').dispatchEvent(click)
        newSimonSequence = newGame.newSimon.sequence.length
      })
      it('sequence should be increase', () => {
        expect(newSimonSequence).toBe(oldSimonSequence.length)
      })
      it('colors for cells should be called', () => {
        expect(handleColor).toHaveBeenCalled()
      })
      it('level should be incresed as sequence', () => {
        expect(document.querySelector('.box').innerHTML).toBe(newSimonSequence.toString())
      })
    })
  })
})