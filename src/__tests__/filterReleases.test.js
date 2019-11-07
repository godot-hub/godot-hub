import filterReleases from '../helpers/filterReleases'
const releases = require('../__data__/releases.json')
const filteredReleasesData = require('../__data__/filteredReleases.json')

describe('filterReleases()', () => {
  it('should filter godot releases', () => {
    expect(filterReleases(releases)).toEqual(filteredReleasesData)
  })
})
