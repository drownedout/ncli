const { expect } = require('chai')
const {
  displayInfo,
  areFlagsValid,
  parseFlags,
  isPathValid
} = require('../../utils/helpers')
const { listFilesReference } = require('../../utils/constants')

describe('#parseFlags()', function() {
  const flag = '-abc'
  // test a functionality
  it('should parse flags', function() {
    // add an assertion
    expect(parseFlags(flag)).to.eql(['a', 'b', 'c'])
  })
})

describe('#isPathValid()', function() {
  // test a functionality
  it('"./" should return true', function() {
    expect(isPathValid('./')).to.equal(true)
  })

  it('"." should return true', function() {
    expect(isPathValid('.')).to.equal(true)
  })

  it('"./hello/hello" should return true', function() {
    expect(isPathValid('./hello/hello')).to.equal(true)
  })

  it('"blah" should return false', function() {
    expect(isPathValid('blah')).to.equal(false)
  })

  it('"\\" should return false', function() {
    expect(isPathValid('\\')).to.equal(false)
  })
})

describe('#areFlagsValid()', function() {
  const emptyFlags = []
  const invalidFlags = ['blah', 'nope']
  const validFlags = ['t', 'h']

  it('"emptyFlags" should return false', function() {
    // add an assertion
    expect(areFlagsValid(listFilesReference, emptyFlags)).to.equal(false)
  })

  it('"invalidFlags" should return false', function() {
    // add an assertion
    expect(areFlagsValid(listFilesReference, invalidFlags)).to.equal(false)
  })

  it('"vaidFlags" should return true', function() {
    // add an assertion
    expect(areFlagsValid(listFilesReference, validFlags)).to.equal(true)
  })
})
