const handleCommands = require('../../src')
const sinon = require('sinon')

describe('#handleCommands()', function() {
  // test a functionality
  it('should display a help message on invalid input', () => {
    const args = ['ncli', 'a']
    const consoleLog = sandbox.spy(console, 'log')
    handleCommands(args)
    sinon.assert.callCount(consoleLog, 5)
  })
  it('should display a help message with help flag', () => {
    const args = ['/usr/local/bin/node', '/usr/local/bin/ncli', '-help']
    const consoleLog = sandbox.spy(console, 'log')
    handleCommands(args)
    sinon.assert.callCount(consoleLog, 5)
  })
  it('should display the time with date arg', () => {
    const args = ['/usr/local/bin/node', '/usr/local/bin/ncli', 'date']
    const consoleLog = sandbox.spy(console, 'log')
    handleCommands(args)
    sinon.assert.calledOnce(consoleLog)
  })
  it('should display an error message with an invalid arg', () => {
    const args = ['/usr/local/bin/node', '/usr/local/bin/ncli', 'adfad']
    const consoleError = sandbox.spy(console, 'error')
    handleCommands(args)
    sinon.assert.calledOnce(consoleError)
  })
})
