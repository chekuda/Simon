import colors from '../helpers/colors.json'

class Cells {
  constructor(){
    this.numRows = 2
    this.numCells = 2
    this.cells = []
    this.cbList = []
  }
  setColorsHandlers() {
    this.cells.forEach((ele, index) => {
      ele.addEventListener('mousedown', () => {
        ele.style.backgroundColor = colors[index]
      })
      ele.addEventListener('mouseup', () => {
        ele.style.backgroundColor = 'rgb(255, 255, 255)'
      })
    })
  }
  setCells(){
    const myTable = document.querySelector('table')
    if(myTable) {
      new Array(this.numRows).fill(1).forEach((_, rIndex) => {
        const myRow = myTable.insertRow(rIndex)
        new Array(this.numCells).fill(1).forEach((_, cIndex) => {
          const newCell = myRow.insertCell(cIndex)
          this.cells.push(newCell)
        })
      })
      this.setColorsHandlers()
    }
  }
  setHandlers(fn) {
    this.cells.forEach((ele, index) => {
      this.cbList.push(() => fn(index))
      ele.addEventListener('click', this.cbList[index])
    })
  }
  removeHandlers() {
    this.cells.forEach((ele, index) => {
      ele.removeEventListener('click', this.cbList[index])
    })
    this.cbList = []
  }
}

export default Cells