const sinon = require('sinon')

before(() => {
  global.sandbox = sinon.createSandbox()
})

afterEach(() => {
  global.sandbox.restore()
})
