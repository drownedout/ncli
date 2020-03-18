const os = require('os')

/**
 * Displays information of a command
 * @param {Object<string, string>} flags
 * @return void
 */
function displayInfo(flags) {
  for (const item in flags) {
    console.log('\x1b[36m', `${item}:`, '\x1b[37m', `${flags[item]}`, '\x1b[97m')
  }
}

/**
 * Verifies if a path is valid, depending on OS
 * @param {string} path
 * @return {boolean}
 */
function isPathValid(path) {
  let isValidPath = true

  if (os.type() === 'Windows_NT') {
    const directoryRegex = /^[a-zA-Z]:\\(((?![<>:"/\\|?*]).)+((?<![ .])\\)?)*$/
    isValidPath = directoryRegex.test(path)
  } else {
    const directoryRegex = /^((\.)|(.*\/))([^/]*)$/
    isValidPath = directoryRegex.test(path)
  }
  return isValidPath
}

/** Converts all flags from a string to a array
 *
 * @param {string} flags
 * @return {Array<string>}
 */
function parseFlags(flags) {
  if (flags.startsWith('-')) {
    return flags.split('').splice(1)
  }
  return flags.split('')
}

/** Checks to see if a flag is valid for a specific command
 * @param {Object<strin, string>} flagList
 * @param {Array<string>} flagList
 * @return {boolean}
 */
function areFlagsValid(flagReference, flagList) {
  if (flagList.length < 1) {
    return false
  }

  for (const flag of flagList) {
    if (flag in flagReference === false) {
      return false
    }
  }

  return true
}

module.exports = {
  displayInfo,
  areFlagsValid,
  parseFlags,
  isPathValid
}
