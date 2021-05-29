/**
 * Capitalise all words in a string
 * @param {*} str String to convert
 * @returns String with capitalised words
 */
function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

/**
 * Get a random 9 character string
 * @returns A random 9 character string
 */
function randomId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Removes the first occurence of a value in an array
 * @param {*} arr Array to Change
 * @param {*} value Value to remove
 * @returns Array minus value
 */
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

exports.titleCase = titleCase
exports.randomId = randomId
exports.removeItemOnce = removeItemOnce
