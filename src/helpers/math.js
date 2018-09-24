const random = (prevVal, max) => {
 const newVal = Math.floor(Math.random() * Math.floor(max))
  if(newVal === prevVal){
    return random(prevVal, max)
  } else {
    return newVal
  }
}

export default random