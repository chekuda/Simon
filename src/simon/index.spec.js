import Simon from './index'
import random from '../helpers/math'

jest.mock('../helpers/math')

const RANDOMNUMBER = 2

random.mockImplementation(() => RANDOMNUMBER)

describe('Simon', () => {
  describe('given simon', () => {
    const numberOftabs = 3
    describe('when trying to set up a new simon', () => {
      const simon = new Simon(numberOftabs)
      it('number of tabs should be the same as the tabs provied', () => {
        expect(simon.numTabs).toBe(numberOftabs)
      })
      it('current sequence should be initialized', () => {
        expect(simon.sequence).toEqual([])
      })
    })
    describe('when trying to add a new index within the sequence', () => {
      const simon = new Simon(numberOftabs)
      it('should add a new value to the sequence', () => {
        const previousLength = simon.sequence.length
        simon.addSequence()
        expect(simon.sequence.slice(-1)[0]).toBe(RANDOMNUMBER)
        expect(simon.sequence.length).toBe(previousLength + 1)
      })
    })
    describe('when trying to reset the simon sequence', () => {
      const simon = new Simon(numberOftabs)
      simon.addSequence()
      it('should remove all the index within the sequence', () => {
        simon.resetSequence()
        expect(simon.sequence.length).toBe(0)
      })
    })
  })
})