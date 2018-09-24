import User from './index'

describe('User', () => {
  describe('given user', () => {
    describe('when name is given', () => {
      const name = 'jose'
      const newUser = new User(name)
      it('new name should be created with a name given', () => {
        expect(newUser.name).toBe(name)
      })
      it('should have an empty sequence', () => {
        expect(newUser.currentSequence).toEqual([])
      })
    })
    describe('when trying to add a new index within the sequence', () => {
      const newUser = new User(name)
      it('should add the index within the current sequence', () => {
        const newIndex = 4
        const previousSequenceLenght = newUser.currentSequence.length
        newUser.addSequence(newIndex)
        expect(newUser.currentSequence.slice(-1)[0]).toBe(newIndex)
        expect(newUser.currentSequence.length).toBe(previousSequenceLenght + 1)
      })
    })
    describe('wenn trying to reset sequence', () => {
      it('should delete all the index within the current sequence', () => {
        const newUser = new User(name)
        newUser.addSequence(2)
        expect(newUser.currentSequence.length).toBe(1)
        newUser.resetSequence()
        expect(newUser.currentSequence.length).toBe(0)
      })
    })
  })
})