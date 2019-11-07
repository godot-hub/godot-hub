import fetchReleases from '../helpers/fetchReleases'
import * as releases from '../__data__/releases.json'

describe('fetchReleases()', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should fetch godot releases', async () => {
    fetch.mockResponse(JSON.stringify(releases)) // mocking getReleases
    expect(await fetchReleases()).toEqual(releases)
  })
})
