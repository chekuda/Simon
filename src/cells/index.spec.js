import Cells from './index'
import colors from '../helpers/colors.json'

describe('Cells', () => {
  describe('when new Cells', () => {
    it('should have the default properties', () => {
      const newCells = new Cells()
      expect(newCells.numRows).toBe(2)
      expect(newCells.numCells).toBe(2)
      expect(newCells.cells).toEqual([])
      expect(newCells.cbList).toEqual([])
    })
  })
  describe('when trying to set up the cells in the DOM', () => {
    describe('when table node element exist', () => {
      document.body.innerHTML = `<table></table>`

      const newCells = new Cells()
      newCells.setCells()
      it('should create and cached all the cells created', () => {
        expect(newCells.cells.length).toBe(4)
      })
      it('should add change color on mousedown event', () => {
        const mouseDownEvent = new Event('mousedown')
        newCells.cells.forEach((ele, index) => {
          ele.dispatchEvent(mouseDownEvent)
          expect(ele.style.backgroundColor).toBe(colors[index])
        })
      })
      it('should add change color on mousedown event', () => {
        const mouseUpEvent = new Event('mouseup')
        newCells.cells.forEach(ele => {
          ele.dispatchEvent(mouseUpEvent)
          expect(ele.style.backgroundColor).toBe('rgb(255, 255, 255)')
        })
      })
    })
    describe('when table element doesnt exist', () => {
      const newCells = new Cells()
      it('should not create any cells', () => {
        expect(newCells.cells.length).toBe(0)
      })
    })
  })
  describe('when trying to set up the click handlers for every cell', () => {
    const click = new Event('click')
    let cb
    let newCells
    beforeEach(() => {
      cb = jest.fn()
      newCells = new Cells()
      newCells.setCells()
      newCells.setHandlers(cb)
    })

    it('should attach the click handler to every cell', () => {
      newCells.cells.forEach(ele => {
        ele.dispatchEvent(click)
      })
      expect(cb).toHaveBeenCalledTimes(newCells.cells.length)
    })
    it('should cache all the events within callback list', () => {
      expect(newCells.cbList.length).toBe(newCells.cells.length)
    })
  })
  describe('when trying to remove the handlers', () => {
    const click = new Event('click')
    let cb
    let newCells
    beforeEach(() => {
      cb = jest.fn()
      newCells = new Cells()
      newCells.setCells()
      newCells.setHandlers(cb)
      newCells.removeHandlers()
    })
    it('should remove the handlers from every cell', () => {
      newCells.cells.forEach(ele => {
        ele.dispatchEvent(click)
      })
      expect(cb).toHaveBeenCalledTimes(0)
    })
    it('should remove all the events withing the callback list', () => {
      expect(newCells.cbList.length).toBe(0)
    })
  })
})