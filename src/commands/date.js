const { displayInfo } = require('../../utils/helpers')

/**
 * Main method to handle the display of the current date and time
 * @param {Array<string>} args
 * @param {Object<string, string>} flagReference
 * @return void
 */
function displayDateTime(args, flagReference) {
  const flag = args[3]
  const helpFlag = '-help'

  // Verifies if user sent a help flag
  if (flag === helpFlag) {
    return displayInfo(flagReference[helpFlag])
  }

  // Assorted date methods
  const currentDateTime = new Date()
  const currentDate = currentDateTime.toDateString()
  const currentHour = currentDateTime.getHours()
  let currentMinutes = currentDateTime.getMinutes()
  const currentSeconds = currentDateTime.getSeconds()

  // getMinutes() will not have a 0 if under 10 minutes
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`
  }

  console.log(
    `${currentDate} ${currentHour}:${currentMinutes}:${currentSeconds}`
  )
}

module.exports = displayDateTime
