const fetchReleases = require('../../helpers/Releases/fetchReleases');
const filterReleases = require('../../helpers/Releases/filterReleases');
const sortReleases = require('../../helpers/Releases/sortReleases');

// cache releases and save it to cache directory
const cacheReleases = async (godotHubPath) => {
  const releases = await fetchReleases(godotHubPath);
  const filter = await filterReleases(releases, godotHubPath);
  const sort = await sortReleases(filter, godotHubPath);
};

module.exports = cacheReleases;
