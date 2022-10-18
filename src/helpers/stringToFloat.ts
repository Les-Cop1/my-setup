export const stringToFloat = (str: string): number => {
  let result = ''
  str
    .toUpperCase()
    .split('')
    .forEach((char) => {
      result += char.charCodeAt(0).toString(10)
    })
  return parseFloat((parseInt(result) / Math.pow(10, result.length - 1)).toFixed(2))
}
