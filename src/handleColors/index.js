import colors from '../helpers/colors.json'

export const TIMELAPSE = 500

const handleColor = (cells, sequence, fn) => {
  const removeColor = (previous, fn) => {
    cells[previous].style.background = '#fff'
    fn()
  }

  const setColor = (currentIndex, fn) => {
    const previous = sequence[currentIndex - 1] ? sequence[currentIndex - 1] : 0
    const current = sequence[currentIndex]

    setTimeout(() => {
      if(currentIndex > 0) {
        removeColor(previous, currentIndex === sequence.length ? fn : () => {})
      }
      if(cells[current]) {
        cells[current].style.background = colors[current]
        setColor(currentIndex + 1, fn)
      }
    }, TIMELAPSE)
  }

  setColor(0, fn)
}

export default handleColor
