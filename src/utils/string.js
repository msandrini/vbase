export const joinText = (array, comma, and) => {
  const allButLast = array.slice(0, array.length - 1)
  const last = array[array.length - 1]
  return array.length > 1 ? (allButLast.join(`${comma} `) + ` ${and} ` + last) : array[0]
}
