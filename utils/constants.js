module.exports = {
  listFilesReference: {
    h: 'size',
    t: 'birthtime',
    '-help': {
      '-h': 'Displays the size of each file in bytes',
      '-t': 'Displays when the file was created'
    }
  },
  helpFlags: {
    ls: 'Lists all contents of a given directory',
    mkdir: 'Creates a new folder in a directory',
    whoami: 'Displays information about the current user',
    date: 'Displays the current date and time',
    curl: 'Retreives the HTML of a website'
  },
  whoAmIReference: {
    u: 'username',
    i: 'uid',
    g: 'gid',
    d: 'homedir',
    s: 'shell',
    '-help': {
      description: 'Displays information about the current user',
      usage: 'ncli whoami {optional_flag}',
      '-u': 'Displays current user\'s username',
      '-i': 'Displays current user\'s uid',
      '-g': 'Displays current user\'s gid',
      '-d': 'Displays current user\'s home directory',
      '-s': 'Displays current user\'s shell home'
    }
  },
  createDirectoryReference: {
    '-help': {
      description: 'Creates a new folder in a directory',
      usage: 'ncli mkdir {file_name} {optional_file_location}'
    }
  },
  displayDateTimeReference: {
    '-help': {
      description: 'Displays the current date and time',
      usage: 'ncli date'
    }
  },
  curlReference: {
    '-help': {
      description: 'Retreives the contents of a webpage',
      usage: 'ncli curl {url}'
    }
  }
}
