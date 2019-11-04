const filteredReleases = require('../__data__/filteredReleases.json');
const sortedReleases = require('../__data__/sortedReleases.json');
import sortReleases from '../helpers/sortReleases';

describe('sortReleases()', () => {
    it('should sort godot releases', () => {
        expect(sortReleases(filteredReleases)).toEqual(sortedReleases);
    });
});