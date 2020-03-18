# NCLI
#### A primitive take on a classic feature

## Description

Mimics some basic functionality of popular UNIX commands

## File Structure

* /src
* /test
* /utils
* .eslintrc.js
* .gitignore
* index.js
* package-lock.json
* package.json
* README.md

## Dev Dependencies

* eslint
* mocha
* chai
* sinon

## How to Use

* Clone the repo onto your computer
* Install the necessary dependencies `npm install`
* Create a symbolic link with `npm link`

## Example Commands

* help - displays the list of available commands
`ncli -help`

* ls - lists the files of a specific directory
`ncli ls .   // Displays current directories contents`
`ncli ls . -t   // Displays current directories contents and creation time`

* mkdir - creates a new directory within a given directory
`ncli mkdir test_folder ./file_path   // Creates a folder in file_path`

* curl - retrieves the html from a website
`ncli curl http://www.google.com`

* date - displays the current date and time
`ncli date`

* whoami - displays information about the current user
`ncli whoami -u   // Shows current username`


## Todo

* Add more tests
* Prevent console output from generating when testing
* Add more flags to each command
* Refactor reused code (DRY)
