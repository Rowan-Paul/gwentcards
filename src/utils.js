/**
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
 * @returns A random 9 character string
 */
function randomId() {
  return Math.random().toString(36).substr(2, 9)
}

exports.titleCase = titleCase
exports.randomId = randomId
