const { displayInfo } = require('../../utils/helpers')

/**
 * Handles the display of helpful information for this program
 * @param {Object<string, string>} flagReference
 * @return void
 */
function displayHelpInformation(helpFlags) {
  return displayInfo(helpFlags)
}

module.exports = displayHelpInformation
