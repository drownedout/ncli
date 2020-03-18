const http = require('http')
const { displayInfo } = require('../../utils/helpers')

/**
 * Main method to handle retrieving a website's content
 * @param {Array<string>} args
 * @param {Object<string, string>} flagReference
 * @return void
 */
function getWebsite(args, flagReference) {
  const url = args[3]
  const flag = args[4]
  const helpFlag = '-help'

  // Verify whether or not a help flag was passed
  if (flag === helpFlag || url === helpFlag) {
    return displayInfo(flagReference[helpFlag])
  }

  // If no path or help flag was passed
  if (!url) {
    console.log('\x1b[91m', 'Error: A URL is required', '\x1b[97m')
    process.exit(1)
  }

  handleGetCall(url).then(response => {
    console.log(response)
  }).catch(error => {
    console.error('\x1b[91m', `${error}`, '\x1b[97m')
    process.exit(1)
  })
}

/**
 * Calls and collects data from a given website
 * @param {string} url
 * @return {string} body
 */
function handleGetCall(url) {
  return new Promise((resolve, reject) => {
    http.get(url, response => {
      response.setEncoding('utf8')
      let body = ''

      response.on('data', chunk => {
        body += chunk
      })
      // Returns all data when the response is complete
      response.on('end', () => resolve(body))
    }).on('error', reject)
  })
}

module.exports = getWebsite
