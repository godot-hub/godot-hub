const body = document.querySelector('#godot-hub');

// title - <h1>Godot Hub</h1>
const title = document.createElement('h1');
title.textContent = 'Godot Hub';

body.appendChild(title);

(async () => {
  try {
    const fetchReleases = require('./helpers/Releases/fetchReleases');
    const filterReleases = require('./helpers/Releases/filterReleases');
    const sortReleases = require('./helpers/Releases/sortReleases');
    const scrapURL = require('./helpers/URL/scrapURL');
    const getScrapedURL = require('./helpers/URL/getScrapedURL');

    const releases = await fetchReleases();
    const filter = await filterReleases(releases);
    const sort = await sortReleases(filter);
    const scrap = scrapURL('https://downloads.tuxfamily.org/godotengine/3.1.1/');
    const getScraped = getScrapedURL();

    console.log(`versions: ${JSON.stringify(sort, null, 2)}`);
    console.log(`getScraped: ${getScraped}`);
  } catch (e) {
    console.error(new Error(e));
  }
})();
