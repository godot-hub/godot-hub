import sortReleases from '../helpers/sortReleases'
const filteredReleases = require('../__data__/filteredReleases.json')
const sortedReleases = require('../__data__/sortedReleases.json')

describe('sortReleases()', () => {
  it('should sort godot releases', () => {
    expect(sortReleases(filteredReleases)).toEqual(sortedReleases)
  })
})
