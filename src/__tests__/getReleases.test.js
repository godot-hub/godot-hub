import getReleases from '../helpers/getReleases';
import * as releases from '../__data__/releases.json';

describe('getReleases()', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should return godot releases', async () => {
        fetch.mockResponse(JSON.stringify(releases)); // mocking getReleases
        expect(await getReleases()).toEqual(releases);
    });
});