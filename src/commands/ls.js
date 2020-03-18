const fs = require('fs')
const {
  displayInfo,
  areFlagsValid,
  parseFlags,
  isPathValid
} = require('../../utils/helpers')

/**
 * Main method used to list files within a specified directory
 * @param {Array<string>} args
 * @param {Object<string, string>} flagReference
 * @return void
 */
function listFiles(args, flagReference) {
  const path = args[3]
  const flag = args[4]
  const helpFlag = '-help'
  let flagList = []
  let isValid = true

  // Verify whether or not a help flag was passed
  if (flag === helpFlag || path === helpFlag) {
    return displayInfo(flagReference[helpFlag])
  }

  // If no path or help flag was passed
  if (!path) {
    console.error('\x1b[91m', 'Error: A file path is required', '\x1b[97m')
    process.exit(1)
  } else {
    // If a path was passed, verify if it is a valid path
    isValid = isPathValid(path)
    if (!isValid) {
      // If not, exit out
      console.error('\x1b[91m',
        'Error: Invalid path, please try again',
        '\x1b[97m')
      process.exit(1)
    }
  }

  // Checks to see if a flag was passed
  if (flag) {
    // Parses and validates flags
    flagList = parseFlags(flag)
    isValid = areFlagsValid(flagReference, flagList)

    // If an invalid flag was passed, display valid flags and exit
    if (!isValid) {
      console.error('\x1b[91m',
        'Error: Invalid flag, see below for valid flag names:',
        '\x1b[97m')
      return displayInfo(flagReference[helpFlag])
    }
  }

  // Retrieve all files from a directory
  getFiles(path)
    .then(files => {
      // Once files are gathered, display their info
      displayFileInformation(path, files, flagReference, flagList)
    })
    .catch(error => {
      // Error handling
      console.error('\x1b[91m', `${error.message}`, '\x1b[97m')
      process.exit(1)
    })
}

/**
 * Retrieves files from a directory
 * @param {string} path
 * @return {Array<string>} status
 */
function getFiles(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, function(err, files) {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

/**
 * Retrieves a file's status
 * @param {string} fullFilePath
 * @return {Object<string, string>} status
 */
function getFileStatus(fullFilePath) {
  return new Promise((resolve, reject) => {
    fs.stat(fullFilePath, function(err, status) {
      if (err) {
        reject(err)
      } else {
        resolve(status)
      }
    })
  })
}

/**
 * Formats all file information for display onto the console
 * @param {string} path
 * @param {Array<string>} files
 * @param {Object<string, string>} flagReference
 * @param {Array<string>} flagList
 * @return void
 */
function formatFileOutput(path, files, flagReference, flagList) {
  // Iterate over all files
  files.forEach(file => {
    const fullFilePath = `${path}/${file}`
    let itemInfo = ''

    // Gets file status data and appends, formats it into a information block
    // for output
    getFileStatus(fullFilePath).then(fileStatus => {
      for (const flag of flagList) {
        itemInfo = `${itemInfo}
        ${flagReference[flag]}: ${fileStatus[flagReference[flag]]},`
      }
      // Output the info, remove the last comma
      console.log(
        '\x1b[36m', `${file}:`, '\x1b[37m',
        `${itemInfo}`.slice(0, -1), '\x1b[97m')
    }).catch(error => {
      // Error handling
      console.error('\x1b[91m', `${error.message}`, '\x1b[97m')
      process.exit(1)
    })
  })
}

/**
 * Displays file names, or if a flag is present, passes it onto
 * formatFileOutput for additional handling
 * @param {string} path
 * @param {Array<string>} files
 * @param {Object<string, string>} flagReference
 * @param {Array<string>} flagList
 * @return void
 */
function displayFileInformation(path, files, flagReference, flagList) {
  // No flags were passed, just output the files
  if (flagList.length < 1) {
    files.forEach(file => {
      console.log(file)
    })
  } else {
    // Otherwise pass it onto the file output handler
    formatFileOutput(path, files, flagReference, flagList)
  }
}

module.exports = listFiles
