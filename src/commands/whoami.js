const os = require('os')
const {
  displayInfo,
  areFlagsValid,
  parseFlags
} = require('../../utils/helpers')

/**
 * Main method used to display current user's information
 * @param {Array<string>} args
 * @param {Object<string, string>} flagReference
 * @return void
 */
function whoAmI(args, flagReference) {
  const flag = args[3]
  const helpFlag = '-help'
  let flagName = ''
  let flagList = []
  let isValid = true

  // Checks to see if help flag was passed
  if (flag === helpFlag) {
    return displayInfo(flagReference[helpFlag])
  } else if (flag) {
    // Else, parse and validate flag
    flagList = parseFlags(flag)
    isValid = areFlagsValid(flagReference, flagList)

    // If not a valid flag, send feedback to user with valid flag list
    if (!isValid) {
      console.error('\x1b[91m',
        'Error: Invalid flag, see below for valid flag names:',
        '\x1b[97m')
      return displayInfo(flagReference[helpFlag])
    }

    // Peel off the first item of array since this can only handle
    // one flag at the moment
    flagName = flagReference[flagList[0]]
  }

  // If no flag was passed, display all user info
  const userInfo = flagName ? os.userInfo()[flagName] : os.userInfo()

  console.log(userInfo)
}

module.exports = whoAmI
