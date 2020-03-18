const ls = require('./commands/ls')
const mkdir = require('./commands/mkdir')
const whoAmI = require('./commands/whoami')
const date = require('./commands/date')
const help = require('./commands/help')
const curl = require('./commands/curl')
const {
  listFilesReference,
  helpFlags,
  whoAmIReference,
  createDirectoryReference,
  displayDateTimeReference,
  curlReference
} = require('../utils/constants')

/**
 * Handles the arguments passed from the user and fires off
 * the appropriate function
 * @param {Array<string>} args
 * @return {function}
 */
function handleCommands(args) {
  // Holds all of the available commands in an object - a
  // switch statement could have also been used but I felt
  // this was cleaner
  const commands = {
    ls: function() {
      return ls(args, listFilesReference)
    },
    mkdir: function() {
      return mkdir(args, createDirectoryReference)
    },
    help: function() {
      return help(helpFlags)
    },
    whoami: function() {
      return whoAmI(args, whoAmIReference)
    },
    date: function() {
      return date(args, displayDateTimeReference)
    },
    curl: function() {
      return curl(args, curlReference)
    }
  }

  // Grab the command from user arguments
  // Defaults to the 'help' command if nothing is passed
  let command = args[2] ? args[2] : 'help'

  // Removes the proceeding '-' of a help flag
  if (command.startsWith('-')) {
    command = command.slice(1)
  }

  // Checking for a valid command
  for (const key in commands) {
    if (command === key) {
      return commands[command]()
    }
  }

  // If no key was matched, user passed an invalid command - return
  // a list of valid commands
  console.error('\x1b[91m', 'Error: Invalid command!', '\x1b[97m')
  console.log('Please review valid commands below\n')
  return commands.help()
}

module.exports = handleCommands
