import Game from './index'
import Simon from '../simon'
import User from '../User'
import Cells from '../cells'

describe('Game', () => {
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
    global.document.querySelector = jest.fn(() => ({
        innerHTML: ''
    }))
    global.document.getElementById = jest.fn((ele) => {
      if(ele === 'start') {
        return {
          addEventListener: jest.fn()
        }
      }
    })
    const newGame = new Game()
    newGame.newCells.setCells = jest.fn()
    newGame.init()
    it('set ceels should be called for adding the cells within the DOM', () => {
      expect(newGame.newCells.setCells).toHaveBeenCalled()
    })
    it('level should be the same as the simon sequence length', () => {
      expect(document.querySelector('.box').textContent).toBe(newGame.newSimon.sequence.lenth)
    })
    it('start button should have the events added', () => {
      expect(document.getElementById).toHaveBeenCalledWith('start')
    })
  })
})