const fs = require('fs')
const path = require('path')
const { displayInfo } = require('../../utils/helpers')

/**
 * Main method to handle the creation of a directory
 * @param {Array<string>} args
 * @param {Object<string, string>} flagReference
 * @return void
 */
function createDirectory(args, flagReference) {
  const fileName = args[3]
  const helpFlag = '-help'

  // Verifies if user has passed a file name
  if (!fileName) {
    console.error('\x1b[91m',
      'Error: A filename is required',
      '\x1b[97m')
    process.exit(1)
  } else if (fileName === helpFlag) {
    // Checks if filename is actually a help flag
    return displayInfo(flagReference[helpFlag])
  }

  const pathName = args[4] ? '' : '.' // Default to current directory
  const directoryPath = `${pathName}/${fileName}`

  // Ensures consistency of path separators between operating systems
  const normalizedDirectoryPath = path.normalize(directoryPath)

  handleDirectoryCreation(normalizedDirectoryPath).then((path) => {
    // Success feedback for user
    console.log(`Successfully created directory: '${path}'`)
  }).catch((error) => {
    // Else return error
    console.error('\x1b[91m',
      `Error: ${error.message}`,
      '\x1b[97m')
    process.exit(1)
  })
}

/**
 * Verifies the existance of a directory, then creates a directory if
 * one doesn't exist
 * @param {Array<string>} args
 * @param {Object<string, string>} flagReference
 * @return {string} directoryPath
 */
function handleDirectoryCreation(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.stat(directoryPath, error => {
      if (error) {
        // Verifies if the directory already exists
        // If the directory doesn't exist, it will return the error code
        // 'Error No Entry'
        if (error.code === 'ENOENT') {
          fs.mkdir(directoryPath, error => {
            if (error) {
              reject(error)
            } else {
              resolve(directoryPath)
            }
          })
        } else {
          reject(error)
        }
      } else {
        resolve(directoryPath)
      }
    })
  })
}

module.exports = createDirectory
