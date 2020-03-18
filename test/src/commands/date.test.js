const displayDateTime = require('../../../src/commands/date')
const sinon = require('sinon')

describe('#displayDateTime()', function() {
  it('should display a date on any input', () => {
    const args = ['', '', '', '', '']
    const consoleLog = sandbox.spy(console, 'log')
    displayDateTime(args, {})
    sinon.assert.calledOnce(consoleLog)
  })
  it('should display a help message with the help flag', () => {
    const args = ['', '', '', '', '-help']
    const consoleLog = sandbox.spy(console, 'log')
    displayDateTime(args, {})
    sinon.assert.calledOnce(consoleLog)
  })
})
