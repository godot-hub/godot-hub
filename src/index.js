const body = document.querySelector('#godot-hub');

// title - <h1>Godot Hub</h1>
const title = document.createElement('h1');
title.textContent = 'Godot Hub';

body.appendChild(title);

(async () => {
  try {
    const fetchReleases = require('./helpers/fetchReleases');
    const filterReleases = require('./helpers/filterReleases');
    const sortReleases = require('./helpers/sortReleases');
    const scrapURL = require('./helpers/scrapURL');
    const getScrapedURL = require('./helpers/getScrapedURL');

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
