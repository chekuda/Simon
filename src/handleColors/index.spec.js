import handleColor, { TIMELAPSE } from './index'
import colors from '../helpers/colors.json'

jest.useFakeTimers()

describe('HandleColor', () => {
  const sequence = [0, 2, 1]
  const cells = new Array(sequence.length).fill(1).map((_, index) => ({
    style: {
      background: ''
    },
    index
  }))
  const cb = jest.fn()

  describe(`when handle colors is called with a sequence of ${sequence.length}`, () => {
    describe(`and the number of cells is ${cells.length}`, () => {
      it(`background color for every cell should be change after every ${TIMELAPSE}`, () => {
        sequence.forEach(ele => {
          handleColor(cells, sequence, cb)

          jest.advanceTimersByTime(TIMELAPSE)

          expect(cells[ele].style.background).toBe(colors[ele])
        })
      })
    })
  })
  describe('when the time finished', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      handleColor(cells, sequence, cb)
      jest.advanceTimersByTime(TIMELAPSE * (sequence.length + 1))
    })
    it('all cells should be turn to white color', () => {
      cells.forEach(cell => {
        expect(cell.style.background).toBe('#fff')
      })
    })
    it('callback should have been called only once', () => {
      expect(cb).toHaveBeenCalledTimes(1)
    })
  })
})
